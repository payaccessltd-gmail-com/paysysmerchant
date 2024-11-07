
import { useEffect, useState } from "react";
import InventoryDashboardLayout from "../../../components/inventory/layout/Index";
import Loading from "../../../components/Loading";
import { fetchCollectionBalance, fetchDashBranchData, fetchDashData, fetchRecentTransaction } from "../../../containers/dashboardApis";
import { useNavigate } from "react-router-dom";
import TopSellingTable from "../../../components/inventory/components/top-selling-table";
import Cards from "../../../components/inventory/components/cards";


const InventoryOrder = () => {
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
    <InventoryDashboardLayout>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid bg-[#E3ECFF] p-[20px] gap-[20px] h-fit order-2 md:order-1">  
        <Cards/>
  
            <TopSellingTable data={recentTran} />
        </div>
      )}
    </InventoryDashboardLayout>
  );
};


export default InventoryOrder