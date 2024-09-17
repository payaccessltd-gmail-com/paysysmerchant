import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../components/dashboard/Index';
import { Button } from '../../components/reusables/DefaultButton';
import { repaymentSchedule } from './Mocks';
import { useLocation } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import { Image } from "../../assets";
import Modal from '../../Utils/Modal';
import { useNavigate } from 'react-router-dom';
import { SpinnerIcon } from '../../components/reusables/icons';
import dayjs from 'dayjs';
import LoanDocument from './LoanDocument';
import { setShowPopUp } from '../../Utils/Emmiters/RxjsServices';
import RejectOfferModal from './RejectOfferModal';
import RepayAllLoansModal from './RepayAllLoansModal';
import EarlyRepaymentModal from './EarlyRepaymentModal';
import { earlyRepayment, fetchLoanBalance, fetchRepaymentList, getLoanProperty, rejectLoans, repayAllLoans, repayLoan } from '../../containers/loanApis';




function LoanRepaymentSchedule() {

    const [errMsg, setErrMsg] = useState<any>("Oops...an error occurred!");
    const [showErrMsg, setShowErrMsg] = useState<any>(false);
    const [successMsg, setSuccessMsg] = useState<any>("Loan Operation Successful!");
    const [showSuccessMsg, setShowSuccessMsg] = useState<any>(false);
    const [showSpinner1, setShowSpinner1] = useState<any>(false);
    const [showSpinner2, setShowSpinner2] = useState<any>(false);
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();
    //   console.log('stateXYZ>>>', state);
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
    const [earlyRepayments, setShowEarlyRepayments] = useState<any>(false);
    const [terminalModal_, setTerminalModal_] = useState(false);
    const [_terminalModal, _setTerminalModal] = useState(false);
    const [stage_, setStage_] = useState(0);
    const [_stage, _setStage] = useState(0);
    const [noData, setNodata] = useState<any>(false);
    // const [earlyRepaymentId, setEarlyRepaymentId] = useState<any>(0);

    const handleSubmit = (id: any) => {  //Repay singly
        setLoading(true);
        // setShowPopUp(false);
        repayLoan(id).then((response: any) => {
            setLoading(false);
            setModalMessage(`${response?.respDescription}!`);
            setShowErrMsg(null)
            setShowSuccessMsg(true);
            setTimeout(() => {
                setShowSuccessMsg(false);
                setSuccessMsg(`${response?.respDescription}`);
                window.location.reload();
            }, 3000)
            // setSuccessMsg(`${""}`);
        }).catch((err: any) => {
            console.error("API error>>", err?.response?.data?.respBody);
            //Insufficient Balance
            setLoading(false);
            setShowSuccessMsg(null);
            setShowErrMsg(true)
            setTimeout(() => setShowErrMsg(false), 3000);
            setErrMsg(`${err?.response?.data?.respBody}`);
        }).finally(() => setLoading(false));
    }

    const closeAlert = () => {
        setShowErrMsg(false);
    }

    const closeSuccesAlert = () => {
        setShowSuccessMsg(false);
    }

    useEffect(() => {
        getLoanProperty().then((res: any) => {
            setAnnualPaymentRate(res);
        }).catch((err: any) => {
            console.error("Get loan property error>>", err);
        })
    }, [annualPaymentRate])

    useEffect(() => {
        // console.log("state>>", state);
        fetchLoanBalance(state?.id).then((response: any) => {
            if (
                Object.keys(response)[2] === 'respBody' ||
                Object.keys(response)[1] === 'respBody' ||
                Object.keys(response)[0] === 'respBody'
            ) {
                setOutstandingBalances(response?.respBody);
            } else {
                setOutstandingBalances(response);
            }
        }).catch((err: any) => {
            console.error('err from loan balance>>', err);
        })
    }, [outstandingBalances]);

    useEffect(() => {
        // console.log('vvv>>',{
        //     repay: earliestUnpaid?.repaymentAmount,
        //     outstanding: outstandingBalances
        // })
        fetchRepaymentList(state?.id).then((res: any) => {
           // console.log('res>>>', res);
            if (res === "Loan Repayment Not found") {
                setRepayentList([]);
                //noContent
                setNodata(true);
            } else {
                setNodata(false);
                setRepayentList(res);
            }
            const findLatestUnpaid = res?.find((item: any) => item.repaymentStatus === "UNPAID");
            setEarliestUnpaid(findLatestUnpaid);
            if (res?.length === 0) {
                setShowLoader(true);
                setShowOutstandingBalance(false);
            } else {
                setShowOutstandingBalance(true);
                setShowLoader(false);
            }

            // if (state?.loanStatus === "OFFER_READY") setShowLoader(false);


            const loopThroughRepayments = res?.forEach((item: any) => {
                if (item?.repaymentStatus?.includes("UNPAID")) {
                    setShowLoanActive(true);
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
        navigate('/loans/offer-letter');
        // await setTerminalModal(!terminalModal);
        // setStage(0);
    }

    async function toggleTerminalRequestModal_() {
        await setTerminalModal_(!terminalModal_);
        setStage_(0);
    }

    async function _toggleTerminalRequestModal() {
        await _setTerminalModal(!_terminalModal);
        _setStage(0);
      //  handleEarlyRepayment();
    }

    async function toggleModal() {
        await setAlertModal(!alertModal);
        setAlertStage(0);
    }

    //reject this Loan
    const rejectThisLoan = () => {
        setShowSpinner1(true);
        rejectLoans(state?.id).then((response: any) => {
            setShowSpinner1(true);
            setShowErrMsg(null)
            setShowSuccessMsg(true);
            setTimeout(() => {
                setShowSuccessMsg(false);
                //window.location.reload();
            }, 3000)
            setSuccessMsg(`${response === undefined ? 'Loan rejected successfully!' : response?.respDescription}`);
        }).catch((err: any) => {
            console.error("API error>>", err?.response?.data?.respDescription);
            setShowSpinner1(true);
            setShowSuccessMsg(null);
            setShowErrMsg(true)
            setTimeout(() => setShowErrMsg(false), 3000);
            setErrMsg(`${err?.response?.data?.respDescription}`)
        })
    }

    //repayAllLoans

    const repayAllLoan = () => {
        setShowSpinner2(true);
        repayAllLoans(state?.id).then((response: any) => {
            setShowSpinner2(false);
            //   console.log("response>>>", response);
            setShowErrMsg(null)
            setShowSuccessMsg(true);
            setTimeout(() => {
                setShowSuccessMsg(false);
                window.location.reload();
            }, 3000)
            setSuccessMsg(`${response === undefined ? 'Loan repayed successfully!' : response}`);
        }).catch((err: any) => {
            console.error("API error>>", err?.response?.data?.respDescription);
            setShowSpinner2(false);
            setShowSuccessMsg(null);
            setShowErrMsg(true)
            setTimeout(() => setShowErrMsg(false), 3000);
            setErrMsg(`${err?.response?.data?.respDescription}`)
        })
    }

    const handleEarlyRepayment = () => {  //Repay singly
        setLoading(true);
        // setShowPopUp(false);
        earlyRepayment().then((response: any) => {
            // console.log('response>>', response);
            setLoading(false);
            setModalMessage(`${response?.respDescription}!`);
            setShowErrMsg(null)
            setShowSuccessMsg(true);
            setTimeout(() => {
                setShowSuccessMsg(false);
                setSuccessMsg(`${response?.respDescription}`);
                window.location.reload();
            }, 3000)
            // setSuccessMsg(`${""}`);
        }).catch((err: any) => {
            console.error("API error>>", err?.response?.data?.respBody);
            //Insufficient Balance
            setLoading(false);
            setShowSuccessMsg(null);
            setShowErrMsg(true)
            setTimeout(() => setShowErrMsg(false), 3000);
            setErrMsg(`${err?.response?.data?.respBody}`);
        }).finally(() => setLoading(false));
    }

    return (
        <DashboardLayout>
            <>
                <p onClick={() => {
                    showFullyRepaid === true ? navigate("/loans") : state?.loanStatus === "LOAN_ACTIVE" ? navigate("/loans") : showLoanActive === true ? navigate("/loans") : window?.history?.go(-1);


                }} className="cursor-pointer grid gap-[20px] text-[16px] font-sfpro-medium mt-[20px]">
                    ⬅ &nbsp; Loan Repayments
                </p>
                <br /><br />
                {/* Visible only on large screens */}


                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className=" h-64 md:h-auto flex items-center justify-center">
                        <div>
                            <div style={{ width: '500px', height: '220px' }} className="hidden lg:block relative bg-white md:border border-gray-200  w-48 h-48 rounded-lg overflow-hidden shadow-md">
                                <div className="absolute top-0 left-0 p-2 text-xs text-gray-600" style={{ marginTop: '10px', marginLeft: '10px' }}>
                                    <span className='text-[#555555]'>Next Repayment Amount</span>
                                    <br />
                                    <span className='text-2xl font-bold text-black'>

                                        {
                                            earliestUnpaid !== undefined ?
                                                <>
                                                    <CurrencyFormat value={earliestUnpaid?.repaymentAmount || ""} displayType={'text'} thousandSeparator={true} fixedDecimalScale={true} decimalScale={2} prefix={"₦"} />
                                                </>
                                                :
                                                earliestUnpaid === undefined ?
                                                    <div>
                                                        ₦ 0.00
                                                    </div>
                                                    :
                                                    <div>
                                                        N/A
                                                    </div>
                                        }

                                    </span>
                                    {/* <span className='font-bold'>.78</span> className='text-4xl mb-8'*/}
                                    <br />
                                    <span className='text-[#555555]'>
                                        {
                                            outstandingBalances === 0 ?
                                                <>
                                                    <div style={{ marginTop: '-30px' }}>
                                                        Amount due: ₦ 0.00
                                                    </div>
                                                </>
                                                :
                                                outstandingBalances > 0 ?
                                                    <>
                                                        Amount due:  <CurrencyFormat value={outstandingBalances || ""} displayType={'text'} thousandSeparator={true} fixedDecimalScale={true} decimalScale={2} prefix={"₦"} />
                                                    </>
                                                    :
                                                    "N/A"
                                        }

                                    </span>

                                </div>
                                <div className="absolute top-0 right-0 p-2 text-xs text-gray-600">
                                    {/* <span style={{ marginTop: '10px' }} className="inline-block px-2 py-1 text-sm font-semibold text-green-800 bg-[#1EAA4542] rounded-full">
                                        Loan Active
                                    </span> */}
                                    <div className="flex gap-2 items-center" style={{ marginTop: '10px', marginLeft: '40px' }}>
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

                                    <div className='mt-2'>
                                        {
                                            successMsg === "All loans have been repaid successfully!" ?
                                                <></>
                                                :
                                                <>
                                                    {
                                                        state?.loanStatus === "FULLY_REPAID" ?
                                                            <></>
                                                            :
                                                            <>
                                                                {
                                                                    noData === true ?
                                                                        <span>
                                                                            <button type="button" disabled={true} className="flex items-center text-white text-xs bg-[#3477E4] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                                                Fully Repaid
                                                                            </button>
                                                                        </span>
                                                                        :
                                                                        <>
                                                                            <button onClick={handleEarlyRepayment} type="button" className="flex items-center text-white text-xs bg-[#3477E4] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                                                <span>Early Repayment</span>
                                                                                {/* _toggleTerminalRequestModal */}
                                                                                {
                                                                                    loading &&
                                                                                    <div role="status" className="ml-2">
                                                                                        <svg aria-hidden="true" className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                                                        </svg>
                                                                                        <span className="sr-only">Loading...</span>
                                                                                    </div>

                                                                                }

                                                                            </button>
                                                                        </>
                                                                }

                                                            </>
                                                    }

                                                </>
                                        }

                                        {/* {
                                            earlyRepayments &&
                                            <>
                                                <button onClick={() => handleSubmit(earliestUnpaid?.id)} type="button" className="flex items-center text-white text-xs bg-[#3477E4] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                    <span>Early Repayment</span>
                                                    {
                                                        loading &&
                                                        <div role="status" className="ml-2">
                                                            <svg aria-hidden="true" className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                            </svg>
                                                            <span className="sr-only">Loading...</span>
                                                        </div>

                                                    }

                                                </button>

                                            </>
                                        } */}

                                    </div>
                                </div>
                                <br />
                                <div className="absolute bottom-0 left-0 p-2 text-xs text-gray-600" style={{ marginLeft: '10px' }}>
                                    <span className='text-[#555555]'>Interest</span> <br /><br />
                                    <p className='font-medium text-black' style={{ fontSize: '20px', marginBottom: '10px' }}>
                                        <CurrencyFormat value={state?.interestAmount || ""} displayType={'text'} thousandSeparator={true} fixedDecimalScale={true} decimalScale={2} prefix={"₦"} />
                                    </p>
                                    <p></p>
                                </div>
                                <div className="absolute bottom-0 right-0 p-2 text-xs text-gray-600">
                                    <span className='text-[#555555]' style={{ marginLeft: '80px' }}>
                                        Annual Payment Rate
                                    </span> <br /><br />
                                    <p className='font-medium text-black' style={{ fontSize: '20px', marginBottom: '10px', marginLeft: '55px' }}>{annualPaymentRate}% Monthly</p>
                                </div>
                            </div>
                            <br />

                            {/*End of First Card*/}
                            <div>
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
                            <br />
                            {/*Beginning of second card */}

                            <div style={{ width: '500px', height: 'fit-content' }} className="relative bg-white md:border border-gray-200  w-48 h-48 rounded-lg overflow-hidden shadow-md">
                                <div className="absolute top-0 left-0 p-2 text-xs text-gray-600" style={{ marginTop: '10px', marginLeft: '10px' }}>
                                    <span className='text-1xl font-bold text-[#3477E4]'>Repayment Schedule</span>
                                </div>

                                {
                                    noData === false ?
                                        <>
                                            <div style={{ marginTop: '50px', marginLeft: '20px' }}>
                                                {repaymentList?.map((item: any, index: number) => (
                                                    <>
                                                        <div className={`${earliestUnpaid?.id >= item?.id ? 'bg-[#FAFAFA] text-[#6BC34F]' : (earliestUnpaid?.id !== item?.id && earliestUnpaid !== undefined) ? 'bg-[#FFF9F9] text-[#D44F5B]' : earliestUnpaid === undefined ? 'bg-[#FAFAFA] text-[#6BC34F]' : 'bg-white'}`} style={{ marginTop: '10px' }}>

                                                            {/* <span>
                                               <input id="bordered-radio-1" type="radio" value="" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>         
                                               </span> */}
                                                            <div className='grid grid-cols-2' style={{ color: '#555555', marginLeft: '10px' }}>
                                                                <div className="col-span-1 relative">
                                                                    {/* <span className='text-xs'> Amount Due</span> setShowEarlyRepayments*/}
                                                                    <div className="flex items-center mb-4 cursor-pointer">
                                                                        {
                                                                            item?.repaymentStatus === "PAID" ?
                                                                                <>

                                                                                    <input id="default-checkbox" checked disabled type="checkbox" value="" className="w-4 h-4  mt-2 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                                                                </>
                                                                                :
                                                                                earliestUnpaid?.id === item?.id ?
                                                                                    <>
                                                                                        {/* <input id="default-checkbox" onChange={(e: any) => {
                                                                                e?.target?.checked === true ? setShowEarlyRepayments(true) : setShowEarlyRepayments(false);
                                                                            }} type="checkbox" value="" className="w-4 h-4  mt-2 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input> */}

                                                                                    </>
                                                                                    :
                                                                                    earliestUnpaid?.id < item?.id ?
                                                                                        <>
                                                                                            {/* <input id="default-radio-1" disabled type="radio" name="default-radio" className="w-4 h-4 mt-2 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> */}
                                                                                        </>
                                                                                        :
                                                                                        <></>

                                                                        }

                                                                        <label htmlFor="default-radio-1" className="ms-2 text-sm">
                                                                            Amount Due
                                                                        </label>
                                                                    </div>

                                                                </div>
                                                                <div className="col-span-1" style={{ marginLeft: '92px' }}>
                                                                    <span className="text-xs">Next Repayment Date</span>
                                                                </div>
                                                            </div>
                                                            <div className='grid grid-cols-2'>
                                                                <div className="col-span-1 relative" style={{ marginLeft: '30px' }}>
                                                                    <span className='text-1xl font-medium'>
                                                                        {/* {item?.repaymentAmount} */}
                                                                        <CurrencyFormat value={item?.repaymentAmount || ""} displayType={'text'} thousandSeparator={true} fixedDecimalScale={true} decimalScale={2} prefix={"₦"} />
                                                                    </span>
                                                                </div>
                                                                <div className="col-span-1" style={{ marginLeft: '100px' }}>
                                                                    <span className='text-1xl font-medium'>
                                                                        {item?.repaymentDate}
                                                                        {/* {dayjs(item?.nextRepaymentDate).format( "MMM DD, YYYY hh:mm:ss")} */}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </>
                                                ))}
                                            </div>
                                        </>
                                        :
                                        noData === true ?
                                            <>
                                                <div style={{ marginTop: '50px', marginLeft: '100px' }}>
                                                    <img src={Image?.noContent} />
                                                </div>
                                            </>
                                            :
                                            <></>
                                }

                            </div>
                        </div>
                        {/* style={{ position: 'absolute', marginLeft: '550px' }} */}
                    </div>
                    <div className="h-64 md:h-auto flex items-center justify-center absolute right-40" >
                        {/* marginTop: '-125px', marginLeft: '-200px', */}
                        <div className="hidden lg:block w-64 h-64 bg-[#D5D8E6] flex items-center justify-center rounded-sm">
                            <div>
                                <img src={Image?.pan} width={70} height={70} style={{ marginLeft: '90px', marginTop: '20px' }} />
                                <span style={{ fontSize: '13px', fontWeight: 'bold', marginLeft: '75px' }}>My Documents</span>
                                <p className='text-xs ml-8'>Here are the documents associated</p>
                                <p className='text-xs ml-20'>with this loan</p>
                                <br />
                                <img src={Image?.file} onClick={toggleTerminalRequestModal} className='ml-3 cursor-pointer' style={{ width: '230px' }} />
                            </div>
                            <br /><br />
                            <div>
                                {
                                    successMsg === "All loans have been repaid successfully!" ?
                                        <>
                                        </>
                                        :
                                        <>

                                            {
                                                (state?.loanStatus === "FULLY_REPAID" || noData === true) ?
                                                    <></>
                                                    :
                                                    <>
                                                        {/* repayAllLoan */}
                                                        <button onClick={toggleTerminalRequestModal_} className="flex items-center bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mr-4 font-medium text-sm" style={{ backgroundColor: '#3477E4', width: '260px', fontWeight: '400' }}>
                                                            <span className="ml-14">Repay All Loans</span>
                                                            {
                                                                showSpinner2 &&
                                                                <div role="status" className="ml-4">
                                                                    <svg aria-hidden="true" className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                                    </svg>
                                                                    <span className="sr-only">Loading...</span>
                                                                </div>
                                                            }
                                                        </button>
                                                    </>
                                            }

                                        </>
                                }

                                {
                                    successMsg === "All loans have been repaid successfully!" ?
                                        <>
                                        </>
                                        :
                                        <>
                                            {
                                                (state?.loanStatus === "LOAN_ACTIVE" || showLoanActive === true) ?
                                                    <></>
                                                    :
                                                    (state?.loanStatus === "FULLY_REPAID" || noData === true) ?
                                                        <></>
                                                        :
                                                        <>
                                                            <button onClick={rejectThisLoan} className="flex items-center bg-blue-500 mt-2 hover:bg-blue-700 text-white py-2 px-4 rounded font-medium text-sm" style={{ backgroundColor: '#E43434', width: '260px', fontWeight: '400' }}>
                                                                <span className="ml-14">Reject This Loan</span>

                                                                {
                                                                    showSpinner1 &&
                                                                    <div role="status" className="ml-4">
                                                                        <svg aria-hidden="true" className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-[#E43434]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                                        </svg>
                                                                        <span className="sr-only">Loading...</span>
                                                                    </div>
                                                                }

                                                            </button>
                                                        </>




                                            }

                                        </>
                                }

                            </div>

                            <div>
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
                        </div>

                    </div>
                </div>



            </>
            <Modal toggleDropdown={toggleModal} isOpen={alertModal} setStage={setAlertStage} stage={alertStage} message={modalMessage} />
            <LoanDocument toggleDropdown={toggleTerminalRequestModal} isOpen={terminalModal} setStage={setStage} stage={stage} />
            <RepayAllLoansModal toggleDropdown={toggleTerminalRequestModal_} isOpen={terminalModal_} setStage={setStage_} stage={stage_} />
            <EarlyRepaymentModal toggleDropdown={_toggleTerminalRequestModal} isOpen={_terminalModal} setStage={_setStage} stage={_stage} />
        </DashboardLayout>

    )
}

export default LoanRepaymentSchedule;