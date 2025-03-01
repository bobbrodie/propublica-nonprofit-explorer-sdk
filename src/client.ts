import { API_BASE_URL, SDK_VERSION } from './constants';
import {
  IOrganizationResponse,
  ISearchRequest,
  ISearchResponse,
} from './models';
import { validateOrganizationResponse } from './models/organization.zod';
import {
  validateSearchRequest,
  validateSearchResponse,
} from './models/search.zod';

export class APIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'APIError';
  }
}
export class Client {
  /**
   * Search for organizations
   *
   * @param params Search parameters
   * @returns
   */
  async search(params: ISearchRequest): Promise<ISearchResponse> {
    const validatedParams = validateSearchRequest(params);
    const response = await this.get<ISearchResponse>(
      '/search.json',
      validatedParams,
    );
    return validateSearchResponse(response);
  }
  /**
   * Get an organization by EIN
   *
   * @param ein Employer Identification Number
   * @returns Organization object
   */
  async organization(ein: number): Promise<IOrganizationResponse> {
    this.validateEIN(ein);
    try {
      const response: IOrganizationResponse = await this.get(
        `/organizations/${ein}.json`,
      );
      return validateOrganizationResponse(response);
    } catch (err: unknown) {
      this.handleError(err);
    }
  }

  private validateEIN(ein: number) {
    if (!Number.isInteger(ein) || ein.toString().length !== 9) {
      throw new Error('EIN must be a 9-digit integer');
    }
  }

  /**
   * Call a GET to a specific API path
   *
   * @param path API path to fetch
   * @param params Parameters
   * @returns
   */
  private async get<T>(
    path: string,
    params: Record<string, string | number> = {},
  ): Promise<T> {
    const stringParams = Object.fromEntries(
      Object.entries(params).map(([key, value]) => [key, value.toString()]),
    );
    const response = await this.request('GET', path, stringParams);
    return this.parseResponse(response);
  }

  /**
   * Parse the API response
   *
   * @param response API response
   * @returns
   */
  private async parseResponse(response: Response) {
    if (response.body == null) {
      return null;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let result = '';

    for await (const chunk of this.readChunks(reader)) {
      result += decoder.decode(chunk);
    }

    return JSON.parse(result);
  }

  /**
   * Read chunks from API response
   *
   * @param reader Stream reader
   */
  private async *readChunks(reader: ReadableStreamDefaultReader<Uint8Array>) {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      yield value;
    }
  }

  /**
   * Make a request
   *
   * @param method HTTP method to be used
   * @param path URL path to call
   * @param params Parameters
   * @returns
   */
  private async request(
    method: string,
    path: string,
    params: Record<string, string>,
  ): Promise<Response> {
    try {
      // TODO: Set User-Agent header
      let url = API_BASE_URL + path;

      if (Object.keys(params).length > 0) {
        const query = '?' + new URLSearchParams(params).toString();
        url += query;
      }

      const response = await fetch(url, {
        headers: {
          'User-Agent': 'NonProfitExplorerSDK/' + SDK_VERSION,
        },
        method: method,
      });

      return response;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new APIError(err.message);
      } else {
        throw new APIError('An unknown error occurred');
      }
    }
  }

  private handleError(err: unknown): never {
    if (err instanceof APIError) {
      throw err;
    } else if (err instanceof Error) {
      throw new APIError(err.message);
    } else {
      throw new APIError('An unknown error occurred');
    }
  }
}
