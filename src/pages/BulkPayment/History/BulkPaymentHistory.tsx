import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsArrowUpRight } from 'react-icons/bs'
import DashboardLayout from '../../../components/dashboard/Index'
import { Button } from '../../../components/reusables/DefaultButton'
import exportToExcel from '../../../Utils/ExportExcel'
import NewUser from './components/NewUser'
import UserTable from './components/UserTable'

const BulkPaymentHistory = () => {
  const [UsersModal, setUsersModal] = useState(false)
  const [TableData, setTableData]= useState([])
  const [search, setSearch] = useState('')
  const [refresh, setRefresh] = useState(false)

  const [selectedTab, setSelectedTab] = useState(0);
    const tabsData = [
        { id: 0, text: "Teams" },
        { id: 1, text: "Roles" },
      ];
  const handleExport = () => {
    exportToExcel(TableData, `${selectedTab===0?'Teams':'Roles'}`);
  };
 async function toggleUsersRequestModal() {
   await setUsersModal(!UsersModal)
  }
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center">
    <p className="grid gap-[20px] text-[16px] font-semibold mt-[20px]">
   Bulk Payment History
      </p>
      <div className="w-fit">

      {/* <Button title='Add New User' onClick={toggleUsersRequestModal} className='!w-[181px]'/> */}
      </div>
    </div>
    {/* <div className="flex justify-between w-full mt-[20px]">
      <div className="relative">
        <div className="absolute text-[20px] top-[10px] left-[14px] text-[#7B7B7B]">
        <AiOutlineSearch/>

        </div>
        <input type="text" className="placeholder:text-[#7B7B7B] border-[#D0D5DD] border-[1px] rounded-md py-[7px] pl-[44px] bg-[#F7F8FA]" placeholder='Search by name/email' name='search' value={search} onChange={(e:any)=>{setSearch(e.target.value)}}/>
      </div>
    {TableData?.length >0&&
          <div className="w-fit ">
          <Button onClick={handleExport} title='Export' className='!bg-white !mt-0 !text-[#3C4257] !border-[1px] shadow-sm m-auto' icon={<BsArrowUpRight  className="font-bold"/>}/>
          </div>
        
        }
    </div> */}
    <UserTable selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabsData={tabsData} setTableData={setTableData} search={search} setRefresh={setRefresh} refresh={refresh}/>
    <NewUser toggleDropdown={toggleUsersRequestModal} isOpen={UsersModal} setRefresh={setRefresh}/>
    </DashboardLayout>
  )
}

export default BulkPaymentHistory