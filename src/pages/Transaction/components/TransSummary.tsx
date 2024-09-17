import Overlay from "../../../components/reusables/Overlay/Overlay";
import CurrencyFormat from "react-currency-format";
import dayjs from 'dayjs';
import { transactionDetails } from "../../../containers/transactionApis";
import { useEffect, useState } from "react";
import { ErrorCard } from "../../../Utils/HttpResponseHandlers/error";

const TransSummary = ({ toggleDropdown, data, isOpen, state, setState }: any) => {
 // console.log("data>>>", data);
  const { errorMssg, submittingError } = state
  const [datas, setDatas] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false);
  const {
    amount,
    date,
    status,
    name,
    transactionId,
    tranFee,
    transactionType,
    amountImpact,
    action
  } = data;

  function transDetails() {
    setIsLoading(true)
    transactionDetails(transactionId).then((res) => {
      // console.log("loan debit res>>", res);
      setDatas(res)
      setState({ ...state, submittingError: false })
    }).catch((err) => {
      if (err && err?.response?.data) {
        setState({
          ...state,
          submittingError: true,
          isSubmitting: false,
          errorMssg: err?.response?.data?.errorMssg || err?.response?.errorMssg || err?.response?.data?.respDescription || err?.response?.respDescription || "Action failed, please try again"
        })
      }
    }).then(() => {
      setIsLoading(false)
    })
  }
  const { sessionId, narration, BeneficiaryName, BeneficiaryAccountNumber, senderAccountNumber, senderBank
    , retryCount, beneficiaryBankCode }: any = datas
  useEffect(() => {
    if (typeof transactionId === 'string') transDetails()
  }, [transactionId])


  const DisbursementArray = [
    { name: "Branch Name", val: name },
    {
      name: "Session ID", val: sessionId?.length > 20 ? (
        <>
          {sessionId.slice(0, 20)}
          <br className="md:hidden" />
          {sessionId.slice(20)}
        </>
      ) : (
        sessionId
      ) || 'N/A'
    },
    { name: "Payment Date", val: dayjs(date).format('DD MMMM YYYY, hh:mm A') },
    { name: "Payment Channel", val: transactionType || 'N/A' },
    // { name: "Sender Account Number", val: datas?.senderAccountNumber || senderAccountNumber || 'N/A' },
    // { name: "Sender Bank", val: datas?.senderBank || senderBank || 'N/A' },
    { name: "Beneficiary Account Number", val: datas?.beneficiaryAccountNumber || BeneficiaryAccountNumber || 'N/A' },
    { name: "Beneficiary Name", val: datas?.beneficiaryName || BeneficiaryName || 'N/A' },
    // { name: "Beneficiary Bank NIP Code", val: datas?.beneficiaryBankNipCode || "N/A" },
    { name: "Beneficiary Bank", val: datas?.beneficiaryBankCode || beneficiaryBankCode || 'N/A' }, //Changed Beneficiary Bank Code to Beneficiary Bank
    { name: "Narration", val: datas?.narration || narration || 'N/A' },
    { name: "Action", val: action || 'N/A' },
    { name: "Retry Count", val: datas?.retryCount || retryCount || 'N/A' },
    {
      name: "Amount Settled ", val: (
        <CurrencyFormat
          value={amountImpact || 0}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₦"}
        />
      )
    },
    {
      name: "Transaction Fee",
      val: (
        <CurrencyFormat
          value={tranFee || 0}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₦"}
        />
      ),
    },
    // { name: "Balance After Transaction", val: "Balance After Transaction" },
  ];

  const TransferArray = [
    { name: "Branch Name", val: name },
    {
      name: "Session ID", val: sessionId?.length > 20 ? (
        <>
          {sessionId.slice(0, 20)}
          <br className="md:hidden" />
          {sessionId.slice(20)}
        </>
      ) : (
        sessionId
      ) || 'N/A'
    },
    { name: "Receiving Date", val: dayjs(datas?.receivingDate).format('DD MMMM YYYY, hh:mm A') },
    { name: "Payment Channel", val: data?.transactionType || 'N/A' },
    // { name: "Institution Name", val: datas?.institutionName || "N/A" },
    // { name: "Sender Account Number", val: datas?.senderAccountNumber || senderAccountNumber || 'N/A' },
    // { name: "Sender Bank", val: datas?.senderBank || senderBank || 'N/A' },
    { name: "Receiver Account Number", val: datas?.receiverAccountNumber || 'N/A' },
    { name: "Reveiver Account Name", val: datas?.receiverAccountName || 'N/A' },
    { name: "Payer Account Number", val: datas?.payerAccountNumber || "N/A" },
    { name: "Payer Name", val: datas?.payerName || 'N/A' },
    { name: "Payer Bank Code", val: datas?.payerBankCode || 'N/A' },
    { name: "Payer Bank Name", val: datas?.payerBankName || 'N/A' },
    { name: "Retry Count", val: datas?.retryCount || retryCount || 'N/A' },
    {
      name: "Amount ", val: (
        <CurrencyFormat
          value={Number(datas?.amount) || 0}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₦"}
        />
      )
    },
    // { name: "Balance After Transaction", val: "Balance After Transaction" },
  ];

  const PurchaseArray = [
    { name: "Branch Name", val: name },
    // {
    //   name: "Session ID", val: sessionId?.length > 20 ? (
    //     <>
    //       {sessionId.slice(0, 20)}
    //       <br className="md:hidden" />
    //       {sessionId.slice(20)}
    //     </>
    //   ) : (
    //     sessionId
    //   ) || 'N/A'
    // },
    { name: "Transaction Date", val: dayjs(datas?.transactionDate).format('DD MMMM YYYY, hh:mm A') },
    { name: "RRN", val: datas?.rrn || 'N/A' },
    { name: "Merchant Location", val: datas?.merchantLocation || "N/A" },
    { name: "PAN", val: datas?.pan || 'N/A' },
    { name: "Issuer Bank", val: datas?.issuerBank || 'N/A' },
    { name: "Terminal ID", val: datas?.terminalId || 'N/A' },
    { name: "STAN", val: datas?.stan || 'N/A' },
    { name: "Card Country", val: datas?.cardCountry || "N/A" },
    // {
    //   name: "Amount ", val: (
    //     <CurrencyFormat
    //       value={Number(datas?.amount) || 0}
    //       displayType={"text"}
    //       thousandSeparator={true}
    //       prefix={"₦"}
    //     />
    //   )
    // },
    // { name: "Balance After Transaction", val: "Balance After Transaction" },
  ];

  const VASArray = [
    { name: "Branch Name", val: name },
    {
      name: "Session ID", val: sessionId?.length > 20 ? (
        <>
          {sessionId.slice(0, 20)}
          <br className="md:hidden" />
          {sessionId.slice(20)}
        </>
      ) : (
        sessionId
      ) || 'N/A'
    },
    { name: "Receiving Date", val: dayjs(datas?.data).format('DD MMMM YYYY, hh:mm A') },
    { name: "VAS Type", val: datas?.vasType || 'N/A' },
    { name: "Merchant ID", val: datas?.merchantId || "N/A" },
    { name: "VAS Bundle", val: datas?.vasBundle || 'N/A' },
    { name: "Resource ID", val: datas?.resourceId || 'N/A' },
    { name: "Transaction ID", val: datas?.transactionId || datas?.tranId || 'N/A' },
    { name: "Customer ID", val: datas?.customerId || 'N/A' },
    {
      name: "Amount ", val: (
        <CurrencyFormat
          value={Number(datas?.amount) || 0}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₦"}
        />
      )
    },
    // { name: "Balance After Transaction", val: "Balance After Transaction" },
  ];

  const LoanDebitArray = [
    { name: "Transaction Type", val: "LOAN DEBIT" },
    // {
    //   name: "Session ID", val: datas?.sessionId?.length > 20 ? (
    //     <>
    //       {sessionId.slice(0, 20)}
    //       <br className="md:hidden" />
    //       {sessionId.slice(20)}
    //     </>
    //   ) : (
    //     sessionId
    //   ) || 'N/A'
    // },
    // { name: "Date", val: dayjs(datas?.date).format('DD MMMM YYYY, hh:mm A') },
    // { name: "Beneficiary Account Number", val: datas?.beneficiaryAccountNumber || 'N/A' },
    // { name: "Beneficiary Bank Code", val: datas?.beneficiaryBankCode || "N/A" },
    // { name: "Beneficiary Bank NIP Code", val: datas?.beneficiaryBankNipCode || 'N/A' },
    { name: "Beneficiary Name", val: datas?.beneficiaryName || 'N/A' },
    { name: "Date of Loan Debit", val: data?.date || 'N/A' },
    // { name: "Transaction ID", val: datas?.transactionId || datas?.tranId || 'N/A' },
    // { name: "Naration", val: datas?.narration || 'N/A' },
    // { name: "Retry Count", val: datas?.retryCount || 'N/A' },
    // { name: "Sender Account Number", val: datas?.senderAccountNumber || 'N/A' },
    // { name: "Sender Bank", val: datas?.senderBank || 'N/A' },
    // { name: "Sender Bank Code", val: datas?.senderBankCode || 'N/A' },
    { name: "API Reference ID", val: datas?.apiReferenceId || 'N/A' },
    // { name: "APP Reference", val: datas?.appReference || 'N/A' },
    // { name: "Naration", val: datas?.narration || 'N/A' },
    // {
    //   name: "Amount ", val: (
    //     <CurrencyFormat
    //       value={Number(datas?.amount) || 0}
    //       displayType={"text"}
    //       thousandSeparator={true}
    //       prefix={"₦"}
    //     />
    //   )
    // },
    // {
    //   name: "Amount Impact", val: (
    //     <CurrencyFormat
    //       value={Number(datas?.amountImpact) || 0}
    //       displayType={"text"}
    //       thousandSeparator={true}
    //       prefix={"₦"}
    //     />
    //   )
    // },

    // { name: "Balance After Transaction", val: "Balance After Transaction" },
  ];


  const scrollbarStyle: any = {
    WebkitScrollbar: {
      width: '12px',
    },
    WebkitScrollbarThumb: {
      backgroundColor: '#4a5568',
      borderRadius: '6px',
      border: '3px solid transparent',
      backgroundClip: 'content-box',
    },
  };

  // Add hover and active styles if needed
  scrollbarStyle.WebkitScrollbarThumbHover = {
    ...scrollbarStyle.WebkitScrollbarThumb,
    backgroundColor: '#434190',
  };

  scrollbarStyle.WebkitScrollbarThumbActive = {
    ...scrollbarStyle.WebkitScrollbarThumb,
    backgroundColor: '#787878',
  };


  return (
    <Overlay toggleDropdown={toggleDropdown} isOpen={isOpen} isLoading={isLoading}>
      <div className="grid md:flex w-fit justify-between md:min-w-[608px]">
        <div className="grid gap-2">
          <p className="text-[32px] font-semibold">
            <CurrencyFormat
              value={amount || 0}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₦"}
            />
          </p>
          <div className="grid overflow-y-auto">
            <p className="text-[14px] text-[#656C75] flex flex-wrap break-words">
              Transaction ID : {transactionId}
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className={`p-1 h-fit rounded-full ${status === 'FAILED' ? 'bg-red-500' : 'bg-[#009236]'}`}></div>
          <p className="text-[16px]">{status}</p>
        </div>
      </div>

      <div className="mt-5 h-[400px] md:h-fit !scrollbar-track overflow-x-auto !scrollbar-thumb-gray-300 !scrollbar-thumb-rounded-full !scrollbar-track-rounded-full">
        {
          data?.transactionType === "DISBURSEMENT" ?
            <div style={scrollbarStyle} className='grid md:grid-cols-2 gap-[20px]md:gap-0'>
              {DisbursementArray.map((value, index) => (
                <>

                  <div key={index} className={`${index % 2 === 0 ? 'md:border-r-[1px] md:pr-[20px]' : 'md:pl-[20px]'} py-[20px]  border-b-[1px] border-[#E7E9F1] flex justify-between gap-[30px] text-[14px] `}>
                    <p className="break-words">{value.name}</p>
                    <p className="break-words text-right font-semibold ">{value?.val || 'N/A'}</p>
                  </div>

                </>
              ))}
            </div>
            :
            data?.transactionType === "TRANSFER" ?
              <div style={scrollbarStyle} className='grid md:grid-cols-2 gap-[20px] md:gap-0'>
                {TransferArray.map((value, index) => (
                  <div key={index} className={`${index % 2 === 0 ? 'md:border-r-[1px] md:pr-[20px]' : 'md:pl-[20px]'} py-[20px]  border-b-[1px] border-[#E7E9F1] flex justify-between gap-[30px] text-[14px] `}>
                    <p className="break-words">{value.name}</p>
                    <p className="break-words text-right font-semibold ">{value.val}</p>
                  </div>
                ))}
              </div>
              :
              data?.transactionType === "PURCHASE" ?
                <div style={scrollbarStyle} className='grid md:grid-cols-2 gap-[20px] md:gap-0' >
                  {PurchaseArray.map((value, index) => (
                    <div key={index} className={`${index % 2 === 0 ? 'md:border-r-[1px] md:pr-[20px]' : 'md:pl-[20px]'} py-[20px]  border-b-[1px] border-[#E7E9F1] flex justify-between gap-[30px] text-[14px] `}>
                      <p className="break-words">{value.name}</p>
                      <p className="break-words text-right font-semibold ">{value.val || "N/A"}</p>
                    </div>
                  ))}
                </div>
                :
                data?.transactionType === "VALUE_ADDED_SERVICE" ?
                  <div style={scrollbarStyle} className='grid md:grid-cols-2 gap-[20px] md:gap-0' >
                    {VASArray.map((value, index) => (
                      <div key={index} className={`${index % 2 === 0 ? 'md:border-r-[1px] md:pr-[20px]' : 'md:pl-[20px]'} py-[20px]  border-b-[1px] border-[#E7E9F1] flex justify-between gap-[30px] text-[14px] `}>
                        <p className="break-words">{value.name}</p>
                        <p className="break-words text-right font-semibold ">{value.val}</p>
                      </div>
                    ))}
                  </div>
                  :
                  data?.transactionType === "LOANDEBIT" ?
                    <div style={scrollbarStyle} className='grid md:grid-cols-2 gap-[20px] md:gap-0' >
                      {LoanDebitArray.map((value, index) => (
                        <div key={index} className={`${index % 2 === 0 ? 'md:border-r-[1px] md:pr-[20px]' : 'md:pl-[20px]'} py-[20px]  border-b-[1px] border-[#E7E9F1] flex justify-between gap-[30px] text-[14px] `}>
                          {
                            value?.name === "Date of Loan Debit" ?
                              <>
                                <p className="break-words">{value.name}</p>
                                <p className="break-words text-right font-semibold ">
                                  {
                                    value?.val === null ? "N/A"
                                      :
                                      <>
                                        {dayjs(value.val).format("DD MMMM YYYY, hh:mm A")}
                                      </>
                                  }
                                </p>
                              </>
                              :
                              <>
                                <p className="break-words">{value.name}</p>
                                <p className="break-words text-right font-semibold ">{value.val || "N/A"}</p>
                              </>
                          }
                        </div>
                      ))}
                    </div>
                    :
                    <></>
        }

      </div>
      <ErrorCard handleClear={() => setState({ ...state, submittingError: false })} error={errorMssg === 'Transaction Not Found' ? 'Transaction Failure' : errorMssg} containerVariant={!submittingError ? "hidden" : ""} />
    </Overlay>

  );
};

export default TransSummary;
