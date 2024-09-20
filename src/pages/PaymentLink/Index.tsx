import React, { useEffect, useState } from 'react'
import { BsArrowUpRight } from 'react-icons/bs'
import DashboardLayout from '../../components/dashboard/Index'
import { Button } from '../../components/reusables/DefaultButton'
import SearchInput from '../../components/reusables/SearchInput/SearchInput'
import exportToExcel from '../../Utils/ExportExcel'
import PaymentLinkModal from './PaymentLinkModal'
import PaymentLinkTable from './PaymentLinkTable'
import { Storage } from "../../Utils/Stores/inAppStorage";
import {fetchBusinessLinkData} from '../../containers/dashboardApis'


  const PaymentLink = () => { 
  const [refresh, setRefresh] = useState(false)
  const [paymentLinkModal, setPaymentLinkModal] = useState(false)
  const [searched, setSearched] = useState<string>("");
  const [state, setState] = useState<any>({
    search: "",
    role: "",
    status: "",
    submittingError: false,
    isExport: false,
    errorMssg: '',
    isSubmitting: false
  });
  const [pages, setpages] = useState<any>({
    number: 0,
    pageNo: 0,
    pageSize: 10,
    totalPages: 0,
    numberElements: 0,
    totalElements: 0,
  });
  const [isLoadingTable, setisLoadingTable] = useState(false);
  const [paymentLinkTable, setPaymentLinkTable] = useState([]);

  const { number, pageNo, pageSize, totalPages, numberElements, totalElements } = pages;
  const { search, role, status, isExport } = state;
  const { userId } = Storage.getItem("userDetails") || {
    firstName: ""
  };
  const handleExport = () => {
    exportToExcel(paymentLinkTable, "List of paymentLinkTable");
  };

  async function fetchData() {
    setisLoadingTable(true);
    try {
      const res = await fetchBusinessLinkData(userId,pageNo,pageSize);
      console.log("resd", res)
      setPaymentLinkTable(res)
    } catch (error) {
      console.error("Error fetching merchant data:", error);
      // You can set a default value or just keep it as null
    } finally {
      setisLoadingTable(false);
    }

  }

  useEffect(() => {

    fetchData();

  }, [userId, number, refresh]);


  async function togglepaymentLinkModal() {
    await setPaymentLinkModal(!paymentLinkModal)
  }


  function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
    setSearched(e.target.value)
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
          Payment Link
        </p>
        <div className="w-fit">
          <Button
            title="Create Payment Link"
            className="!w-[181px]"
            onClick={togglepaymentLinkModal}
          />
        </div>
      </div>
      <div className="flex justify-between  w-full mt-[20px]">
        <SearchInput placeholder='Search' name='search' value={search} onChange={handleChange} />

        {paymentLinkTable.length > 0 && (
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
      <PaymentLinkTable paymentLinkTable={paymentLinkTable}
        page={pages}
        setpages={setpages}
        number={number}
        isLoading={isLoadingTable} />
      <PaymentLinkModal toggleDropdown={togglepaymentLinkModal} isOpen={paymentLinkModal} />
    </DashboardLayout>
  )
}

export default PaymentLink