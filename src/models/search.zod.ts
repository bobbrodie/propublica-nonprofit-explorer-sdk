import { z } from 'zod';
import { C_CODE, NTEE, STATE } from '../constants';
import { ISearchResponse } from './search';

const SearchOrganizationSchema = z.object({
  ein: z.number(),
  strein: z.string(),
  name: z.string(),
  subname: z.string().nullable().optional(),
  city: z.string(),
  state: z.string(),
  ntee_code: z.string(),
  raw_ntee_code: z.string(),
  subseccd: z.number(),
  has_subseccd: z.boolean(),
  have_filings: z.boolean().nullable(),
  have_extracts: z.boolean().nullable(),
  have_pdfs: z.boolean().nullable(),
  score: z.number(),
});
export const SearchResponseSchema = z.object({
  total_results: z.number(),
  num_pages: z.number(),
  cur_page: z.number(),
  per_page: z.number(),
  page_offset: z.number(),
  search_query: z.string().nullable(),
  selected_state: z.string().nullable(),
  selected_ntee: z.string().nullable(),
  selected_code: z.string().nullable(),
  data_source: z.string(),
  api_version: z.number(),
  organizations: z.array(SearchOrganizationSchema),
});

export const SearchRequestSchema = z.object({
  q: z.string().optional(),
  page: z.number().optional(),
  'state[id]': z.nativeEnum(STATE).optional(),
  'ntee[id]': z.nativeEnum(NTEE).optional(),
  'c_code[id]': z.nativeEnum(C_CODE).optional(),
});

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
