import React, { useEffect, useState } from 'react'
import { BsArrowUpRight } from 'react-icons/bs'
import DashboardLayout from '../../components/dashboard/Index'
import { Button } from '../../components/reusables/DefaultButton'
import SearchInput from '../../components/reusables/SearchInput/SearchInput'
import exportToExcel from '../../Utils/ExportExcel'
import BillsTable from './components/BillsTable'
import BillModal from './components/BillModal'
import { recentBiliing } from '../../containers/transactionApis'

const Bills = () => {
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
  const [pages, setpages] = useState<any>({
    number: 0,
    pageSize: 10,
    totalPages: 0,
    numberElements: 0,
    totalElements: 0,
  });
  const [isLoadingTable, setisLoadingTable] = useState(false);
  const [billingTable, setbillingTable] = useState([]);
  const [billings, setbillings] = useState([]);
  const { number, pageSize, totalPages, numberElements, totalElements } = pages;
  const { search, role, status, isExport } = state;
  const handleExport = () => {
    exportToExcel(billings, "List of Bills");
  };
  // function togglebillModal() {
  //   setbillModal(!billModal)
  // }

  async function togglebillModal() {
    await setbillModal(!billModal)
    }
  

  function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
    setSearched(e.target.value)
    setState({
        ...state,
        [e.target.name]: e.target.value,
        submittingError: false
    });
}

async function getBillings() {
    setisLoadingTable(true);

  try {
    const res = await recentBiliing(number, pageSize, '', '');
    setbillingTable(res);
    setpages({
      number: res.pageDetails.number,
      totalPages: res.pageDetails.totalPages,
      pageSize: res.pageDetails.size,
      numberElements: res.pageDetails.numberElements,
      totalElements: res.pageDetails.totalElements,
    });
   // console.log(res)
    setbillings(res.bills);
  } catch (error) {
    console.error(error);
  } finally {
    setisLoadingTable(false);
  }
}

useEffect(() => {
  getBillings()
}, [number,refresh])

  return (
    <DashboardLayout>
        <div className="flex justify-between items-center">
        <p className="grid gap-[20px] text-[16px] font-semibold mt-[20px]">
          Bills
        </p>
        <div className="w-fit">
        <Button
            title="Purchase Bills"
            className="!w-[181px]"
            onClick={togglebillModal}
          />   
        </div>
      </div>
      <div className="flex justify-between  w-full mt-[20px]">
      <SearchInput placeholder='Search' name='search' value={search} onChange={handleChange}/>
        {billings.length > 0 && (
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
      <BillsTable billingTable={billingTable}
            page={pages}
            setpages={setpages}
            number={number}
            isLoading={isLoadingTable}/>
      <BillModal toggleDropdown={togglebillModal} isOpen={billModal}/>
    </DashboardLayout>
  )
}

export default Bills