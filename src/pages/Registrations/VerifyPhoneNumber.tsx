import React, { useState, useEffect } from 'react';
import RegistrationSideBar from '../../components/reusables/RegistrationSideBar';
import NavBarItems from '../../components/reusables/NavBarItems';
import { useNavigate } from 'react-router-dom';
import OTPInput from '../../components/reusables/OTPInput/Index';
import { apiCall } from '../../Utils/URLs/axios.index';
import { ErrorCard } from '../../Utils/HttpResponseHandlers/error';

function VerifyPhoneNumber() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [errMsg, setErrorMsg] = useState<any>("");
  const [phoneNumber, setPhoneNumber] = useState<any>('');

  const [state, setState] = useState<any>({
    pin: "",
    confirmPin: "",
    submittingError: false,
    isSubmitting: false,
    isDisabled: false,
    errorMssg: ""
  })

  const { submittingError, isDisabled, isSubmitting, errorMssg } = state

  useEffect(() => {
    const handleBackButton = (event:any) => {
      event.preventDefault(); 
    };
    window.history.pushState({ page: 'myComponent' }, '', '');
    window.addEventListener('popstate', handleBackButton);
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []); 


  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState((state: any) => ({
      ...state,
      isSubmitting: true
    }))
    try {
      // localStorage.setItem('onboardingStageKey', "set_up_location");
      // await localStorage.setItem('onboardingStage', JSON.stringify({ onboardingStage: "set_up_location" }));  //to be removed later
      // navigate("/registrations/business-location"); //to be removed later
      await apiCall({
        name: "validateOtp",
        data: {
          otp: otp,
        },
        successDetails: {
          title: "Successful",
          text: `Your number was verified successfully, please continue`,
          icon: ""
        },
        action: (): any => ["skip"],
        errorAction: (err?: any) => {
          setState({
            ...state,
            submittingError: true,
            errorMssg: "Action failed, please try again"
          })
          return ["skip"];
        }
      })
      await apiCall({
        name: "selfOnboarding",
        data: {
          stage: "verify_phone",
          channel:"web"
        },
        action: (): any => {
          setState({
            ...state,
            isSubmitting: false,
            submittingError: false,
          });
          // router.push(`/create-business/${busType}?stage=location`)
          return ["skip"]
        },
        errorAction: (err?: any) => {
          if (err && err?.response?.data) {
            setState({
              ...state,
              submittingError: true,
              isSubmitting: false,
              errorMssg: err?.response?.data?.errorMssg || err?.response?.errorMssg || err?.response?.data?.respDescription || err?.response?.respDescription || "Action failed, please try again"
            })
            setErrorMsg(err?.message);
            return ["skip"]
          } else {
            setState({
              ...state,
              submittingError: true,
              isSubmitting: false,
              errorMssg: "Action failed, please try again"
            })

          }
        }
      })
        .then(async (res: any) => {
          //   console.log("res>>", res);
          localStorage.setItem('onboardingStageKey', "set_up_location");
          await localStorage.setItem('onboardingStage', JSON.stringify({ onboardingStage: "set_up_location" }));
          setState({
            submittingError: false,
            isSubmitting: false,
            errorMssg: ""
          })
          navigate("/registrations/business-location");
        })
    } catch (e) {
      console.error(e + " 'Caught Error.'");
    };
  }
  //phoneNumber
  useEffect(() => {
    const getBusinessPhoneNumber: any = sessionStorage.getItem('phoneNumber');
    setPhoneNumber(getBusinessPhoneNumber);
    // const getUserData:any = localStorage.getItem('userDetails');
    // const parseData = JSON.parse(getUserData);
    // const decode = atob(parseData?.token?.split('.')[1]);
    // console.log('decode JWT Body>>', JSON.parse(JSON.parse(decode)?.sub));
  }, [])
  return (
    <div>
      <NavBarItems />
      <div className="md:flex">
        <aside className="md:w-1/4 p-4 hidden sm:block">
          <RegistrationSideBar />
        </aside>
        <main className="md:flex-1 p-4 my-2">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4">
            <div className="p-4">
              <p className="text-xl">Verify Phone Number</p>
              <p className="text-sm text-gray-400">We have sent an OTP to your business phone number {phoneNumber}</p>
            </div>
            <div className="p-4">
              <p className="text-base">Enter 6 digit PIN</p><br />
              <div className="flex">
                <div className="grid grid-cols-6 gap-4">
                  {/* {[1, 2, 3, 4, 5, 6].map((index) => (
                    <input
                      key={index}
                      type="text"
                      className="w-8 h-8 text-3xl text-center border border-gray-300 rounded-md"
                      maxLength={1}
                    />
                  ))} */}
                  <OTPInput
                    length={6}
                    className="flex gap-5"
                    inputClassName="w-9 h-8 text-3xl text-center border border-gray-300 rounded-md focus:border border-gray-200 focus:ring-1 ring-blue-aqua"
                    isNumberInput
                    autoFocus
                    onChangeOTP={(val: any) => setOtp(val)}
                  />
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className='lg:w-1/3'>
                <ErrorCard handleClear={() => setState({ ...state, submittingError: false })} error={errMsg} containerVariant={!submittingError ? "hidden" : ""} /></p><br />
                <div onClick={handelSubmit}>
                <button className="lg:w-1/3 w-72 h-12 rounded-md bg-primary text-white  transition-all duration-500 hover:scale-105 hover:brightness-110">Continue</button>
                </div>
          </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default VerifyPhoneNumber