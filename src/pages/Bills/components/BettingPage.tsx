import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast';
import { IoMdArrowBack } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/dashboard/Index';
import { Button } from '../../../components/reusables/DefaultButton';
import DefaultInput from '../../../components/reusables/DefaultInput';
import { ErrorCard } from '../../../Utils/HttpResponseHandlers/error';
import { apiCall } from '../../../Utils/URLs/axios.index';
import OTPInput from "../../../components/reusables/OTPInput/Index";

const BettingPage = () => {
    const navigate= useNavigate()
    const location = useLocation();
  const [details] = location.state 
  const {id, code,optionName}=details
  const [customerName, setCustomerName] = useState("");
  let [otp, setOtp] = useState('');

  const [state, setState] = useState({
    amount: "",
    walletNo: "",
    pin: otp,
    submittingError: false,
    errorMssg: "",
    isSubmitting: false,
  });
  const { amount, walletNo, pin, submittingError, errorMssg, isSubmitting } = state;
  async function validateBetting() {
    setState((prevState: any) => ({
      ...prevState,
      errorMssg: "",
      isSubmitting: true,
      submittingError: false,
    }));
    try {
      const response: any = await apiCall({
        name: "validateVas",
        data: {
          billerOptionId: id,
          amount:'',
          customerId: walletNo,
        },
        action: (): any => {return ["skip"]},
      });
   //  console.log('customer name>>', response.customerName);
      setCustomerName(response.customerName);
      if (response.respDescription === "FAILED") {
        setState((prevState: any) => ({
          ...prevState,
          errorMssg: "Name retrieval failed, please input correct wallet number",
          isSubmitting: false,
          submittingError: true,
        }));
      } else {
        setState((prevState: any) => ({
          ...prevState,
          errorMssg: "",
          isSubmitting: false,
          submittingError: false,
        }));
      }
    } catch (error: any) {
      console.error(error);
      setState((prevState: any) => ({
        ...prevState,
        errorMssg: error.response.respDescription,
        isSubmitting: false,
        submittingError: true,
      }));
    }
  }
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setState({
      ...state,
      [e.target.name?.trim()]: e.target.value,
      // submittingError: false,
    });
  };
  function handleBlur() {
    if (walletNo==='') {
      setState((prevState: any) => ({
        ...prevState,
        errorMssg: "Please input your wallet number",
        isSubmitting: false,
        submittingError: true,
      }));
    } else {
      
      validateBetting()
    }
  }

  async function handleSubmit() {
    setState((prevState: any) => ({
    ...prevState,
    errorMssg: "",
    isSubmitting: true,
    submittingError: false,
  }));
  if (amount==='') {
    setState((prevState: any) => ({
        ...prevState,
        errorMssg: "Please input the amount",
        isSubmitting: false,
        submittingError: true,
      }));
  }else if (otp==='') {
    setState((prevState: any) => ({
        ...prevState,
        errorMssg: "Please input your pin",
        isSubmitting: false,
        submittingError: true,
      }));
  }else if (amount.length<3) {
    setState((prevState: any) => ({
        ...prevState,
        errorMssg: "Please the minimum amount is 100",
        isSubmitting: false,
        submittingError: true,
      }));}
  else{
      try {
        const response: any = await apiCall({
          name: "bettingSub",
          data: {
            billerOptionId: id,
            amount: Number(amount),
            walletNumber: walletNo,
            pin: otp,
            deviceId: "",
            channelTypeEnum: "POS",
          },
          action: (): any => {
            // console.log(response)
          },
          successDetails: {
            title: "Successful",
            text: "The subscription is successful!",
            icon: "",
          },
          errorAction: (err?: any) => {
            console.error(err,'the error')
            if (err && err?.response) {
              setState({
                ...state,
                submittingError: true,
                isSubmitting: false,
                errorMssg:
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
        }).then((res:any) => {
          setState((prevState) => ({
            ...prevState,
            amount: "",
            walletNo: "",
            pin: "",
          }));
      setCustomerName("");

          if(res.respCode==='96'){
            setState((prevState)=>({
                ...prevState,
                submittingError: true,
                isSubmitting: false,
                errorMssg:res?.respDescription ||
                  "Action failed, please try again",
              }));
          }
    });
      } catch (error:any) {
      console.error(error)
      
      setState((prevState: any) => ({
        ...prevState,
        errorMssg:error.response || "Something went wrong",
        isSubmitting: false,
        submittingError: true,
      }));

    } finally{
          setState((prevState: any) => ({
              ...prevState,
              isSubmitting: false,
            }));
      }

  }
  }
 // console.log(customerName)
  return (
    <DashboardLayout>
      <Toaster/>
      <div className="flex gap-2 py-5 items-center text-slate-400 border-b-[1px]">
            <IoMdArrowBack className="hover:text-black hover:cursor-pointer " onClick={() => navigate(-1)}/>
            <p className="text-[10px] md:text-[15px]  ">
              <span
                className="hover:underline hover:cursor-pointer hover:text-black"
                onClick={() => navigate("/bills")}
              >
                Bills /
              </span>{" "}
              <span
                className="hover:underline hover:cursor-pointer hover:text-black"
                onClick={() => navigate("/bills/betting")}
              >
                 Betting bills 
              </span>
              { " "} / {optionName}
            </p>
          </div>
          <p className="text-[20px] font-bold mt-5">{optionName}</p>
        <div className="mt-5 rounded-md bg-[#F9F9F9] md:w-[400px] w-full p-[20px] grid gap-[20px]">
            <div className="grid gap-1">
            <DefaultInput label='Wallet Number' name='walletNo' value={walletNo} handleChange={handleChange} handleBlur={handleBlur}/>
            {customerName !== "" && <p className="text-[10px] text-primary">{customerName}</p>}
            </div>
            {/* <DefaultInput label='Device ID' name='' /> */}
            <DefaultInput label='Amount' name='amount' value={amount} type='number' handleChange={handleChange}/>
            {/* <DefaultInput label='Pin' name='pin' value={pin} handleChange={handleChange} /> */}
            <p className="text-base">Enter 6 digit PIN</p>
        <div className="flex">
                <OTPInput
                  length={6}
                  className="flex gap-8"
                  inputClassName="w-8 h-8 text-3xl text-center border border-gray-300 rounded-md focus:border border-gray-200 focus:ring-1 ring-blue-aqua"
                  isNumberInput
                  autoFocus
                  onChangeOTP={(otp: any) => {
                    setOtp(otp);
                    //console.log('otp>>', otp,"length>>", otp.length);
                  }}
                />
              </div>
            <ErrorCard
          handleClear={() => setState({ ...state, submittingError: false })}
          error={errorMssg}
          containerVariant={!submittingError ? "hidden" : ""}
        />
            <Button title='Place Bet' onClick={handleSubmit} isLoading={isSubmitting} isDisabled={walletNo==='' || isSubmitting || customerName==='' || customerName===undefined }/>
            {/* || customerName===undefined */}
        </div>
    </DashboardLayout>
  )
}

export default BettingPage