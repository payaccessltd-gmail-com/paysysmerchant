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
import { rejectLoanOffer } from "../../containers/loanApis";

const RejectOfferModal = ({ toggleDropdown, isOpen, stage, setStage }: any) => {
  const [isLoading, setisLoading] = useState<any>(false);
  const location = useLocation();

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
    // setisLoading(true);
    // setTimeout(() => {
    //   toggleDropdown()
    // }, 6000);
    rejectLoanOffer(location?.state?.id).then((response: any) => {
      setShowErrMsg(null)
      setShowSuccessMsg(true);
      setSuccessMsg(`${response?.respDescription}`);
      setChecked(false);
      setTimeout(() => {
        setShowSuccessMsg(false);
        window.location.reload();
      }, 3000);
      navigate("/loans");
    }).catch((err: any) => {
      console.error("API error>>", err?.response?.data?.respDescription);
      setShowSuccessMsg(null);
      setShowErrMsg(true);
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
            <p className="text-lg font-semibold mb-4 ml-12">Are you sure you want to reject this Loan offer?</p>
            <p className="mb-4">Loan decisions are irreversible and may incur dire consequences.</p>
            <div className="flex justify-end">
             <div style={{marginLeft: '-300px'}}>
             <button onClick={handleSubmit}  className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white  py-2 px-4 rounded mr-4 font-medium text-sm" style={{ backgroundColor: '#071B7B', width: '200px', fontWeight: '400' }}>
                Reject Offer
              </button>
              <button onClick={() => window?.location.reload()} className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white py-2 px-4 rounded font-medium text-sm" style={{ backgroundColor: '#E43434', width: '200px', fontWeight: '400' }}>
                Cancel
              </button>
             </div>
            </div>
          </div>
        </div>
      ) : showSuccessAlert === true ? (
        <div className="m-auto grid mb-10 items-center text-center">
          <img src={Image.success} alt="success" className="m-auto" />
          <p className="text-black font-bold mb-3 text-[20px]">Loan Accepted Successfully</p>
          <p className="text-[#656C75] text-[12px]">We hope that you enjoy the benefits offered</p>
        </div>
      ) :
        <></>
      }
    </Overlay>
  );
};

export default RejectOfferModal;
