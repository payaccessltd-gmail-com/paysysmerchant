import { useEffect, useState } from "react";
import { Button } from "../../components/reusables/DefaultButton";
import DefaultInput from "../../components/reusables/DefaultInput";
import CustomDropDown from "../../components/reusables/dropdowns/CustomDropDown";
import Overlay from "../../components/reusables/Overlay/Overlay";
import { Toaster } from "react-hot-toast";
import Loading from "../../components/Loading";
import { SpinnerIcon } from "../../components/reusables/icons";
import { Image } from "../../assets";
import { LoanReasons } from "./Mocks";
import { useLocation, useNavigate } from "react-router-dom";
import { earlyRepayment } from "../../containers/loanApis";

const EarlyRepaymentModal = ({ toggleDropdown, isOpen, stage, setStage }: any) => {
    const [isLoading, setisLoading] = useState<any>(false);
    const location = useLocation();
    const [showSpinner2, setShowSpinner2] = useState<any>(false);
    // console.log("states>>", location?.state)
    const [showSuccessAlert, setShowSuccessAlert] = useState<any>(false);
    const [checked, setChecked] = useState<any>(false);
    const [errMsg, setErrMsg] = useState<any>("");
    const [showErrMsg, setShowErrMsg] = useState<any>(false);
    const [successMsg, setSuccessMsg] = useState<any>("");
    const [showSuccessMsg, setShowSuccessMsg] = useState<any>(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setShowSpinner2(true);
        earlyRepayment().then((response: any) => {
            setShowErrMsg(null)
            setShowSuccessMsg(true);
            setShowSpinner2(false);
            setSuccessMsg(`${response?.respDescription}`);
            setChecked(false);
            setTimeout(() => {
                setShowSuccessMsg(false);
                window.location.reload();
            }, 3000);
            navigate("/loans/repayments");
        }).catch((err: any) => {
            console.error("API error>>", err?.response?.data?.respDescription);
            setShowSuccessMsg(null);
            setShowErrMsg(true);
            setShowSpinner2(false);
            setisLoading(false);
            setShowSuccessAlert(null);
            setTimeout(() => setShowErrMsg(false), 4000)
            setErrMsg(`${err?.response?.data?.respDescription}`)
        })
    };

    const closeAlert = () => {
        setShowErrMsg(false);
    }
    // console.log(state, "the terminal state");
    return (
        <Overlay toggleDropdown={toggleDropdown} isOpen={isOpen}>
            <Toaster />
            {/* <p className="text-[20px] font-bold">Terms and Conditions</p> */}
            {isLoading ? (
                <div role="status" className="m-auto w-fit h-fit grid items-center">
                    <div className="m-auto text-center my-10">
                        <SpinnerIcon className="m-auto" />
                        <p>Loading...</p>
                        <p>Do not close the modal</p>
                    </div>
                </div>
            ) : stage === 0 ? (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-8 rounded-lg z-10">

                        {
                            showErrMsg === false ?
                                <>
                                    <p className="text-lg font-semibold mb-4 ml-12">Are you sure you want to initiate early repayment?</p>
                                    <p className="mb-4">Loan decisions are irreversible and may incur dire consequences.</p>
                                </>
                                :
                                <></>
                        }

                        {
                            showErrMsg &&
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5" role="alert">
                                <span className="block sm:inline">
                                 <b className="text-red-700">Error Message:</b>  &nbsp; {errMsg}
                                    </span>
                                {/* <span className="absolute top-0 bottom-0 right-0 px-4 py-3" >
                                    <svg onClick={closeAlert} className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                                </span> */}
                            </div>
                        }

                        {
                            showErrMsg === false ?
                                <div className="flex justify-end">
                                    <div style={{ marginLeft: '-300px' }}>
                                        {/* <button onClick={handleSubmit}  className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white  py-2 px-4 rounded mr-4 font-medium text-sm" style={{ backgroundColor: '#071B7B', width: '200px', fontWeight: '400' }}>
                <span>Repay all loans</span>
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
              </button> */}
                                        <button onClick={handleSubmit} className="relative bg-blue-500 cursor-pointer hover:bg-blue-700 text-white py-2 px-4 rounded mr-4 font-medium text-sm" style={{ backgroundColor: '#071B7B', width: '200px', fontWeight: '400' }}>
                                            <span className={`${showSpinner2 ? 'opacity-100' : 'opacity-100'} inline-flex items-center`}>Repay this loan</span> &nbsp;
                                            {showSpinner2 &&
                                                <div className="absolute ml-28 inset-0 flex items-center justify-center">
                                                    <svg aria-hidden="true" className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                                    </svg>
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            }
                                        </button>


                                        <button onClick={() => window?.location.reload()} className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white py-2 px-4 rounded font-medium text-sm" style={{ backgroundColor: '#E43434', width: '200px', fontWeight: '400' }}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                                :
                                <></>
                        }

                    </div>
                </div>
            ) : showSuccessAlert === true ? (
                <div className="m-auto grid mb-10 items-center text-center">
                    <img src={Image.success} alt="success" className="m-auto" />
                    <p className="text-black font-bold mb-3 text-[20px]">All Loans have been repayed Successfully</p>
                    <p className="text-[#656C75] text-[12px]">Thanks for banking with us!</p>
                </div>
            ) :
                <></>
            }
        </Overlay>
    );
};

export default EarlyRepaymentModal;
