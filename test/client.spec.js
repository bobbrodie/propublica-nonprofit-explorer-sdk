'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const globals_1 = require('@jest/globals');
const client_1 = require('../src/client');
const NonprofitExplorerSDK = require('../src/index');
const mockOrganizationResponse = require('./json/mockOrganizationResponse.json');
const mockSearchResponse = require('./json/mockSearchResponse.json');
(0, globals_1.describe)('Client', () => {
  let client;
  (0, globals_1.beforeEach)(() => {
    client = new NonprofitExplorerSDK.Client();
  });
  (0, globals_1.it)('should instantiate client', async () => {
    client = new NonprofitExplorerSDK.Client();
    (0, globals_1.expect)(client).toBeDefined();
  });
  (0, globals_1.describe)('handleError', () => {
    (0, globals_1.it)('should rethrow APIError', () => {
      const apiError = new client_1.APIError('API Error');
      (0, globals_1.expect)(() => {
        client['handleError'](apiError);
      }).toThrow(client_1.APIError);
      (0, globals_1.expect)(() => {
        client['handleError'](apiError);
      }).toThrow('API Error');
    });
    (0, globals_1.it)('should wrap Error in APIError', () => {
      const error = new Error('Generic Error');
      (0, globals_1.expect)(() => {
        client['handleError'](error);
      }).toThrow(client_1.APIError);
      (0, globals_1.expect)(() => {
        client['handleError'](error);
      }).toThrow('Generic Error');
    });
    (0, globals_1.it)('should handle unknown error types', () => {
      const unknownError = 'Unknown error';
      (0, globals_1.expect)(() => {
        client['handleError'](unknownError);
      }).toThrow(client_1.APIError);
      (0, globals_1.expect)(() => {
        client['handleError'](unknownError);
      }).toThrow('An unknown error occurred');
    });
  });
  (0, globals_1.describe)('search', () => {
    (0, globals_1.it)('should search for organizations', async () => {
      const mockReadableStream = new ReadableStream({
        start(controller) {
          controller.enqueue(
            new TextEncoder().encode(JSON.stringify(mockSearchResponse)),
          );
          controller.close();
        },
      });
      const mockFetch = globals_1.jest.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockSearchResponse,
        text: async () => JSON.stringify(mockSearchResponse),
        body: mockReadableStream,
      });
      global.fetch = mockFetch;
      const searchParams = { q: 'propublica' };
      const result = await client.search(searchParams);
      (0, globals_1.expect)(result).toBeDefined();
      (0, globals_1.expect)(result.total_results).toBe(4);
      (0, globals_1.expect)(result.organizations).toHaveLength(4);
      (0, globals_1.expect)(result.organizations[0].ein).toBe(142007220);
      (0, globals_1.expect)(result.organizations[0].name).toBe(
        'Pro Publica Inc',
      );
      (0, globals_1.expect)(mockFetch).toHaveBeenCalledWith(
        'https://projects.propublica.org/nonprofits/api/v2/search.json?q=propublica',
        { method: 'GET' },
      );
    });
    (0, globals_1.it)('should handle null response body', async () => {
      const mockFetch = globals_1.jest.fn().mockResolvedValue({
        ok: true,
        status: 200,
        body: null,
      });
      global.fetch = mockFetch;
      const searchParams = { q: 'propublica' };
      await (0, globals_1.expect)(
        client.search(searchParams),
      ).rejects.toThrow();
    });
    (0, globals_1.it)('should handle APIError', async () => {
      const mockFetch = globals_1.jest
        .fn()
        .mockRejectedValue(new client_1.APIError('API Error'));
      global.fetch = mockFetch;
      const searchParams = { q: 'propublica' };
      await (0, globals_1.expect)(client.search(searchParams)).rejects.toThrow(
        client_1.APIError,
      );
      await (0, globals_1.expect)(client.search(searchParams)).rejects.toThrow(
        'API Error',
      );
    });
    (0, globals_1.it)('should handle network errors', async () => {
      const mockFetch = globals_1.jest
        .fn()
        .mockRejectedValue(new Error('Network error'));
      global.fetch = mockFetch;
      const searchParams = { q: 'propublica' };
      await (0, globals_1.expect)(client.search(searchParams)).rejects.toThrow(
        'Network error',
      );
    });
    (0, globals_1.it)('should handle unknown errors', async () => {
      const mockFetch = globals_1.jest.fn().mockRejectedValue('Unknown error');
      global.fetch = mockFetch;
      const searchParams = { q: 'propublica' };
      await (0, globals_1.expect)(client.search(searchParams)).rejects.toThrow(
        'An unknown error occurred',
      );
    });
  });
  (0, globals_1.describe)('organization', () => {
    (0, globals_1.it)(
      'should not throw an error for a valid 9-digit EIN',
      async () => {
        const mockReadableStream = new ReadableStream({
          start(controller) {
            controller.enqueue(
              new TextEncoder().encode(
                JSON.stringify(mockOrganizationResponse),
              ),
            );
            controller.close();
          },
        });
        const mockFetch = globals_1.jest.fn().mockResolvedValue({
          ok: true,
          status: 200,
          json: async () => mockOrganizationResponse,
          text: async () => JSON.stringify(mockOrganizationResponse),
          body: mockReadableStream,
        });
        global.fetch = mockFetch;
        const result = await client.organization(142007220);
        (0, globals_1.expect)(result).toEqual(mockOrganizationResponse);
        (0, globals_1.expect)(mockFetch).toHaveBeenCalledWith(
          'https://projects.propublica.org/nonprofits/api/v2/organizations/142007220.json',
          { method: 'GET' },
        );
      },
    );
    (0, globals_1.it)('should handle null response body', async () => {
      const mockFetch = globals_1.jest.fn().mockResolvedValue({
        ok: true,
        status: 200,
        body: null,
      });
      global.fetch = mockFetch;
      const result = await client.organization(142007220);
      (0, globals_1.expect)(result).toBeNull();
    });
    (0, globals_1.it)('should handle APIError', async () => {
      const mockFetch = globals_1.jest
        .fn()
        .mockRejectedValue(new client_1.APIError('API Error'));
      global.fetch = mockFetch;
      await (0, globals_1.expect)(
        client.organization(142007220),
      ).rejects.toThrow(client_1.APIError);
      await (0, globals_1.expect)(
        client.organization(142007220),
      ).rejects.toThrow('API Error');
    });
    (0, globals_1.it)(
      'should handle Error and wrap it in APIError',
      async () => {
        const mockFetch = globals_1.jest
          .fn()
          .mockRejectedValue(new Error('Generic Error'));
        global.fetch = mockFetch;
        await (0, globals_1.expect)(
          client.organization(142007220),
        ).rejects.toThrow(client_1.APIError);
        await (0, globals_1.expect)(
          client.organization(142007220),
        ).rejects.toThrow('Generic Error');
      },
    );
    (0, globals_1.it)(
      'should handle unknown error and wrap it in APIError',
      async () => {
        const mockFetch = globals_1.jest
          .fn()
          .mockRejectedValue('Unknown error');
        global.fetch = mockFetch;
        await (0, globals_1.expect)(
          client.organization(142007220),
        ).rejects.toThrow(client_1.APIError);
        await (0, globals_1.expect)(
          client.organization(142007220),
        ).rejects.toThrow('An unknown error occurred');
      },
    );
    (0, globals_1.it)('should handle network errors', async () => {
      const mockFetch = globals_1.jest
        .fn()
        .mockRejectedValue(new Error('Network error'));
      global.fetch = mockFetch;
      await (0, globals_1.expect)(
        client.organization(142007220),
      ).rejects.toThrow('Network error');
    });
    (0, globals_1.it)('should handle unknown errors', async () => {
      const mockFetch = globals_1.jest.fn().mockRejectedValue('Unknown error');
      global.fetch = mockFetch;
      await (0, globals_1.expect)(
        client.organization(142007220),
      ).rejects.toThrow('An unknown error occurred');
    });
    (0, globals_1.it)(
      'should throw an error for an EIN with less than 9 digits',
      async () => {
        await (0, globals_1.expect)(
          client.organization(12345678),
        ).rejects.toThrow('EIN must be a 9-digit integer');
      },
    );
    (0, globals_1.it)(
      'should throw an error for an EIN with more than 9 digits',
      async () => {
        await (0, globals_1.expect)(
          client.organization(1234567890),
        ).rejects.toThrow('EIN must be a 9-digit integer');
      },
    );
    (0, globals_1.it)(
      'should throw an error for a non-integer EIN',
      async () => {
        await (0, globals_1.expect)(
          client.organization(123456789.5),
        ).rejects.toThrow('EIN must be a 9-digit integer');
      },
    );
  });
});
//# sourceMappingURL=client.spec.js.map
