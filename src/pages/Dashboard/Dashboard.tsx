import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/Index";
import { Button } from "../../components/reusables/DefaultButton";
import AccountDetails from "./components/AccountDetails";
import BusinessAccount from "./components/BusinessAccount";
import Graph from "./components/Graph";
import PaymentChannel from "./components/PaymentChannel";
import RecentTransaction from "./components/RecentTransaxtion";
import { useNavigate } from "react-router-dom";
//import { fetchAMerchantData, fetchCollectionBalance, fetchDashBranchData, fetchDashData, fetchRecentTransaction } from "../../containers/dashboardApis";
import { fetchAMerchantData, fetchCollectionBalance, fetchDashBranchData, fetchDashData, fetchRecentTransaction } from "../../containers/dashboardApis";
import { Image } from "../../assets";
import { SpinnerIcon } from "../../components/reusables/icons";
import Loading from "../../components/Loading";
import BranchPerformance from "./components/BranchPerfomance";



const Dashboard = () => {
  const [dashBranchData, setDashBranchData] = useState([])
  const [statData, setStatData] = useState({})
  const [recentTran, setRecentTran] = useState([])
  const [loading, setloading] = useState(false)
  const [onboardingStage, setOnboardingStage] = useState<any>("");
  const navigate = useNavigate();

  useEffect(() => {
    const getOnboardingStage: any = localStorage.getItem('onboardingStage');
    const parseOnboardingStage = JSON.parse(getOnboardingStage);
    setOnboardingStage(parseOnboardingStage?.onboardingStage);
  }, [])

  const handleRoutes = () => {
    if (onboardingStage === "") {   //settlement is for a completed reg lifecycle, while "" is for onboarding just starting 
      navigate('/registrations/create-pin');
    } else if (onboardingStage === "create_merchant") {
      navigate('/registrations/create-pin')

    } else if (onboardingStage === "secure_account") {
      navigate('/registrations/security-questions')
    }
    else if (onboardingStage === "securityQuestions") {
      navigate('/registrations/bvn')
    } else if (onboardingStage === "bvn") {
      navigate('/registrations/business-type')
    } else if (onboardingStage === "business_profile") {
      navigate('/registrations/verify-email-address')
    } else if (onboardingStage === "verify_business_email") {
      navigate('/registrations/verify-phone-number')
    } else if (onboardingStage === "verify_phone") {
      navigate('/registrations/business-location')
    } else if (onboardingStage === "set_up_location") {
      navigate('/registrations/director-profile')
    } else if (onboardingStage === "directors_details") {
      navigate('/registrations/director-profile')  //uploadId is also designed in the director-profile page
    } else if (onboardingStage === "uploadId") {
      navigate('/registrations/document-upload')
    } else if (onboardingStage === "uploadDoc") {
      navigate('/registrations/settlement-information')
    } else {
      navigate('/dashboard')
    }
  }

  const [branchStats, setbranchStats] = useState({})

  function setCounts() {
    setloading(false)
    fetchDashData().then(res => {
      setStatData(res);
      setbranchStats(res.branchStats)
      setloading(true)
    })
  }
  // console.log(statData)

  function setTrans() {
    setloading(false)
    fetchRecentTransaction().then(res => {
      setRecentTran(res);
      // console.log(res, 'recent trans')
      setloading(true)

    })
  }
  const [collectionBalance, setcollectionBalance] = useState('')
  async function setBranch() {
    setloading(false)

    try {
      fetchDashBranchData().then(res => {
        setDashBranchData(res);
        setloading(true)

      })
      const res = await fetchCollectionBalance()
      // console.log(res)
      setcollectionBalance(res)
    } catch (error: any) {
      console.log(error)
    }
  }

  // console.log(collectionBalance)

  //  console.log(dashBranchData)

  useEffect(() => {
    setCounts()
    setTrans()
    setBranch()
  }, [])

  // Dragable icon

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (event: any) => {
    setIsDragging(true);
    const offsetX = event.clientX - position.x;
    const offsetY = event.clientY - position.y;
    const handleMouseMove = (event: any) => {
      setPosition({
        x: event.clientX - offsetX,
        y: event.clientY - offsetY,
      });
    };
    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };


  return (
    <DashboardLayout>
      {loading ?
        <div className="grid md:grid-cols-[2fr_1fr] mt-[20px] gap-[20px]">
          <div className="grid gap-[20px] h-fit order-2 md:order-1" >

            {
              onboardingStage !== 'settlement' &&
              <div className="rounded-lg p-[20px] border-[1px]   bg-[#3477E4] bg-opacity-[0.13] border-[#3477E4] gap-[20px]">
                <p className="text-[20px] font-semibold">Get Started Checklist</p>
                <div className="flex flex-col md:flex-row gap-2  md:items-center">
                  <div className="h-[5px] rounded-lg w-full bg-[#D2D8F0] dark:bg-neutral-600">
                    <div className="h-[5px] rounded-lg bg-primary w-[25%]"></div>
                  </div>
                  <div className=" whitespace-nowrap">
                    <p>Step 1 of 4</p>
                  </div>
                </div>
                <div className="md:grid md:grid-cols-2 lg:grid-cols-4 justify-between  gap-y-5 gap mt-[20px] hidden">
                  <div className="flex gap-2 text-[13px] items-center">
                    <div className="rounded-full px-[12px] py-[5px] border-black border-[1px] h-fit w-fit">
                      1
                    </div>
                    <p>Secure Account</p>
                  </div>

                  <div className="flex gap-2 text-[13px] items-center">
                    <div className="rounded-full px-[12px] py-[5px] border-black border-[1px] h-fit w-fit">
                      2
                    </div>
                    <p>Business Profile</p>
                  </div>
                  <div className="flex gap-2 text-[13px] items-center ">
                    <div className="rounded-full px-[12px] py-[5px] border-black border-[1px] h-fit w-fit">
                      3
                    </div>
                    <p>Document Upload</p>
                  </div>
                  <div className="flex gap-2 text-[13px] items-center">
                    <div className="rounded-full px-[12px] py-[5px] border-black border-[1px] h-fit w-fit">
                      4
                    </div>
                    <p>Settlement Account</p>
                  </div>
                </div>
                <div className="w-fit" onClick={handleRoutes}>
                  <Button title='Complete Setup' />

                </div>
              </div>
            }
            
            {/* <>
              <div onClick={() => navigate("/customers/build-bot")} className="absolute cursor-pointer" style={{ left: position.x, top: position.y }} onMouseDown={handleMouseDown}>
                <img src={Image?.buildbot} alt="Draggable" className="w-24 h-24"/>
              </div>
            </> */}

            <AccountDetails data={statData} todayCollection={collectionBalance} />
            <>
              <Graph data={statData} />
            </>
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

        : <Loading />}
    </DashboardLayout>
  );
};

export default Dashboard;
