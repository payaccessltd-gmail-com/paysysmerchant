import React, { useState } from 'react'
import DashboardLayout from '../../components/dashboard/Index'
import ChangePassword from './components/ChangePassword';
import ChangePin from './components/ChangePin';
import ForgotTransPin from './components/ForgotTransPin';
import KYC from './components/KYC';
import Profile from './components/Profile';

const Settings = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabsData = [
    { id: 0, text: "Profile" },
    { id: 1, text: "KYC Upload" },
    { id: 2, text: "Change Password" },
    { id: 3, text: "Change Transaction PIN" },
    { id: 4, text: "Forgot Transaction PIN" },
  ];

  function switchPage() {
    if(selectedTab===0) return <Profile/>
    if(selectedTab===1) return <KYC/>
    if(selectedTab===2) return <ChangePassword/>
    if(selectedTab===3) return <ChangePin/>
    if(selectedTab===4) return <ForgotTransPin/>
  }
  return (
    <DashboardLayout>
      <div className="lg:px-[120px] ">
      <p className="text-[24px] font-bold my-5">Settings</p>

      <div className="border-y-[1px] py-[20px] flex flex-wrap gap-4 text-[12px] md:justify-between ">
      {tabsData?.map((tab) => (
            <p
              className={` py-[5px] hover:cursor-pointer  ${
                selectedTab === tab.id
                  ? " text-primary  "
                  : "text-[#687CA3] hover:text-blue-800"
              }`}
              onClick={() => setSelectedTab(tab.id)}
            >
              {tab.text}
            </p>
          ))}
      </div>
      {switchPage()}

      </div>
    </DashboardLayout>
  )
}

export default Settings