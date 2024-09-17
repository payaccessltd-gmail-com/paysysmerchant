import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { Image } from "../../../assets";
import DashboardLayout from "../../../components/dashboard/Index";
import { Button } from "../../../components/reusables/DefaultButton";
// import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { deleteBeneficiary } from "../../../containers/withdrawalApis";
import ResipientsTransferList from "./ResipientsTransferList";
//npm install react-tooltip styled-components --legacy-peer-deps
import successAlert from "../../../Utils/HttpResponseHandlers/success";
import errorAlert, { ErrorCard } from "../../../Utils/HttpResponseHandlers/error";

const RecipientsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state }: any = location;
  // console.log("navigate>>>", location);
  const shortForm = state?.beneficiaryName?.split(' ')?.map((letter: any) => letter?.charAt(0))?.join('');
  const [copiedText, setCopiedText] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [showTooltip2, setShowTooltip2] = useState(false);
  const [dontShowSpinner, setDontShowSpinner] = useState<any>(false);
  const [errMsg, setErrMsg] = useState<any>("");
  const [showErrMsg, setShowErrMsg] = useState<any>(false);
  const [successMsg, setSuccessMsg] = useState<any>("");
  const [showSuccessMsg, setShowSuccessMsg] = useState<any>(false);

  // Tooltip styling
  const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;
  const TooltipText: any = styled.span`
  visibility: ${(props: any | { show: null }) => (props.show ? 'visible' : 'hidden')};
  background-color: black;
  color: white;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  opacity: ${(props: any | { show: null }) => (props?.show ? '1' : '0')};
  transition: opacity 0.3s, visibility 0.3s;
`;

  // Function to handle text copy
  const handleCopyText = (statement: any, showToolTip: boolean, dontShowTooTip: boolean) => {
    const textToCopy = `${statement}`;
    navigator?.clipboard?.writeText(textToCopy)
      .then(() => {
        setCopiedText(textToCopy);
       // console.log('Text copied to clipboard:', textToCopy);
        setShowTooltip(showToolTip);
        setShowTooltip2(dontShowTooTip)
        // Hide the tooltip after a certain time (e.g., 2 seconds)
        setTimeout(() => {
          setShowTooltip(false);
          setShowTooltip2(false);
        }, 2000);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
      });
  };

  const deleteRecipient = () => {
    setDontShowSpinner(true);
    // console.log("recipient data to be deleted>>>", state);
    deleteBeneficiary(state?.id).then((item: any) => {
     // console.log("res>>>", item);
      setShowErrMsg(null)
      setShowSuccessMsg(true);
      setTimeout(() => {
        setShowSuccessMsg(false);
       window.location.reload()
      }, 3000)
      setSuccessMsg(`${item}`);
    }).catch((err: any) => {
      console.error("error>>", err?.response?.data?.respBody);
      setShowSuccessMsg(null);
      setShowErrMsg(true)
      setTimeout(() => setShowErrMsg(false), 3000)
      setErrMsg(`${err?.response?.data?.respBody}`)
    }).finally(() => setDontShowSpinner(false));
  }

  const closeAlert = () => {
    setShowErrMsg(false);
  }

  return (
    <DashboardLayout>
      <div className="flex gap-2 py-5 items-center text-slate-400 ">
      {/* border-b-[1px] */}
        <IoMdArrowBack
          className="hover:text-black hover:cursor-pointer "
          onClick={() => navigate(-1)}
        />
        <p className="text-[10px] md:text-[15px] ">
          <span
            className="hover:underline hover:cursor-pointer hover:text-black"
            onClick={() => navigate("/recipients")}
          >
            Recipients
          </span>{" "}
          / Recipient name
        </p>
      </div>
      <div className="flex justify-between items-center">
        <p className="grid gap-[20px] text-[16px] font-semibold mt-[20px]">
          Recipients
        </p>
      </div>

      <div className="grid md:grid-cols-2">
        <div className="p-[20px] grid gap-5 h-fit">
          <div className="flex gap-[30px] items-center ">
            <div className="p-3 bg-[#5BC6F2] rounded-full">{shortForm}</div>
            <div className="grid">
              <p className="text-[18px]">{state?.beneficiaryName}</p>
              {/* <p className="text-[#656C75] text-[16px]">
                Added on Mar 02, 2023
              </p> */}
            </div>
          </div>

          <div className="grid ">
            <div className="flex justify-between py-[20px] border-b-[1px] items-center">
              <p className="text-[12px] font-medium">{state?.bank?.bankName || "N/A"}</p>
              <TooltipContainer>
                <img src={Image.copy} alt="copy" onClick={() => handleCopyText(state?.bank?.bankName, true, false)} className="cursor-pointer" />
                <TooltipText show={showTooltip}>Copied!</TooltipText>
              </TooltipContainer>

            </div>
            <div className="flex justify-between py-[20px] border-b-[1px] items-center">
              <p className="text-[12px] font-medium">
                {state?.bank?.bankCode || "N/A"} -{" "}
                <span className="text-[#656C75]">{state?.beneficiaryValue || "N/A"},</span>{" "}
              </p>
              <TooltipContainer>
                <img src={Image.copy} alt="copy" onClick={() => handleCopyText(`${state?.bank?.bankCode} - ${state?.beneficiaryValue}`, false, true)} className="cursor-pointer" />
                <TooltipText show={showTooltip2}>Copied!</TooltipText>
              </TooltipContainer>
            </div>
          </div>

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




          <div className="md:w-1/2 " onClick={deleteRecipient}>
            {
              dontShowSpinner &&
              <div className="ml-32">
                <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                </svg>
              </div>

            }


            <Button
              className="!bg-[#CF322F] !text-white"
              title="Delete Recipient"
            />




          </div>
        </div>

        <div>
          <ResipientsTransferList />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RecipientsPage;
