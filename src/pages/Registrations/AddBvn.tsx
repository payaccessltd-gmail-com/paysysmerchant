import React, { useState, useEffect } from "react";
import NavBarItems from "../../components/reusables/NavBarItems";
import RegistrationSideBar from "../../components/reusables/RegistrationSideBar";
import DefaultInput from "../../components/reusables/DefaultInput";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/reusables/DefaultButton";
import OTPInput from "../../components/reusables/OTPInput/Index";
import { apiCall } from "../../Utils/URLs/axios.index";
import { SuccessCard } from "../../Utils/HttpResponseHandlers/error";
import { confirmBVN } from "../../containers/merchantOnboardingApis";
import { Toaster } from "react-hot-toast";

function AddBvn() {
  const [showOtp, setShowOtp] = useState<any>(true);
  const [showSuccessMsg, setShowSuccessMsg] = useState<any>(false);
  const [cotp, setCOtp] = useState("");
  const [phonenumber, setPhonenumber] = useState<any>(String);
  const [bvnValue, setBvnValue] = useState<any>("");
  const [bvnName, setBvnName] = useState<any>("");
  const [bvnError, setBvnError] = useState<any>("");
  const [state, setState] = useState<any>({
    bvn: "",
    phoneNumber: "",
    check: false,
    submittingError: false,
    isSubmitting: false,
    isDisabled: false,
    errorMssg: "",
  });

  const {
    bvn,
    phoneNumber,
    check,
    submittingError,
    isDisabled,
    isSubmitting,
    errorMssg,
    successMsg,
  } = state;

  const navigate = useNavigate();

  useEffect(() => {
    const handleBackButton = (event: any) => {
      event.preventDefault(); // Prevent default browser behavior
      // Optionally, you can show a message or perform any other action here
    };

    window.history.pushState({ page: "myComponent" }, "", ""); // Reset the history state
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []); // Empty dependency array to run effect only once

  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    // securityQuestions
    // localStorage.setItem('onboardingStage', JSON.stringify({ onboardingStage: "secure_account" }));
    setState({
      ...state,
      [e.target.name]: e.target.value,
      submittingError: false,
    });
    const inputBvn = (document.getElementById("bvn") as HTMLInputElement)
      ?.value;
    setBvnName(null);
    setBvnError(null);
    if (inputBvn?.trim()?.length === 11) {
      setBvnValue(inputBvn);
      setBvnName("Please wait...");
      confirmBVN(inputBvn?.trim())
        .then((res: any) => {
          setTimeout(() => {
            if (res?.firstNameField !== undefined) {
              setBvnError(null);
              setBvnName(
                `${res?.firstNameField} ${res?.lastNameField} ${res?.middleNameField}`
              );
              let convertedNumber1 = res?.phoneNumber1Field?.replace(
                /^(\d{4})(\d{3})(\d{4})$/,
                "$1***$3"
              );
              let convertedNumber2 = res?.phoneNumber2Field?.replace(
                /^(\d{4})(\d{3})(\d{4})$/,
                "$1***$3"
              );
              setPhonenumber(convertedNumber1 || convertedNumber2);
              setShowOtp(!showOtp);
              setShowSuccessMsg(true);
              setTimeout(() => setShowSuccessMsg(false), 3000);
            } else {
              setBvnName(null);
              setBvnError("Invalid BVN details");
            }
          }, 2000);
        })
        .catch((err: any) => {
          console.error("BVN error>>>", err);
        });
    }
  }

  // const handelVerify = (bvnValue:any) => {
  //     setBvnName("Please wait...")
  //     confirmBVN(bvnValue).then((res: any) => {
  //        setTimeout(() => {
  //         if(res?.firstNameField !== undefined){
  //             setBvnError(null)
  //             setBvnName(`${res?.firstNameField} ${res?.lastNameField} ${res?.middleNameField}`);
  //             setPhonenumber(res?.phoneNumber1Field || res?.phoneNumber2Field);
  //           //  console.log("phone number>>>", res?.phoneNumber1Field);
  //             setShowOtp(!showOtp);
  //             setShowSuccessMsg(true);
  //             setTimeout(() => setShowSuccessMsg(false), 3000);
  //            }else{
  //             setBvnName(null);
  //            setBvnError("Invalid BVN details")
  //            }
  //        }, 2000);

  //     }).catch((err: any) => {
  //         console.error("BVN error>>>", err);
  //     })
  // }

  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState((state: any) => ({
      ...state,
      isSubmitting: true,
    }));
    try {
      // localStorage.setItem('onboardingStageKey', "bvn"); //to be removed later
      // localStorage.setItem('onboardingStage', JSON.stringify({ onboardingStage: "bvn" }));  //to be removed later
      // navigate("/registrations/business-type"); //to be removed later
      const response = await apiCall({
        name: "selfOnboarding",
        data: {
          bvn: bvn,
          stage: "bvn",
        },
        action: (): any => {
          setState({
            ...state,
            isSubmitting: false,
            submittingError: false,
          });
          // showModal()
          return [];
        },
        successDetails: {
          title: "BVN Details Updated",
          text: `Your BVN details have been updated successfully.`,
          icon: "",
        },
        errorAction: (err?: any) => {
          if (err && err?.response?.data) {
            setState({
              ...state,
              submittingError: true,
              isSubmitting: false,
              errorMssg:
                err?.response?.data?.errorMssg ||
                err?.response?.errorMssg ||
                err?.response?.data?.respDescription ||
                err?.response?.respDescription ||
                "Action failed, please try again",
            });
            return ["skip"];
          } else {
            setState({
              ...state,
              submittingError: true,
              isSubmitting: false,
              errorMssg: "Action failed, please try again",
            });
          }
        },
      }).then(async (res: any) => {
        // console.log("res>>", res);
        localStorage.setItem("onboardingStageKey", "bvn");
        await localStorage.setItem(
          "onboardingStage",
          JSON.stringify({ onboardingStage: "bvn" })
        );
        navigate("/registrations/business-type");
        setState({
          submittingError: false,
          isSubmitting: false,
          errorMssg: "",
        });
      });
    } catch (e) {
      console.error(e + " 'Caught Error.'");
    }
  };

  return (
    <div>
        <Toaster/>
      <NavBarItems />
      <div className="md:flex">
        <aside className="md:w-1/4 p-4 hidden sm:block">
          <RegistrationSideBar />
        </aside>
        <main className="md:flex-1 p-4 my-2">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4">
            <div className="p-4">
              <p className="text-xl">Add Bank Verification Number - BVN</p>
              <p className="text-sm text-gray-400">
                CBN requires consent to retrieve information from BVN so you{" "}
                <br />
                will be required to give that consent by OTP
              </p>
            </div>
            <div className="p-4">
              {/* <p className="text-base">BVN</p> */}
              <p className="lg:w-1/3 w-72 py-2  rounded-lg focus:outline-none focus:border-blue-300">
                {/* <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Your Email"
                                    className="lg:w-1/3 w-72 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-300"
                                /> */}

                <DefaultInput
                  id="bvn"
                  type="text"
                  label="Bvn"
                  required={true}
                  placeHolder="Enter Bvn"
                  name="bvn"
                  value={bvn}
                  handleChange={handleChange}
                  // containerVariant="mt-5 w-full bvnError"
                />
              </p>
              <small className="text-blue-500">{bvnName}</small>
              <small className="text-red-500">{bvnError}</small>
            </div>
            {showSuccessMsg && (
              <p className="px-4 lg:w-1/3">
                <SuccessCard
                  handleClear={() =>
                    setState({ ...state, submittingError: false })
                  }
                  error={"BVN has been verified succesfully!"}
                />
              </p>
            )}

            {showOtp && (
              <div className="p-4">
                <p className="text-sm text-gray-400">
                  Don't remember your BVN?
                </p>
                <p className="text-sm text-gray-400">
                  Dial <b className="text-black">*565*0#</b> using the BVN
                  registered phone number.
                </p>
              </div>
            )}
            {!showOtp && (
              <div className="p-4">
                <p className="text-sm text-black">
                  Please enter the 6 digit code sent to {phonenumber}
                </p>
                <div className="flex mt-2">
                  <div className="grid grid-cols-6 gap-4">
                    <OTPInput
                      length={6}
                      className="flex gap-5"
                      inputClassName="w-9 h-8 text-3xl text-center border border-gray-300 rounded-md focus:border border-gray-200 focus:ring-1 ring-blue-aqua"
                      isNumberInput
                      autoFocus
                      onChangeOTP={(otp: any) => setCOtp(cotp)}
                    />
                    {/* containerVariant={!submittingError ? "hidden" : ""}  */}
                  </div>
                </div>
              </div>
            )}

            <div className="p-4 h-12 rounded-md">
              {
                showOtp && (
                  <button className="lg:w-1/3 w-72 h-12 rounded-md bg-primary text-white transition-all duration-500 hover:scale-105 hover:brightness-110">
                    Continue
                  </button>
                )
                // <Button title='Continue' className="lg:w-1/3 w-72 rounded-md"/>
              }

              {!showOtp && (
                //  <Button title='Continue'  className="lg:w-1/3 w-72 rounded-md"/>
                <button
                  onClick={handelSubmit}
                  className="lg:w-1/3 w-72 h-12 rounded-md bg-primary text-white transition-all duration-500 hover:scale-105 hover:brightness-110"
                >
                  Continue
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AddBvn;
