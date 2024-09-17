import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image } from "../../../assets";
import { Button } from "../../../components/reusables/DefaultButton";
import DefaultInput from "../../../components/reusables/DefaultInput";
import { apiCall } from "../../../Utils/URLs/axios.index";
import OnboardingLayout from "./OnboardingLayout";
import { Toaster } from "react-hot-toast";
import { ErrorCard } from "../../../Utils/HttpResponseHandlers/error";
import { otpSecurityQuestions } from "../../../containers/securityApis";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<any>({
    email: "",
    submittingError: false,
    isSubmitting: false,
    isDisabled: false,
    errorMssg: "",
  });

  const { submittingError, isDisabled, isSubmitting, errorMssg, email } = state;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      loginError: false,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    localStorage.setItem("username", email);
    e.preventDefault();
    setState((state: any) => ({
      ...state,
      isSubmitting: true,
    }));
    try {
      const res = await otpSecurityQuestions(email);
      setState({
        ...state,
        isSubmitting: false,
        submittingError: false,
        check: true,
        errorMssg: "",
        email: "",
      });
      setTimeout(() => {
        navigate("/reset-password", { state: email });
      }, 2500);
    } catch (e) {
      // console.error(e + " 'Caught Error.'");
      console.error("error from api>>", e);
    } finally {
      setState((state: any) => ({
        ...state,
        email: "",
      }));
    }
  };
  return (
    <OnboardingLayout>
      <Toaster />
      <div className="grid h-screen  items-center md:w-3/4 m-auto px-[20px]">
        <div className="grid gap-[20px]">
          <div className=" w-full grid gap-[20px] ">
            <img src={Image.logo} alt="visum logo" />
            <p className="text-black text-[20px] font-500">Forgot Password</p>
          </div>
          <DefaultInput
            type="text"
            label="Email"
            required={true}
            placeHolder="Email"
            name="email"
            value={email}
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
          <ErrorCard
            handleClear={() => setState({ ...state, submittingError: false })}
            error={errorMssg}
            containerVariant={!submittingError ? "hidden" : ""}
          />
          <Button title="Reset Password" onClick={handleSubmit} />
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default ForgotPassword;
