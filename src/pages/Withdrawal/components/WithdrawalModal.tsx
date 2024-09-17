import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Button } from "../../../components/reusables/DefaultButton";
import DefaultInput from "../../../components/reusables/DefaultInput";
import CustomDropDown from "../../../components/reusables/dropdowns/CustomDropDown";
import Overlay from "../../../components/reusables/Overlay/Overlay";
import { ErrorCard } from "../../../Utils/HttpResponseHandlers/error";
import { apiCall } from "../../../Utils/URLs/axios.index";
import { listBeneficiaries } from "../../../containers/withdrawalApis";
import OTPInput from "../../../components/reusables/OTPInput/Index";


const WithdrawalModal = ({ toggleDropdown, walletBalance, setRefresh, isOpen }: any) => {
  const [bankName, setbankName] = useState("Select Bank");
  const [beneficiary, setBeneficiary] = useState<any>("Select Beneficiary");
  const [amountVerification, setAmountVerification] = useState(false);
  const [beneficiaryProperties, setBeneficiaryProperties] = useState<any>({});
  const [dontShowReview, setDontShowReview] = useState<any>(false);
  const [switched, setSwitched] = useState<any>(null);
  const [showOthers, setShowOthers] = useState<any>(false);
  const [globalBankData, setGlobalBankData] = useState<any>([]);
  const [selectedBankParam, setSelectedBankParam] = useState<any>({});
  const [showSelectBank, setShowSelectBank] = useState<any>(false);
  let [otp, setOtp] = useState('');
  const [bankArray, setBankArray] = useState<any>([{
    // Define the structure of your bank data
    bankCode: 'string',
    bankName: 'string',
    bankShortName: 'string',
    cbnCode: 'string',
    id: 0,
    institutionCode: 'string',
    nipCode: 'string',
  }]);
  const [accName, setAccName] = useState<any>("");
  const [bankData, setBankData] = useState<any>([]);
  const [selectBeneficiary, setSelectBeneficiary] = useState<any>([]);
  const [state, setState] = useState<any>({
    terminalName: "",
    amount: null,
    password: "",
    accountNumber: "",
    bankCode: "",
    customerName: "",
    bankName: "",
    depositor: "",
    narration: "",
    processorName: "",
    channelType: "",
    deviceId: "",
    pin: otp,
    giveMoreDetails: false,
    submittingError: false,
    isSubmitting: false,
    checkAcc: "",
    errorMssg: "",
  });
  let {
    amount,
    submittingError,
    errorMssg,
    isSubmitting,
    accountNumber,
    bankCode,
    narration,
    pin,
    checkAcc
  }: any = state;

  function closeModal() {
    setState({
      terminalName: "",
      amount: null,
      password: "",
      accountNumber: "",
      bankCode: "",
      customerName: "",
      bankName: "",
      depositor: "",
      narration: "",
      processorName: "",
      channelType: "",
      deviceId: "",
      pin: otp,
      giveMoreDetails: false,
      submittingError: false,
      isSubmitting: false,
      checkAcc: "",
      errorMssg: ""
    })
    setAccName('')
    setbankName('Select Bank')
    toggleDropdown()
  }

  async function fetchBankList() {
    try {
      const res: any = await apiCall({
        name: "listBanks",
        action: (): any => ["skip"],
        errorAction: (): any => ["skip"],
      });
      setBankArray(res)
      if (Array.isArray(res)) {
        const bankNames = res.map((bank: any) => bank.bankName);
        setGlobalBankData(res);
        setBankData(bankNames);
      }
      return res;
    } catch (error) { }
  }
  useEffect(() => {
    fetchBankList();

  }, []);

  function getBeneficiaryList() {
    listBeneficiaries(0, 10, "TRANSFER").then((res: any) => {
      const getBeneficiary = res?.content?.map((item: any) => item?.beneficiaryName);
      getBeneficiary.unshift("Enter New Account");
      setSelectBeneficiary(getBeneficiary);
      const beneficiaryProperties = res?.content?.filter((elem: any) => elem?.beneficiaryName === beneficiary);
      if (beneficiaryProperties[0] !== undefined) {
        setBeneficiaryProperties(beneficiaryProperties[0]);
      } else if (beneficiaryProperties[0] === undefined) {
        // implementations here when res?.content = []
      }


    }).catch((err: any) => {
      console.error("error from fetching beneficiaries>>>", err);
    })
  }



  const changeRecipient = () => {
    setDontShowReview(false);
    setBeneficiary("Select Beneficiary");
  }

  useEffect(() => {

    for (var i = 0; i < selectBeneficiary?.length; i++) {
      if (beneficiary !== "Select Beneficiary" && selectBeneficiary[1] !== "Enter New Account") {
        setDontShowReview(true);
        setShowOthers(false);
        setShowSelectBank(false);
        let viewers: any = (document.getElementById('viewers') as HTMLInputElement)?.value;
        viewers = null;
        break;
      } else if (beneficiary !== "Select Beneficiary" && selectBeneficiary[0] === "Enter New Account") {
        setShowOthers(true);
        setDontShowReview(false);
        break;
      }
    }

    if (beneficiaryProperties?.beneficiaryValue === undefined && dontShowReview === false) {
      setDontShowReview(false);
    }

    if (beneficiary === "Enter New Account") {
      setShowOthers(true);
      setBeneficiaryProperties(null);
      setAccName(null);
      setDontShowReview(false);
      setShowSelectBank(true)
      let viewers: any = (document.getElementById('viewers') as HTMLInputElement)?.value;
      viewers = null;
      setAccName(null);
    }

  }, [beneficiary, beneficiaryProperties]);



  useEffect(() => {
    getBeneficiaryList();

    if (bankArray.length > 1) {
      const bank = bankArray.find((bank: any) => bankName === bank.bankName);
      setState((prevState: any) => ({
        ...prevState,
        bankCode: bank?.bankCode
      }))
    }

  }, [beneficiary]);


  const handelVerifyAcc = async (acc: any, check: any) => {

    setState((state: any) => ({
      ...state,
      isSubmitting: true
    }))
    
    try {
      const response = await apiCall({
        name: "accNameEnquiry",
        data: {
          bankCode: selectedBankParam?.bankCode,
          bankName: selectedBankParam?.bankName || bankName,
          bankAccountNo: accountNumber
        },
        action: (): any => {
          setState({
            ...state,
            isSubmitting: false,
            submittingError: false,
            checkAcc: true
          });
          return ["skip"]
        },
        successDetails: {
          title: "Verification Complete",
          text: `Your account was been successfully verified.`,
          icon: ""
        },
        errorAction: (err?: any) => {
          if (err && err?.response?.data) {
            setState({
              ...state,
              submittingError: true,
              isSubmitting: false,
              checkAcc: false,
              errorMssg: "Couldn't verify your account" || err?.response?.data?.errorMssg || err?.response?.errorMssg || err?.response?.data?.respDescription || err?.response?.respDescription || "Couldn't verify account"
            })
            return [""]
          } else {
            setState({
              ...state,
              submittingError: true,
              isSubmitting: false,
              checkAcc: false,
              errorMssg: "Action failed, please try again"
            })
          }
        }
      })
        .then(async (res: any) => {
          setState({
            ...state,
            isSubmitting: false,
            submittingError: false,
            checkAcc: true,
            errorMssg: ""
          });
          setAccName(res.accountName);
        })
    } catch (e) {
      console.error(e + " 'Caught Error.'");
    };
  }

  useEffect(() => {
    const selectedBankParam = globalBankData?.filter((bankObj: any) => bankObj?.bankName === bankName);
    setSelectedBankParam(selectedBankParam[0]);
    if (accountNumber && accountNumber.length === 10 && !checkAcc && bankName !== 'Select Bank') {
      handelVerifyAcc(accountNumber, "acc");
    } else {
      setState((prevState: any) => ({ ...prevState, checkAcc: false }));
      setAccName('');
    }
  }, [accountNumber, bankName])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    //const inputAccNum = (document.getElementById('accountNumber') as HTMLInputElement)?.value;

    if (accountNumber?.length <= 9 && accountNumber?.length !== 0) {
      setState((prevState: any) => ({
        ...prevState,
        [e.target.name?.trim()]: e.target.value,
        errorMssg: 'Account number must be 10 digits',
        submittingError: true,
      }))
      // setAccName('')
    } else if (amount >= 100) {
      setAmountVerification((prevState) => !prevState);
      setState((prevState: any) => ({
        ...prevState,
        [e.target.name?.trim()]: e.target.value,
        errorMssg: '',
        submittingError: false,
      }));
    }
    else {
      setState({
        ...state,
        [e.target.name?.trim()]: e.target.value,
        submittingError: false,
      });
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState((state: any) => ({
      ...state,
      isSubmitting: true
    }))
    setAmountVerification(false)
    if (bankName === 'Select Bank' && beneficiary === "Enter New Account") {
      setState({
        ...state,
        submittingError: true,
        isSubmitting: false,
        errorMssg: `Input your Beneficiary Bank.`
      })
    } else if (accountNumber === ''  && beneficiary === "Enter New Account") {
      setState({
        ...state,
        submittingError: true,
        isSubmitting: false,
        errorMssg: `Please Input your account Number`
      })
    }
    else if (accName === ''  && beneficiary === "Enter New Account") {
      setState({
        ...state,
        submittingError: true,
        isSubmitting: false,
        errorMssg: `Beneficiary account is not be verified, please input account number again!`
      })
    }
    else if (amount < 100) {
      setState({
        ...state,
        submittingError: true,
        isSubmitting: false,
        errorMssg: `The minimum amount you can withdraw is ₦100.`
      })
      setAmountVerification(true)
    } else if (otp.length < 6) {
      setState({
        ...state,
        submittingError: true,
        isSubmitting: false,
        errorMssg: `Input your 6 digits PIN`
      })
    }
    else
      try {
        const response = await apiCall({
          name: "disburseFunds",
          // urlExtra: `/${tId}`, 
          data: {
            accountNumber: beneficiaryProperties?.beneficiaryValue || accountNumber,
            bankCode: beneficiaryProperties?.bank?.bankCode || selectedBankParam?.bankCode,
            amount: amount,
            customerName: beneficiaryProperties?.beneficiaryName || accName,
            narration: narration,
            channelType: "WEB",
            pin: otp,
            beneficiaryId: beneficiaryProperties?.id,
            saveBeneficiary: switched || false
          },
          action: (): any => {

            setState({
              ...state,
              isSubmitting: false,
              submittingError: false,
            })
            return [""]
          },
          successDetails: { title: "Withdrawal Successful", text: "Your withdrawal was successful, you should receive funds directly to your settlement account.", icon: "" },
          errorAction: (err?: any) => {
            if (err && err?.response?.data) {
              setState({
                ...state,
                submittingError: true,
                isSubmitting: false,
                errorMssg: err.response?.data?.respDescription || "Action failed, please try again"
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
            if (res?.respCode !== "96") {
              // showModal();
              setState({
                ...state,
                submittingError: false,
                isSubmitting: false,
                errorMssg: ""
              })
              setRefresh(true)
              setTimeout(() => {
                closeModal()
              }, 3000);
              // location.reload();
            } else {
              setState({
                ...state,
                submittingError: true,
                isSubmitting: false,
                errorMssg: res?.respDescription || "An error occured."
              })
            }
          })
      } catch (e) {
        console.error(e + " 'Caught Error.'");
      };
  }


  const handleSwitch = (e: any) => {
    if (e?.target?.checked === true) {
      setSwitched(true);
    }else{
      setSwitched(false);
    }

  }

  const handleWise = () => {
    let payload = {
      accountNumber: beneficiaryProperties?.beneficiaryValue || accountNumber,
      bankCode: beneficiaryProperties?.bank?.bankCode || selectedBankParam?.bankCode,
      amount: amount,
      customerName: beneficiaryProperties?.beneficiaryName || accName,
      narration: narration,
      channelType: "WEB",
      pin: pin,
      beneficiaryId: beneficiaryProperties?.id,
      saveBeneficiary: switched || false
    }


  }

  return (
    <Overlay toggleDropdown={closeModal} isOpen={isOpen}>
      <Toaster />
      <p className="mt-5 font-semibold">Funds Transfer</p>
      <ErrorCard handleClear={() => setState({ ...state, submittingError: false })} error={errorMssg} containerVariant={!submittingError ? "hidden" : "md:w-[342px]"} />

      <div className="grid gap-[20px] max-h-[400px] md:w-[342px] overflow-auto">
        <DefaultInput
          label="Account Balance"
          value={walletBalance}
          isDisabled={true}
        />

        <div onClick={getBeneficiaryList}>
          {
            dontShowReview === true ?
              <>
                {
                  beneficiaryProperties?.beneficiaryValue === undefined ?
                    <p className="mx-40">
                      {/* <SpinnerIcon/> */}
                      <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                      </svg>
                    </p>
                    :
                    <a className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
                      <p className="font-normal text-gray-700 dark:text-gray-400">
                        {beneficiaryProperties?.beneficiaryValue || "Beneficiary acct"},  {beneficiaryProperties?.bank?.bankName || "Beneficiary Bank Name"}
                      </p>
                      <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-black">
                        {beneficiaryProperties?.beneficiaryName || "Beneficiary Name"}
                      </h5>
                      <p className="font-normal text-xs text-blue-700 dark:text-blue-700 hover:underline cursor-pointer" onClick={changeRecipient}>Change recipient</p>
                    </a>
                }

              </>
              : dontShowReview === false ?
                <>
                  <CustomDropDown
                    label="Choose a Beneficiary"
                    options={selectBeneficiary}
                    value={beneficiary}
                    setValue={setBeneficiary}
                  />
                </>
                :
                <></>
          }
        </div>

        {
          showSelectBank &&
          <CustomDropDown
            label="Select Bank"
            options={bankData}
            value={bankName}
            setValue={setbankName}
          />
        }





        {
          showOthers === true ?
            <>

              <DefaultInput label="Account Number" isDisabled={false} placeHolder="Baneficiary Account Number" name='accountNumber' value={beneficiaryProperties?.beneficiaryValue || accountNumber} handleChange={handleChange} id="viewers" />
              <DefaultInput label="Beneficiary Name" isDisabled={true} name='accName' value={beneficiaryProperties?.beneficiaryName || accName}/>

            </>
            :
            <></>

        }


        <DefaultInput label="Amount to Tranfer" name='amount' value={amount} type='number' handleChange={handleChange} className={amountVerification && '!border-red-500'}  id="viewers"  />
        {/* <DefaultInput label="Pin" placeHolder="pin" name='pin' value={pin} type='number' handleChange={handleChange} /> */}
        <p className="text-base">Enter 6 digit PIN</p>
        <div className="flex">
                <OTPInput
                  length={6}
                  className="flex gap-5"
                  inputClassName="w-8 h-8 text-3xl text-center border border-gray-300 rounded-md focus:border border-gray-200 focus:ring-1 ring-blue-aqua"
                  isNumberInput
                  autoFocus
                  onChangeOTP={(otp: any) => {
                    setOtp(otp);
                    //console.log('otp>>', otp,"length>>", otp.length);
                  }}
                />
              </div>
        <DefaultInput label="Narration" placeHolder="Narration" name='narration' value={narration} handleChange={handleChange}   id="viewers" />

{beneficiary !== "Select Beneficiary" &&!dontShowReview && selectBeneficiary[0] === "Enter New Account"&&
        <div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" onChange={(e: any) => handleSwitch(e)} />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-black">Add to saved beneficiary</span>
          </label>
        </div>

}
        {/* 
        handleSubmit handleWise*/}
        <div className="h-[100px] ">
          <Button title="Withdraw Funds" onClick={handleSubmit} isLoading={isSubmitting} isDisabled={beneficiaryProperties?.beneficiaryValue?.length < 10 ? true : false} />
        </div>
      </div>
    </Overlay>
  );
};

// handleSubmit

export default WithdrawalModal;
