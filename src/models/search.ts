import { C_CODEValue, NTEEValue, STATEValue } from '../constants';

export interface ISearchRequest {
  /**
   * Search query
   */
  q?: string;
  /**
   * Zero-indexed page number
   */
  page?: number;
  /**
   * ISO 3166-2 state code
   *
   * @see {@link https://en.wikipedia.org/wiki/ISO_3166-2|ISO 3166-2}
   */
  'state[id]'?: STATEValue;
  /**
   * National Taxonomy of Exempt Entities (NTEE) ID
   *
   * @see {@link NTEE}
   */
  'ntee[id]'?: NTEEValue;
  /**
   * Tax code subsection
   */
  'c_code[id]'?: C_CODEValue;
}

export interface ISearchResponse {
  total_results: number;
  num_pages: number;
  cur_page: number;
  per_page: number;
  page_offset: number;
  search_query: string | null;
  selected_state: string | null;
  selected_ntee: string | null;
  /**
   * Selected code
   *
   * NOTE: The documentation says this should return an integer, but it actually
   *       returns a string.
   */
  selected_code: string | null;
  data_source: string;
  api_version: number;
  organizations: ISearchOrganization[];
}

interface ISearchOrganization {
  ein: number;
  /**
   * EIN version with dashes and leading zeroes
   */
  strein: string;
  name: string;
  subname?: string | null;
  city: string;
  state: string;
  ntee_code: string;
  raw_ntee_code: string;
  subseccd: number;
  has_subseccd: boolean;
  have_filings: boolean | null;
  have_extracts: boolean | null;
  have_pdfs: boolean | null;
  score: number;
}
