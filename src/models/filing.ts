import { z } from 'zod';
import { FORMTYPE } from '../constants';

export const FilingSchema = z.object({
  /**
   * Employer Identification Number
   */
  ein: z.number().optional(),

  /**
   * Tax Period
   */
  tax_prd: z.number(),

  /**
   * Tax Period Year
   */
  tax_prd_yr: z.number(),

  /**
   * Form Type
   */
  formtype: z.enum(FORMTYPE),

  /**
   * Form Type String
   */
  formtype_str: z.string().optional(),

  /**
   * PDF URL
   */
  pdf_url: z.string().nullable(),

  /**
   * Updated
   */
  updated: z.coerce.date().optional(),

  /**
   * Subsection code
   */
  subseccd: z.number().optional(),

  // Optional based on the form type

  /**
   * Total Revenue
   */
  totrevenue: z.number().optional(),

  /**
   * Total Functional Expenses
   */
  totfuncexpns: z.number().optional(),

  /**
   * Total Assets End
   */
  totassetsend: z.number().optional(),

  /**
   * Total Liability End
   */
  totliabend: z.number().optional(),

  /**
   * Percentage of Expenses Marked Compensation
   */
  pct_compnsatncurrofcr: z.number().optional(),

  /**
   * Tax Paid
   */
  tax_pd: z.string().nullable().optional(),

  /**
   * Subsection Code
   */
  unrelbusinccd: z.string().optional(),

  /**
   * Initiation Fees
   */
  initiationfees: z.number().optional(),

  /**
   * Gross Receipts Amount
   */
  grsrcptspublicuse: z.number().optional(),

  /**
   * Gross Income from Members
   */
  grsincmembers: z.number().optional(),

  /**
   * Gross Income from Other Sources
   */
  grsincother: z.number().optional(),

  /**
   * Total Contributions
   */
  totcntrbgfts: z.number().optional(),

  /**
   * Program Service Revenue
   */
  totprgmrevnue: z.number().optional(),

  /**
   * Investment Income
   */
  invstmntinc: z.number().optional(),

  /**
   * Tax-exempt bond proceeds
   */
  txexmptbndsproceeds: z.number().optional(),

  /**
   * Royalties
   */
  royaltsinc: z.number().optional(),

  /**
   * Gross Rents - Real Estate
   */
  grsrntsreal: z.number().optional(),

  /**
   * Gross Rents - Personal Property
   */
  grsrntsprsnl: z.number().optional(),

  /**
   * Rental Expenses - Real Estate
   */
  rntlexpnsreal: z.number().optional(),

  /**
   * Rental Expenses - Personal Property
   */
  rntlexpnsprsnl: z.number().optional(),

  /**
   * Net Rent - Real Estate
   */
  rntlincreal: z.number().optional(),

  /**
   * Net Rent - Person Property
   */
  rntlincprsnl: z.number().optional(),

  /**
   * Net Rental Income
   */
  netrntlinc: z.number().optional(),

  /**
   * Net Gain from Sales - Securities
   */
  grsalesecur: z.number().optional(),

  /**
   * Net Gain from Sales - Other Assets
   */
  grsalesothr: z.number().optional(),

  /**
   * Sales Expense - Securities
   */
  cstbasisecur: z.number().optional(),

  /**
   * Sales Expense - Other Assets
   */
  cstbasisothr: z.number().optional(),

  /**
   * Net Gain from Sales - Securities
   */
  gnlsecur: z.number().optional(),

  /**
   * Net Gain from Sales - Other Assets
   */
  gnlsothr: z.number().optional(),

  /**
   * Sales of Assets
   */
  netgnls: z.number().optional(),

  /**
   * Gross Fundraising
   */
  grsincfndrsng: z.number().optional(),

  /**
   * Fundraising Expenses
   */
  lessdirfndrsng: z.number().optional(),

  /**
   * Fundraising Income
   */
  netincfndrsng: z.number().optional(),

  /**
   * Gross Income from Gaming
   */
  grsincgaming: z.number().optional(),

  /**
   * Gaming Expenses
   */
  lessdirgaming: z.number().optional(),

  /**
   * Gaming Income
   */
  netincgaming: z.number().optional(),

  /**
   * Gross Sales of Inventory
   */
  grsalesinvent: z.number().optional(),

  /**
   * Cost of Goods Sold
   */
  lesscstofgoods: z.number().optional(),

  /**
   * Income from Sales of Inventory
   */
  netincsales: z.number().optional(),

  /**
   * Other Revenue
   */
  miscrevtot11e: z.number().optional(),

  /**
   * Compensation of Officers
   */
  compnsatncurrofcr: z.number().optional(),

  /**
   * Other Salaries and Wages
   */
  othrsalwages: z.number().optional(),

  /**
   * Payroll Taxes
   */
  payrolltx: z.number().optional(),

  /**
   * Professional Fundraising Fees
   */
  profndraising: z.number().optional(),

  /**
   * Tax-exempt Bond Liabilities - EOY
   */
  txexmptbndsend: z.number().optional(),

  /**
   * Secured Mortgages and Notes Payable - EOY
   */
  secrdmrtgsend: z.number().optional(),

  /**
   * Unsecured Mortgages and Notes Payable - EOY
   */
  unsecurednotesend: z.number().optional(),

  /**
   * Paid-in or Capital Surplus - EOY
   */
  retainedearnend: z.number().optional(),

  /**
   * Total Net Assets - EOY
   */
  totnetassetend: z.number().optional(),

  /**
   * Reason for non-PF status
   */
  nonpfrea: z.string().optional(),

  /**
   * Gift Grants Membership Fees Received
   */
  gftgrntsrcvd170: z.number().optional(),

  /**
   * Tax Revenues Levied (170)
   */
  txrevnuelevied170: z.number().optional(),

  /**
   * Services or Facilities Furnished by Gov
   */
  srvcsval170: z.number().optional(),

  /**
   * Gross Income from Interest
   */
  grsinc170: z.number().optional(),

  /**
   * Gross Receipts from Related Activities
   */
  grsrcptsrelated170: z.number().optional(),

  /**
   * Gifts Grants Membership Fees Received
   */
  totgftgrntrcvd509: z.number().optional(),

  /**
   * Receipts from Admissions Merchandise
   */
  grsrcptsadmissn509: z.number().optional(),

  /**
   * Tax Revenues Levied (509)
   */
  txrevnuelevied509: z.number().optional(),

  /**
   * Services or Facilities Furnished by Gov
   */
  srvcsval509: z.number().optional(),

  /**
   * Subtotal Total Support
   */
  subtotsuppinc509: z.number().optional(),

  /**
   * Total Support
   */
  totsupp509: z.number().optional(),
});

/**
 * Filing
 */
export type IFiling = z.infer<typeof FilingSchema>;
