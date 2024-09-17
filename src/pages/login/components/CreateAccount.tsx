import React, { useState } from "react";
import { Image } from "../../../assets";
import DefaultInput from "../../../components/reusables/DefaultInput";
import OnboardingLayout from "./OnboardingLayout";
import { ErrorCard } from "../../../Utils/HttpResponseHandlers/error";
import { apiCall } from "../../../Utils/URLs/axios.index";
import SuccessPage from "./SuccessPage";
import  { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { SpinnerIcon } from "../../../components/reusables/icons";


const CreateAccount = ({ setPage }: any) => {
  //console.log(setPage, "from create account");
  const navigate=useNavigate()
  const [successModal, setsuccessModal] = useState<any>(false);
  const [errMsg, setErrorMsg] = useState<any>("");
  const [showSpinner, setShowSpinner] = useState<any>(false);
  const [disableBtn, setDisableBtn] = useState<any>(true);
  const [state, setState] = useState<any>({
    email:'',
    businessEmail: "",
    businessName: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    country: "",
    phone: "",
    referral: "",
    submittingError: false,
    isSubmitting: false,
    errorMssg: "",
    institutionId: ""
})

const { businessEmail, businessName, institutionId, password, confirmPassword, firstName, lastName, country, phone, referral, submittingError, isSubmitting, errorMssg,email } = state


  function handleChange(e: any) {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }
  const handelSubmit = async (e: React.FormEvent) => {
    setShowSpinner(true);
    e.preventDefault();
    setState((state: any) => ({
        ...state,
        isSubmitting: true
    }))
   try {
    if(password!==confirmPassword){
      setErrorMsg("Passwords do not match!")
      throw new Error('The password does not match');
    }
    else{
      const response = await apiCall({
          name: "selfOnboarding",
          data: {
              // businessName,
              // phone,
              email: businessEmail,
              firstName,
              lastName,
              password: password,
              institutionId,
              stage: "create_merchant"
          },
          action: (): any => {
              setState({
                  ...state,
                  isSubmitting: false,
                  submittingError: false,
                  email: businessEmail,
                  firstName:'',
                  lastName:'',
                  password: "",
                  confirmPassword: "",
                  businessName: "",
                  // description: "",
                  phone: "",
                  // address: "",
                  errorMssg: "",
                  businessEmail:''
              })
                setsuccessModal(true);
                setShowSpinner(null);
              // router.push("/login");
              return []
          },
          successDetails: {
              title: "successful",
              text: `Account created successfully, kindly check email for verification`,
              icon: ""
          },
          errorAction: (err?: any) => {
            console.error("error API>>", err);
            setErrorMsg(err?.response?.data?.respDescription);
            setShowSpinner(null);
              if (err && err?.response?.data) {
                  setState({
                      ...state,
                      submittingError: true,
                      isSubmitting: false,
                      errorMssg: err?.response?.data?.respDescription//err?.response?.data?.errorMssg || err?.response?.errorMssg || err?.response?.data?.respDescription || err?.response?.respDescription || "Action failed, please try again"
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
      
    }
    // .then(async (res:any) => {
    //   console.log("API success>>", res);
    // })
} catch (e:any) {
    console.error(e.message);
   setState({
    ...state,
    submittingError: true,
    isSubmitting: false, errorMssg:e.message
   })
};
}
function toggleSuccessModal() {
  setsuccessModal(!successModal)
}

  return (
    <OnboardingLayout>
        {
        showSpinner &&
        <div role="status" className='absolute top-0 right-0 p-4'>
        <SpinnerIcon/>
         <span className="sr-only">Loading...</span>
       </div>
      }
      <Toaster/>
    <div className="grid h-screen gap-[10px] items-center px-[20px] ">
      <div className="grid gap-[10px] ">

      <div className=" w-full grid gap-[20px] ">
        <img src={Image.logo} alt="visum logo" />
        <p className="text-black text-[20px] font-500">Create an account</p>
      </div>
      <DefaultInput
        type="text"
        label="Business Name"
        required={true}
        placeHolder="Business Name"
        name="businessName"
        value={businessName}
        handleChange={handleChange}
      />

      <div className="grid md:grid-cols-2 gap-[10px]">
        <DefaultInput
          type="text"
          label="First Name"
          required={true}
          placeHolder="First Name"
          name="firstName"
          value={firstName}
          handleChange={handleChange}
        />

        <DefaultInput
          type="text"
          label="Last Name"
          required={true}
          placeHolder="Last Name"
          name="lastName"
          value={lastName}
          handleChange={handleChange}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-[10px]">
        <DefaultInput
          type="text"
          label="Email"
          required={true}
          placeHolder="Email"
          name="businessEmail"
          value={businessEmail}
          handleChange={handleChange}
        />

        <DefaultInput
          type="text"
          label="Phone Number"
          required={true}
          placeHolder="+235 8135638849"
          name="phone"
          value={phone}
          handleChange={handleChange}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-[10px]">
        <DefaultInput
          type="password"
          label="Password"
          required={true}
          placeHolder="********"
          name="password"
          value={password}
          validate={true}
          handleChange={handleChange}
        />
{/* confirmPassword */}
        <DefaultInput
          type="password"
          label="Confirm Password"
          required={true}
          placeHolder="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          validate={true}
          handleChange={handleChange}
          confirmPassword={true}
          compare={password}
        />
      </div>

    {
      password !== confirmPassword && confirmPassword?.length > 1 ?
      <>
        <div className="grid md:grid-cols-2 gap-[10px] mt-[-10px]">
        <small></small>
        <small className="text-red-500">Passwords do not match!</small>
      </div>
      </>
      :
      <></>
    }

      <div className="  grid gap-[10px]">
        <div className="flex gap-2 text-[12px]">
          <input type="checkbox"  onClick={() => setDisableBtn(!disableBtn)}/>
          <p className="opacity-50">
            By clicking the “Create your account” button, you agree to VISUM{" "}
            <span className="text-[#5BC6F2] m-0 ">terms of acceptable
            use</span>. 
          </p>
          {
        showSpinner &&
        <div role="status">
        <SpinnerIcon/>
         <span className="sr-only">Loading...</span>
       </div>
      }
        </div>
        <ErrorCard handleClear={() => setState({ ...state, submittingError: false })} error={errMsg} containerVariant={!submittingError ? "hidden" : ""} />
        <button disabled={disableBtn}  onClick={handelSubmit} className="w-full rounded-lg bg-primary text-white py-[8px] px-[10px] mt-[20px] hover:bg-blue-500">
          Create Account
        </button>
      </div>
      <p>
        Already have an account ?{" "}
        <span
          className="text-primary underline m-0 cursor-pointer"
          onClick={() => navigate('/')}
         
        >
          Login
        </span>{" "}
      </p>
      </div>
    </div>
    <SuccessPage toggleDropdown={toggleSuccessModal} isOpen={successModal} email={email}/>

    </OnboardingLayout>
  );
};

export default CreateAccount;
