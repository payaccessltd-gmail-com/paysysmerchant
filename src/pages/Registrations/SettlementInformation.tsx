import React, { useState, useEffect } from 'react';
import NavBarItems from '../../components/reusables/NavBarItems';
import RegistrationSideBar from '../../components/reusables/RegistrationSideBar';
import { useNavigate } from 'react-router-dom';
import CustomDropDown from '../../components/reusables/dropdowns/CustomDropDown';
import DefaultInput from '../../components/reusables/DefaultInput';
import { accNameEnquires, fetchBankList } from '../../containers/merchantOnboardingApis';
import { apiCall } from '../../Utils/URLs/axios.index';
import { ErrorCard } from '../../Utils/HttpResponseHandlers/error';
import Modal from '../../Utils/Modal';

function SettlementInformation() {
  const navigate = useNavigate();
  const [bankList, setBankList] = useState<any>([]);
  const [bankNameList, setbankNameList] = useState('Pick your settlement account')
  const [BankName, setBankName] = useState<any>([]);
  const [acctName, setAcctName] = useState<any>("");
  const [acctNumValidation, setAccNumValidation] = useState("");
  const [disableBtn, setDisableBtn] = useState<any>(true);
  const [errorMsg, setErrorMssg] = useState<any>(null);
  const [showError, setShowError] = useState<any>(false);
  const [bankObj, setBankObj] = useState<any>({
    bankCode: "",
    bankName: "",
  });
  const [alertModal, setAlertModal] = useState<any>(false);
  const [alertStage, setAlertStage] = useState<any>(0);
  const [modalMessage, setModalMessage] = useState<any>("");


  const [state, setState] = useState<any>({
    settlementBank: "",
    bankName: "",
    settlementAccountNo: "",
    stage: "",
    bvn: "",
    phoneNumber: "",
    check: false,
    submittingError: false,
    isSubmitting: false,
    isDisabled: false,
    errorMssg: ""
  })

  async function toggleModal() {
    await setAlertModal(!alertModal);
    setAlertStage(0);
}
  const { settlementBank, bankName, settlementAccountNo, stage, check, submittingError, isDisabled, isSubmitting, errorMssg } = state

  useEffect(() => {
    fetchBankList().then((res: any) => {
      setBankList(res);
      const bankArray: any = [];
      const bankParams = bankList.forEach((item: any) => {
        bankArray.push(item?.bankName);
      })
      setBankName(bankArray);
      const fetchChosenObject = bankList?.filter((entry: any) => entry?.bankName === bankNameList);
      setBankObj({
        bankCode: fetchChosenObject[0]?.bankCode,
        bankName: bankNameList
      })
    }).catch((err: any) => {
      console.error("API Error>>", err);
    }).finally(() => {
      console.info("Fetch List of Banks!")
    })
  }, [bankNameList,bankList])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      submittingError: false
    });
    const inputAccNum = (document.getElementById('settlementAccountNo') as HTMLInputElement)?.value;
    if (inputAccNum?.length === 10) {
      setAccNumValidation("")
      accNameEnquires({ ...bankObj, bankAccountNo: inputAccNum }).then((res: any) => {
        setAccNumValidation("")
        setAcctName(res?.accountName);
      }).catch((err: any) => {
        console.error("API err123>>>", err);
        setShowError(true);
        setErrorMssg(err?.response?.data?.respDescription);
      })
    } else if (inputAccNum.length <= 9 && inputAccNum.length !== 0) {
      setAccNumValidation("Account number must be 10 digits")
    } else if (inputAccNum?.length > 10) {
      setAccNumValidation("Account number must be 10 digits")
    } else {
      console.log('');
    }
   
  }

  useEffect(() => {
    const handleBackButton = (event:any) => {
      event.preventDefault(); 
    };
    window.history.pushState({ page: 'myComponent' }, '', '');
    window.addEventListener('popstate', handleBackButton);
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []); 

  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState((state: any) => ({
      ...state,
      isSubmitting: true
    }))
    try {
      const response = await apiCall({
        name: "selfOnboarding",
        data: {
          settlementBank,
          settlementAccountNo,
          stage: "settlement"
        },
        action: (): any => {
          setState({
            ...state,
            isSubmitting: false,
            submittingError: false,
          });
          //  router.push("/login")
          return []
        },
        successDetails: {
          title: "Settlement Bank Added",
          text: `Settlement details submitted to your profile, you are all done`,
          icon: ""
        },
        errorAction: (err?: any) => {
          if (err && err?.response?.data) {
            setState({
              ...state,
              submittingError: true,
              isSubmitting: false,
              errorMssg: err?.response?.data?.errorMssg || err?.response?.errorMssg || err?.response?.data?.respDescription || err?.response?.respDescription || "Action failed, please try again"
            })
            setErrorMssg(err?.message);
            setTimeout(() =>  setErrorMssg(err?.message), 4000)
            setShowError(true);
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
        //  console.log("res>>", res);
        toggleModal();
          localStorage.setItem('onboardingStageKey', "settlement");
          await localStorage.setItem('onboardingStage', JSON.stringify({ onboardingStage: "settlement" }));
          setState({
            submittingError: false,
            isSubmitting: false,
            errorMssg: ""
          })
          setModalMessage("Your details has been succesfully registered!...you may now login"); 
          navigate("/")
        })
    } catch (e) {
      console.error(e + " 'Caught Error.'");
    };
  }



  return (
    <div>
      <NavBarItems />
      <div className="md:flex">
        <aside className="md:w-1/4 p-4 hidden sm:block">
          <RegistrationSideBar />
        </aside>
        <main className="md:flex-1 p-4 my-2">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4">
            <div className="p-4">
              <p className="text-xl">Settlement Information</p>
              {/* <p className="text-sm text-gray-400">Create a PIN to authenticate your transactions</p> */}
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-400 w-72  lg:w-1/3" >
                <CustomDropDown
                  label='Select Bank'
                  options={BankName}
                  value={bankNameList}
                  setValue={setbankNameList}
                  //   value={branch} 
                  //   setValue={setbranch} 
                  // handleChange={handleChange}
                />
              </p>
              <small className='text-red-700'>{errorMsg}</small>
            </div>
            <div className="p-4  mt-[-25px]">
              <p className="text-sm text-gray-400 lg:w-1/3 w-72">
                <DefaultInput
                  type="text"
                  label="Account Number"
                  required={true}
                  placeHolder="Enter Account Number"
                  name="settlementAccountNo"
                  value={settlementAccountNo}
                  handleChange={handleChange}
                  id="settlementAccountNo"
                />
              </p>
              <p className='text-sm italic text-blue-600'>{acctName}</p>
              <small className='text-red-500'>{acctNumValidation}</small>
            </div>
            <div className="p-4  mt-[-25px]">
              <p className="text-base"><input type="checkbox" onClick={() => setDisableBtn(false)}/> I agree to the terms and conditions</p>
              <p className='text-blue-400 text-base mx-4'>terms of acceptable use.</p>
            </div>
      
            <div className="p-4 mt-[-25px]">
                                 {
                                    showError &&
                                  <>
                                    <p className='lg:w-1/3'>
                                    <ErrorCard handleClear={() => setState({ ...state, submittingError: false })} error={errorMsg} containerVariant={!submittingError ? "hidden" : ""} />
                                    </p>
                                    <br />
                                  </>
                                 }
                                   <button onClick={handelSubmit} disabled={disableBtn} className="w-72 h-12 rounded-md bg-blue-500 text-white  transition-all duration-500 hover:scale-105 hover:brightness-110">Submit</button>
                                 
                                </div>
          </div>
        </main>
      </div>
      <Modal toggleDropdown={toggleModal} isOpen={alertModal} setStage={setAlertStage} stage={alertStage} message={modalMessage}/>
   
    </div>
  )
}

export default SettlementInformation