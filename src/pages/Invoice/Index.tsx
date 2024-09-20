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

  // const fetchMerchantData = async (): Promise<any> => {

  //   const { userId } = Storage.getItem("userDetails") || {};
  
  //   const response = await apiCall({
  //       name: "getMerchantDetails",
  //       urlExtra: `${userId?.entityId || userId || 0}`,
  //       action: (): any => (["skip"]),
  //       errorAction: (): any => (["skip"])
  //   })
  //       .then(async (res: any) => {
  //           const { token } = res;
  //           const { id, name, email, phone, description, category, type, pin, bvn } = res;
  
  //           await Storage.setItem('merchantDetails', res || {})
  //       })
  //   return response;
  // }

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
  const { number, pageSize, totalPages, numberElements, totalElements } = pages;
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
        const res = await fetchBusinessLinkData(userId);
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
      <SearchInput placeholder='Search' name='search' value={search} onChange={handleChange}/>
        {paymentLinks.length > 0 && (
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
            isLoading={isLoadingTable}/>
      <PaymentLinkModal toggleDropdown={togglepaymentLinkModal} isOpen={paymentLinkModal} />
    </DashboardLayout>
  )
}

export default Invoice