import { useEffect, useState } from "react";
import OnboardingLayout from "./OnboardingLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { Image } from "../../../assets";
import { Button } from "../../../components/reusables/DefaultButton";
import DefaultInput from "../../../components/reusables/DefaultInput";
import OTPInput from "../../../components/reusables/OTPInput/Index";
import errorAlert, {
  ErrorCard,
} from "../../../Utils/HttpResponseHandlers/error";
import { apiCall } from "../../../Utils/URLs/axios.index";
import { Toaster } from "react-hot-toast";
import {
  answerSecurityQuestions,
  getUserSecurityQuestions,
  updatePasswordSecurityQuestions,
} from "../../../containers/securityApis";
import Loading from "../../../components/Loading";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state;
  const [step, setStep] = useState(1);
  const [securityQuestions, setsecurityQuestions] = useState([]);
  const [state, setState] = useState({
    password: "",
    confirmPassword: "",
    submittingError: false,
    isSubmitting: false,
    isDisabled: false,
    errorMssg: "",
  });
  const [otp, setOtp] = useState("");
  const [securityToken, setsecurityToken] = useState('')
  const {
    password,
    confirmPassword,
    submittingError,
    isDisabled,
    isSubmitting,
    errorMssg,
  } = state;
  const [clearInput, setclearInput] = useState(false);
