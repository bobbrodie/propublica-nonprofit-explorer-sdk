import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { APIError } from '../src/client';
import * as NonprofitExplorerSDK from '../src/index';
import * as mockOrganizationUnknownResponse from './json/mockOrganizationUnknownResponse.json';
import * as mockOrganizationResponse from './json/mockOrganizationResponse.json';
import * as mockSearchResponse from './json/mockSearchResponse.json';

describe('Client', () => {
  let client: NonprofitExplorerSDK.Client;

  beforeEach(() => {
    client = new NonprofitExplorerSDK.Client();
  });

  it('should instantiate client', async () => {
    client = new NonprofitExplorerSDK.Client();
    expect(client).toBeDefined();
  });

  describe('handleError', () => {
    it('should rethrow APIError', () => {
      const apiError = new APIError('API Error');
      expect(() => {
        client['handleError'](apiError);
      }).toThrow(APIError);
      expect(() => {
        client['handleError'](apiError);
      }).toThrow('API Error');
    });

    it('should wrap Error in APIError', () => {
      const error = new Error('Generic Error');
      expect(() => {
        client['handleError'](error);
      }).toThrow(APIError);
      expect(() => {
        client['handleError'](error);
      }).toThrow('Generic Error');
    });

    it('should handle unknown error types', () => {
      const unknownError = 'Unknown error';
      expect(() => {
        client['handleError'](unknownError);
      }).toThrow(APIError);
      expect(() => {
        client['handleError'](unknownError);
      }).toThrow('An unknown error occurred');
    });
  });

  describe('search', () => {
    it('should search for organizations', async () => {
      const mockReadableStream = new ReadableStream({
        start(controller) {
          controller.enqueue(
            new TextEncoder().encode(JSON.stringify(mockSearchResponse)),
          );
          controller.close();
        },
      });

      const mockFetch = jest.fn<typeof fetch>().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockSearchResponse,
        text: async () => JSON.stringify(mockSearchResponse),
        body: mockReadableStream,
      } as Response);

      global.fetch = mockFetch;

      const searchParams = { q: 'propublica' };
      const result = await client.search(searchParams);

      expect(result).toBeDefined();
      expect(result.total_results).toBe(4);
      expect(result.organizations).toHaveLength(4);
      expect(result.organizations[0].ein).toBe(142007220);
      expect(result.organizations[0].name).toBe('Pro Publica Inc');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://projects.propublica.org/nonprofits/api/v2/search.json?q=propublica',
        { method: 'GET' },
      );
    });

    it('should handle null response body', async () => {
      const mockFetch = jest.fn<typeof fetch>().mockResolvedValue({
        ok: true,
        status: 200,
        body: null,
      } as Response);

      global.fetch = mockFetch;

      const searchParams = { q: 'propublica' };
      await expect(client.search(searchParams)).rejects.toThrow();
    });

    it('should handle APIError', async () => {
      const mockFetch = jest
        .fn<typeof fetch>()
        .mockRejectedValue(new APIError('API Error'));
      global.fetch = mockFetch;

      const searchParams = { q: 'propublica' };
      await expect(client.search(searchParams)).rejects.toThrow(APIError);
      await expect(client.search(searchParams)).rejects.toThrow('API Error');
    });

    it('should handle network errors', async () => {
      const mockFetch = jest
        .fn<typeof fetch>()
        .mockRejectedValue(new Error('Network error'));
      global.fetch = mockFetch;

      const searchParams = { q: 'propublica' };
      await expect(client.search(searchParams)).rejects.toThrow(
        'Network error',
      );
    });

    it('should handle unknown errors', async () => {
      const mockFetch = jest
        .fn<typeof fetch>()
        .mockRejectedValue('Unknown error');
      global.fetch = mockFetch;

      const searchParams = { q: 'propublica' };
      await expect(client.search(searchParams)).rejects.toThrow(
        'An unknown error occurred',
      );
    });
  });

  describe('organization', () => {
    it('should not throw an error for a valid 9-digit EIN', async () => {
      const mockReadableStream = new ReadableStream({
        start(controller) {
          controller.enqueue(
            new TextEncoder().encode(JSON.stringify(mockOrganizationResponse)),
          );
          controller.close();
        },
      });

      const mockFetch = jest.fn<typeof fetch>().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockOrganizationResponse,
        text: async () => JSON.stringify(mockOrganizationResponse),
        body: mockReadableStream,
      } as Response);

      global.fetch = mockFetch;

      const result = await client.organization(142007220);

      expect(result.organization.ein).toBe(142007220);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://projects.propublica.org/nonprofits/api/v2/organizations/142007220.json',
        { method: 'GET' },
      );
    });

    it('should handle unknown organization', async () => {
      const mockReadableStream = new ReadableStream({
        start(controller) {
          controller.enqueue(
            new TextEncoder().encode(
              JSON.stringify(mockOrganizationUnknownResponse),
            ),
          );
          controller.close();
        },
      });

      const mockFetch = jest.fn<typeof fetch>().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockOrganizationUnknownResponse,
        text: async () => JSON.stringify(mockOrganizationUnknownResponse),
        body: mockReadableStream,
      } as Response);

      global.fetch = mockFetch;

      const result = await client.organization(123456789);

      expect(result).toEqual(mockOrganizationUnknownResponse);
    });

    it('should handle APIError', async () => {
      const mockFetch = jest
        .fn<typeof fetch>()
        .mockRejectedValue(new APIError('API Error'));
      global.fetch = mockFetch;

      await expect(client.organization(142007220)).rejects.toThrow(APIError);
      await expect(client.organization(142007220)).rejects.toThrow('API Error');
    });

    it('should handle Error and wrap it in APIError', async () => {
      const mockFetch = jest
        .fn<typeof fetch>()
        .mockRejectedValue(new Error('Generic Error'));
      global.fetch = mockFetch;

      await expect(client.organization(142007220)).rejects.toThrow(APIError);
      await expect(client.organization(142007220)).rejects.toThrow(
        'Generic Error',
      );
    });

    it('should handle unknown error and wrap it in APIError', async () => {
      const mockFetch = jest
        .fn<typeof fetch>()
        .mockRejectedValue('Unknown error');
      global.fetch = mockFetch;

      await expect(client.organization(142007220)).rejects.toThrow(APIError);
      await expect(client.organization(142007220)).rejects.toThrow(
        'An unknown error occurred',
      );
    });

    it('should handle network errors', async () => {
      const mockFetch = jest
        .fn<typeof fetch>()
        .mockRejectedValue(new Error('Network error'));
      global.fetch = mockFetch;

      await expect(client.organization(142007220)).rejects.toThrow(
        'Network error',
      );
    });

    it('should handle unknown errors', async () => {
      const mockFetch = jest
        .fn<typeof fetch>()
        .mockRejectedValue('Unknown error');
      global.fetch = mockFetch;

      await expect(client.organization(142007220)).rejects.toThrow(
        'An unknown error occurred',
      );
    });

    it('should throw an error for an EIN with less than 9 digits', async () => {
      await expect(client.organization(12345678)).rejects.toThrow(
        'EIN must be a 9-digit integer',
      );
    });

    it('should throw an error for an EIN with more than 9 digits', async () => {
      await expect(client.organization(1234567890)).rejects.toThrow(
        'EIN must be a 9-digit integer',
      );
    });

    it('should throw an error for a non-integer EIN', async () => {
      await expect(client.organization(123456789.5)).rejects.toThrow(
        'EIN must be a 9-digit integer',
      );
    });
  });
});
