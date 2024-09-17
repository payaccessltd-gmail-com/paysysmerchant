import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { IoMdArrowBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../../../components/dashboard/Index";
import { Button } from "../../../components/reusables/DefaultButton";
import DefaultInput from "../../../components/reusables/DefaultInput";
import CustomDropDown from "../../../components/reusables/dropdowns/CustomDropDown";
import { ErrorCard } from "../../../Utils/HttpResponseHandlers/error";
import { apiCall } from "../../../Utils/URLs/axios.index";
import OTPInput from "../../../components/reusables/OTPInput/Index";

const ElectricityPage = () => {
  const location = useLocation();
  const navigate=useNavigate()
  const details = location.state;
  const [selectedElectricity, setSelectedElectricity] = useState(
    "Select Electricity Package"
  );
  const [customerName, setCustomerName] = useState("");
  const [disableBtn, setDisableBtn] = useState<any>(true);

  const { billerName, category, options } = details;
  let [otp, setOtp] = useState('');

  const [state, setState] = useState({
    amount: "",
    meterNo: "",
    pin: otp,
    id: 0,
    submittingError: false,
    errorMssg: "",
    isSubmitting: false,
  });
  const { amount, meterNo, pin, id, submittingError, errorMssg, isSubmitting } =
    state;
  const electricityName = options.map((val: any) => val.optionName);

  useEffect(() => {
    if (selectedElectricity !== "Select Electricity Package") {
      const selected = options.find(
        (val: any) => selectedElectricity === val.optionName
      );
     // console.log(selected, "get all the array");
      setState((prevState: any) => ({
        ...prevState,
        id: selected?.id,
      }));
    }
  }, [selectedElectricity]);

  async function validateElectricity() {
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
          customerId: meterNo,
        },
        action: (): any => {return ["skip"]},
      });
    //  console.log(response);
      setCustomerName(response.customerName);
      if (response.respDescription === "FAILED") {
        setState((prevState: any) => ({
          ...prevState,
          errorMssg: "Name retrieval failed",
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

  const handleBlur = () => {
    if (
      meterNo.length > 6 &&
      meterNo.length < 12 &&
      selectedElectricity !== "Select Electricity Package"
    ) {
      validateElectricity();
      setDisableBtn(false);
    }else if(meterNo===''){
        setState((prevState: any) => ({
            ...prevState,
            errorMssg: "Please input meter number",
            isSubmitting: false,
            submittingError: true,
          }));
          setCustomerName("");
    }else if(meterNo!==''){
      setState((prevState: any) => ({
          ...prevState,
          errorMssg: "",
          isSubmitting: false,
          submittingError: true,
        }));
        setCustomerName("");
  } else {
      
      setState((prevState: any) => ({
        ...prevState,
        errorMssg: "The meter number is not correct",
        isSubmitting: false,
        submittingError: true,
      }));
      setCustomerName("");
      setDisableBtn(true);
    }
  };

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
  }else{
      try {
        const response: any = await apiCall({
          name: "electricitySub",
          data: {
            billerOptionId: id,
            amount,
            meterNumber: meterNo,
            pin:otp,
            deviceId: "",
            channel: "POS",
          },
          action: (): any => {},
          successDetails: {
            title: "Successful",
            text: "The subscription is successful!",
            icon: "",
          },
          errorAction: (err?: any) => {
            if (err && err?.response?.data) {
              setState({
                ...state,
                submittingError: true,
                isSubmitting: false,
                errorMssg:
                  err.response?.data?.respDescription ||
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
            meterNo: "",
            pin: "",
            id: 0,
            submittingError: false,
            isSubmitting: false,
            errorMssg: "",
          }));
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
        setSelectedElectricity("Select Electricity Package");
        setCustomerName("");
      } catch (error:any) {
      console.error(error)
      setState((prevState: any) => ({
        ...prevState,
        errorMssg:error?.response?.data?.respDescription || "Something went wrong",
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

 // console.log(state, "the state");
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
                onClick={() => navigate("/bills/utilities")}
              >
                 Electricity bills 
              </span>
              { " "} / {billerName}
            </p>
          </div>
      <p className="text-[20px] font-bold mt-5">{category}</p>
      <p className="text-[16px] mt-2">{billerName}</p>
      <div className="mt-5 rounded-md bg-[#F9F9F9] md:w-[400px] w-full p-[20px] grid gap-[20px]">
        <CustomDropDown
          options={electricityName}
          value={selectedElectricity}
          setValue={setSelectedElectricity}
          label="Select Package"
        />
        <div className="grid gap-1">
          <DefaultInput
            label="Meter No"
            name="meterNo"
            value={meterNo}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
          {customerName !== "" && <p className="text-[10px] text-primary font-medium">{customerName}</p>}
        </div>
        <DefaultInput
          label="Amount"
          name="amount"
          value={amount}
          type="number"
          handleChange={handleChange}
        />
        {/* <DefaultInput
          label="Pin"
          name="pin"
          value={pin}
          handleChange={handleChange}
        /> */}
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

        <Button title="Pay Electricity" onClick={handleSubmit} isLoading={isSubmitting} isDisabled={meterNo==='' || isSubmitting || selectedElectricity==='Select Electricity Package' || disableBtn}/>
      </div>
    </DashboardLayout>
  );
};

export default ElectricityPage;
