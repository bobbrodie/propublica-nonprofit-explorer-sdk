import { describe, expect, it } from 'vitest';
import { ZodError } from 'zod';
import {
  FilingSchema,
  OrganizationSchema,
  SearchRequestSchema,
} from '../src/models';
import mockOrganizationResponse from './json/mockOrganizationResponse.json';

describe('schemas', () => {
  describe('FilingSchema', () => {
    it('parses a valid filing fixture', () => {
      const filing = mockOrganizationResponse.filings_with_data[0];
      expect(() => FilingSchema.parse(filing)).not.toThrow();
    });

    it.each([0, 1, 2])('accepts formtype %i', (formtype) => {
      const filing = {
        ...mockOrganizationResponse.filings_with_data[0],
        formtype,
      };
      expect(() => FilingSchema.parse(filing)).not.toThrow();
    });

    it('rejects a formtype outside of 0, 1, or 2', () => {
      const filing = {
        ...mockOrganizationResponse.filings_with_data[0],
        formtype: 99,
      };
      expect(() => FilingSchema.parse(filing)).toThrow(ZodError);
    });

    it('rejects a filing missing required fields', () => {
      expect(() => FilingSchema.parse({})).toThrow(ZodError);
    });
  });

  describe('OrganizationSchema', () => {
    it('parses a valid organization fixture', () => {
      expect(() =>
        OrganizationSchema.parse(mockOrganizationResponse.organization),
      ).not.toThrow();
    });

    it('rejects an organization with the wrong field type', () => {
      const organization = {
        ...mockOrganizationResponse.organization,
        ein: 'not-a-number',
      };
      expect(() => OrganizationSchema.parse(organization)).toThrow(ZodError);
    });

    it('rejects an organization missing required fields', () => {
      expect(() => OrganizationSchema.parse({})).toThrow(ZodError);
    });
  });

  describe('SearchRequestSchema', () => {
    it('parses a valid search request', () => {
      expect(() =>
        SearchRequestSchema.parse({ q: 'propublica', page: 0 }),
      ).not.toThrow();
    });

    it('accepts a valid state[id]', () => {
      expect(() =>
        SearchRequestSchema.parse({ 'state[id]': 'NY' }),
      ).not.toThrow();
    });

    it('rejects an invalid state[id]', () => {
      expect(() => SearchRequestSchema.parse({ 'state[id]': 'ZZ' })).toThrow(
        ZodError,
      );
    });

    it('rejects an invalid ntee[id]', () => {
      expect(() => SearchRequestSchema.parse({ 'ntee[id]': 99 })).toThrow(
        ZodError,
      );
    });

    it('rejects an invalid c_code[id]', () => {
      expect(() => SearchRequestSchema.parse({ 'c_code[id]': 1 })).toThrow(
        ZodError,
      );
    });
  });
});
