import React, { useState, useEffect } from 'react'
import { Image } from '../../assets'
import NavBarItems from '../../components/reusables/NavBarItems';
import RegistrationSideBar from '../../components/reusables/RegistrationSideBar';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/reusables/DefaultButton';
import { OtpInputs } from '../../components/reusables/OTPInputBox';
import OTPInput from '../../components/reusables/OTPInput/Index';
import { ErrorCard } from '../../Utils/HttpResponseHandlers/error';
import { apiCall } from '../../Utils/URLs/axios.index';



function CreatePin() {
  const [otp, setOtp] = useState('');
  const [cotp, setCOtp] = useState('');
  const navigate = useNavigate();
  const onChangeOTP = (value: string) => {
    setOtp(value);
   // console.log("OTP Value>>", value)
  };
  const onChangeCOTP = (value: string) => {
    setCOtp(value);
   // console.log("OTP Value>>", value)
  };

  const [state, setState] = useState<any>({
    pin: "",
    confirmPin: "",
    submittingError: false,
    isSubmitting: false,
    isDisabled: false,
    errorMssg: ""
})

const { pin, confirmPin, submittingError, isDisabled, isSubmitting, errorMssg } = state;

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
  //   localStorage.setItem('onboardingStageKey', "secure_account");
  //   await localStorage.setItem('onboardingStage', JSON.stringify({onboardingStage:"secure_account"}));  
  //  navigate("/registrations/bvn"); 
      const response = await apiCall({
          name: "selfOnboarding",
          data: {
              pin: cotp,
              stage: "secure_account"
          },
          action: (): any => {
              setState({
                  ...state,
                  isSubmitting: false,
                  submittingError: false,
              });
              navigate("/registrations/security-questions")
              return []
          },
          successDetails: {
              title: "PIN Created",
              text: `Your transation PIN has been created successfully.`,
              icon: ""
          },
          errorAction: (err?: any) => {
            console.error("err>>>", err?.message)
              if (err && err?.response?.data) {
                  setState({
                      ...state,
                      submittingError: true,
                      isSubmitting: false,
                      errorMssg: err?.message //|| err?.response?.errorMssg || err?.response?.data?.respDescription || err?.response?.respDescription || "Action failed, please try again"
                  })
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
           // console.log("successfull OTP>>", res);
            localStorage.setItem('onboardingStageKey', "secure_account");
              await localStorage.setItem('onboardingStage', JSON.stringify({onboardingStage:"secure_account"}));
              navigate("/registrations/security-questions"); 
              setState({
                  submittingError: false,
                  isSubmitting: false,
                  errorMssg: ""
              })
          })
  } catch (e) {
      console.error(e + " 'Caught Error.'");
  };
}

useEffect(() => {
  if (cotp !== otp && cotp?.length > 0) {
      setState({
          ...state,
          isDisabled: true,
          submittingError: true,
          errorMssg: "your pin must match."
      })
  } else {
      setState({
          ...state,
          isDisabled: false,
          submittingError: false,
      })
  }
}, [cotp])


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
              <p className="text-xl">Let's Secure Your Account</p>
              <p className="text-sm text-gray-400 w-max">Create a PIN to authenticate your transactions</p>
            </div>
            <div className="p-4">
              <p className="text-base">Enter 6 digit PIN</p>
              <div className="flex">
                {/* <div className="grid grid-cols-6 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((index) => (
                    <input
                      key={index}
                      type="text"
                      className="w-8 h-8 text-3xl text-center border border-gray-300 rounded-md"
                      maxLength={1}
                    />
                  ))}   
                </div> */}
                {/* <OtpInputs value={otp} valueLength={5} onChange={onChangeOTP} /> */}
                <OTPInput
                  length={6}
                  className="flex gap-5"
                  inputClassName="w-8 h-8 text-3xl text-center border border-gray-300 rounded-md focus:border border-gray-200 focus:ring-1 ring-blue-aqua"
                  isNumberInput
                  autoFocus
                  onChangeOTP={(otp: any) => setOtp(otp)}
                />
              </div>
            </div>
            <div className="p-4">
              <p className="text-base">Confirm 6 digit PIN</p>
              <div className="flex">
                {/* <OtpInputs value={cotp} valueLength={5} onChange={onChangeCOTP} /> */}
                <OTPInput
                  length={6}
                  className="flex gap-5"
                  inputClassName="w-8 h-8 text-3xl text-center border border-gray-300 rounded-md focus:border border-gray-200 focus:ring-1 ring-blue-aqua"
                  isNumberInput
                  autoFocus
                  onChangeOTP={(cotp: any) => setCOtp(cotp)}
                />
           
              </div>
            </div>

         

          
            <div className="p-4 lg:w-1/3 w-72 h-12 rounded-md">
              <button disabled={isDisabled} onClick={handelSubmit} className="w-full rounded-lg bg-primary text-white py-[8px] px-[10px] mt-[20px] hover:bg-primary">Continue</button>
              {/* <Button title='Continue' disable={isDisabled}/> */}
            </div>
          </div>
         <div className='mt-20 lg:w-1/3 w-72'>
         <ErrorCard handleClear={() => setState({ ...state, submittingError: false })} error={errorMssg} containerVariant={!submittingError ? "hidden" : ""} />
         </div>
        </main>
      </div>
    </div>
  )
}

export default CreatePin