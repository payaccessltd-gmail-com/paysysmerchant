import { useEffect, useState } from "react";
//import { createSplit } from "../../../containers/splitAPI";
//import { getBankData, getPaymentGateway } from '../../../containers/businessAPI';
import DefaultInput from "../../../components/reusables/DefaultInput";
import { Button } from "../../../components/reusables/DefaultButton";
import Overlay from "../../../components/reusables/Overlay/Overlay";
import CustomDropDown from "../../../components/reusables/dropdowns/CustomDropDown";


const AddSplit = ({ clicked, show }: any) => {
  const branchId = localStorage.getItem('businessID');
  const [selectedCategory, setSelectedCategory] = useState<any>("Select a Settlement Bank");
  let [bankArray, setBankArray] = useState<any>([]);

  const [selectedPaymentLink, setSelectedPaymentLink] = useState<any>("Select a Payment Link");
  let [paymentArray, setPaymentArray] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(false);

  let [state, setstate] = useState({
    bankName: '',
    accountName: '',
    accountNo: '',
    spitRation: '',
    option: '',
    submittingError: false
  })

  const { bankName, accountName, accountNo, spitRation, option, submittingError } = state;

  useEffect(() => {
    // getBankData().then((res: any) => {
    //   let bankNameArray = res?.map((item: any) => item?.bankName);
    //   setBankArray(bankNameArray);
    //   //console.log('bank Array>>', bankNameArray);
    // }).catch((err: any) => {
    //   console.error('error>>', err);
    // })
  }, []);

  useEffect(() => {
    // try {
    //   let getBusinessId: any = localStorage.getItem('businessID');
    //   getPaymentGateway(Number(getBusinessId))?.then((res: any) => {
    //     let getwayArray:any = res?.map((item:any) => item?.linkId);
    //    setPaymentArray(getwayArray); 
    //   //  state.option = selectedPaymentLink;
    //   }).catch((err: any) => {
    //     console.log('err>>', err);
    //   })
    // } catch (err: any) {
    //   console.log('err from fetching the dropdown due to lazy loading time>>', err)
    // }
  }, []);

  state.bankName = selectedCategory;
   state.option = selectedPaymentLink;
  //console.log('selected gateway>>', state.option);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setstate({
      ...state,
      [e.target.name]: e.target.value,
      submittingError: false
    });
  }

  async function handleSubmit() {
    setIsLoading(true);
    // try {
    //   const res = await createSplit('', branchId, bankName, accountName, spitRation, option, accountNo).then((res:any) =>  { 
    //     setIsLoading(false);
    //     setTimeout(() => window.location.reload(), 200);
    //   }).catch((err:any) => {
    //     console.error('API err>>>', err);
    //     setTimeout(() => window.location.reload(), 200);
    //   })
    //   //console.log(res)
    //   show();
    // } catch (error: any) {
    //   setIsLoading(false);
    //   console.error(error)
    // }
  }



  return (
    <Overlay isOpen={show} toggleDropdown={clicked} >
      <div className="grid gap-[20px] w-[90vw] md:w-[50vw] ">
        <div className="grid">
          <p className="text-[#5C5F61] text-[16px]">Spit/skim</p>
          <p className="text-[#07222D] text-[14px]">Complete and enter the following form below  </p>
        </div>

        {/* <DefaultInput label='Bank Name' placeHolder='Select bank name' value={bankName} name='bankName' handleChange={handleChange} /> */}
        <CustomDropDown label="Settlement Bank" value={selectedCategory} setValue={setSelectedCategory} options={bankArray} placeHolder="Select a Settlement Bank" />
        <DefaultInput label='Account name' readOnly={true} placeHolder='oluchi chukwu' value={accountName} name='accountName' handleChange={handleChange} />
        <DefaultInput label='Account Number' placeHolder='09876543212' value={accountNo} name='accountNo' handleChange={handleChange} />
        <DefaultInput label='Spit Ration' placeHolder='20.0%' value={spitRation} name='spitRation' handleChange={handleChange} />
        {/* gshdghds */}

        <CustomDropDown label="Select Payment Link" value={selectedPaymentLink} setValue={setSelectedPaymentLink} options={paymentArray} placeHolder="Select a Payment Link" />

        {/* <div className="form-group mb-4 cursor-pointer">
          <label className="block text-gray-600 text-sm mb-2" htmlFor="dropdown">Select an option</label>
          <select className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="dropdown" value={option} name='option' onChange={handleChange} >
            <option value="option1">--select payment link--</option>
            <option value="option2">Flutterwave</option>
            <option value="option3">Paypal</option>
            <option value="option3">Ali-Express</option>
          </select>
        </div> */}

        {/* 
        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select> */}


        {/* ghghghgh */}
        <div className="m-auto w-3/4">
          <Button title='Save' onClick={handleSubmit} isLoading={isLoading}/>
        </div>
      </div>
    </Overlay>
  )
}

export default AddSplit