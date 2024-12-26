import { FORMTYPEValue } from '../constants';

/**
 * Filing
 */
export interface IFiling {
  /**
   * Employer Identification Number
   */
  ein?: number;

  /**
   * Tax Period
   */
  tax_prd: number;

  /**
   * Tax Period Year
   */
  tax_prd_yr: number;

  /**
   * Form Type
   *
   */
  formtype: FORMTYPEValue;

  /**
   * Form Type String
   *
   */
  formtype_str?: string;

  /**
   * PDF URL
   */
  pdf_url: string | null;

  /**
   * Updated
   */
  updated?: Date;

  /**
   * Subsection code
   */
  subseccd?: number;

  // Optional based on the form type

  /**
   * Total Revenue
   */
  totrevenue?: number;

  /**
   * Total Functional Expenses
   */
  totfuncexpns?: number;

  /**
   * Total Assets End
   */
  totassetsend?: number;

  /**
   * Total Liability End
   */
  totliabend?: number;

  /**
   * Percentage of Expenses Marked Compensation
   */
  pct_compnsatncurrofcr?: number;

  /**
   * Tax Paid
   */
  tax_pd?: string | null;

  /**
   * Subsection Code
   */
  unrelbusinccd?: string;

  /**
   * Initiation Fees
   */
  initiationfees?: number;

  /**
   * Gross Receipts Amount
   */
  grsrcptspublicuse?: number;

  /**
   * Gross Income from Members
   */
  grsincmembers?: number;

  /**
   * Gross Income from Other Sources
   */
  grsincother?: number;

  /**
   * Total Contributions
   */
  totcntrbgfts?: number;

  /**
   * Program Service Revenue
   */
  totprgmrevnue?: number;

  /**
   * Investment Income
   */
  invstmntinc?: number;

  /**
   * Tax-exempt bond proceeds
   */
  txexmptbndsproceeds?: number;

  /**
   * Royalties
   */
  royaltsinc?: number;

  /**
   * Gross Rents - Real Estate
   */
  grsrntsreal?: number;

  /**
   * Gross Rents - Personal Property
   */
  grsrntsprsnl?: number;

  /**
   * Rental Expenses - Real Estate
   */
  rntlexpnsreal?: number;

  /**
   * Rental Expenses - Personal Property
   */
  rntlexpnsprsnl?: number;

  /**
   * Net Rent - Real Estate
   */
  rntlincreal?: number;

  /**
   * Net Rent - Person Property
   */
  rntlincprsnl?: number;

  /**
   * Net Rental Income
   */
  netrntlinc?: number;

  /**
   * Net Gain from Sales - Securities
   */
  grsalesecur?: number;

  /**
   * Net Gain from Sales - Other Assets
   */
  grsalesothr?: number;

  /**
   * Sales Expense - Securities
   */
  cstbasisecur?: number;

  /**
   * Sales Expense - Other Assets
   */
  cstbasisothr?: number;

  /**
   * Net Gain from Sales - Securities
   */
  gnlsecur?: number;

  /**
   * Net Gain from Sales - Other Assets
   */
  gnlsothr?: number;

  /**
   * Sales of Assets
   */
  netgnls?: number;

  /**
   * Gross Fundraising
   */
  grsincfndrsng?: number;

  /**
   * Fundraising Expenses
   */
  lessdirfndrsng?: number;

  /**
   * Fundraising Income
   */
  netincfndrsng?: number;

  /**
   * Gross Income from Gaming
   */
  grsincgaming?: number;

  /**
   * Gaming Expenses
   */
  lessdirgaming?: number;

  /**
   * Gaming Income
   */
  netincgaming?: number;

  /**
   * Gross Sales of Inventory
   */
  grsalesinvent?: number;

  /**
   * Cost of Goods Sold
   */
  lesscstofgoods?: number;

  /**
   * Income from Sales of Inventory
   */
  netincsales?: number;

  /**
   * Other Revenue
   */
  miscrevtot11e?: number;

  /**
   * Compensation of Officers
   */
  compnsatncurrofcr?: number;

  /**
   * Other Salaries and Wages
   */
  othrsalwages?: number;

  /**
   * Payroll Taxes
   */
  payrolltx?: number;

  /**
   * Professional Fundraising Fees
   */
  profndraising?: number;

  /**
   * Tax-exempt Bond Liabilities - EOY
   */
  txexmptbndsend?: number;

  /**
   * Secured Mortgages and Notes Payable - EOY
   */
  secrdmrtgsend?: number;

  /**
   * Unsecured Mortgages and Notes Payable - EOY
   */
  unsecurednotesend?: number;

  /**
   * Paid-in or Capital Surplus - EOY
   */
  retainedearnend?: number;

  /**
   * Total Net Assets - EOY
   */
  totnetassetend?: number;

  /**
   * Reason for non-PF status
   */
  nonpfrea?: string;

  /**
   * Gift Grants Membership Fees Received
   */
  gftgrntsrcvd170?: number;

  /**
   * Tax Revenues Levied (170)
   */
  txrevnuelevied170?: number;

  /**
   * Services or Facilities Furnished by Gov
   */
  srvcsval170?: number;

  /**
   * Gross Income from Interest
   */
  grsinc170?: number;

  /**
   * Gross Receipts from Related Activities
   */
  grsrcptsrelated170?: number;

  /**
   * Gifts Grants Membership Fees Received
   */
  totgftgrntrcvd509?: number;

  /**
   * Receipts from Admissions Merchandise
   */
  grsrcptsadmissn509?: number;

  /**
   * Tax Revenues Levied (509)
   */
  txrevnuelevied509?: number;

  /**
   * Services or Facilities Furnished by Gov
   */
  srvcsval509?: number;

  /**
   * Subtotal Total Support
   */
  subtotsuppinc509?: number;

  /**
   * Total Support
   */
  totsupp509?: number;
}
