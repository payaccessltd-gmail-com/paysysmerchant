import { useEffect, useState } from "react";
import { Button } from "../../components/reusables/DefaultButton";
import DefaultInput from "../../components/reusables/DefaultInput";
import CustomDropDown from "../../components/reusables/dropdowns/CustomDropDown";
import Overlay from "../../components/reusables/Overlay/Overlay";
import { Toaster } from "react-hot-toast";
import Loading from "../../components/Loading";
import { SpinnerIcon } from "../../components/reusables/icons";
import { Image } from "../../assets";
import { LoanReasons } from "./Mocks";
import { useNavigate } from "react-router-dom";
import { fetchImpactLoanEligibility, fetchLoanproduct, loanRequest } from "../../containers/loanApis";

const LoanRequest = ({  isOpen, stage, setStage,setIsOpen }: any) => {
  const [branchList, setBranchList] = useState<any>([]);
  const [loanStageName, setloanStageName] = useState(0)
  const [branch, setbranch] = useState("Select Purpose");
  const [duration, setDuration] = useState("Select Duration in Months");
  const [durationList, setDurationList] = useState<any>(["1","2","3","4","5","6","7","8","9","10","11","12"]);
  const [merchantId, setMerchantId] = useState<any>(0);
  const [isLoading, setisLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState<any>(true);
  const [state, setState] = useState<any>({
    amount: "",
    requestDuration: "",
    description: "",
    giveMoreDetails: true,
    submittingError: false,
    isSubmitting: false,
    errorMssg: "",
    loanProduct:{}
  });
  const [showSuccessAlert, setShowSuccessAlert] = useState<any>(false);
  const [showErrorAlert, setShowErrorAlert] = useState<any>(false);
  const [errMssg, setErrMsg] = useState<any>('');
  const navigate = useNavigate();

  const {
    amount,
    requestDuration,
    description,
    giveMoreDetails,
    submittingError,
    errorMssg,
    isSubmitting,
    loanProduct
  } = state;
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  function toggleDropdown() {
    setStage(0);
    setIsOpen(!isOpen)
    setSelectedProduct(null)
    setloanStageName(0)
  }
  // Handle click event
  const handleClick = (val:any) => {
    setSelectedProduct(val);
  };

  useEffect(() => {
    const getUserDetails: any = localStorage.getItem('merchantDetails');
    const parseDetails = JSON.parse(getUserDetails);
    setMerchantId(parseDetails.id);
    setBranchList(LoanReasons);
  }, []);

  const [eligibility, seteligibility] = useState(false)

  async function getloaneligibility() {
    try {
      const res = await fetchImpactLoanEligibility()
      seteligibility(res)

    } catch (error:any) {
      console.error(error)
    }
  }

  useEffect(() => {
    getloaneligibility()
  }, [eligibility])

 console.log(eligibility)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue:any = e.target.value.replace(/[^0-9]/g, '');
    let formattedAmount = new Intl.NumberFormat('en-US').format(inputValue);
    setState({
      ...state,
      [e.target.name]: formattedAmount,
      submittingError: false,
    });

    // console.log("lenght>>>", e?.target?.value?.length);

    if(e?.target?.value?.length > 0 ){
      setIsDisabled(false)
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setisLoading(true);
    setState((state: any) => ({
      ...state,
      isSubmitting: true,
    }));
    setTimeout(() => {
      setisLoading(false);
      setStage(1);
    }, 3000);
    setTimeout(() => {
      toggleDropdown()
    }, 6000);

    const inputValueWithoutCommas = amount.replace(/,/g, '');
    // const payload = {
    //   requestAmount: Number(inputValueWithoutCommas),
    //   loanPurpose: branch === 'Select Purpose' ? null : branch,
    //   merchantId: String(merchantId),
    //   requestDuration: duration
    // }
    const requestAmount= Number(inputValueWithoutCommas)
      const loanPurpose= branch === 'Select Purpose' ? null : branch
   // console.log("request payload>>", payload);
  //  if(e?.target?.value?.length > 0 ){
  //   setIsDisabled(false)
  // }

   if(
    loanPurpose === "Select Purpose" ||
    requestDuration === "Select Duration in Months"
  ){
    setShowSuccessAlert(false);
    setShowErrorAlert(true);
    setErrMsg("All fields are required!");
   }else{
    loanRequest(merchantId,requestAmount,duration,selectedProduct.id,loanPurpose).then((res: any) => {
      setShowSuccessAlert(true);
      setShowErrorAlert(false);
      setTimeout(() => window.location.reload(), 3000);
    }).catch((err: any) => {
      console.error("Error from Loan Request>>", err);
      if(err?.response?.status === 401){
        navigate('/');
      }
      setErrMsg(err?.response?.data?.respBody)
      setShowErrorAlert(true);
      setShowSuccessAlert(false);
    }).finally(() => {
      console.info('Loan request implementation!');
      setState({});
    })
   }

  };
  // console.log(state, "the terminal state");
const [loanproductName, setloanproductName] = useState<any>([])
  async function getLoanProduct() {
    try {
      // const res1:any=await fetchImpactLoanEligibility()
      // console.log(res1)
      const res =await fetchLoanproduct()
      //console.log(res[1],'the loans')

      if(eligibility) setloanproductName(res)
      
      else setloanproductName([res[1]])
    //  console.log(res)
    } catch (error:any) {
      console.error(error)
    }
  }

  useEffect(() => {
    //console.log(contents)
   getLoanProduct()
  }, [eligibility])

 // console.log(selectedProduct,'the selected product')

  return (
    <Overlay toggleDropdown={toggleDropdown} isOpen={isOpen}>
      <Toaster />
      {loanStageName===0? <>
        <p className="text-[20px] font-bold">You are eligible for these, please select one:</p>
      <div className="grid gap-[20px]">
      {loanproductName.map((val:any,index:any)=>(
        <div className={`border-[1px] rounded-md cursor-pointer p-2 hover:bg-slate-500 ${
            selectedProduct === val ? 'bg-slate-500 text-white' : 'hover:bg-slate-500'
          }`} onClick={() => handleClick(val)}>
          <p>{val?.productName}</p>

        </div>
      ))}

      </div>

      <Button title='Continue' onClick={()=>setloanStageName(1)} isDisabled={selectedProduct===null}/>
      </>:
      <>
      {
        showErrorAlert === false &&
        <p className="text-[20px] font-bold">Loan Request</p>
      }
      
      {isLoading ? (
        <div role="status" className="m-auto w-fit h-fit grid items-center">
          <div className="m-auto text-center my-10">
            <SpinnerIcon className="m-auto" />
            <p>Loading...</p>
            <p>Do not close the modal</p>
          </div>
        </div>
      ) : stage === 0 ? (
        <div className="grid gap-[20px] md:w-[342px]">
          <DefaultInput
            label="Loan Amount"
            placeHolder="NGN ₦"
            name="amount"
            value={amount}
            handleChange={handleChange}
          />
          <CustomDropDown
            label="Loan Purpose"
            options={branchList}
            value={branch}
            setValue={setbranch}
          />
               <CustomDropDown
            label="Loan Request Duration in Months"
            options={durationList}
            value={duration}
            setValue={setDuration}
          />
            {/* <DefaultInput
            label="Loan Request Duration in Months"
            placeHolder="Input your request duration in months"
            name="requestDuration"
            value={requestDuration}
            handleChange={handleChange}
          /> */}
          <div className="">
            <Button title="Submit Request" onClick={handleSubmit}  isDisabled={isDisabled}/>
            {/* isDisabled={isDisabled} */}
          </div>
        </div>
      ) : showSuccessAlert === true ? (
        <div className="m-auto grid mb-10 items-center text-center">
        <img src={Image.success} alt="success" className="m-auto" />
        <p className="text-black font-bold mb-3 text-[20px]">Loan Application Submitted</p>
        {/* Loan Application Successful, Awaiting Approval */}
        <p className="text-[#656C75] text-[12px]">We are in the process of assessing the optimal loan
          amount for you. Once the assessment is done
          we will prompt you with an offer</p>
      </div>
      ) : showErrorAlert === true ? (
        <div className="m-auto grid mb-10 items-center text-center">
        <img src={Image.error} alt="success" className="m-auto" height={100} width={100} />
        <p className="text-black font-bold mb-3 text-[20px]">Loan Application Error</p>
        {/* Loan Application Successful, Awaiting Approval */}
        <p className="text-[#656C75] text-[12px]">{errMssg ?? "Sorry your application cannot be processed because an error occurred!"}</p>
      </div>
      )
      :
      <></>
      }
      
      </>
      
      }
    </Overlay>
  );
};

export default LoanRequest;
