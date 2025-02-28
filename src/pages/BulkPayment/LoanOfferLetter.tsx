import React, { useState, useEffect, useRef } from "react";
import DashboardLayout from "../../components/dashboard/Index";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Image } from "../../assets";
import { useReactToPrint } from "react-to-print";

function LoanOfferLetter() {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>({});
  const [userName, setUserName] = useState<any>("");

  useEffect(() => {
    let getUserData: any = localStorage?.getItem("userDetails");
    let parseUserData = JSON.parse(getUserData);
    // console.log('user data>>', parseUserData);
    setUserData(parseUserData);
    let userName = `${parseUserData?.firstName} ${parseUserData?.lastName}`;
    setUserName(userName?.toLocaleUpperCase());
  }, []);

  const componentRef: any = useRef();
  const handlePrint = useReactToPrint({
    content: (): any => componentRef.current,
    documentTitle: "loan terms and conditions",
    copyStyles: true,
    onAfterPrint: () => console.log("Printed PDF successfully!"),
  });

  return (
    <DashboardLayout>
      <>
        <p
          onClick={() => {
            window?.history?.go(-1);
          }}
          className="cursor-pointer grid gap-[20px] text-[16px] font-sfpro-medium mt-[20px]"
        >
          ⬅ &nbsp; Loan Offer Letter
        </p>
        <br />
        <br />

        <div className="grid gap-[20px] mb-[50px]">
          <div
            style={{ marginTop: "20px" }}
            className=" md:px-[50px]"
            ref={componentRef}
          >
            {/* <p className="text-[20px] font-bold">Dear {userName},</p> 
                        <div>
                        <img src={Image.logo} width={100} />
                        </div> */}
            <div className="flex justify-between">
              <p className="text-[20px] font-bold ml-4">Dear {userName},</p>
              <img src={Image.logo} width={100} className="object-contain mr-2"/>
            </div>
            <br />

            <p className="text-[20px] font-bold flex items-center justify-center">
              LOAN AGREEMENT
            </p>
            <p className="text-[15px] font-bold text-gray-900 ml-4">BETWEEN:</p>
            <ol
              style={{ fontSize: "small" }}
              className="space-y-4 text-gray-900 list-decimal list-inside ml-4 mr-2"
            >
              {userName}: an adult and a resident of Nigeria with an account at
              Build Microfinance Bank Limited (hereinafter referred to as the
              "Borrower" which expression shall, where the context admits,
              include the Borrower's heirs, successors, assigns, and personal
              representatives) of the first part
              <p className="text-[15px] font-bold  text-gray-900">AND:</p>
              BUILD MICROFINANCE BANK LIMITED, a private company limited by
              shares and incorporated and validly existing under the laws of
              Nigeria (hereinafter referred to as “BMFB”, “Build Microfinance
              Bank Limited or the “Lender” which expression shall, where the
              context admits, include its successors in title and legal
              representatives) of the other part.
              <br />
              <br />
              The Borrower and the Lender are hereinafter referred to,
              collectively, as the “Parties” and, individually, as a “Party”.
              <p className="text-[15px] font-bold text-gray-900">WHEREAS:</p>
              A. The Borrower has requested the Lender to provide a Loan <br />
              B. The Lender has extended a loan offer to the Borrower. <br />
              C. In furtherance of the above, the Parties agreed to enter into
              this Agreement to set out the terms and conditions for the
              transaction. <br />
              <br />
              NOW, THEREFORE, the Parties hereby agree as follows:
              <p className="text-[15px] font-bold text-gray-900">
                DEFINITIONS AND INTERPRETATION
              </p>
              <li style={{ marginTop: "-1px" }}>
                <span className="font-medium">Definitions:</span> <br />
                In this Agreement (including the Recitals), unless the context
                provides otherwise, the following terms shall have the meanings
                set out opposite them:
                <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
                  <li>
                    “Account” means the bank account operated by the Borrower
                    and domiciled with a licensed bank in Nigeria, details of
                    which the Borrower shall provide to the Lender in connection
                    with this Agreement, and “Accounts” shall be construed
                    accordingly.
                  </li>
                  <li>“Agreement” means this Loan Agreement.</li>
                  <li>
                    “Loan Details” means the details of the loan that are
                    displayed on the APP page.
                  </li>
                  <li>
                    "Disbursement Date" means the date on which the Lender
                    approves the Loan to the Borrower and delivers a
                    Disbursement Request to the Borrower's BMFB account.
                  </li>
                  <li>
                    “Due Date” means such date as may be agreed to by the Lender
                    for the repayment of the principal Loan.
                  </li>
                  <li>
                    “Event of Default” means any event or circumstance specified
                    as such in Clause 8.3 of this Agreement;
                  </li>
                  <li>
                    “Interest” means a sum that is payable by the Borrower to
                    the Lender under the provisions of this Agreement, in
                    consideration of the Lender granting the Loan to the
                    Borrower.
                  </li>
                  <li>
                    “Interest Rate” means the basis for the calculation of the
                    Interest.
                  </li>
                  <li>
                    “Loan” means the principal amount of the loan granted by the
                    Lender to the Borrower on the terms, and subject to the
                    conditions, set out in this Agreement or such amount of the
                    Loan (if any) as may remain outstanding in the event of a
                    prepayment by the Borrower under this Agreement.
                  </li>
                  <li>
                    “Early Repayment” means the Borrower voluntarily repays the
                    loan earlier than the Due Date.
                  </li>
                  <li>“Nigeria” means the Federal Republic of Nigeria.</li>
                  <li>
                    “Privacy Policy” means the privacy policy provided on the
                    App, that sets out the basis on which personal data provided
                    by the Borrower to the Lender will be used by the Lender.
                  </li>
                  <li>
                    “Terms and Conditions” means the terms and conditions for
                    the use of the App and for accessing products and services
                    offered by the Lender through the App.
                  </li>
                </ul>
              </li>
              <p className="text-[15px] font-bold text-gray-900">
                Terms and Conditions
              </p>
              These Terms and Conditions ("Terms") constitute the agreement
              between Build Microfinance Bank Limited ("Build Microfinance Bank"
              or "the Lender") and the borrower ("the Borrower") for the
              provision of loans by Build Microfinance Bank to the Borrower.{" "}
              <br />
              <br />
              <span className="font-medium">Section 1: The Loan Approval</span>
              <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
                <li>
                  Following a thorough review of the Borrower's application and
                  provided information, Build Microfinance Bank approves the
                  grant of a Loan to the Borrower. The Borrower hereby accepts
                  the Loan, subject to the terms and conditions outlined in this
                  Agreement.
                </li>
                <li>
                  Disbursement of the Loan is contingent upon the Borrower
                  providing any necessary information and documents required by
                  Build Microfinance Bank for credit eligibility and
                  know-your-customer assessment. However, the grant of the Loan
                  remains at the sole discretion of Build Microfinance Bank,
                  notwithstanding the satisfaction of these conditions.
                </li>
              </ul>
              <br />
              <span className="font-medium">Section 2: Term of the Loan</span>
              <ul className="ps-5 mt-[-2] space-y-1 list-disc list-inside">
                <li>
                  The Loan shall be provided for a duration starting from the
                  Effective Date until the Due Date, as specified in this
                  Agreement. If the Loan is not disbursed by the Lender to the
                  Borrower on the date these terms and conditions were accepted
                  by the Borrower, the duration of the Loan commences from the
                  Disbursement Date.
                </li>
              </ul>
              <br />
              <span className="font-medium">
                {" "}
                Section 3: Form of Disbursement of Loan{" "}
              </span>
              <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
                <li>
                  The Merchant may prepay the loan in part or in full at any
                  time without incurring any prepayment penalties, subject to
                  the Bank's approval.
                </li>
                <li>
                  The Borrower receives the Loan directly into their registered
                  Build Microfinance Bank account, with Build Microfinance Bank
                  disbursing the Loan accordingly.
                </li>
              </ul>
              <br />
              <span className="font-medium">
                {" "}
                Section 4: Interest, Fees, and Costs{" "}
              </span>
              <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
                <li>
                  Interest on monthly loans is levied and payable by the
                  Borrower to Build Microfinance Bank at the rate of 5% per
                  month, calculated from the Effective Date to the Due Date.
                </li>
                <li>
                  For daily loans, interest is levied and payable by the
                  Borrower to Build Microfinance Bank at the rate of 3% per day,
                  calculated from the Effective Date to the Due Date.
                </li>
                <li>
                  In case of default, the Borrower shall pay default interest on
                  all outstanding amounts at the rate of 0.5% per day.
                </li>
                <li>
                  The Borrower shall bear all legal costs and expenses incurred
                  by Build Microfinance Bank in connection with any enforcement
                  action for the recovery of the Loan.
                </li>
              </ul>
              <br />
              <span className="font-medium">
                {" "}
                Section 5: Repayment Structure
              </span>
              <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
                <li>
                  The Borrower shall repay the Loan in full on the Due Date,
                  including any accrued Interest, fees, and costs.
                </li>
                <li>
                  Early Repayment does not alter the total interest amount
                  agreed upon on the Effective Date, with the Borrower required
                  to pay the total interest amount previously agreed upon in
                  full.{" "}
                </li>
              </ul>
              <br />
              <span className="font-medium"> Section 6: Payment Mechanics</span>
              <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
                <li>
                  Repayment is to be made on or before the Due Date by direct
                  deduction from the Borrower's Build Microfinance Bank account,
                  facilitated through the "Repay Loan" feature, where the
                  Borrower can initiate direct repayment.
                </li>
                <li>
                  Build Microfinance Bank is authorized to automatically deduct
                  outstanding repayment amounts and interest from the Borrower's
                  designated Repayment Account upon the due or overdue date.{" "}
                </li>
                <li>
                  Failure to effect payment on the Due Date does not relieve the
                  Borrower of the obligation to make repayment, and repayment
                  shall be made by any reasonable means.
                </li>
              </ul>
              <br />
              <span className="font-medium">
                Section 7: Representations, Warranties, and Undertakings
              </span>
              <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
                <li>
                  The Borrower represents and warrants the following: <br />
                  a. Understanding and acceptance of all provisions of this
                  Agreement. <br />
                  b. Capacity and authority to execute this Agreement and comply
                  with its obligations. <br />
                  c. Validity and enforceability of this Agreement. <br />
                  d. Compliance with all applicable laws and agreements. <br />
                  e. Accuracy of all information provided to Build Microfinance
                  Bank. <br />
                  f. No occurrence of any Event of Default.
                </li>
                <li>
                  The Borrower undertakes to: <br />
                  a. Promptly inform Build Microfinance Bank of any Event of
                  Default. <br />
                  b. Notify Build Microfinance Bank of any changes to account
                  information. <br />
                  c. Provide requested information promptly. <br />
                  d. Ensure Loan obligations rank pari passu in status. <br />
                  e. Execute additional documents as required by Build
                  Microfinance Bank. <br />
                  f. Notify Build Microfinance Bank of specified events.
                </li>
                <li>
                  All representations, warranties, and undertakings shall
                  survive for the duration of any outstanding amounts under this
                  Agreement.
                </li>
                <li>
                  Build Microfinance Bank represents that the execution of this
                  Agreement and the transactions contemplated herein have been
                  duly authorized and will not breach any law or agreement.
                </li>
                <li>
                  The Borrower shall indemnify Build Microfinance Bank against
                  any costs incurred due to default or failure to repay the
                  Loan.
                </li>
              </ul>
              <br />
              <span className="font-medium">Section 8: Events of Default</span>
              <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
                <li>
                  Build Microfinance Bank may require immediate repayment of the
                  Loan or part thereof upon the occurrence of an Event of
                  Default.{" "}
                </li>
                <li>
                  Build Microfinance Bank may cease granting loans to the
                  Borrower if an Event of Default occurs and is continuing.
                </li>
                <li>
                  Various circumstances constitute an Event of Default,
                  including failure to pay sums due, breach of obligations,
                  false representations, insolvency, legal proceedings, unlawful
                  acts, and disputes.
                </li>
                <li>
                  Build Microfinance Bank may declare the Loan immediately due
                  and payable upon the occurrence of a continuing Event of
                  Default.
                </li>
              </ul>
              <br />
              <span className="font-medium">
                Section 9: Governing Law and Dispute Resolution
              </span>
              <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
                <li>
                  This Agreement shall be governed by the laws of Nigeria, and
                  Nigerian courts shall have jurisdiction over any disputes
                  arising herein.
                </li>
              </ul>
              <br />
              <span className="font-medium">Section 10: Miscellaneous</span>
              <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
                <li>
                  Notices shall be sent through specified communication channels
                  or email addresses, with deemed receipt upon transmission
                  during business hours.
                </li>
                <li>
                  Build Microfinance Bank may amend the terms of this Agreement
                  and communicate such amendments to the Borrower in writing.{" "}
                </li>
                <li>
                  The failure to exercise rights under this Agreement shall not
                  constitute a waiver of such rights, and the Agreement shall
                  not be affected by any other agreements between the Parties.{" "}
                </li>
                <li>
                  If any provision of this Agreement is found invalid, the
                  remaining provisions shall remain in full force and effect.{" "}
                </li>
                <li>
                  This Agreement, along with accompanying documents, constitutes
                  the entire agreement between the Parties, superseding any
                  prior expressions of intent or understandings.{" "}
                </li>
                <li>
                  This Agreement shall automatically terminate upon Build
                  Microfinance Bank's determination of the Borrower fulfilling
                  all obligations herein.
                </li>
              </ul>
              <br />
            </ol>
          </div>
          By accepting these Terms, the Merchant acknowledges that they have
          read, understood, and agree to abide by all the terms and conditions
          outlined herein.
          <div className="flex items-center mb-4 cursor-pointer">
            <input
              id="default-checkbox"
              type="checkbox"
              disabled={true}
              className="hidden"
            />
            <label
              htmlFor="default-checkbox"
              className="relative flex items-center cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
            >
              <div className="absolute inset-0 bg-black rounded transition-opacity opacity-0 pointer-events-none checked:bg-black checked:opacity-100"></div>
              <div className="absolute inset-0 transition-transform transform scale-0 checked:scale-100">
                <svg
                  className="w-full h-full text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </label>
            <label
              htmlFor="default-checkbox"
              className="ms-2 text-sm font-medium text-gray-900"
            >
              Accept Terms & Condition
            </label>
          </div>
          <button
            type="button"
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-600 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={handlePrint}
          >
            📃 Download File
          </button>
        </div>
      </>
    </DashboardLayout>
  );
}

export default LoanOfferLetter;
