import  { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/Index";
import { Button } from "../../components/reusables/DefaultButton";
import exportToExcel from "../../Utils/ExportExcel";
import TransactionTable from "./components/TransactionTable";
import {BsArrowUpRight} from 'react-icons/bs'
import { fetchTransHistoryData } from "../../containers/transactionApis";
import DateInput from "../../components/reusables/DateInput/DateInput";
import { apiCall } from "../../Utils/URLs/axios.index";
const Transaction = () => {
  const [selectedTab, setSelectedTab] = useState({id:0,text:'',name:''});
  const [transaction, setTransaction] = useState([])
  const [isLoading, setIsLoading] = useState(true);

    const [pageNo, setPageNo] = useState<any>(0)
    const [pageSize, setPageSize] = useState<any>(10)
    const [transactionDetails, setTransactionDetails] = useState<any>([]);
    const [transactionSummary, setTransactionSummary] = useState<any>({})
    const [pageDetails, setPageDetails] = useState<any>({})
    const [state, setState] = useState<any>({
      search: "",
      tranType: '',
      collectionType: null,
      role: null,
      status: '',
      submittingError: false,
      isExport: false,
      startDate:'',
      endDate:'',
      errorMssg: "",
      isSubmitting: false,
  })

  const { search, role, tranType, collectionType, status, startDate,endDate, isExport ,errorMssg} = state
  const options=['Last 7 days','1 week', '2 weeks', '3 weeks']
  const tabsData = [
    { id: 0, text: "All",name:'' },
    { id: 1, text: "Successful",name:'SUCCESS' },
    { id: 2, text: "Failed",name:'FAILED' },
    { id: 3, text: "Pending",name:'PENDING' },
  ];

  
  const { PageTotalPages, PageTotalElements, PageNumber } = pageDetails || {};

  const handleDateChange = (event:any) => {
    const { name, value } = event.target;
    setState((prevDate:any) => ({
      ...prevDate,
      [name]: value,
    }));
  };

  const handleExport = () => {
    fetchTransHistoryData(pageNo, 1000000, search, tranType, isExport,startDate, endDate, status).then((res:any) => {
       exportToExcel(res.transactionDetails, "Transactions");
      //  console.log('set arrays>>', res.transactionDetails);
      //  console.log('set array length>>', res.transactionDetails?.length);
      })
  };

    function setTransactions(){
        setIsLoading(true)
        fetchTransHistoryData(pageNo, pageSize, search, tranType, isExport,startDate, endDate, status)
            .then((res:any) => {
                setTransaction(res)
                setTransactionSummary(res.transactionSummary)
                setPageDetails(res.pageDetails)
                setTransactionDetails(res.transactionDetails);
            }).catch(err => {
              if (err && err?.response?.data) {
                setState({
                    ...state,
                    submittingError: true,
                    isSubmitting: false,
                    errorMssg: err?.response?.data?.errorMssg || err?.response?.errorMssg || err?.response?.data?.respDescription || err?.response?.respDescription || "Action failed, please try again"
                })}
          }).finally( () => {
            setIsLoading(false)
        })
    }

    useEffect(() => {
      setTransactions()

  }, [pageNo, pageSize,startDate,endDate,status])

  useEffect(() => {
    setPageNo(0)
  }, [startDate,endDate])
  
  useEffect(() => {
    setState((prevDate:any) => ({
      ...prevDate,
      status:selectedTab.name
    }))
  }, [selectedTab])


 

  return (
    <DashboardLayout>
      <p className="grid gap-[20px] text-[16px] font-sfpro-medium mt-[20px]">
        Transactions
      </p>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-y-[20px] w-full mt-[20px] gap-x-[50px]">
        <div className="flex justify-between items-center gap-[20px] text-[14px] w-fit">
          {tabsData?.map((tab:any, index:any) => (
            <p  key={index}
              className={` py-[5px] hover:cursor-pointer ${
                selectedTab.id === tab.id
                  ? " border-0 border-b-[3px] text-primary border-solid border-primary  "
                  : "text-[#697386]"
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab.text}
            </p>
          ))}
        </div>
        <div className="flex gap-[10px] items-bottom ">
        {/* <CustomDropDown label='' placeHolder="Last 7 days" onHandleChange={()=>{}} value={transaction} options={options} setValue={setTransaction} /> */}
        <DateInput label='Select Date' name='date' startname='startDate' endname='endDate' onChange={handleDateChange} startDate={startDate} endDate={endDate} />
        {transactionDetails.length >1 &&
          <div className="grid  items-end  ">
          <Button onClick={handleExport} title='Export' className='!bg-white !mt-0 !text-[#3C4257] !border-[1px] shadow-sm ' icon={<BsArrowUpRight  className="font-bold"/>}/>
          </div>
        
        }
        </div>
      </div>
      <TransactionTable data={transactionDetails} pageDetails={pageDetails} setPageNo={setPageNo} isLoading={isLoading} state={state} setState={setState} />
    </DashboardLayout>
  );
};

export default Transaction;
