import { z } from 'zod';
import { C_CODE, NTEE, STATE } from '../constants';

export const SearchRequestSchema = z.object({
  /**
   * Search query
   */
  q: z.string().optional(),

  /**
   * Zero-indexed page number
   */
  page: z.number().optional(),

  /**
   * ISO 3166-2 state code
   *
   * @see {@link https://en.wikipedia.org/wiki/ISO_3166-2|ISO 3166-2}
   */
  'state[id]': z.enum(STATE).optional(),

  /**
   * National Taxonomy of Exempt Entities (NTEE) ID
   *
   * @see {@link NTEE}
   */
  'ntee[id]': z.enum(NTEE).optional(),

  /**
   * Tax code subsection
   */
  'c_code[id]': z.enum(C_CODE).optional(),
});

/**
 * Search request parameters
 */
export type ISearchRequest = z.infer<typeof SearchRequestSchema>;

const SearchOrganizationSchema = z.object({
  /**
   * Employee Identification Number
   */
  ein: z.number(),

  /**
   * EIN version with dashes and leading zeroes
   */
  strein: z.string(),

  /**
   * Organization name
   */
  name: z.string(),

  /**
   * Organization subname
   */
  sub_name: z.string().nullable(),

  /**
   * Organization city
   */
  city: z.string(),

  /**
   * Organization state code
   */
  state: z.string(),

  /**
   * Organization NTEE code (value)
   */
  ntee_code: z.string().nullable(),

  /**
   * Organization raw NTEE code
   */
  raw_ntee_code: z.string().nullable(),

  /**
   * Organization tax code subsection (value)
   */
  subseccd: z.number(),

  /**
   * Whether the organization has a tax code subsection
   */
  has_subseccd: z.boolean(),

  /**
   * Whether the organization has filings
   */
  have_filings: z.boolean().nullable(),

  /**
   * Whether the organization has extracts
   */
  have_extracts: z.boolean().nullable(),

  /**
   * Whether the organization has PDFs
   */
  have_pdfs: z.boolean().nullable(),

  /**
   * Score
   *
   * Note: This is not defined in the API documentation
   */
  score: z.number(),
});

export const SearchResponseSchema = z.object({
  /**
   * Total number of results
   */
  total_results: z.number(),

  /**
   * Total number of pages (one-indexed)
   */
  num_pages: z.number(),

  /**
   * Current page (zero-indexed)
   */
  cur_page: z.number(),

  /**
   * Results per page
   */
  per_page: z.number(),

  /**
   * Page offset
   */
  page_offset: z.number(),

  /**
   * Search query
   */
  search_query: z.string().nullable(),

  /**
   * Selected state (code)
   */
  selected_state: z.string().nullable(),

  /**
   * Selected NTEE ID (value)
   */
  selected_ntee: z.string().nullable(),

  /**
   * Selected tax code subsection
   *
   * The documentation says this should return an integer, but it actually
   * returns a string.
   */
  selected_code: z.string().nullable(),

  /**
   * Data source
   */
  data_source: z.string(),

  /**
   * API version
   */
  api_version: z.number(),

  /**
   * Organizations
   */
  organizations: z.array(SearchOrganizationSchema),
});

/**
 * Search response object
 */
export type ISearchResponse = z.infer<typeof SearchResponseSchema>;

export function validateSearchResponse(
  response: ISearchResponse,
): ISearchResponse {
  return SearchResponseSchema.parse(response);
}

export function validateSearchRequest(
  request: unknown,
): z.infer<typeof SearchRequestSchema> {
  return SearchRequestSchema.parse(request);
}