const [isLoading, setisLoading] = useState(false)
  function handleChange(e: any) {
    const { name, value } = e.target;
    setState((state: any) => ({
      ...state,
      [name]: value,
      submittingError: false,
    }));

    setState((state: any) => ({
      ...state,
      submittingError: false,
    }));
  }
  const initialState: { [key: string]: string } = {};

  securityQuestions.forEach((_: any, index: any) => {
    initialState[`SecQuestion${index + 1}`] = "";
  });
  const [answers, setAnswers] = useState<any>(initialState);
  const handleSecurityChange = (name: string, value: string) => {
    setAnswers((prevAnswers: any) => ({
      ...prevAnswers,
      [name]: value,
    }));
  };
  async function getQuestions() {
    setisLoading(true)
    try {
      const res: any = await getUserSecurityQuestions(email);
    //  console.log(res);

      if (res.respCode === "96") {
        const err = res.respBody;
        errorAlert({ title: "Error", text: `${res.respDescription}`, errors: "", icon: "" });
        // setStep(1);
        return;
      }
      setsecurityQuestions(res);
    } catch (error: any) {
      console.error(error);
      setStep(1);
      errorAlert({
        title: "Error",
        text: "Something went wrong!Please try again Later",
        errors: "",
        icon: "",
      });
    } finally{
    setisLoading(false)

    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setState((state: any) => ({
      ...state,
      isSubmitting: true,
    }));
    setclearInput(false);
    if (otp === "") {
      setStep(1)

      return setState({
        ...state,
        isSubmitting: false,
        submittingError: true,
        errorMssg: "Please refill Otp",
      });
    } else if (password === "") {
      setState({
        ...state,
        isSubmitting: false,
        submittingError: true,
        errorMssg: "Password must be filled",
      });

    } else if (confirmPassword !== password) {
      setState({
        ...state,
        isSubmitting: false,
        submittingError: true,
        errorMssg: "Password and Confirm Password must be the same",
      });

      setTimeout(() => {
        setState((state: any) => ({
          ...state,
          submittingError: false,
        }));
      }, 2500);
    } else {
      try {
        const res = await updatePasswordSecurityQuestions(
          email,
          password,
          confirmPassword,
          securityToken
        );
        setTimeout(() => {
          navigate("/");
        }, 2500);
      } catch (error: any) {
        setState({
          ...state,
          isSubmitting: false,
          submittingError: true,
          errorMssg:
            error?.response?.data.respDescription ||
            error?.response?.data[1] ||
            "Something went wrong! Try again Later.",
        });

        setTimeout(() => {
          setState((state: any) => ({
            ...state,
            submittingError: false,
          }));
        }, 2500);
      } finally {
        setclearInput(true);
        setState((state: any) => ({
          ...state,
          confirmPassword: "",
          password: "",
        }));
      }
    }
  }

  useEffect(() => {
    if (submittingError) {
      setTimeout(() => {
        setState((prevState: any) => ({
          ...prevState,
          submittingError: false,
        }));
      }, 3000);
    }
  }, [submittingError]);

  async function verifyOtp() {
    try {
      await apiCall({
        name: "validateOtp",
        data: {
          otp: otp,
        },
        successDetails: {
          title: "Successful",
          text: `Your email was verified successfully, please continue`,
          icon: ""
        },
        action: (): any => [""],
        errorAction: (err?: any) => {
          setState({
            ...state,
            submittingError: true,
            errorMssg: "Action failed, please try again"
          })
          return ["skip"];
        }
      })
      setStep(2)
    
      getQuestions()
    } catch (error:any) {
      console.error(error)
      setStep(1)
    }
  }

  async function answerSecurityQuestion() {
    try {
      const res=await answerSecurityQuestions(securityQuestions[0],
        securityQuestions[1],
        answers.question1,
        answers.question2,
        email)

      //  console.log(res)
        if(res.respCode==='96'){
          errorAlert({title:'Error',text:res.respDescription,errors:'',icon:''})
          return
        }
        setsecurityToken(res.encodedTokenForAuthorization)
        setStep(3)
    } catch (error:any) {
      console.error(error)
    } finally {

    }
  }
  return (
    <OnboardingLayout>
      <Toaster />
      <div className="grid h-screen  items-center px-[20px]  md:w-3/4 m-auto">
        <div className="flex flex-col gap-[20px] ">
          <div className=" w-full  grid gap-[20px] mb-[20px]">
            <img src={Image.logo} alt="visum logo" className="m-auto" />
            <p className="text-black font-sfpro-semibold text-center text-[25px] font-500">
              Create New Password
            </p>
          </div>
          {step === 1 && (
            <>
              <div className=" grid gap-1">
                <p className="text-[16px] text-bold">Enter the 5 digit OTP</p>

                <OTPInput
                  length={5}
                  className="flex gap-5 w-full justify-between"
                  inputClassName="w-8 h-8 text-3xl text-center border border-gray-300 rounded-md focus:border border-gray-200 focus:ring-1 ring-blue-aqua"
                  isNumberInput
                  autoFocus
                  clearInputs={clearInput}
                  onChangeOTP={(otp) => setOtp(otp)}
                />
              </div>
              
              
              <div className="grid gap-1">
                <p className="text-[16px]">
                  Remember Password?{" "}
                  <span
                    className="text-primary underline m-0 hover:cursor-pointer"
                    onClick={() => navigate("/")}
                  >
                    Login
                  </span>{" "}
                </p>
                <ErrorCard
                handleClear={() =>
                  setState({ ...state, submittingError: false })
                }
                error={errorMssg}
                containerVariant={!submittingError ? "hidden" : ""}
              />
                {/* <Button title="Next" onClick={() => setStep(2)} /> */}
              </div>
              <Button title="Next" onClick={verifyOtp} />
            </>
          ) }
           {step===2 && (
            isLoading?
            <Loading/>
            :
          
            
              securityQuestions.length > 0?
              <>
              <p className="text-[#656C75] mt-[15px] text-[25px]">
                Answer your security questions below to reset your password
              </p>
              { securityQuestions.map((val: any, index: any) => (
                <DefaultInput
                  label={val}
                  name={`question${index + 1}`}
                  value={answers[`question${index + 1}`]}
                  placeHolder={`Security Question ${index + 1}`}
                  handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleSecurityChange(
                      `question${index + 1}`,
                      e.target.value
                    )
                  }
                />
              ))}
              </>
             :
                // <>
                <p className="text-center text-[20px]">You have no security questions set! Kindly Contact support</p>
                // </>
)}
                <div className="grid gap-1">
                <p className="text-[16px]">
                  Remember Password?{" "}
                  <span
                    className="text-primary underline m-0 hover:cursor-pointer"
                    onClick={() => navigate("/")}
                  >
                    Login
                  </span>{" "}
                </p>
                <ErrorCard
                handleClear={() =>
                  setState({ ...state, submittingError: false })
                }
                error={errorMssg}
                containerVariant={!submittingError ? "hidden" : ""}
              />
              {securityQuestions.length>0 &&
              
            <Button title="Next" onClick={() => answerSecurityQuestion()} />
            }
              </div>
           
          
          {step===3&& (
            <>
              <DefaultInput
                type="password"
                label="Password"
                required={true}
                placeHolder="*********"
                name="password"
                value={password}
                handleChange={handleChange}
              />
              <div className="grid gap-1">
                <DefaultInput
                  type="password"
                  label="Confirm Password"
                  required={true}
                  placeHolder="*********"
                  name="confirmPassword"
                  value={confirmPassword}
                  handleChange={handleChange}
                />
                <p className="text-[16px]">
                  Remember Password?{" "}
                  <span
                    className="text-primary underline m-0 hover:cursor-pointer"
                    onClick={() => navigate("/")}
                  >
                    Login
                  </span>{" "}
                </p>
                </div>
              <ErrorCard
                handleClear={() =>
                  setState({ ...state, submittingError: false })
                }
                error={errorMssg}
                containerVariant={!submittingError ? "hidden" : ""}
              />
              <Button title="Reset Password" onClick={handleSubmit} />
            </>
          )}
         
          
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default ResetPassword;
