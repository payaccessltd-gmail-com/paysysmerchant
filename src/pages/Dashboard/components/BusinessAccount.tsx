import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/reusables/DefaultButton";
import { fetchAMerchantData ,fetchNewAMerchantData} from "../../../containers/dashboardApis";
import { Storage } from "../../../Utils/Stores/inAppStorage";

const BusinessAccount = () => {
    const navigate = useNavigate();
    const [settlementBank, setSettlementBank] = useState(null);
    const [virtualAccNo, setVirtualAccNo] = useState('');
    const [bank, setBank] = useState('');
    const [accountNum, setAccountNum] = useState(null);
    const [userFullName, setUserFullName] = useState("");
    const [merchantName, setMerchantName] = useState("");
    const { merchantDetails, userId } = Storage.getItem("userDetails") || {
        firstName: "",
        lastName: "",
        accountType: "",
    };

    const { accountNumber } = merchantDetails || {};

    async function fetchData() {
        try {
            const res = await fetchAMerchantData(userId);
      
            setSettlementBank(res.settlementBank || null);
            setAccountNum(res.settlementAccountNo || null);
        } catch (error) {
            console.error("Error fetching merchant data:", error);
            // You can set a default value or just keep it as null
        }
    }

    async function fetchNewData() {
      try {
          const res = await fetchNewAMerchantData();
          console.log("parseDetailsNew",res)
          setVirtualAccNo(res[0].virtualAcctNo || null);
          setBank(res[0].bank || null);
        //  setAccountNum(res.settlementAccountNo || null);
      } catch (error) {
          console.error("Error fetching merchant data:", error);
          // You can set a default value or just keep it as null
      }
  }

    function decodeUserDetails() {
      const getUserDetails = localStorage.getItem('userDetails');
      if (getUserDetails) {
          const parseDetails = JSON.parse(getUserDetails);
   
          const parts = parseDetails?.token.split('.');
          const decodedPayload = atob(parts[1]);
          const userDetails = JSON.parse(decodedPayload);
          const getUserParams = JSON.parse(userDetails?.sub);
          setUserFullName(`${getUserParams?.firstName} ${getUserParams?.lastName}`);
          setMerchantName(parseDetails?.merchantDetails?.name);
      } else {
          // Handle case when userDetails is not found
          setUserFullName("Guest"); // Or any default value
          setMerchantName("Unknown Merchant"); // Or any default value
      }
  }
  

    useEffect(() => {
        decodeUserDetails();
        fetchData();
        fetchNewData()
    }, [userId]);

    return (
        <div className="rounded-lg bg-[#F9F9F9] py-[12px] px-[20px] grid gap-[10px] h-fit">
            <p className="text-[#020607] text-[16px] font-bold">Business Account</p>
            {/* <div className="grid gap-1">
                <p className="text-[#747C91] text-[12px]">Account Number</p>
                <p className="text-[30px] text-[#121212]">
                    {accountNumber || accountNum || "N/A"} 
                </p>
            </div> */}
               <div className="grid gap-1">
                <p className="text-[#747C91] text-[12px]">Account Number</p>
                <p className="text-[15px] text-[#121212]">
                    {virtualAccNo || "N/A"} 
                </p>
            </div>
            <div className="grid gap-1">
                <p className="text-[#747C91] text-[12px]">Beneficiary</p>
                <p className="text-[15px] text-[#121212]">{merchantName || userFullName || "N/A"}</p> {/* Display "N/A" if no name is available */}
            </div>
            <div className="grid gap-1">
                <p className="text-[#747C91] text-[12px]">Bank</p>
                <p className="text-[15px] text-[#121212]">{bank || "Merchant Bank"}</p> {/* Default to "Merchant Bank" */}
            </div>
            <Button title="View Transactions" onClick={() => navigate('/transaction')} />
        </div>
    );
};

export default BusinessAccount;
