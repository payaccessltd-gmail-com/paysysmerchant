import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsArrowUpRight } from 'react-icons/bs'
import DashboardLayout from '../../components/dashboard/Index'
import { Button } from '../../components/reusables/DefaultButton'
import SearchInput from '../../components/reusables/SearchInput/SearchInput'
import exportToExcel from '../../Utils/ExportExcel'
import { rows } from './Mocks'
import BillModal from '../Bills/components/BillModal'
import { useLocation } from 'react-router-dom';
import TerminalPerformanceTable from './TerminalPerformanceTable';

const TerminalPerformance = () => {
    const [isLoading, setisLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [billModal, setbillModal] = useState(false)
  const [searched, setSearched] = useState<string>("");
  const [state, setState] = useState<any>({
    search: "",
    role: "",
    status: "",
    submittingError: false,
    isExport: false,
    errorMssg:'',
    isSubmitting:false
  });

  const location = useLocation();
  //JSON.parse(location?.state)

  const { search, role, status, isExport } = state;
  const handleExport = () => {
    exportToExcel(JSON.parse(location?.state), "Terminal Performance List");
  };

  

  function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
    setSearched(e.target.value);
    setState({
        ...state,
        [e.target.name]: e.target.value,
        submittingError: false
    });
}
  return (
    <DashboardLayout>
        <div className="flex justify-between items-center">
        <p className="grid gap-[20px] text-[16px] font-semibold mt-[20px]">
          Merchant's Terminal Performance
        </p>

      </div>
      <div className="flex justify-between  w-full mt-[20px]">
      <SearchInput placeholder='Search' name='search' value={search} onChange={handleChange}/>
        {JSON.parse(location?.state).length > 0 && (
          <div className="w-fit ">
            <Button
              onClick={handleExport}
              title="Export"
              className="!bg-white !mt-0 !text-[#3C4257] !border-[1px] shadow-sm m-auto !w-fit"
              icon={<BsArrowUpRight className="font-bold" />}
            />
          </div>
        )}
      </div>
      <TerminalPerformanceTable search={searched}/>
    </DashboardLayout>
  )
}

export default TerminalPerformance