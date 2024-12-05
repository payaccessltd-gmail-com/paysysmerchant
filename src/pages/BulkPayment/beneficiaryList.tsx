import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import DashboardLayout from '../../components/dashboard/Index'
import { Button } from '../../components/reusables/DefaultButton'
import exportToExcel from '../../Utils/ExportExcel';
import { BsArrowUpRight } from 'react-icons/bs'
import SearchInput from '../../components/reusables/SearchInput/SearchInput';
import LoanRequest from './LoanRequest';
import { headers, TableData } from './Mocks';
import { fetchLoanproduct, fetchLoanRequests } from '../../containers/loanApis';
import LoanRequest2 from "./LoanRequest2";
import PaymentLinkModal from "./PaymentLinkModal";
import PaymentLinkModal2 from "./PaymentLinkModal2";


interface Beneficiary {
    name: string;
    alias: string;
    accountNumber: string;
    amount: number;
  }
interface DocumentData {
  name: string;
  alias: string;
  date: string;
 // content: any[];
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
              <th className="border-x-1 px-4 py-4 bg-gray-100">Alias</th>
              <th className="border-x-1 px-4 py-4 bg-gray-100">Upload Date</th>
              <th className="border-x-1 px-4 py-4 bg-gray-100">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((document, index) => (
              <tr key={index} className="border-t">
                <td className="border-x-1 px-4 py-1 text-center">{document.name}</td>
                <td className="border-x-1 px-4 py-1 text-center">{document.alias}</td>
                <td className="border-x-1 px-4 py-1 text-center">{document.date}</td>
                <td className=" px-4 py-1 flex items-center justify-center">
                  <Button title='  View More' onClick={() => onViewMore(document)} className='text-[12px] !w-auto bg-white border border-[1px] border-[#00ADEF] rounded-[8px] !px-4 !text-[#00adef] ' />
  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };


  
interface Beneficiary {
    fullName: string;
    accName: string;
    accountNumber: string;
    amount: number;
  }
interface DocumentData2 {
    fullName: string;
    accName: string;
    accountNumber: string;
    amount: number;
 // content: any[];
}



interface DocumentTable2Props {
  documents2: DocumentData2[];
  onViewMore: (document: DocumentData) => void;
}


export const DocumentTable2: React.FC<DocumentTable2Props> = ({ documents2, onViewMore }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border-x-1 px-4 py-4 bg-gray-100">Beneficiary Name</th>
            <th className="border-x-1 px-4 py-4 bg-gray-100">Bank Name</th>
            <th className="border-x-1 px-4 py-4 bg-gray-100">Account No</th>
            <th className="border-x-1 px-4 py-4 bg-gray-100">Amount</th>
          </tr>
        </thead>
        <tbody>
          {documents2.map((document, index) => (
            <tr key={index} className="border-t"> 
              <td className="border-x-1 px-4 py-1 text-center">{document.fullName}</td>
              <td className="border-x-1 px-4 py-1 text-center">{document.accName}</td>
              <td className="border-x-1 px-4 py-1 text-center">{document.accountNumber}</td>
              <td className="border-x-1 px-4 py-1 text-center">{document.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};





const BulkPayment = () => {
  const [terminalData, setTerminalData] = useState([])
  const [content, setcontent] = useState<any>([]);
  const [contents, setContents] = useState<any>(TableData)
  const [isLoading, setisLoading] = useState(false);
  const [merchantId, setMerchantId] = useState<any>(0);
  const [seach, setSearch] = useState<any>('');
  const [stage, setStage] = useState(0);
  const [showRequestLoan, setShowRequestLoan] = useState<any>(false);
  const [paymentLinkModal, setPaymentLinkModal] = useState(false)
  const [paymentLinkModal2, setPaymentLinkModal2] = useState(false)

  
  async function togglepaymentLinkModal() {
    await setPaymentLinkModal(!paymentLinkModal)
  }

  async function togglepaymentLinkModal2() {
    await setPaymentLinkModal2(!paymentLinkModal2)
  }

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
  // const [terminalModal, setTerminalModal] = useState(true);
  const handleExport = () => {
    exportToExcel(contents, "List of Loan Applications");
  };

  // async function toggleTerminalRequestModal() {
  //   await setTerminalModal(!terminalModal);
  //   setStage(0);
  // }
  function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | any) {
    setSearch(e.target.value)
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
  const [documents2, setDocuments2] = useState<DocumentData2[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<DocumentData | null>(null);

  


  const togglePaymentLinkModal = () => {
    setPaymentLinkModal(!paymentLinkModal);
  };

  const togglePaymentLinkModal2 = () => {
    setPaymentLinkModal2(!paymentLinkModal2);
   
  };

  const handleAddDocument = (newDocument: DocumentData) => {
    setDocuments((prevDocs) => [...prevDocs, newDocument]);
  };

  
  const handleAddDocument2 = (newDocument: DocumentData2) => {
     let file: File | null = null;

  

    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const ab = e.target?.result;
      const workbook = XLSX.read(ab, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const newDocument: DocumentData2 = {
        fullName:  "Untitled Document",
        accName:  "Untitled Document",
        accountNumber:  "Untitled Document",
        amount:  400,

        // alias: file?.name || "Untitled Document",
        // date: new Date().toLocaleString(),
      //  content: jsonData,
      };
 
      setDocuments2((prevDocs) => [...prevDocs, newDocument]);
    };
    reader.readAsBinaryString(file);
    setDocuments2((prevDocs) => [...prevDocs, newDocument]);
  
  };


  const handleFileUpload = (eventOrFile: File | React.ChangeEvent<HTMLInputElement>) => {
    let file: File | null = null;

    if (eventOrFile instanceof File) {
      file = eventOrFile;
    } else {
      file = eventOrFile.target.files?.[0] || null;
    }

    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const ab = e.target?.result;
      const workbook = XLSX.read(ab, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const newDocument: DocumentData = {
        name: file?.name || "Untitled Document",
        alias: file?.name || "Untitled Document",
        date: new Date().toLocaleString(),
      //  content: jsonData,
      };
    
      setDocuments((prevDocs) => [...prevDocs, newDocument]);
    };
    reader.readAsBinaryString(file);
  };


  const handleViewMore = (document: DocumentData) => {
    // {(doc: any) => console.log(doc)}
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


  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };
  const [isDragging, setIsDragging] = useState(false);

  const handleDragLeave = () => {
    setIsDragging(false);
  };

//   const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     setIsDragging(false);

//     const file = event.dataTransfer.files[0];
//     if (file) handleFileUpload(file); 
//   };



  return (
  <DashboardLayout>

      
      <div className="flex justify-between items-center my-12">
        <p className="grid gap-[20px] text-[16px] font-semibold mt-[20px]">Beneficiary List</p>
        <Button
          title="Add Beneficiary List"
          className="!w-[181px]"
          onClick={togglePaymentLinkModal}
        />
      </div>
      <DocumentTable documents={documents} onViewMore={handleViewMore} />
    
     
       

   
  
    <div className="flex flex-col items-center p-4">
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg max-w-5xl w-full">
            <div  className="flex items-center justify-between mb-4">
             <h2  className="text-lg font-semibold ">{selectedDocument.name}({selectedDocument.alias})</h2> 
             <div className="flex items-center justify-left">
                 
             <Button
          title="Add Beneficiary"
          className="!w-[181px]"
          onClick={togglePaymentLinkModal2}
        />
            <button onClick={handleCloseModal} className="text-red-500 text-[28px] mt-[-50px]">
               &times;
            </button>
            </div>
            </div> 

           
            <DocumentTable2 documents2={documents2}  onViewMore={handleViewMore}  />
          
          
            {/* <div className="overflow-x-auto">
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
            </div> */}
          </div>
        </div>
      )}
    </div>

  

    <div className="flex justify-between w-full mt-[20px]">
    

      {contents.length > 0 && (
        <div className="w-fit">
          <Button
            onClick={handleExport}
            title="Export"
            className="!bg-white !mt-0 !text-[#3C4257] !border-[1px] shadow-sm m-auto"
            icon={<BsArrowUpRight className="font-bold" />}
          />
        </div>
      )}
    </div>


   
    {/* {selectedDocument && ( */}

<PaymentLinkModal  isOpen={paymentLinkModal}
toggleDropdown={togglePaymentLinkModal}
onAddDocument={handleAddDocument}  />


<PaymentLinkModal2  isOpen={paymentLinkModal2}
toggleDropdown={togglePaymentLinkModal2}
onAddDocument={handleAddDocument2}  />

  {/* )} */}

  
  </DashboardLayout>
  );
};

export default BulkPayment;







   
   