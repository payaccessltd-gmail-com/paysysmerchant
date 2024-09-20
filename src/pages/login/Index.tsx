import React, { useEffect, useState } from 'react'
import { Image } from '../../assets'
import DefaultInput from '../../components/reusables/DefaultInput'
import OnboardingLayout from './components/OnboardingLayout'
import { useLocation, useNavigate } from "react-router-dom";
import { apiCall } from '../../Utils/URLs/axios.index';
import { ErrorCard } from '../../Utils/HttpResponseHandlers/error';
import { OpenEyeIcon, CloseEyeIcon, SpinnerIcon } from '../../components/reusables/icons';
import successAlert from '../../Utils/HttpResponseHandlers/success';
import { Toaster } from 'react-hot-toast';
import { fetchImpactLoanEligibility } from '../../containers/loanApis';


const Login = () => {
  const navigate = useNavigate();
  const [passwords, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSpinner, setShowSpinner] = useState<any>(false);
  const [showErrMsg, setShowErrMsg] = useState<any>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const location = useLocation();
  const redirectReason = location.state;

  const [state, setState] = useState({
    email: '', password: '', loginError: false,
    isLoggingIn: false,
    loginErrorMssg: ""
  })
  //const {email, password} =state;
  const { email, password, loginError, loginErrorMssg, isLoggingIn } = state;
  function handleChange(e: any) {
    setState({ ...state, email: e.target.value })
  }


  const handelSubmit = async (e: React.FormEvent) => {
    setShowSpinner(true);
    e.preventDefault();
    setState((state: any) => ({
      ...state,
      isLoggingIn: true
    }))
    try {
      const response = await apiCall({
        name: "loginUser",
        data: {
          username: state.email,
          password: passwords
        },
        action: (): any => {
          setState({
            ...state,
            isLoggingIn: false,
            loginError: false,
          })

          return ["skip"]
        },
        errorAction: (err?: any) => {
          setShowSpinner(null)
          console.error("API login error>>", err)
          if (err && err?.response?.data) {
            setState({
              ...state,
              loginError: true,
              isLoggingIn: false,
              loginErrorMssg: err?.response?.data?.respDescription || "Login Failed, please try again"
            })
            setShowErrMsg(true);
            setTimeout(() => setShowErrMsg(null), 5000);
            return ["skip"]
          } else {
            setState({
              ...state,
              loginError: true,
              isLoggingIn: false,
              loginErrorMssg: "Login Failed, please try again"
            })
          }
        }
      })
        .then(async (res: any) => {
          // console.log("login response>>", res);
          const { token } = res;
          const {
            id,
            firstName,
            lastName,
            email,
            username,
            entity,
            password,
            accountType,
            isEnabled,
            emailConfirmed,
            phoneNumber,
            role,
            approved,
            dateCreated,
            isAccountNonExpired,
            isAccountNonLocked,
            isCredentialsNonExpired,
            isDeleted,
            onboardingStage,
            secreteQuestionsSet
          } = res;

          await localStorage.setItem('userDetails', JSON.stringify({
            role: role,
            token,
            userId: id,
            firstName,
            merchantDetails: entity,
            lastName,
            username,
            password,
            accountType,
            email,
            isEnabled,
            emailConfirmed,
            phoneNumber,
            approved,
            dateCreated,
            isAccountNonExpired,
            isAccountNonLocked,
            isCredentialsNonExpired,
            isDeleted,
            onboardingStage,
            secreteQuestionsSet
          }))



          await localStorage.setItem('onboardingStage', JSON.stringify({
            onboardingStage
          }))

          await localStorage.setItem('merchantDetails', JSON.stringify(entity))

          if (onboardingStage === "settlement" || onboardingStage === "") {   //settlement is for a completed reg lifecycle, while "" is for onboarding just starting 
            navigate('/dashboard', { state: { securityQuestion: true } })
          } else if (onboardingStage === "secure_account") {
            navigate('/registrations/security-questions')
          }
          else if (onboardingStage === "securityQuestions") {
            navigate('/registrations/bvn')
          } else if (onboardingStage === "bvn") {
            navigate('/registrations/business-type')
          } else if (onboardingStage === "business_profile") {
            navigate('/registrations/verify-email-address')
          } else if (onboardingStage === "verify_business_email") {
            navigate('/registrations/verify-phone-number')
          } else if (onboardingStage === "verify_phone") {
            navigate('/registrations/business-location')
          } else if (onboardingStage === "set_up_location") {
            navigate('/registrations/director-profile')
          } else if (onboardingStage === "directors_details") {
            navigate('/registrations/director-profile')  //uploadId is also designed in the director-profile page
          } else if (onboardingStage === "uploadId") {
            navigate('/registrations/document-upload')
          } else if (onboardingStage === "uploadDoc") {
            navigate('/registrations/settlement-information')
          } else {
            navigate('/dashboard')
          }


        })

    } catch (e) {
      console.error(e + " 'Caught Error.'");
    }
    ;
  }

  const [isLocked, setisLocked] = useState(false)

  useEffect(() => {
    if (loginErrorMssg === 'User account is locked') setisLocked(true)
    else setisLocked(false)
  }, [loginErrorMssg])


  // console.log(loginErrorMssg,'the response')


  useEffect(() => {
    {
      redirectReason === 'notAuthenticated' && (
        successAlert({ title: "Not Authenticated", text: "Please Login to have access", icon: "" }, { data: 'any', errs: 'any', message: 'any', statusCode: 'any' })
      )
    }
  }, [])


  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      handelSubmit(event);
    }
  };

  return (
    <OnboardingLayout>
      <Toaster />
      {
        showSpinner &&
        <div role="status" className='absolute top-0 right-0 p-4'>
          <SpinnerIcon />
          <span className="sr-only">Loading...</span>
        </div>
      }
      <div className='grid h-screen  md:w-3/4 m-auto items-center px-[20px] '>

        <div className=" w-full grid gap-[20px] ">
          <img src={Image.logo} alt="paysys logo" className='w-[100px] h-100px]' />
          <p className='text-black text-[20px] font-[500]'>Sign in to your account</p>
          <div style={{ width: '380px' }}>

            {/* <DefaultInput type='text' label='Email' required={true} placeHolder='ts@emaildomain.com' name='email' value={email} handleChange={handleChange} /> */}
            <form>
              <div className="relative">
                {/* <DefaultInput type='text' label='Email' required={true} placeHolder='ts@emaildomain.com' name='email' value={email} handleChange={handleChange} />  */}
                <label> Email</label>
                <input style={{ width: '380px', borderColor: showErrMsg === true ? 'red' : '#D0D5DD' }} type="email" name='email' value={email} onChange={handleChange} onKeyDown={handleKeyPress} className="placeholder:text-[#D0D5DD] placeholder-bold py-2 px-10  rounded-lg w-80    border-[2px] border-[#D0D5DD] " placeholder="Enter your email address" />
                <img src={Image.emailLeft} style={{ marginTop: '12px' }} alt="Left Icon" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5" />
                <img src={Image.emailRight} style={{ marginTop: '12px' }} alt="Right Icon" className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5" />
              </div>
            </form>
            {
              showErrMsg &&
              <small className='text-[#F04438] font-medium'>Please enter your email address</small>
            }



          </div>
          <div className="grid gap-1 text-[#344054]" style={{ width: '380px' }}>
            <div className="flex justify-between">
              <label htmlFor="Password  text-[16px]">Password</label>
              <p style={{ color: '#00ACEF' }} className="text-primary underline hover:cursor-pointer hover:text-primary/[150]" onClick={() => navigate('forgot-password')}>
                Forgot password?
              </p>
            </div>
            {/* <input type="password" className='placeholder:text-[#D0D5DD] border-[#D0D5DD] border-[2px] rounded-md py-[10px] px-[14px]' placeholder='********' name='password'/> */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                name='password'
                className='w-full placeholder:text-[#D0D5DD] border-[#D0D5DD] border-[2px] rounded-md py-[10px] px-[14px]'
                value={passwords}
                onChange={(e) => setPassword(e?.target?.value)}
                onKeyDown={handleKeyPress}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
              >
                {showPassword ? (
                  <OpenEyeIcon />
                ) : (
                  <CloseEyeIcon />
                )}
              </button>
            </div>
          </div>
          {isLocked &&
            <p className="text-red-400 underline cursor-pointer" onClick={() => navigate('/unlock-account')}>Unlock Your Account</p>

          }
          {
            showErrMsg &&
            <div style={{ width: '380px' }}>
              <ErrorCard handleClear={() => setState({ ...state, loginError: false })}
                error={loginErrorMssg} containerVariant={!loginError ? "hidden" : ""} />
            </div>
          }

          <button style={{ width: '380px', height: '50px' }} className='w-full rounded-lg bg-primary text-white py-[8px] px-[10px] mt-[20px] cursor-pointer hover:bg-primary' onClick={handelSubmit}>
            Login
          </button>
          <p className='font-medium'>Don’t have an account ? <span style={{ color: '#00acef' }} className='text-primary underline m-0 cursor-pointer' onClick={() => navigate('create-account')}>
            Sign up
          </span> </p>
        </div>
      </div>

    </OnboardingLayout>
  )
}

export default Login