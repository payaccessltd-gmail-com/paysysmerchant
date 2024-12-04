import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/dashboard/Index';
import { useNavigate, useLocation } from 'react-router-dom';
import { acceptLoan } from '../../containers/loanApis';



function LoansProfile({ profile }: any) {
    const [percentage, setPercentage] = useState<any>(0);
    const [selectedMonth, setSelectedMonth] = useState<any>("");
    const [loanProfile, setLoanProfile] = useState<any>({});
    const [errMsg, setErrMsg] = useState<any>("");
    const [showErrMsg, setShowErrMsg] = useState<any>(false);
    const [successMsg, setSuccessMsg] = useState<any>("");
    const [showSuccessMsg, setShowSuccessMsg] = useState<any>(false);
    const [dontShowSpinner, setDontShowSpinner] = useState<any>(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
 // console.log('state>>>', state);


    useEffect(() => {
        setLoanProfile(state);
        var month = Number(state?.offeredDuration || 0);
        // var month = Number( parseProfile?.duration?.split(" ")[0]);
        var percentageValue = month / 100 * 100    //where 5 is the number of months
        setSelectedMonth(String(month));
        setPercentage(Math.ceil(percentageValue));
    }, []);

    const handleSubmit = () => {
        // navigate("/loans/summary", { state: state });
        acceptLoan(state?.id).then((response: any) => {
           // console.log("response>>", response);
            setShowErrMsg(null)
            setShowSuccessMsg(true);
            setSuccessMsg("Loan Offer Accepted Successfully!")
            setTimeout(() => {
                setShowSuccessMsg(false);
               navigate("/loans/summary", { state: state });
                // window.location.reload()
            }, 3000)
            setSuccessMsg(`${""}`);
        }).catch((err: any) => {
            console.error("API error>>", err?.response);
            if(err?.response?.status === 500){
                setShowErrMsg(null)
                setShowSuccessMsg(true);
                setSuccessMsg("Loan Offer Accepted Successfully!");
                setTimeout(() => {
                    setShowSuccessMsg(false);
                   navigate("/loans/summary", { state: state });
                    // window.location.reload()
                }, 3000)
               // setSuccessMsg(`${""}`);
            }else{
                setShowSuccessMsg(null);
                setShowErrMsg(true)
                setTimeout(() => setShowErrMsg(false), 3000)
                setErrMsg(`${err?.response?.data?.respDescription}`)
            }
          
        })
    }


    const closeAlert = () => {
        setShowErrMsg(false);
    }

    const handleRoute = () => {
       // console.log('Hiiiiiii!!!')
     navigate("/loans/summary", { state: state});
    //navigate("/loans");
    }

    return (
        <DashboardLayout>
            <p onClick={() => {
                window?.history?.go(-1);
                localStorage.removeItem('loans');
            }} className="cursor-pointer grid gap-[20px] text-[16px] font-sfpro-medium mt-[20px]">
                ⬅ &nbsp; Loans
            </p>
            <br /><br />
            {/* Visible only on large screens */}
            <div className="bg-white p-8 border border-gray-300 rounded-lg shadow-lg md:w-1/2 mb-[40px]">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4">
                    {/* <div className=" pt-4">
                        <div className="flex md:justify-end">
                            <p className=" text-blue-600 ">Loan Status</p>
                        </div>
                    </div> */}
                    <br />
                    <div className="mt-[-20px]">
                        <div className="flex md:justify-end">
                            {/* <p className="  text-4xl font-bold">{"N/A"}</p> */}
                            <div className="flex gap-2 items-center">
                <div
                  className={`p-1 h-fit rounded-full ${state?.loanStatus === "LOAN_ACTIVE" ? "bg-[#009236]" :
                  state?.loanStatus === "PENDING_APPROVAL" ? "bg-yellow-400" :
                  state?.loanStatus === "OFFER_READY" ? "bg-lime-500" :
                  state?.loanStatus === "LOAN_OVERDUE" ? "bg-rose-800" :
                  state?.loanStatus === "LOAN_DUE" ? "bg-rose-200" :
                  state?.loanStatus === "LOAN_DECLINED" ? "bg-red-900" :
                  state?.loanStatus === "OFFER_ACCEPTED" ? "bg-green-500" :
                  state?.loanStatus  === "FULLY_REPAID" ? "bg-lime-300" :
                                  <></>
                    } `}
                ></div>
                <p className="text-xs">{state?.loanStatus}</p>
              </div>
                        </div>

                    </div>
                    <div className="font-bold py-4">Our offer for you is:</div>
                    {/* `₦ ${loanProfile?.offeredAmount}` || "N/A" */}
                    <div className="bg-gray-200 border border-gray-500 font-bold p-4"> {loanProfile.offeredAmount === null ? "N/A" : `₦ ${loanProfile?.offeredAmount}`}</div>
                    <div className="flex justify-between py-4 -mt-7">
                        {/* <p className='text-gray-400 text-sm'>Min: ₦100,000:00</p>
                        <p className='text-gray-400 text-sm'>Max: ₦300,000:00</p> */}
                    </div>
                    <div className="flex justify-between py-4">
                        <p className='font-bold text-sm'>For how long?</p>
                        <p className=' font-bold text-sm'>Selected Months: {loanProfile.offeredDuration === null ? "N/A" : `${selectedMonth} Month(s)`}</p>
                    </div>
                    <div className="flex justify-between py-4 -mt-10">
                        <p className="text-left text-gray-400 text-sm">
                            {loanProfile.offeredDuration === null ? "N/A" : `${selectedMonth} Month(s)`}
                        </p>
                        <p className="text-center text-gray-400 text-sm"></p>
                        <p className="text-right text-gray-400 text-sm">
                            {/* 7 Months */}
                        </p>
                    </div>
                    <div className="py-4 -mt-10">
                        {/* style={{ width: '95%'}} */}
                        {/* <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700" >
                            <div className="bg-blue-600 h-2.5 rounded-full" title={`${percentage}%`} style={{ width: `${percentage}%` }} ></div>
                        </div> */}
                        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                            <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" title={`${percentage}%`} style={{ width: `${percentage}%` }} >
                                {loanProfile.offeredDuration === null ? "N/A" : `${selectedMonth} Month(s)`}
                            </div>
                        </div>


                    </div>

                    <div className=" py-4">
                        We've chosen the most suitable loan duration for easy repayments.
                        Modifying it will impact the borrowing amount.
                        The maximum loan amount is indicated in the bottom right corner of the box.
                    </div>
                    {
                            loanProfile.loanStatus === 'PENDING_APPROVAL' || loanProfile.loanStatus === 'LOAN_DECLINED' ?
                                <></>
                                :
                                <>
                                      <div className="bg-blue-700 py-4 rounded-lg flex justify-between cursor-pointer hover:bg-blue-900" onClick={handleRoute}>
                                      {/* onClick={handleSubmit} */}
                        {
                            dontShowSpinner &&
                            <div className="ml-32">
                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                                </svg>
                            </div>

                        }

                        <p className="text-left"></p>
                        <p className="text-center text-white text-sm">Proceed to Application</p>
                        <p className="text-right"> </p>

                    </div>
                                </>
                        }
                </div>
                <br />

                {
                    showErrMsg &&
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{errMsg}</span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3" >
                            <svg onClick={closeAlert} className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                        </span>
                    </div>
                }

                {
                    showSuccessMsg &&
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{successMsg}</span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3" >
                            <svg onClick={closeAlert} className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                        </span>
                    </div>
                }
            </div>


            {/* Visible only on small screens */}
            {/* <div className='block sm:hidden'>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 grid-rows-5 sm:grid-rows-5 md:grid-rows-5 lg:grid-rows-5 xl:grid-rows-5 gapy-4">
                    <div className=" p-4">
                        <span className='text-blue-500'>Monthly Repayment</span>
                    </div>
                    <div className="p-4" style={{ marginTop: '-45px' }}>
                        <span className="text-4xl font-bold">₦11,238.67</span>
                    </div>
                    <div className="p-4" style={{ marginTop: '-40px' }}>
                        <p className='font-bold text-sm'>Our offer for you is:</p>
                    </div>
                    <div style={{ marginTop: '-65px' }} className="w-75 h-20 ml-4 border border-gray-400 flex items-center justify-center p-4">
                        <p className="text-3xl text-gray-700" style={{ marginLeft: '-110px' }}>
                            {loanProfile?.loanAmount}
                        </p>
                    </div>
                    <div className="p-4" style={{ marginTop: '-35px' }} >
                        <p className='font-bold text-sm'>
                            Selected Months: {selectedMonth} Month(s)
                        </p>
                    </div>
                    <div className=" p-4" style={{ marginTop: '-35px' }}>
                        We've chosen the most suitable loan duration for easy repayments.
                        Modifying it will impact the borrowing amount.
                        The maximum loan amount is indicated in the bottom right corner of the box.
                    </div>
                    <div className="bg-blue-700 p-4 rounded-lg flex justify-between cursor-pointer hover:bg-blue-900" onClick={() => navigate("/loans/summary")}>
                        <p className="text-center text-white text-sm" style={{ marginLeft: '50px' }}>Proceed to Application</p>
                    </div>
                </div>

            </div> */}

        </DashboardLayout>

    )
}

export default LoansProfile