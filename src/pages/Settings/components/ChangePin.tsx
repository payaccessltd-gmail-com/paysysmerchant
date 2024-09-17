import React, { useEffect, useRef, useState } from "react";
import OtpInput from "react-otp-input";
import { Button } from "../../../components/reusables/DefaultButton";
import OTPInput from "../../../components/reusables/OTPInput/Index";
import { ErrorCard } from '../../../Utils/HttpResponseHandlers/error'
import { Toaster } from 'react-hot-toast'
import { apiCall } from "../../../Utils/URLs/axios.index";

const ChangePin = () => {
  const [otp, setOtp] = useState("");
  const [newOtp, setnewOtp] = useState("");
  const [confirmOtp, setconfirmOtp] = useState("");
  const [validatePin, setvalidatePin] = useState(false)
  const [clearInput, setclearInput] = useState(false)

  const [state, setState] = useState<any>({
    submittingError: false,
    isSubmitting: false,
    isDisabled: false,
    errorMssg: ""
})

const { submittingError, isDisabled, isSubmitting, errorMssg } = state

useEffect(() => {
  if (newOtp !== confirmOtp) {
      setState({
          ...state,
          isDisabled: true,
          submittingError: true,
          errorMssg: "Your pin doesn't match."
      })
  } else {
      setState({
          ...state,
          isDisabled: false,
          submittingError: false,
      })
  }
}, [confirmOtp])

const handleSubmit=async (e: React.FormEvent) => {
  e.preventDefault();
  setState((state: any) => ({
      ...state,
      isSubmitting: true
  }))
setvalidatePin(false)
setclearInput(false)
if(otp==='' || newOtp === '') {
  return setState({
  ...state,
  isSubmitting: false,
  submittingError: true,
  check: true,
  errorMssg: "Inputs must be filled"
})}else{
  try {
    try {
      await apiCall({
        name:'validatePin',
        data:{
          pin:otp
        }
      })
      setvalidatePin(true)
    } catch (error) {
      setState({
        ...state,
        isSubmitting: false,
        submittingError: true,
        check: true,
        errorMssg: "Current pin is incorrect"
    });
    }
    if(validatePin){
      await apiCall({
        name: "changePin",
        data: {
            oldPin: otp,
            newPin: newOtp,
        },
        successDetails: {
            title: "PIN Reset Successful",
            text: `Your Transaction changed has changed successfully`,
            icon: ""
        },
        action: (): any => {
            setState({
                ...state,
                isSubmitting: false,
                submittingError: false,
            });
            return [""]
        },
        errorAction: (err?: any) => {
            setState({
                ...state,
                submittingError: true,
                isSubmitting: false,
                errorMssg: err?.response?.data?.respDescription || "Action failed, please try again"
            })
            return [];
        }
    })
        .then(async (res: any) => {
            if (res) {
                setState({
                    ...state,
                    isSubmitting: false,
                    submittingError: false,
                    check: true,
                    errorMssg: ""
                });
            }
        })
    }
  } catch (error) {
    
  } finally{
    setclearInput(true)
  }

}
}
//console.log(newOtp,'the otp')

  return (
    <div className="grid gap-[20px] mt-10">
      <Toaster/>
      <div className="grid gap-2">
        <p className="text-[16px]">Enter Current 6 digit OTP</p>
        <OTPInput
          length={6}
          className="flex gap-5"
          inputClassName="w-8 h-8 text-3xl text-center border border-gray-300 rounded-md focus:border border-gray-200 focus:ring-1 ring-blue-aqua"
          isNumberInput
          autoFocus
          clearInputs={clearInput}
          onChangeOTP={(otp) => setOtp(otp)}
        />
      </div>
      <div className="grid gap-2">
        <p className="text-[16px]">Enter New 6 digit OTP</p>
        <OTPInput
          length={6}
          className="flex gap-5"
          inputClassName="w-8 h-8 text-3xl text-center border border-gray-300 rounded-md focus:border border-gray-200 focus:ring-1 ring-blue-aqua"
          isNumberInput
          autoFocus
          clearInputs={clearInput}
          onChangeOTP={(otp) => setnewOtp(otp)}
        />
      </div>
      <div className="grid gap-2 w-fit">
        <p className="text-[16px]">Confirm New 6 digit OTP</p>
        <OTPInput
          length={6}
          className="flex gap-5"
          inputClassName="w-8 h-8 text-3xl text-center border border-gray-300 rounded-md focus:border border-gray-200 focus:ring-1 ring-blue-aqua"
          isNumberInput
          autoFocus
          clearInputs={clearInput}
          onChangeOTP={(otp) => setconfirmOtp(otp)}
        />
      <ErrorCard handleClear={() => setState({ ...state, submittingError: false })} error={errorMssg} containerVariant={!submittingError ? "hidden" : ""} />
      <Button title='change PIN' className='!mt-[50px]' onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default ChangePin;
