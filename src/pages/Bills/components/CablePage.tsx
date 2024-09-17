import { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { Toaster } from "react-hot-toast";
import { IoMdArrowBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../../../components/dashboard/Index";
import { Button } from "../../../components/reusables/DefaultButton";
import DefaultInput from "../../../components/reusables/DefaultInput";
import CustomDropDown from "../../../components/reusables/dropdowns/CustomDropDown";
import { ErrorCard } from "../../../Utils/HttpResponseHandlers/error";
import { apiCall } from "../../../Utils/URLs/axios.index";

const CablePage = () => {
const navigate=useNavigate()
  const location = useLocation();
  const [selectedCable, setSelectedCable] = useState('Select Package')
  const details = location.state;
  const { billerName, category, options } = details;
  const [customerName, setCustomerName] = useState("");

  const [state, setState] = useState({
    amount: "",
    accountNo: "",
    pin: "",
    id: 0,
    submittingError: false,
    errorMssg: "",
    isSubmitting: false,
  });
  const { amount, accountNo, pin, id, submittingError, errorMssg, isSubmitting } =
    state;
    useEffect(() => {
        if (selectedCable !== "Select Package") {
          const selected = options.find(
            (val: any) => selectedCable === val.optionName
          );
       //   console.log(selected, "get all the array");
          setState((prevState: any) => ({
            ...prevState,
            id: selected?.id,
            amount:selected?.amount
          }));
        }
      }, [selectedCable]);
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

      async function validateCable() {
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
                  customerId: accountNo,
                },
                action: (): any => {return ["skip"]},
              });
             // console.log(response);
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
          } catch (error:any) {
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
          accountNo.length > 6 &&
          accountNo.length < 12 &&
          selectedCable !== "Select Package"
        ) {
          validateCable();
        }else if(accountNo===''){
            setState((prevState: any) => ({
                ...prevState,
                errorMssg: "Please input account number",
                isSubmitting: false,
                submittingError: true,
              }));
              setCustomerName("");
        } else if(selectedCable === "Select Package"){
            setState((prevState: any) => ({
                ...prevState,
                errorMssg: "Please select a package",
                isSubmitting: false,
                submittingError: true,
              }));
              setCustomerName("");
        }
        else {
          setState((prevState: any) => ({
            ...prevState,
            errorMssg: "The account number is not correct",
            isSubmitting: false,
            submittingError: true,
          }));
          setCustomerName("");
        }
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
  }else if (pin==='') {
    setState((prevState: any) => ({
        ...prevState,
        errorMssg: "Please input your pin",
        isSubmitting: false,
        submittingError: true,
      }));
  }else{
      try {
        const response: any = await apiCall({
          name: "cableTvSub",
          data: {
            billerOptionId: id,
            amount,
            accountNumber: accountNo,
            pin,
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
        setSelectedCable("Select Package");
        setCustomerName("");
      } catch (error:any) {
      console.error(error)
      setState((prevState: any) => ({
        ...prevState,
        errorMssg:error.response.respDescription || "Something went wrong",
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
  const cableName= options.map((val:any)=>(val.optionName))
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
                onClick={() => navigate("/bills/cable")}
              >
                 Cable bills 
              </span>
              { " "} / {billerName}
            </p>
          </div>
      <p className="text-[20px] font-bold mt-5">CABLE TV</p>
      <p className="text-[16px] mt-2">{billerName}</p>
      <div className="mt-5 rounded-md bg-[#F9F9F9] md:w-[400px] w-full p-[20px] grid gap-[20px]">
        <CustomDropDown options={cableName} value={selectedCable} setValue={setSelectedCable} label='Select Cable Package'/>
        <div className="grid gap-1">
        <DefaultInput label="Smart Card Number" name="accountNo" value={accountNo} handleChange={handleChange} handleBlur={handleBlur}/>
        {customerName !== "" && <p className="text-[10px] text-primary">{customerName}</p>}
        </div>
        <div className="grid">
        <DefaultInput label="Amount" name="amount" value={amount} type="number" handleChange={handleChange} isDisabled={true}/>
        {amount !=='' &&
<p className="text-[15px] text-slate-500">You would be charged <span className="font-bold">
<CurrencyFormat
                value={amount || 0}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
              />
              </span></p>
        
        }
        </div>
        <DefaultInput label="Pin" name="pin" value={pin} type='number' handleChange={handleChange} />
        <ErrorCard
          handleClear={() => setState({ ...state, submittingError: false })}
          error={errorMssg}
          containerVariant={!submittingError ? "hidden" : ""}
        />
        <Button title="Pay Cable" onClick={handleSubmit} isLoading={isSubmitting} isDisabled={accountNo==='' || isSubmitting || selectedCable==='Select Package'} />
      </div>
    </DashboardLayout>
  );
};

export default CablePage;
