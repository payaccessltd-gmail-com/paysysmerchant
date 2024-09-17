import DashboardLayout from '../../components/dashboard/Index'
import { Button } from '../../components/reusables/DefaultButton'
import exportToExcel from '../../Utils/ExportExcel';
import { BsArrowUpRight } from 'react-icons/bs'
import { useEffect, useState } from 'react';
import SearchInput from '../../components/reusables/SearchInput/SearchInput';
import LoanTable from './LoanTable';
import LoanRequest from './LoanRequest';
import { headers, TableData } from './Mocks';
import { fetchLoanproduct, fetchLoanRequests } from '../../containers/loanApis';

const Loans = () => {
  // const [number, setnumber] = useState<any>(0)
  // const [pageSize, setPageSize] = useState<any>(10)
  const [terminalData, setTerminalData] = useState([])
  const [content, setcontent] = useState<any>([]);
  const [contents, setContents] = useState<any>(TableData)
  const [isLoading, setisLoading] = useState(false);
  const [merchantId, setMerchantId] = useState<any>(0);
  const [seach, setSearch] = useState<any>('');
  const [stage, setStage] = useState(0);
  const [showRequestLoan, setShowRequestLoan] = useState<any>(false);

  const [state, setState] = useState<any>({
    search: "",
    role: "",
    status: "",
    submittingError: false,
    isExport: false,
    errorMssg: ''
  })
  const { search, role, status, isExport }: any = state;

  const [pageDetails, setpageDetails] = useState({})
  const [terminalModal, setTerminalModal] = useState(false);
  const handleExport = () => {
    exportToExcel(contents, "List of Loan Applications");
  };
  async function toggleTerminalRequestModal() {
    await setTerminalModal(!terminalModal);
    setStage(0);
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | any) {
    setSearch(e.target.value)
    // console.log('event>>>', e?.target?.value)
    setState({
      ...state,
      [e?.target?.name]: e?.target?.value,
      submittingError: false
    });
  }
  const [pages, setpages] = useState<any>({
    number: 0,
    pageSize: 10,
    totalPages: 0,
    numberElements: 0,
    totalElements: 0,
  });
  const { number, pageSize, totalPages, numberElements, totalElements } = pages;
  async function loanList() {
    const getMerchantDetails: any = localStorage.getItem('merchantDetails');
    const parseMervhantDetails = JSON.parse(getMerchantDetails);
    const merchantId = parseMervhantDetails?.id;
    setisLoading(true);

    try {
      const res: any = await fetchLoanRequests(number, pageSize, search, merchantId).then((res: any) => {
        setContents(res);  
      setpages({
        // ...pages,
        number: res.pageDetails.PageNumber,
        pageSize: res.pageDetails.PageSize,
        totalPages: res.pageDetails.PageTotalElements,
        numberElements: res.pageDetails.PageNumberElements,
        totalElements: res.pageDetails.PageTotalPages
      })
      });

      const filterThrough = contents?.find((elem: any) => elem?.loanStatus === "OFFER_READY")
      if (filterThrough) {
        setShowRequestLoan(false);
      } else setShowRequestLoan(true);
    } catch (error: any) {
      console.error(error)
    } finally {
      setisLoading(false);
    }
  }


  useEffect(() => {
    loanList()
  }, [number, pageSize, search])
  //console.log(typeof(contents),'the table')
  // console.log(contents.split(','),'the table')


  // useEffect(() => {
  //   const getMerchantDetails:any = localStorage.getItem('merchantDetails');
  //   const parseMervhantDetails = JSON.parse(getMerchantDetails);
  //   const merchantId = parseMervhantDetails?.id; //0,10,search,merchantId
  //   //console.log("searched>>>", search);
  //   // try {
  //   //   const res=await 
  //   // } catch (error:any) {

  //   // }
  //   fetchLoanRequests(pageNo, pageSize, search, merchantId).then((res:any) => {
  //     console.log(res,'the loans')
  //     setContents(res?.results);
  //     console.log(contents,'does this work')

  //     if(contents !== undefined){

  //       const filterThrough = contents?.find((elem:any) => elem?.loanStatus === "OFFER_READY");
  //       if(filterThrough === undefined){ //if "LOAN_ACTIVE" does not exist, show Request Loan else Request Loan dissappears
  //         setShowRequestLoan(true);
  //       }else{
  //         setShowRequestLoan(false); 
  //       }
  //     setTerminalData(res);
  //     }
  //     // else{
  //     //   setContents([]);
  //     // }
  //     // setTerminalData(res?.details);
  //     // console.log("content>>>", res?.details);

  //     setdata({
  //       details: res?.details,
  //       PageTotalElements: res?.pageDetails?.PageTotalElements,
  //       PageTotalPages: res?.pageDetails?.PageTotalPages,
  //       PageNumber: res?.pageDetails?.PageNumber,
  //   });

  //   }).catch((err:any) => {
  //     console.error("Loans error>>>", err);
  //   })
  //   setisLoading(false);
  // }, [pageNo, pageSize, search, merchantId]);





  // const {details}:any=terminalData

  return (
    <DashboardLayout >
      <div className="flex justify-between items-center">
        <p className="grid gap-[20px] text-[16px] font-sfpro-medium mt-[20px]">
          Loans
        </p>


        {
          showRequestLoan === true || contents?.length === 0 ?
            <div className="w-fit">
              <Button title='Request for a Loan' onClick={toggleTerminalRequestModal} />
            </div>
            :
            <></>
        }

      </div>
      <div className="flex justify-between w-full mt-[20px]">
        <SearchInput placeholder='Search' name='search' value={search} onChange={handleChange} />

        {contents.length > 0 &&
          <div className="w-fit ">
            <Button onClick={handleExport} title='Export' className='!bg-white !mt-0 !text-[#3C4257] !border-[1px] shadow-sm m-auto' icon={<BsArrowUpRight className="font-bold" />} />
          </div>

        }
      </div>
      <LoanTable data={contents} isLoading={isLoading} terminalData={terminalData} setpages={setpages} number={number} page={pages}
      />
      <LoanRequest toggleDropdown={toggleTerminalRequestModal} isOpen={terminalModal} setStage={setStage} stage={stage} setIsOpen={setTerminalModal} />
    </DashboardLayout>
  )
}

export default Loans