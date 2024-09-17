import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../components/dashboard/Index';
import { Button } from '../../components/reusables/DefaultButton';
import { repaymentSchedule } from './Mocks';
import { useLocation } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import { Image } from "../../assets";
import TermsAndConditions from './TermsAndConditions';
import Modal from '../../Utils/Modal';
import { useNavigate } from 'react-router-dom';
import { SpinnerIcon } from '../../components/reusables/icons';
import { setShowPopUp } from '../../Utils/Emmiters/RxjsServices';
import { acceptLoan, fetchLoanBalance, fetchRepaymentList, getLoanProperty, repayAllLoans, repayLoan } from '../../containers/loanApis';



function LoanSummary() {

    const [errMsg, setErrMsg] = useState<any>("");
    const [showErrMsg, setShowErrMsg] = useState<any>(false);
    const [successMsg, setSuccessMsg] = useState<any>("Loan Operation Succesful!");
    const [showSuccessMsg, setShowSuccessMsg] = useState<any>(false);
    const [dontShowSpinner, setDontShowSpinner] = useState<any>(false);
    const [dontShowSpinner2, setDontShowSpinner2] = useState<any>(false);
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();
    //  console.log('state>>>', state);
    const [repaymentList, setRepayentList] = useState<any>([]);
    const [showTermsAndConditions, setShowTermsAndConditions] = useState<any>(false);
    const [terminalModal, setTerminalModal] = useState(false);
    const [stage, setStage] = useState(0);
    const [earliestUnpaid, setEarliestUnpaid] = useState<any>({});
    const [showPayAll, setShowPayAll] = useState<any>(false);
    const [outstandingBalances, setOutstandingBalances] = useState<any>(0);
    const [alertModal, setAlertModal] = useState<any>(false);
    const [alertStage, setAlertStage] = useState<any>(0);
    const [modalMessage, setModalMessage] = useState<any>("");
    const [showOutstandingBalance, setShowOutstandingBalance] = useState<any>(false);
    const [showFullyRepaid, setShowFullyRepaid] = useState<any>(false);
    const [showLoanActive, setShowLoanActive] = useState<any>(false);
    const [annualPaymentRate, setAnnualPaymentRate] = useState<any>(0);
    const [loading, setLoading] = useState<any>(false);
    const [showLoader, setShowLoader] = useState<any>(true);

    const handleSubmit = (id: any) => {
        setLoading(true);
        setShowPopUp(false);
        toggleModal();
        setDontShowSpinner(true);
        setShowTermsAndConditions(true);
        repayLoan(id).then((response: any) => {
            setLoading(false);
            setModalMessage(`${response?.respDescription}!`);
            setShowErrMsg(null)
            setShowSuccessMsg(true);
            setTimeout(() => {
                setShowSuccessMsg(false);
                setSuccessMsg(`${response?.respDescription}`);
                //   window.location.reload();
            }, 3000)
            // setSuccessMsg(`${""}`);
        }).catch((err: any) => {
            console.error("API error>>", err?.response?.data?.respBody);
            setModalMessage(`${err?.response?.data?.respBody}`);
            setLoading(false);
            setShowSuccessMsg(null);
            setShowErrMsg(true)
            setTimeout(() => setShowErrMsg(false), 3000);
            setErrMsg(`${err?.response?.data?.respBody}`);
        }).finally(() => setDontShowSpinner(true));
    }

    const closeAlert = () => {
        setShowErrMsg(false);
    }

    const closeSuccesAlert = () => {
        setShowSuccessMsg(false);
    }


    const handleAcceptLoan = () => {
        toggleTerminalRequestModal();
        acceptLoan(state?.id).then((response: any) => {
            //   console.log("response>>>", response?.respDescription);
            setShowErrMsg(null)
            setShowSuccessMsg(true);
            setTimeout(() => {
                setShowSuccessMsg(false);
                window.location.reload();
            }, 3000)
            setSuccessMsg(`${response?.respDescription}`);
        }).catch((err: any) => {
            console.error("API error>>", err?.response?.data?.respDescription);
            if (err?.response?.status === 500) {
                setShowErrMsg(null)
                setShowSuccessMsg(true);
                setSuccessMsg("Loan Offer Accepted Successfully!");
                setTimeout(() => {
                    setShowSuccessMsg(false);
                    // window.location.reload()
                }, 3000)
            } else {
                setShowSuccessMsg(null);
                setShowErrMsg(true)
                setTimeout(() => setShowErrMsg(false), 3000)
                setErrMsg(`${err?.response?.data?.respDescription}`)
            }

        })
    }

    useEffect(() => {
        getLoanProperty().then((res: any) => {
            setAnnualPaymentRate(res);
        }).catch((err: any) => {
            console.error("Get loan property error>>", err);
        })
    }, [annualPaymentRate])

    useEffect(() => {
        fetchLoanBalance(state?.id).then((response: any) => {
            // console.log('zzz>>', response?.respBody);
            if (Object.keys(response)[2] === 'respBody') {
                setOutstandingBalances(response?.respBody);
            } else {
                setOutstandingBalances(response);
            }
        }).catch((err: any) => {
            console.error('err from loan balance>>', err);
        })
    }, [outstandingBalances]);

    useEffect(() => {
        // console.log("state>>>", state);
        fetchRepaymentList(state?.id).then((res: any) => {
            setRepayentList(res);
            const findLatestUnpaid = res?.find((item: any) => item.repaymentStatus === "UNPAID");
            setEarliestUnpaid(findLatestUnpaid);
            if (res?.length === 0) {
                setShowLoader(true);
                setShowOutstandingBalance(false);
            } else {
                setShowOutstandingBalance(true);
                setShowLoader(false);
            }

            if (state?.loanStatus === "OFFER_READY") setShowLoader(false);


            const loopThroughRepayments = res?.forEach((item: any) => {
                if (item?.repaymentStatus?.includes("UNPAID")) {
                    setShowPayAll(true);
                } else if (item?.repaymentStatus?.includes("UNPAID" && "PAID")) {
                    setShowLoanActive(true);
                }
            })

            if (findLatestUnpaid === undefined && res?.length !== 0) {
                //congratulations for repaying all loans
                setSuccessMsg('All loans have been repaid successfully!');
                setShowSuccessMsg(true);
                setShowFullyRepaid(true);
            }
        }).catch((err: any) => {
            console.error("error>>", err);
        })
    }, [])

    async function toggleTerminalRequestModal() {
        await setTerminalModal(!terminalModal);
        setStage(0);
    }

    async function toggleModal() {
        await setAlertModal(!alertModal);
        setAlertStage(0);
    }

    //repayAllLoans

    const repayAllLoan = () => {
        repayAllLoans(state?.id).then((response: any) => {
            setShowErrMsg(null)
            setShowSuccessMsg(true);
            setTimeout(() => {
                setShowSuccessMsg(false);
                window.location.reload();
            }, 3000)
            setSuccessMsg(`${response === undefined ? 'Loan repayed succesfully!' : response}`);
        }).catch((err: any) => {
            console.error("API error PPP>>", err?.response?.data?.respDescription);
            if (outstandingBalances === 0) {
                setShowSuccessMsg(null);
                setShowErrMsg(true)
                setTimeout(() => setShowErrMsg(false), 3000)
                setErrMsg(`${'Insufficient outstanding balance!'}`);
            } else {
                setShowSuccessMsg(null);
                setShowErrMsg(true)
                setTimeout(() => setShowErrMsg(false), 3000)
                setErrMsg(`${err?.response?.data?.respDescription}`);
            }

        })


    }

    return (
        <DashboardLayout>
            <>
                <p onClick={() => {
                    showFullyRepaid === true ? navigate("/loans") : state?.loanStatus === "LOAN_ACTIVE" ? navigate("/loans") : showLoanActive === true ? navigate("/loans") : window?.history?.go(-1);


                }} className="cursor-pointer grid gap-[20px] text-[16px] font-sfpro-medium mt-[20px]">
                    ⬅ &nbsp; Loan Summary
                </p>
                <br /><br />
                {/* Visible only on large screens */}
                <div className="bg-white md:p-8 md:border border-gray-300 md:rounded-lg md:shadow-lg md:w-1/2 mb-[40px]">
                    <div className="grid grid-rows-6 grid-cols-1 gap-4 gap-y-0">
                        {/* <div className="p-4" style={{ marginLeft: '-15px' }}>
                            〱 <span className=' font-bold'>go back</span>
                        </div> */}

                        <div className="flex justify-between p-4" style={{ marginLeft: '-10px' }}>
                            <p className=' text-sm text-gray-400'>Loan Summary</p>
                            <p className='font-medium text-sm'>
                                <div className="flex md:justify-end">
                                    <div className="flex gap-2 items-center">
                                        <div
                                            className={`p-1 h-fit rounded-full ${state?.loanStatus === "LOAN_ACTIVE" ? "bg-[#009236]" :
                                                state?.loanStatus === "PENDING_APPROVAL" ? "bg-yellow-400" :
                                                    state?.loanStatus === "OFFER_READY" ? "bg-lime-500" :
                                                        state?.loanStatus === "LOAN_OVERDUE" ? "bg-rose-800" :
                                                            state?.loanStatus === "LOAN_DUE" ? "bg-rose-200" :
                                                                state?.loanStatus === "LOAN_DECLINED" ? "bg-red-900" :
                                                                    state?.loanStatus === "OFFER_ACCEPTED" ? "bg-green-500" :
                                                                        state?.loanStatus === "FULLY_REPAID" ? "bg-lime-300" :
                                                                            <></>
                                                } `}
                                        ></div>
                                        <p className="text-xs">{showFullyRepaid === true ? "FULLY_REPAID" : showLoanActive === true ? "LOAN_ACTIVE" : state?.loanStatus}</p>
                                    </div>
                                </div>
                            </p>
                        </div>
                        {/* <div className="p-4" style={{ marginLeft: '-10px' }}>Loan Summary</div> */}

                        <div className="flex justify-between p-4 bg-gray-100">
                            <p className=' text-sm text-gray-400'>Loan Amount</p>
                            <p className='font-medium text-sm'>
                                <CurrencyFormat value={state?.offeredAmount} displayType={'text'} thousandSeparator={true} fixedDecimalScale={true} decimalScale={2} prefix={"₦"} />
                            </p>
                        </div>
                        <div className="flex justify-between p-4 bg-gray-100">
                            <p className=' text-sm text-gray-400'>Interest</p>
                            <p className='font-medium text-sm'>
                                {/* ₦{state?.overallAmount - state?.offeredAmount} */}
                                <CurrencyFormat value={state?.interestAmount || "N/A"} displayType={'text'} thousandSeparator={true} fixedDecimalScale={true} decimalScale={2} prefix={"₦"} />
                            </p>
                        </div>
                        <hr style={{ marginTop: '-1px' }} className="h-1.5 my-8 border-0 bg-gray-300" />
                        <div style={{ marginTop: '-53px', height: '55px' }} className="flex justify-between p-4 bg-gray-100">
                            <p className=' text-sm text-gray-400'>Total Repayment</p>
                            <p className='font-medium text-sm'>
                                <CurrencyFormat value={state?.overallAmount || "N/A"} displayType={'text'} thousandSeparator={true} fixedDecimalScale={true} decimalScale={2} prefix={"₦"} />
                            </p>
                        </div>
                        <div style={{ marginTop: '-53px', height: '55px' }} className="flex justify-between p-4 bg-gray-100">
                            <p className=' text-sm text-gray-400'>Annual Payment Rate</p>
                            <p className='font-medium'>
                                {annualPaymentRate} %
                                {/* <CurrencyFormat value={annualPaymentRate || 0} displayType={'text'} thousandSeparator={true} fixedDecimalScale={true} decimalScale={2} prefix={"₦"} /> */}
                            </p>
                        </div>
                        {
                            showOutstandingBalance &&
                            <div style={{ marginTop: '-53px', height: '55px' }} className="flex justify-between p-4 bg-gray-100">
                                <p className=' text-sm text-gray-400'>Oustanding Balances</p>
                                <p className='font-medium text-sm'>
                                    <CurrencyFormat value={outstandingBalances || 0} displayType={'text'} thousandSeparator={true} fixedDecimalScale={true} decimalScale={2} prefix={"₦"} />
                                </p>
                            </div>
                        }

                        <br />

                        {
                            showLoader &&
                            <div style={{ marginLeft: '200px' }}>
                                <SpinnerIcon />
                            </div>
                        }

                        {
                            repaymentList?.length > 0 ?
                                <>
                                    <div className=" p-4" style={{ marginLeft: '-10px', marginTop: '-30px' }}>Repayment Schedule</div>
                                    <br /><br />
                                    <div className="flex justify-between p-4 -mt-10 bg-gray-100">
                                        <p className="text-left text-gray-400 text-sm">
                                            Payment Date
                                        </p>
                                        <p className="text-center text-gray-400 text-sm">
                                            <span style={{ marginLeft: '-60px' }}>Payment Amount</span>
                                        </p>
                                        <p className="text-right text-gray-400 text-sm">
                                            <span style={{ marginLeft: '-100px' }}>  Balance</span>
                                        </p>
                                        <p className="text-right text-gray-400 text-sm hidden lg:block">
                                            <span>Actions</span>
                                        </p>
                                    </div>
                                    <br />
                                </>
                                :
                                <></>
                        }
                        {
                            //  repaymentList
                            repaymentList?.map((item: any, index: number) => (
                                <>
                                    <div key={index} className="flex justify-between p-4 -mt-10 bg-gray-100">
                                        <p className="text-left text-sm font-medium">
                                            {item?.repaymentDate}
                                        </p>
                                        <p className="text-center text-sm font-medium">
                                            <CurrencyFormat value={item?.repaymentAmount || "N/A"} displayType={'text'} thousandSeparator={true} fixedDecimalScale={true} decimalScale={2} prefix={"₦"} />
                                        </p>
                                        <p className="text-right  text-sm font-medium">
                                            <span className='ml-12'>
                                                <CurrencyFormat value={item?.balance || 0} displayType={'text'} thousandSeparator={true} fixedDecimalScale={true} decimalScale={2} prefix={"₦"} />
                                            </span>
                                        </p>
                                        <p className="text-right  text-sm font-bold hidden lg:block">
                                            <div style={{ marginTop: '-20px' }} >
                                                {
                                                    item?.repaymentStatus === "PAID" ?
                                                        <div className='mt-3 mx-[-10px]'>
                                                            <button type="button" disabled className="text-blue-700 w-[100px] bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 hover:scale-105 hover:brightness-110 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">PAID</button>
                                                        </div>
                                                        :
                                                        earliestUnpaid?.id === item?.id ?
                                                            <div onClick={() => handleSubmit(item?.id)}>
                                                                {/* <Button title="Repay Loan" disabled={false} /> */}

                                                                <button disabled={false} style={{ width: 'fit-content', height: '40px', marginTop: '20px' }} className='bg-blue-700 cursor-pointer px-8 py-3 rounded-lg text-white  text-xs font-400 flex items-center'>
                                                                    <span>Repay</span>
                                                                    {
                                                                        loading &&
                                                                        <div role="status" className="ml-2">
                                                                            <svg aria-hidden="true"
                                                                                className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-500"
                                                                                viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path
                                                                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                                                    fill="currentColor" />
                                                                                <path
                                                                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                                                    fill="currentFill" />
                                                                            </svg>
                                                                            <span className="sr-only">Loading...</span>
                                                                        </div>
                                                                    }
                                                                </button>

                                                                {/* shgsgdgsgdhgsdghgshd */}

                                                            </div>
                                                            :
                                                            earliestUnpaid?.id !== item?.id ?
                                                                <div style={{ cursor: 'text' }}>
                                                                    <Button title="In Queue" disabled={true} />
                                                                </div>
                                                                :
                                                                <></>
                                                }

                                            </div>
                                        </p>
                                    </div>
                                    <br />
                                </>
                            ))
                        }
                        {/* state?.loanStatus !== "OFFER_ACCEPTED" ||  */}
                        {
                            state?.loanStatus === "LOAN_ACTIVE" || state?.loanStatus === "OFFER_ACCEPTED" || repaymentList.length > 0 ?
                                <></>
                                :
                                <div className="bg-blue-700 p-4 rounded-lg flex justify-between cursor-pointer hover:bg-blue-900" onClick={toggleTerminalRequestModal}>
                                    <p className="text-left"></p>
                                    <p className="text-center text-white text-sm">
                                        Accept Offer
                                        {
                                            dontShowSpinner &&
                                            <div style={{ marginLeft: '150px', marginTop: '-20px' }}>
                                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                                                </svg>
                                            </div>

                                        }
                                    </p>
                                    <p className="text-right">
                                    </p>
                                </div>

                        }


                        {
                            showPayAll &&
                            <div className="bg-blue-700 p-4 rounded-lg flex justify-between cursor-pointer hover:bg-blue-900" onClick={repayAllLoan}>
                                <p className="text-left"></p>
                                <p className="text-center text-white text-sm">
                                    Repay All Loans
                                    {
                                        dontShowSpinner2 &&
                                        <div style={{ marginLeft: '150px', marginTop: '-20px' }}>
                                            <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                                            </svg>
                                        </div>

                                    }
                                </p>
                                <p className="text-right">
                                </p>
                            </div>
                        }



                    </div>

                    {
                        showErrMsg &&
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5" role="alert">
                            <span className="block sm:inline">{errMsg}</span>
                            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" >
                                <svg onClick={closeAlert} className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                            </span>
                        </div>
                    }

                    {
                        showSuccessMsg &&
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-5" role="alert">
                            <span className="block sm:inline">{successMsg}</span>
                            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" >
                                <svg onClick={closeSuccesAlert} className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                            </span>
                        </div>
                    }
                </div>

                <TermsAndConditions toggleDropdown={toggleTerminalRequestModal} isOpen={terminalModal} setStage={setStage} stage={stage} />

                {/* Visible only on small screens */}
                {/* <div className='block sm:hidden'>
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 grid-rows-5 sm:grid-rows-5 md:grid-rows-5 lg:grid-rows-5 xl:grid-rows-5 gap-4">
                        <div className="p-4" style={{ marginTop: '-45px' }}>
                            <span>Loan Amount:</span> <span className="font-bold">₦ 300,000:00</span> <br />

                            <span>Interest:</span> <span className="font-bold">₦ 300,000:00</span> <br /> <br />
                            <span>Totals:</span> <span className="font-bold">₦ 330,000:00</span>
                        </div>

                        <div className="p-4" style={{ marginTop: '-70px' }}>
                            <p className='font-bold text-sm underline'>Repayment Schedule</p>
                        </div>

                        <div className="relative overflow-x-auto" style={{ marginTop: '-145px' }}>
                            <table className="w-full text-sm text-left rtl:text-right  dark:text-black">
                                <thead className="text-xs text-gray-900 uppercase dark:text-black">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Payment Date
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Payment Amount
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Balance
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white light:bg-gray-800">

                                        <td className="px-6 py-4">
                                            01-05-2021
                                        </td>
                                        <td className="px-6 py-4">
                                            ₦ 66,660.00
                                        </td>
                                        <td className="px-6 py-4">
                                            ₦ 333,300.00
                                        </td>
                                    </tr>
                                    <tr className="bg-white light:bg-gray-800">

                                        <td className="px-6 py-4">
                                            01-05-2021
                                        </td>
                                        <td className="px-6 py-4">
                                            ₦ 66,660.00
                                        </td>
                                        <td className="px-6 py-4">
                                            ₦ 333,300.00
                                        </td>
                                    </tr>
                                    <tr className="bg-white light:bg-gray-800">

                                        <td className="px-6 py-4">
                                            01-05-2021
                                        </td>
                                        <td className="px-6 py-4">
                                            ₦ 66,660.00
                                        </td>
                                        <td className="px-6 py-4">
                                            ₦ 333,300.00
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="bg-blue-700 p-4 h-12 rounded-lg flex justify-between cursor-pointer hover:bg-blue-900">
                            <p className="text-center text-white text-sm" style={{ marginLeft: '50px' }}>Proceed to Application</p>
                        </div>
                    </div>


                </div> */}
            </>
            <Modal toggleDropdown={toggleModal} isOpen={alertModal} setStage={setAlertStage} stage={alertStage} message={modalMessage} />

        </DashboardLayout>

    )
}

export default LoanSummary;