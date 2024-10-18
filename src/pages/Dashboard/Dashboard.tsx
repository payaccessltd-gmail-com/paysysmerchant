import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/Index";
import { Button } from "../../components/reusables/DefaultButton";
import AccountDetails from "./components/AccountDetails";
import BusinessAccount from "./components/BusinessAccount";
import Graph from "./components/Graph";
import PaymentChannel from "./components/PaymentChannel";
import RecentTransaction from "./components/RecentTransaxtion";
import { useNavigate } from "react-router-dom";
import { fetchCollectionBalance, fetchDashBranchData, fetchDashData, fetchRecentTransaction } from "../../containers/dashboardApis";
import Loading from "../../components/Loading";
import BranchPerformance from "./components/BranchPerfomance";

const Dashboard = () => {
  const [dashBranchData, setDashBranchData] = useState<any[]>([]);
  const [statData, setStatData] = useState<any>({});
  const [recentTran, setRecentTran] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [onboardingStage, setOnboardingStage] = useState<string>("");
  const [collectionBalance, setCollectionBalance] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const getOnboardingStage = localStorage.getItem('onboardingStage');
    if (getOnboardingStage) {
      const parseOnboardingStage = JSON.parse(getOnboardingStage);
      setOnboardingStage(parseOnboardingStage?.onboardingStage || "");
    } else {
      setOnboardingStage(""); // Default value if null
    }
  }, []);

  const routes: Record<string, string> = {
    "": '/registrations/create-pin',
    "create_merchant": '/registrations/create-pin',
    "secure_account": '/registrations/security-questions',
    "securityQuestions": '/registrations/bvn',
    "bvn": '/registrations/business-type',
    "business_profile": '/registrations/verify-email-address',
    "verify_business_email": '/registrations/verify-phone-number',
    "verify_phone": '/registrations/business-location',
    "set_up_location": '/registrations/director-profile',
    "directors_details": '/registrations/director-profile',
    "uploadId": '/registrations/document-upload',
    "uploadDoc": '/registrations/settlement-information',
  };
  
  const handleRoutes = () => {
    navigate(routes[onboardingStage] || '/dashboard');
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statResponse, recentResponse, branchResponse, balanceResponse] = await Promise.all([
        fetchDashData(),
        fetchRecentTransaction(),
        fetchDashBranchData(),
        fetchCollectionBalance()
      ]);
      
      setStatData(statResponse);
      setRecentTran(recentResponse);
      setDashBranchData(branchResponse);
      setCollectionBalance(balanceResponse);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid md:grid-cols-[2fr_1fr] mt-[20px] gap-[20px]">
          <div className="grid gap-[20px] h-fit order-2 md:order-1">
            {onboardingStage !== 'settlement' && (
              <div className="rounded-lg p-[20px] border-[1px] bg-secondary bg-opacity-10 border-secondary gap-[20px]">
                <p className="text-[20px] font-semibold">Get Started</p>
                <div className="flex flex-col md:flex-row gap-2 md:items-center">
                  <div className="h-[5px] rounded-lg w-full bg-secondary bg-opacity-40 dark:bg-neutral-600">
                    <div className="h-[5px] rounded-lg bg-secondary w-[25%]"></div>
                  </div>
                  <div className="whitespace-nowrap">
                    <p>Step 1 of 4</p>
                  </div>
                </div>
                <div className="md:grid md:grid-cols-2 lg:grid-cols-4 justify-between gap-y-5 gap mt-[20px] hidden">
                  <div className="flex gap-2 text-[13px] items-center">
                    <div className="rounded-full px-[12px] py-[5px] border-black border-[1px] h-fit w-fit">1</div>
                    <p>Secure Account</p>
                  </div>
                  <div className="flex gap-2 text-[13px] items-center">
                    <div className="rounded-full px-[12px] py-[5px] border-black border-[1px] h-fit w-fit">2</div>
                    <p>Business Profile</p>
                  </div>
                  <div className="flex gap-2 text-[13px] items-center">
                    <div className="rounded-full px-[12px] py-[5px] border-black border-[1px] h-fit w-fit">3</div>
                    <p>Document Upload</p>
                  </div>
                  <div className="flex gap-2 text-[13px] items-center">
                    <div className="rounded-full px-[12px] py-[5px] border-black border-[1px] h-fit w-fit">4</div>
                    <p>Settlement Account</p>
                  </div>
                </div>
                <div className="w-fit" onClick={handleRoutes}>
                  <Button title='Complete Setup' className='bg-secondary' />
                </div>
              </div>
            )}
            <AccountDetails data={statData} todayCollection={collectionBalance} />
            <Graph data={statData} />
            <RecentTransaction data={recentTran} />
          </div>
          <div className="grid gap-[20px] h-fit order-1 md:order-2">
            <BusinessAccount />
            <div className="hidden md:block">
              <PaymentChannel />
            </div>
            <BranchPerformance data={dashBranchData} />
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
