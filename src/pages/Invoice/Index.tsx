import React, { useEffect, useState } from 'react'
import { BsArrowUpRight } from 'react-icons/bs'
import DashboardLayout from '../../components/dashboard/Index'
import { Button } from '../../components/reusables/DefaultButton'
import SearchInput from '../../components/reusables/SearchInput/SearchInput'
import exportToExcel from '../../Utils/ExportExcel'


import { recentBiliing } from '../../containers/transactionApis'
import PaymentLinkModal from './PaymentLinkModal'
import PaymentLinkTable from './PaymentLinkTable'
import { Storage } from "../../Utils/Stores/inAppStorage";
import { apiCall } from "../../Utils/URLs/axios.index";
import { fetchBranchLinkData, fetchBusinessLinkData, fetchSingleLinkData, fetchSplitLinkData} from '../../containers/dashboardApis'


const Invoice = () => {
 const [isLoading, setisLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [paymentLinkModal, setPaymentLinkModal] = useState(false)
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
  const [paymentLinkTable, setPaymentLinkTable] = useState([]);
  const [paymentLinks, setPaymentLinks] = useState([]);
  const { number, pageNo, pageSize, totalPages, numberElements, totalElements } = pages;
  const { search, role, status, isExport } = state;
  const { merchantDetails, userId } = Storage.getItem("userDetails") || {
    firstName: "",
    lastName: "",
    accountType: "",
};
  const handleExport = () => {
    exportToExcel(paymentLinks, "List of paymentLinks");
  };

  async function fetchData() {
    setisLoadingTable(true);
    try {
      const res = await fetchBusinessLinkData(userId,pageNo,pageSize);
        console.log("resd",res)
       setPaymentLinkTable(res)
    } catch (error) {
        console.error("Error fetching merchant data:", error);
        // You can set a default value or just keep it as null
    }finally {
      setisLoadingTable(false);
    }
  
  }

  useEffect(() => {

    fetchData();

  }, [userId,number,refresh]);


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
          Coming Soon...
      </div>
    </DashboardLayout>
  )
}

export default Invoice