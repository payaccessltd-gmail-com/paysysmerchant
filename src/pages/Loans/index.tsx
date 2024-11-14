 import React, { useEffect,useState } from "react";
import * as XLSX from "xlsx";



import DashboardLayout from '../../components/dashboard/Index'
import { Button } from '../../components/reusables/DefaultButton'
import exportToExcel from '../../Utils/ExportExcel';
import { BsArrowUpRight } from 'react-icons/bs'
import SearchInput from '../../components/reusables/SearchInput/SearchInput';
import LoanTable from './LoanTable';
import LoanRequest from './LoanRequest';
import { headers, TableData } from './Mocks';
import { fetchLoanproduct, fetchLoanRequests } from '../../containers/loanApis';


interface DocumentData {
  name: string;
  date: string;
  content: any[];
}



interface DocumentTableProps {
  documents: DocumentData[];
  onViewMore: (document: DocumentData) => void;
}

export const DocumentTable: React.FC<DocumentTableProps> = ({ documents, onViewMore }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border-x-1 px-4 py-4 bg-gray-100">File Name</th>
            <th className="border-x-1 px-4 py-4 bg-gray-100">Upload Date</th>
            <th className="border-x-1 px-4 py-4 bg-gray-100">Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document, index) => (
            <tr key={index} className="border-t">
              <td className="border-x-1 px-4 py-1">{document.name}</td>
              <td className="border-x-1 px-4 py-1">{document.date}</td>
              <td className=" px-4 py-1 flex items-center justify-center">
              <Button title='  View More' onClick={() => onViewMore(document)} className='text-[12px] !w-auto bg-white border border-[1px] border-[#00ADEF] rounded-[8px] !px-4 !text-[#00adef] '/>
              
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};




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



  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<DocumentData | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const ab = e.target?.result;
      const workbook = XLSX.read(ab, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const newDocument: DocumentData = {
        name: file.name,
        date: new Date().toLocaleString(),
        content: jsonData,
      };

      setDocuments((prevDocs) => [...prevDocs, newDocument]);
    };
    reader.readAsBinaryString(file);
  };

  const handleViewMore = (document: DocumentData) => {
    setSelectedDocument(document);
  };

  const handleCloseModal = () => {
    setSelectedDocument(null);
  };

  


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

<div className="flex flex-col items-center p-4">
     
    
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg max-w-3xl w-full">
            <h2 className="text-lg font-semibold mb-4">{selectedDocument.name} - {selectedDocument.date}</h2>
            <button onClick={handleCloseModal} className="text-red-500 float-right">Close</button>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    {Object.keys(selectedDocument.content[0] || {}).map((col) => (
                      <th key={col} className="border px-4 py-2 bg-gray-100">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {selectedDocument.content.map((row, index) => (
                    <tr key={index} className="border-t">
                      {Object.keys(row).map((col) => (
                        <td key={col} className="border px-4 py-2">
                          {row[col]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>

      <div className="flex justify-between items-center">
        <p className="grid gap-[20px] text-[16px] font-sfpro-medium mt-[20px]">
          Loans
        </p>


        {
          showRequestLoan === true || contents?.length === 0 ?
        
            <label className="w-fit mt-[20px] rounded-lg bg-primary text-white py-[10px] px-[10px] flex gap-2 items-center justify-center transition-all duration-500 hover:scale-105 hover:brightness-110 ${isDisabled && 'bg-opacity-40 cursor-not-allowed'} transition mb-4 inline-block">
       Upload Excel Sheet
        <input
          type="file"
          accept=".xlsx, .xls, .csv"
          onChange={handleFileUpload}
          className="hidden"
        />
      </label>
            :
            <></>
        }

      </div>
      <div className="flex justify-between w-full mt-[20px]">
        <SearchInput placeholder='Search' name='search' value={search} onChange={handleChange} className='mb-4' />

        {contents.length > 0 &&
          <div className="w-fit ">
            <Button onClick={handleExport} title='Export' className='!bg-white !mt-0 !text-[#3C4257] !border-[1px] shadow-sm m-auto' icon={<BsArrowUpRight className="font-bold" />} />
          </div>

        }
      </div>
      {/* <LoanTable data={documents} isLoading={isLoading} terminalData={terminalData} setpages={setpages} number={number} page={pages}
      /> */}
        <DocumentTable documents={documents} onViewMore={handleViewMore} />
      <LoanRequest toggleDropdown={toggleTerminalRequestModal} isOpen={terminalModal} setStage={setStage} stage={stage} setIsOpen={setTerminalModal} />
    
    
    </DashboardLayout>
  )
}

export default Loans