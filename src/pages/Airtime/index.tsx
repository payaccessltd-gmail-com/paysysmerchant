import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../components/dashboard/Index';
import { IoMdArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { Image } from '../../assets';
import { Button } from '../../components/reusables/DefaultButton';
import DefaultInput from '../../components/reusables/DefaultInput';
import CustomDropDown from '../../components/reusables/dropdowns/CustomDropDown';
import { fetchDataPlans, airtimePurchase, dataPurchase } from '../../containers/transactionApis';
import { ErrorCard, SuccessCard } from '../../Utils/HttpResponseHandlers/error';
import OTPInput from '../../components/reusables/OTPInput/Index';


const Airtime = () => {
  const navigate = useNavigate()
  const utility = [{ name: 'Ikeja Electricity', image: Image.ikejaElectric }, { name: 'Abuja Electricity', image: Image.abujaElectric }, { name: 'Eko Electricity', image: Image.ekoElectric }, { name: 'Port Harcourt Electricity', image: Image.PHelectric }, { name: 'Aba Power', image: Image.abiaElectric }, { name: 'Enugu Electricity', image: Image.enuguElectric }, { name: 'Jos Electricity', image: Image.josElectric }, { name: 'Kano Electricity', image: Image.kanoElectric }, { name: 'Kaduna Electricity', image: Image.kadunaElectric }, { name: 'Benin Electricity', image: Image.enuguElectric }];
  const [state, setState] = useState<any>({
    phoneNumber: "",
    transactionPin: "",
    networkProvider: "",
    requestType: "",
    airTimeAmount: "",
    check: false,
    submittingError: false,
    submittingSuccess: false,
    isSubmitting: false,
    isDisabled: false,
    errorMssg: ""
  })
  const [isLoading, setIsLoading] = useState<any>(false);
  const { phoneNumber, transactionPin, networkProvider, requestType, airTimeAmount, submittingError, submittingSuccess } = state;
  let [otp, setOtp] = useState('');
  // const [airTimeAmount, setAirtimeAmount] = useState<any>(0);
  let [options, setOptions] = useState<any>([]);
  function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      submittingError: false
    });
    //setAirtimeAmount(e?.target?.value);
  }
  const [selectedOption, setSelectedOption] = useState('');
  const [showErrMsg, setShowErrMsg] = useState<any>(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState<any>(false);
  const [errMsg, setErrMsg] = useState<any>("")
  const [sucessMsg, setSuccessMsg] = useState<any>("")
  const [selectedRequestType, setSelectedRequestType] = useState('');
  const [showPackage, setShowPackage] = useState<any>(false);
  const [showAirtimeInput, setShowAirtimeInput] = useState<any>(false);
  const [packages, setPackages] = useState<any>('Select Package');
  let [selectedNetwork, setSelectedNetwork] = useState("");
  const [showSelectedNetwork, setShowSelectedNetwork] = useState<any>(false);

  const networkType = [
    {
      src: Image.mtn,
      alt: "MTN",
      className: "w-16 mx-auto",
    },
    {
      src: Image.airtel,
      alt: "Airtel",
      className: "w-16 mx-auto",
    },
    {
      src: Image.etisalat,
      alt: "9mobile",
      className: "w-16 mx-auto",
    },
    {
      src: Image.glo,
      alt: "Glo",
      className: "w-16 mx-auto",
    }
  ]

  const cardData = networkType.map((val: any, index: number) => (
    <div className='sm:grid-cols-2 md:grid-cols-4 gap' key={index} >
      <div onClick={() => {
        selectedNetwork = val?.alt;
      //  console.log("selected Network Type>>>", selectedNetwork);
        setSelectedNetwork(val?.alt);
        setShowSelectedNetwork(true);
        setShowErrMsg(null);
        setShowSuccessMsg(null);
      }} className={`${selectedNetwork===val.alt&&'!border-primary'} w-15 h-15 bg-white border border-gray-300 rounded-lg shadow-lg p-4 cursor-pointer transform hover:translate-y-2 hover:shadow-2xl transition-transform`}>
        <img
          src={val?.src}
          alt={val.alt}
          className={val.className}
        />
      </div>
{/* <div className={`${selectedNetwork === val.alt && '!border-primary'} w-15 h-15 bg-white border border-gray-300 rounded-lg shadow-lg p-4 cursor-pointer transform hover:translate-y-2 hover:shadow-2xl transition-transform`} style={{ imageRendering: 'crisp-edges', }}>
  <img
    src={val?.src}
    alt={val.alt}
    className={val.className}
    style={{ width: '100%', height: '100%', objectFit: 'cover', }}
  />
</div> */}



    </div>
  ));


  const handleOptionChange = (event: any) => {
    setSelectedOption(event?.target?.value);
    if (event?.target?.value === 'option1') {
      setSelectedRequestType("Airtime");
      setShowAirtimeInput(true);
      setShowPackage(null);
      setShowErrMsg(null);
      setShowSuccessMsg(null);
    } else if (event?.target?.value === 'option2') {
      setSelectedRequestType("Data");
      setShowPackage(true);
      setShowAirtimeInput(null);
      setShowErrMsg(null);
      setShowSuccessMsg(null);
      getDataPlans();
    }
  };



  // const handleNetworkChange = (event: any) => {
  //    console.log("selected Network Type>>>", selectedNetwork);
  //   setSelectedNetwork(event);
  //   setShowErrMsg(null);
  //   setShowSuccessMsg(null);
  // };

  function getDataPlans() {
    fetchDataPlans().then((res: any) => {
      // console.log("res>>>", res);
      const loopThroughData = res?.forEach((provider: any) => {
        const providersArray: any = provider?.billerName;
        if (providersArray?.includes(selectedNetwork)) {
          setOptions(provider?.options);
        }
      })
    }).catch((err: any) => {
      console.error("Fetch Data Plans Err>>", err);
    })
  }

  const dataOption = options?.map((val: any) => (`${val?.optionName} ⇨ ₦ ${val?.amount}`));
 

//(e:any) => handleNetworkChange(val?.alt)


  // const cardData = networkType.map((val: any, index: number) => (
  //   <input
  //     type="text"
  //     key={index}
  //     className="w-15 h-15 bg-white border border-gray-300 rounded-lg shadow-lg p-4 cursor-pointer transform hover:translate-y-2 hover:shadow-2xl transition-transform"
  //     onClick={(e) => handleNetworkChange(val?.alt)}
  //     placeholder={<img src={val?.src} alt={val.alt} className={val.className} />}
  //   />
  // ));


const upperCaseSelectedNetwork=selectedNetwork.toUpperCase()

const handleSubmitData = () => {
    setIsLoading(true);
    let billerOptionId: number = 0;
    const chooseOption = options.forEach((param: any) => {
      if (param?.optionName?.trim()?.includes(packages?.split('⇨')[0]?.trim())) {
        billerOptionId = param?.id;
      }
    })
    const payloadRequest = {
      // requestType: selectedRequestType,
      //  amount: parseInt(packages?.split('⇨')[1]?.trim()?.split(' ')[1]),
      pin: otp,
      phoneNumber: phoneNumber,
      network:  upperCaseSelectedNetwork === '9MOBILE' ? '_9MOBILE' : upperCaseSelectedNetwork,
      deviceId: "",
      channel: "WEB",  //"WEB", "MOBILE", POS
      billerOptionId: billerOptionId
    }
    dataPurchase(payloadRequest).then((res: any) => {
     //console.log('data res>>>', res);
      if (parseInt(res?.respCode) === 96) {
        setShowSuccessMsg(null)
        setShowErrMsg(true);
        setErrMsg(res?.respDescription);
      //  setTimeout(() => window.location.reload(), 2500);
        setState((prevState: any) => ({ ...prevState, submittingError: true }));
      } else if (res?.status === "SUCCESS") {
        setShowErrMsg(null);
        setShowSuccessMsg(true);
        setSuccessMsg("Data purchased succesfully!");
        setTimeout(() => window.location.reload(), 2500);
        setState((prevState: any) => ({ ...prevState, submittingSuccess: true }));
      }
    }).catch((err: any) => {
      console.error("airtime err>>", err?.response?.data?.respDescription);
      setShowSuccessMsg(null)
      setShowErrMsg(true);
      setErrMsg(err?.response?.data?.respDescription);
    //  setTimeout(() => window.location.reload(), 2500);
      setState((prevState: any) => ({ ...prevState, submittingError: true }))
    }).finally(() => setIsLoading(false))
  }

  const handleSubmitAirtime = () => {
    setIsLoading(true);
    const payloadRequest = {
      //requestType: selectedRequestType,
      phoneNumber: phoneNumber,
      network: upperCaseSelectedNetwork === '9MOBILE' ? '_9MOBILE' : upperCaseSelectedNetwork,
      pin: otp,
      amount: parseInt(airTimeAmount),
      deviceId: "",
      channel: "WEB"  //"WEB", "MOBILE", POS
    }

    airtimePurchase(payloadRequest).then((res: any) => {
      //console.log('airtime res>>>', res);
      if (parseInt(res?.respCode) === 96) {
        setShowSuccessMsg(null);
        setShowErrMsg(true);
        setErrMsg(res?.respDescription);
        // setTimeout(() => window.location.reload(), 2500);
        setState((prevState: any) => ({ ...prevState, submittingError: true }))
      } else if (res?.status === "SUCCESS") {
        setShowErrMsg(null);
        setShowSuccessMsg(true);
        setSuccessMsg('Airtime purchased succesfully!');
        setTimeout(() => window?.location?.reload(), 2500);
        setState((prevState: any) => ({ ...prevState, submittingSuccess: true }))
      }
    }).catch((err: any) => {
      console.error("airtime err>>", err?.response?.data?.respDescription);
      setShowSuccessMsg(null)
      setShowErrMsg(true);
      setErrMsg(err?.response?.data?.respDescription);
    //  setTimeout(() => window.location.reload(), 2000);
      setState((prevState: any) => ({ ...prevState, submittingError: true }))
    }).finally(() => setIsLoading(false));

  }

  const closeAlert = () => {
    setShowErrMsg(false);
}

const closeSuccesAlert = () => {
    setShowSuccessMsg(false);
}

  return (
    <DashboardLayout>
      <div className="flex gap-2 mt-5 items-center">

      </div>
      <p className="text-[20px] font-bold mt-5">Airtime</p>
      <div className="mt-5 rounded-md bg-[#F9F9F9] md:w-[400px] w-full p-[20px] grid gap-[20px]">
        <div className="grid grid-rows-5 grid-cols-1 gap-4">
          <div className="p-4">
            <p className="text-sm text-gray-400 ">
              <DefaultInput
                type="text"
                label="Phone Number"
                required={true}
                placeHolder="Enter Phone Number"
                name="phoneNumber"
                value={phoneNumber}
                handleChange={handleChange}
              />
            </p>
          </div>
          {/* <div style={{width: '342px', height: '50px'}} className="bg-grey-400 border border-grey-400 text-grey-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline text-sm">Selected Network: <b>MTN</b></span>
                        </div> */}
          <div className="p-4 grid grid-cols-4 gap-4">
            {/* <p className="text-sm text-gray-400 ">Network Provider</p> */}
            {cardData}
          </div>
          <div className="p-4">

            {
              showSelectedNetwork &&
              <p className="text-sm text-gray-400 text-2xl" style={{marginTop: '-10px'}}>
              Selected Network: <b>{selectedNetwork}</b>
            </p>
            }
         
            <p className="text-sm mt-4">
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-indigo-600 h-6 w-6"
                    value="option1"
                    checked={selectedOption === 'option1'}
                    onChange={handleOptionChange}
                  />
                  <span className="ml-2">Airtime</span>
                </label>

                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    className="form-radio text-indigo-600 h-6 w-6"
                    value="option2"
                    checked={selectedOption === 'option2'}
                    onChange={handleOptionChange}
                  />
                  <span className="ml-2">Data</span>
                </label>
              </div>
            </p>
          </div>
          {
            showPackage &&
            <>
              <div className="p-4">
                <p className="text-sm text-gray-400 mt-[-30px]">
                  {/* onClick={() => handleSelect(options)} */}
                  <CustomDropDown
                    // onClick={()=> console.log("options>>", options)}
                    label='Select Data Package'
                    options={dataOption}
                    value={packages}
                    setValue={setPackages}
                  />
                </p>
              </div>
            </>
          }

          {
            showAirtimeInput &&

            <div className="p-4 mt-[-30px]">
              <p className="text-sm text-gray-400 ">
                <DefaultInput
                  type="text"
                  label="Airtime"
                  required={true}
                  placeHolder="Enter Airtime Amount"
                  name="airTimeAmount"
                  value={airTimeAmount}
                  handleChange={handleChange}
                />
              </p>
            </div>
          }


          <div className="p-4 mt-[-30px]">
            <p className="text-sm text-gray-400 ">
              {/* <DefaultInput
                type="text"
                label="Transaction PIN"
                required={true}
                placeHolder="Enter Transaction PIN"
                name="transactionPin"
                value={transactionPin}
                handleChange={handleChange}
              /> */}
                 <p className="text-black">Enter Transaction PIN</p>
        <div className="flex mt-2">
                <OTPInput
                  length={6}
                  className="flex gap-6"
                  inputClassName="w-8 h-8 text-3xl text-center border border-gray-300 rounded-md focus:border border-gray-200 focus:ring-1 ring-blue-aqua"
                  isNumberInput
                  autoFocus
                  onChangeOTP={(otp: any) => {
                    setOtp(otp);
                    //console.log('otp>>', otp,"length>>", otp.length);
                  }}
                />
              </div>
            </p>
          </div>

          {showErrMsg &&
            // <p><ErrorCard handleClear={() => setState({ ...state, submittingError: false })} error={errMsg} containerVariant={!submittingError ? "hidden" : ""} /></p>
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 rounded relative" role="alert" style={{height: '55px'}}>
            <span className="block sm:inline mt-2">{errMsg}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-1" >
                <svg onClick={closeAlert} className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
            </span>
        </div>
          }

          {
            showSuccessMsg &&
            // <p>  <SuccessCard handleClear={() => setState({ ...state, submittingSuccess: false })} error={sucessMsg} containerVariant={!submittingSuccess ? "hidden" : ""} /></p>
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert"  style={{height: '55px'}}>
            <span className="block sm:inline mt-2">{sucessMsg}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" >
                <svg onClick={closeSuccesAlert} className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
            </span>
        </div>
          }

          {
            showPackage === true ?
              <div className="p-4 mt-[-30px]" onClick={handleSubmitData}>
                <Button title='Continue' isLoading={isLoading} />
              </div>
              :
              showAirtimeInput === true ?
                <div className="p-4 mt-[-30px]" onClick={handleSubmitAirtime}>
                  <Button title='Continue' isLoading={isLoading} />
                </div>
                :
                showPackage === false && showAirtimeInput === false ?
                  <div className="p-4 mt-[-30px]">
                    <Button title='Continue' />
                  </div>
                  :
                  <></>

          }
        </div>
      </div>

    </DashboardLayout>
  )
}

export default Airtime