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
import RejectOfferModal from './RejectOfferModal';
import dayjs from 'dayjs';
import { acceptLoan, fetchLoanBalance, fetchRepaymentList, getLoanProperty, repayAllLoans, repayLoan } from '../../containers/loanApis';




function LoanOfferAcceptance() {

    const [errMsg, setErrMsg] = useState<any>("");
    const [showErrMsg, setShowErrMsg] = useState<any>(false);
    const [successMsg, setSuccessMsg] = useState<any>("Loan Operation Succesful!");
    const [showSuccessMsg, setShowSuccessMsg] = useState<any>(false);
    const [dontShowSpinner, setDontShowSpinner] = useState<any>(false);
    const [dontShowSpinner2, setDontShowSpinner2] = useState<any>(false);
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();
    //    console.log('state123>>>', state);
    const [repaymentList, setRepayentList] = useState<any>([]);
    const [showTermsAndConditions, setShowTermsAndConditions] = useState<any>(false);
    const [terminalModal, setTerminalModal] = useState(false);
    const [terminalModal_, setTerminalModal_] = useState(false);
    const [stage, setStage] = useState(0);
    const [stage_, setStage_] = useState(0);
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
    const [username, setUsername] = useState<any>("");
    const [showCTABtns, setShowCTABtns] = useState<any>(false);

    const handleSubmit = (id: any) => {
        setLoading(true);
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
                window.location.reload();
            }, 3000)
            // setSuccessMsg(`${""}`);
        }).catch((err: any) => {
            console.error("API error>>", err?.response?.data?.respDescription);
            setLoading(false);
            setShowSuccessMsg(null);
            setShowErrMsg(true)
            setTimeout(() => setShowErrMsg(false), 3000);
            setErrMsg(`${err?.response?.data?.respDescription}`);
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
        // console.log("state>>", state);
        fetchLoanBalance(state?.id).then((response: any) => {
            // console.log("loan balance>>>", response);
            setOutstandingBalances(response?.respBody);
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
    }, []);

    useEffect(() => {
        const getUserData: any = localStorage.getItem('userDetails');
        const userName = JSON.parse(getUserData)?.lastName;
        let capitalizedName = userName?.charAt(0).toUpperCase() + userName?.slice(1);
        setUsername(capitalizedName);
    }, []);

    async function toggleTerminalRequestModal() {
        await setTerminalModal(!terminalModal);
        setStage(0);
    }
    async function toggleTerminalRequestModal_() {
        await setTerminalModal_(!terminalModal_);
        setStage_(0);
    }

    async function toggleModal() {
        await setAlertModal(!alertModal);
        setAlertStage(0);
    }

    //repayAllLoans

    const repayAllLoan = () => {
        repayAllLoans(state?.id).then((response: any) => {
            //   console.log("response>>>", response);
            setShowErrMsg(null)
            setShowSuccessMsg(true);
            setTimeout(() => {
                setShowSuccessMsg(false);
                window.location.reload();
            }, 3000)
            setSuccessMsg(`${response === undefined ? 'Loan repayed succesfully!' : response}`);
        }).catch((err: any) => {
            console.error("API error>>", err?.response?.data?.respDescription);
            setShowSuccessMsg(null);
            setShowErrMsg(true)
            setTimeout(() => setShowErrMsg(false), 3000)
            setErrMsg(`${err?.response?.data?.respDescription}`)
        })


    }

    return (
        <DashboardLayout>
            <>
                <p onClick={() => {
                    showFullyRepaid === true ? navigate("/loans") : state?.loanStatus === "LOAN_ACTIVE" ? navigate("/loans") : showLoanActive === true ? navigate("/loans") : window?.history?.go(-1);


                }} className="cursor-pointer grid gap-[20px] text-[16px] font-sfpro-medium mt-[20px]">
                    ⬅ &nbsp; Loan Acceptance
                </p>
                <br /><br />
                {/* Visible only on large screens */}
                <div className="flex justify-center items-center h-screen y-overflow-scroll">
                    <div className="bg-gray-100 p-4 rounded-lg" style={{ width: '500px', backgroundColor: '#F9F9F9', color: '#384860', marginTop: '70px' }}>
                        <div className="grid grid-rows-7 grid-cols-1 gap-4">
                            <div className=" p-2 rounded-md font-semibold">
                                Loans
                            </div>
                            <div className="p-2 rounded-md">
                            </div>
                            <div className="p-2 rounded-md">
                                Hi {username},
                            </div>
                            <div className="p-2 rounded-md">
                                <span>
                                    Congratulations! Build MFB is thrilled to extend a loan facility tailored to your business needs. Simply peruse the below to accept or reject this exclusive offer.
                                </span>
                            </div>
                            <div className="bg-gray-300 p-2 rounded-md" style={{ backgroundColor: '#071B7B26' }}>

                            <div className='grid grid-cols-2' style={{ color: '#555555' }}>
                                    <div className="col-span-1 relative">
                                        <span className='text-xs'> AMOUNT REQUESTED</span>
                                    </div>
                                    <div className="col-span-1" style={{ marginLeft: '182px' }}>
                                        <span className="text-xs">TENOR</span>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <div className="col-span-1 relative">
                                        <span className='text-1xl font-bold'>
                                            {/* ₦ {state?.requestAmount} */}
                                            <CurrencyFormat value={state?.requestAmount || ""} displayType={'text'} thousandSeparator={true} fixedDecimalScale={true} decimalScale={2} prefix={"₦"} />
                                            </span>
                                    </div>
                                    <div className="col-span-1" style={{ marginLeft: '150px' }}>
                                        <span className='text-1xl font-bold'>{state?.requestDuration} Months</span>
                                    </div>
                                </div>
                                <br />

                                <div className='grid grid-cols-2' style={{ color: '#555555' }}>
                                    <div className="col-span-1 relative">
                                        <span className='text-xs'>AMOUNT OFFERED</span>
                                    </div>
                                    <div className="col-span-1" style={{ marginLeft: '182px' }}>
                                        <span className="text-xs">TENOR</span>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <div className="col-span-1 relative">
                                        <span className='text-1xl font-bold'>
                                            {/* ₦ {state?.offeredAmount} */}
                                            <CurrencyFormat value={state?.offeredAmount || ""} displayType={'text'} thousandSeparator={true} fixedDecimalScale={true} decimalScale={2} prefix={"₦"} />
                                            </span>
                                    </div>
                                    <div className="col-span-1" style={{ marginLeft: '150px' }}>
                                        <span className='text-1xl font-bold'>{state?.offeredDuration} Months</span>
                                    </div>
                                </div>
                                <br />

                                <div className='grid grid-cols-2' style={{ color: '#555555' }}>
                                    <div className="col-span-1 relative">
                                        <span className='text-xs'> TOTAL REPAYMENT</span>
                                    </div>
                                    <div className="col-span-1" style={{ marginLeft: '132px', width: 'max-width'}}>
                                        <span className="text-xs">APPROVED DATE</span>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <div className="col-span-1 relative">
                                        <span className='text-1xl font-bold'>
                                            {/* ₦ {state?.overallAmount} */}
                                            <CurrencyFormat value={state?.overallAmount || ""} displayType={'text'} thousandSeparator={true} fixedDecimalScale={true} decimalScale={2} prefix={"₦"} />
                                            </span>
                                    </div>
                                    <div className="col-span-1" style={{ marginLeft: '150px' }}>
                                        <span className='text-1xl font-bold' style={{width: 'max-width', marginLeft:'-15px'}}>
                                        {/* {dayjs(state?.approvedDate).format( "MMM DD, YYYY hh:mm:ss")} */}
                                        {state?.approvedDate?.split('T')[0]}
                                        </span>
                                    </div>
                                </div>

                            </div>

                            <div className="p-2 rounded-md">
                                <div className="flex items-center mb-4">
                                    <input onChange={(e: any) => setShowCTABtns(e?.target?.checked)} id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 cursor-pointer bg-blue-500 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="default-checkbox" className="ms-2 text-sm ">
                                        <span>
                                            By clicking the check-box, I acknowledge and consent to accept or decline the Loan
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div className="p-2 rounded-md">
                                {
                                    showCTABtns &&
                                    <div className="flex">
                                        <button onClick={toggleTerminalRequestModal} className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded mr-4 font-medium text-sm" style={{ backgroundColor: '#071B7B', width: '225px', fontWeight: '400' }}>
                                            Accept Offer
                                        </button>
                                        <button onClick={toggleTerminalRequestModal_} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded font-medium text-sm" style={{ backgroundColor: '#E43434', width: '225px', fontWeight: '400' }}>
                                            Reject Offer
                                        </button>
                                    </div>
                                }

                            </div>

                        </div>
                        <div className="p-2 rounded-md cursor-pointer" >
                            <img src={Image?.redirect} style={{ width: '470px' }} onClick={() => window?.history?.go(-1)} />
                        </div>
                    </div>

                </div>


                <TermsAndConditions toggleDropdown={toggleTerminalRequestModal} isOpen={terminalModal} setStage={setStage} stage={stage} />
                <RejectOfferModal toggleDropdown={toggleTerminalRequestModal_} isOpen={terminalModal_} setStage={setStage_} stage={stage_} />
            </>
            <Modal toggleDropdown={toggleModal} isOpen={alertModal} setStage={setAlertStage} stage={alertStage} message={modalMessage} />

        </DashboardLayout>

    )
}

export default LoanOfferAcceptance;