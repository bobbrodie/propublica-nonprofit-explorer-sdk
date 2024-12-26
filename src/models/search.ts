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
  /**
   * Total number of results
   */
  total_results: number;

  /**
   * Total number of pages (one-indexed)
   */
  num_pages: number;

  /**
   * Current page (zero-indexed)
   */
  cur_page: number;

  /**
   * Results per page
   */
  per_page: number;

  /**
   * Page offset
   */
  page_offset: number;

  /**
   * Search query
   */
  search_query: string | null;

  /**
   * Selected state (code)
   */
  selected_state: string | null;

  /**
   * Selected NTEE ID (value)
   */
  selected_ntee: string | null;

  /**
   * Selected tax code subsection
   *
   * NOTE: The documentation says this should return an integer, but it actually
   *       returns a string.
   */
  selected_code: string | null;

  /**
   * Data source
   */
  data_source: string;

  /**
   * API version
   */
  api_version: number;

  /**
   * Organizations
   */
  organizations: ISearchOrganization[];
}

interface ISearchOrganization {
  /**
   * Employee Identification Number
   */
  ein: number;

  /**
   * EIN version with dashes and leading zeroes
   */
  strein: string;

  /**
   * Organization name
   */
  name: string;

  /**
   * Organization subname
   */
  sub_name: string | null;

  /**
   * Organization city
   */
  city: string;

  /**
   * Organization state code
   */
  state: string;

  /**
   * Organization NTEE code (value)
   */
  ntee_code: string | null;

  /**
   * Organization raw NTEE code
   */
  raw_ntee_code: string | null;

  /**
   * Organization tax code subsection (value)
   */
  subseccd: number;

  /**
   * Whether the organization has a tax code subsection
   */
  has_subseccd: boolean;

  /**
   * Whether the organization has filings
   */
  have_filings: boolean | null;

  /**
   * Whether the organization has extracts
   */
  have_extracts: boolean | null;

  /**
   * Whether the organization has PDFs
   */
  have_pdfs: boolean | null;

  /**
   * Score
   *
   * Note: This is not defined in the API documentation
   */
  score: number;
}
