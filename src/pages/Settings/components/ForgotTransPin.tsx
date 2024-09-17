import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Button } from "../../../components/reusables/DefaultButton";
import { apiCall } from "../../../Utils/URLs/axios.index";
import OTPmodal from "./OTPmodal";

const ForgotTransPin = () => {
  const [otpModal, setotpModal] = useState(false)
  const [email, setEmail] = useState<any>("");
  const [select, setSelect] = useState("");
  const [phoneNumber, setphoneNumber] = useState<any>("");
  const [state, setState] = useState<any>({
    submittingError: false,
    isSubmitting: false,
    isDisabled: false,
    errorMssg: ""
})

const { submittingError, isDisabled, isSubmitting, errorMssg } = state

function toggleOtpModal() {
  setotpModal(!otpModal)
}

  useEffect(() => {
    let getDetails: any = localStorage.getItem("userDetails");
    let parseDetails = JSON.parse(getDetails);
    setEmail(parseDetails.email);
    let phone = parseDetails.merchantDetails;
    setphoneNumber(phone.phone);
  });

  const generateOtp = async (e: React.FormEvent) => {

    setState((state: any) => ({
        ...state,
        isSubmitting: true,
        submittingError: false,
        errorMssg: ""
    }))
    await apiCall({
        name: "generateOtp",
        data: {
            type: select || "EMAIL",
        },
        action: (): any => {
            setState({
                ...state,
                isSubmitting: false,
                submittingError: false,
            });
            setotpModal(true)
            return [""]
        },
        errorAction: (err?: any) => {
            setState({
                ...state,
                submittingError: true,
                isSubmitting: false,
                errorMssg: err?.response?.data?.respDescription || "Action failed, please try again"
            })
            return ["skip"];
        },
        successDetails: select == "PHONE" ?
            { title: "Please check your Phone", text: "We have sent an OTP to your business mobile number", icon: "" } :
            { title: "Please check your mail", text: "An OTP has been sent to your email", icon: "" },
    })
}

  return (
    <div className="grid gap-[20px] pb-[50px]">
      <Toaster/>
      <p className="font-bold mt-10 text-[20px]">Forgot Transaction PIN?</p>
      <p className="text-slate-500">Choose how you want to recover your PIN</p>

      <div className=" w-full grid gap-8 md:w-1/2">
        <div
          className={`${
            select == "EMAIL" ? "border border-primary" : ""
          } w-full  px-10 py-5 rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-200`}
          onClick={() => setSelect("EMAIL")}
        >
          <p className=" w-fit font-500 text-base">{email}</p>
        </div>
        <div
          className={`${
            select == "PHONE" ? "border border-primary" : ""
          } w-full px-10 py-5 rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-200`}
          onClick={() => setSelect("PHONE")}
        >
          <p className=" w-fit font-500 text-base">{phoneNumber}</p>
        </div>
        <Button
          title="Continue"
          isLoading={isSubmitting}
          onClick={generateOtp}
          />
      </div>
      <OTPmodal toggleDropdown={toggleOtpModal} isOpen={otpModal} generateOtp={generateOtp} />
    </div>
  );
};

export default ForgotTransPin;
