import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Button } from "../../../components/reusables/DefaultButton";
import OTPInput from "../../../components/reusables/OTPInput/Index";
import Overlay from "../../../components/reusables/Overlay/Overlay";
import { apiCall } from "../../../Utils/URLs/axios.index";
import { ErrorCard } from "../../../Utils/HttpResponseHandlers/error";

const OTPmodal = ({ toggleDropdown, isOpen, generateOtp }: any) => {
  const [selectedPage, setselectedPage] = useState(0);
  const [otp, setOtp] = useState("");
  const [key, setKey] = useState(0);
  const [time, settime] = useState(149);
  const [newotp, setNewOtp] = useState("");
  const [confirmotp, setconfirmOtp] = useState("");
  const [state, setState] = useState<any>({
    submittingError: false,
    isSubmitting: false,
    isDisabled: false,
    errorMssg: "",
  });
//console.log(key,'the key')
  const { submittingError, isDisabled, isSubmitting, errorMssg } = state;
  
  //console.log(newotp)

  function closeModal() {
    toggleDropdown()
    settime(149)
    setselectedPage(0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState((state: any) => ({
      ...state,
      isSubmitting: true,
    }));
    try {
      await apiCall({
        name: "forgotPin",
        data: {
          pin: newotp,
        },
        successDetails: {
          title: "PIN Reset Successful",
          text: `Your Transaction pin was reset successfully`,
          icon: "",
        },
        action: (): any => {
          setState({
            ...state,
            isSubmitting: false,
            submittingError: false,
          });
          return [""];
        },
        errorAction: (err?: any) => {
          setState({
            ...state,
            submittingError: true,
            isSubmitting: false,
            errorMssg:
              err?.response?.data?.respDescription ||
              "Action failed, please try again",
          });
          return [];
        },
      }).then(async (res: any) => {
        if (res) {
          // showModal();
          setState((prevState:any)=>({
            ...prevState,
            isSubmitting: false,
            submittingError: false,
            check: true,
            errorMssg: "",
          }));

          setTimeout(() => {
            closeModal()
          }, 3000);
        }
      });
    } catch (e) {
      console.error(e + " 'Caught Error.'");
    }
  };
  const validateOtp = async (e: React.FormEvent) => {
    setState((state: any) => ({
      ...state,
      isSubmitting: true,
      submittingError: false,
      errorMssg: "",
    }));
    
    try {
        await apiCall({
          name: "validateOtp",
          data: {
            otp: otp,
          },
          successDetails: {
            title: "Successful",
            text: `Your otp was verified successfully, please continue`,
            icon: "",
          },
    
          action: (): any => {
            setState((prevState: any) => ({
              ...prevState,
              isSubmitting: false,
              submittingError: false,
            }));
            setselectedPage(1);
            return ["skip"];
          },
          errorAction: (err?: any) => {
            setState((prevState: any) => ({
              ...prevState,
              submittingError: true,
              isSubmitting: false,
              errorMssg:
                err?.response?.data[0] ||
                "Action failed, please try again",
            }));
            return ["skip"];
          },
        });
        
    } catch (error) {
        console.error(error)
    }
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      if (time > 0) {
        settime(time - 1);
      } else {
        clearInterval(countdown); // Stop the countdown when it reaches 0
      }
    }, 1000); // Update the timer every second

    return () => {
      clearInterval(countdown); // Clean up the interval when the component unmounts
    };
  }, [time]);

  return (
    <Overlay toggleDropdown={closeModal} isOpen={isOpen}>
      <Toaster />
      {selectedPage === 0 ? (
        <div className="grid gap-2">
          <p className="font-bold text-[20px]">OTP Verification</p>
          <p className="text-[16px]">
            Please enter code sent to your device below
          </p>
          <OTPInput
            length={5}
            className="flex gap-5"
            inputClassName="w-8 h-8 text-3xl text-center border border-gray-300 rounded-md focus:border border-gray-200 focus:ring-1 ring-blue-aqua"
            isNumberInput
            autoFocus
            onChangeOTP={(otp) => setOtp(otp)}
          />
          <p className="w-fit text-base font-500 mt-3">
            {`Haven't recieved code? `}
            <span
              className="text-primary cursor-pointer"
              onClick={() => {
                if (time === 0) {
                    generateOtp();
                    settime(149);
                }else{
                    setState((prevState:any)=>({
                        ...prevState,
                        errorMssg:'Resend after the countdown',
                        submittingError:true
                    }))

                    setTimeout(() => {
                        setState((prevState:any)=>({
                            ...prevState,
                            errorMssg:'',
                            submittingError:false 
                        }))
                    }, 5000);
                }
              }}
            >
              Click to resend{" "}
            </span>
            {time>0 &&<span className="text-gray-300 m-0">{time}</span> }
          </p>
          <ErrorCard handleClear={() => setState({ ...state, submittingError: false })}
              error={errorMssg} containerVariant={!submittingError ? "hidden" : ""} />
          <Button
            title="Continue"
            isLoading={isSubmitting}
            onClick={validateOtp}
          />
        </div>
      ) : (
                    <div className=" grid justify-between gap-10">
                        <div className="grid items-center gap-8">
                            <div>
                                <p className=' w-fit text-[20px] font-700 '>Change Transaction PIN</p>
                                <p className='px-4 py-2 bg-[#FFAA0920] rounded-lg text-gray-500 w-fit md:w-[300px] text-xs font-300 leading-5 mt-3 '>Important: Your transaction PIN will be used across all channels to verify your transactions, Do not disclose </p>
                            </div>

                                <div className='grid'>
                                    <label className='mb-2'>Setup a New 6-digit PIN</label>
                                    <OTPInput
            length={6}
            className="flex justify-between md:justify-normal md:gap-5 "
            inputClassName="w-8 h-8 text-3xl text-center border border-gray-300 rounded-md focus:border border-gray-200 focus:ring-1 ring-blue-aqua"
            isNumberInput
            autoFocus
            onChangeOTP={(otp) => setNewOtp(otp)}
          />
                                    <label className='mt-4 mb-2'>Confirm the PIN above</label>
                                    <OTPInput
            length={6}
            className="flex justify-between md:justify-normal md:gap-5"
            inputClassName="w-8 h-8 text-3xl text-center border border-gray-300 rounded-md focus:border border-gray-200 focus:ring-1 ring-blue-aqua"
            isNumberInput
            autoFocus
            onChangeOTP={(otp) => setconfirmOtp(otp)}
          />
                                </div>
                        </div>
                        <div className="grid items-center">
                            <ErrorCard handleClear={() => setState({ submittingError: false })} error={errorMssg} containerVariant={!submittingError ? "hidden" : ""} />
                            <Button
                                title="Change pin"
                                variant={"bg-primary-blue mt-4"}
                                isLoading={isSubmitting}
                                onClick={handleSubmit}
                            />
                        </div>
                    </div>
      )}
    </Overlay>
  );
};

export default OTPmodal;
