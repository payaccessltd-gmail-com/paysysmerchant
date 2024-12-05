import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import DashboardLayout from '../../components/dashboard/Index'
import { Button } from '../../components/reusables/DefaultButton'
import exportToExcel from '../../Utils/ExportExcel';
import { BsArrowUpRight } from 'react-icons/bs'
import SearchInput from '../../components/reusables/SearchInput/SearchInput';
import { headers, TableData } from './Mocks';
import { fetchLoanproduct, fetchLoanRequests } from '../../containers/loanApis';
import PaymentLinkModal from "./PaymentLinkModal";
import PaymentLinkModal2 from "./PaymentLinkModal2";


interface DocumentData {
  name: string;
  alias: string;
  date: string;
}

interface DocumentData2 {
  fullName: string;
  accName: string;
  accountNumber: string;
  amount: number;
}

interface DocumentTableProps {
  documents: DocumentData[];
  onViewMore: (document: DocumentData) => void;
}

  
interface DocumentTable2Props {
  documents2: DocumentData2[];
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
  const [contents, setContents] = useState<any>(TableData)
  const [isLoading, setisLoading] = useState(false);
  const [seach, setSearch] = useState<any>('');
  const [showRequestLoan, setShowRequestLoan] = useState<any>(false);
  const [paymentLinkModal, setPaymentLinkModal] = useState(false)
  const [paymentLinkModal2, setPaymentLinkModal2] = useState(false)
  const [state, setState] = useState<any>({
    search: "",
    role: "",
    status: "",
    submittingError: false,
    isExport: false,
    errorMssg: ''
  })
  
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [documents2, setDocuments2] = useState<DocumentData2[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<DocumentData | null>(null);
  
  const [pages, setpages] = useState<any>({
    number: 0,
    pageSize: 10,
    totalPages: 0,
    numberElements: 0,
    totalElements: 0,
  });
  const { number, pageSize, totalPages, numberElements, totalElements } = pages;
  const { search, role, status, isExport }: any = state;
  async function togglepaymentLinkModal() {
    await setPaymentLinkModal(!paymentLinkModal)
  }

  async function togglepaymentLinkModal2() {
    await setPaymentLinkModal2(!paymentLinkModal2)
  }


  const handleExport = () => {
    exportToExcel(contents, "List of Loan Applications");
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | any) {
    setSearch(e.target.value)
    setState({
      ...state,
      [e?.target?.name]: e?.target?.value,
      submittingError: false
    });
  }

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


   
   

<PaymentLinkModal  isOpen={paymentLinkModal}
toggleDropdown={togglePaymentLinkModal}
onAddDocument={handleAddDocument}  />


<PaymentLinkModal2  isOpen={paymentLinkModal2}
toggleDropdown={togglePaymentLinkModal2}
onAddDocument={handleAddDocument2}  />

 

  
  </DashboardLayout>
  );
};

export default BulkPayment;







   
   