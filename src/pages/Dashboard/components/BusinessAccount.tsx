import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/reusables/DefaultButton";
import { fetchAMerchantData } from "../../../containers/dashboardApis";
import { Storage } from "../../../Utils/Stores/inAppStorage";

const BusinessAccount = () => {
        const navigate=useNavigate()
        const [settlementBank, setSettlementBank] = useState<any>('');
        const [accountNum, setAccountNum] = useState<any>('');
        const [userFullName, setUserFullName] = useState<any>("");
        const [merchantName, setMerchantName] = useState<any>("");
  const { merchantDetails,userId } = Storage.getItem("userDetails") || {
    firstName: "",
    lastName: "",
    accountType: "",
  };



  const { accountNumber} = merchantDetails || {};
  
  async function fetchData() {
        await fetchAMerchantData(userId)
            .then((res: any) => {
              //  console.log(res,'from the data>>')
                setSettlementBank(res.settlementBank);
                setAccountNum(res?.settlementAccountNo);
            })
    }

    function decodeUserDetails(){
      const getUserDetails:any = localStorage.getItem('userDetails');
      const parseDetails:any = JSON.parse(getUserDetails);
      const parts:any = parseDetails?.token.split('.');
      const decodedPayload:any = atob(parts[1]);
      const userDetails:any = JSON.parse(decodedPayload)
      const getUserParams:any = JSON.parse(userDetails?.sub);
      setUserFullName(`${getUserParams?.firstName} ${getUserParams?.lastName}`);
      setMerchantName(parseDetails?.merchantDetails?.name);
    }

    useEffect(() => {
      decodeUserDetails()
        fetchData();

    }, [userId])
  return (
    <div className="rounded-lg bg-[#F9F9F9] py-[12px] px-[20px] grid gap-[10px] h-fit">
      <p className="text-[#020607] text-[16px] font-bold">Business Account</p>
      <div className="grid gap-1">
        <p className="text-[#747C91] text-[12px]">Account Number</p>
        <p className="text-[30px] text-[#121212]">
          {accountNumber || accountNum}
        </p>
      </div>
      <div className="grid gap-1">
        <p className="text-[#747C91] text-[12px]">Beneficiary</p>
        <p className="text-[15px] text-[#121212]">{merchantName ||userFullName}</p>
      </div>
      <div className="grid gap-1">
        <p className="text-[#747C91] text-[12px]">Bank </p>
        <p className="text-[15px] text-[#121212]">{'Build Micro-Finance Bank'}</p>
      </div>
      <Button title="View Transactions" onClick={()=>navigate('/transaction')}/>
    </div>
  );
};

export default BusinessAccount;
