import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/reusables/DefaultButton";
import { fetchAMerchantData, fetchNewAMerchantData } from "../../../containers/dashboardApis";
import { Storage } from "../../../Utils/Stores/inAppStorage";

const BusinessAccount = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<any[]>([]);
    const [userFullName, setUserFullName] = useState("");
    const [merchantName, setMerchantName] = useState("");

    const { merchantDetails, userId } = Storage.getItem("userDetails") || {
        merchantDetails: {},
        userId: null,
    };

    const { accountNumber } = merchantDetails || {};

    async function fetchData() {
        if (!userId) return; // Prevent fetching if userId is not available
        try {
            const res = await fetchAMerchantData(userId);
            // Handle response appropriately, e.g., set state if needed
        } catch (error) {
            console.error("Error fetching merchant data:", error);
        }
    }

    async function fetchNewData() {
        try {
            const res = await fetchNewAMerchantData();
            if (Array.isArray(res)) {
                setData(res);
            } else {
                console.warn("Expected an array but got:", res);
                setData([]); // Fallback to an empty array
            }
        } catch (error) {
            console.error("Error fetching merchant data:", error);
            setData([]); // Fallback to an empty array on error
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
            setUserFullName("Guest");
            setMerchantName("Unknown Merchant");
        }
    }

    useEffect(() => {
        decodeUserDetails();
        fetchData();
        fetchNewData();
    }, [userId]); // userId is a dependency

    return (
        <div className="rounded-lg bg-[#F9F9F9] py-[12px] px-[20px] grid gap-[10px] h-fit">
            <p className="text-[#020607] text-[16px] font-bold">Business Account</p>
            <div>
                {data.length > 0 ? data.map((user: any) => (
                    <div key={user.id} className="grid gap-1 py-2 border-b-[1px]">
                        <p className="text-[#747C91] text-[12px]">Bank Name</p>
                        <ul className="text-[15px] text-[#121212]">
                            <li>{user.bank || "N/A"}</li>
                        </ul>

                        <p className="text-[#747C91] text-[12px]">Account Number</p>
                        <ul className="text-[15px] text-[#121212]">
                            <li>{user.virtualAcctNo || "N/A"}</li>
                        </ul>

                        <p className="text-[#747C91] text-[12px]">Beneficiary</p>
                        <ul className="text-[15px] text-[#121212]">
                            <li>{user.virtualAcctName || "N/A"}</li>
                        </ul>
                    </div>
                )) : (
                    <p>No account details available.</p>
                )}
            </div>
            <Button title="View Transactions" onClick={() => navigate('/transaction')} />
        </div>
    );
};

export default BusinessAccount;
