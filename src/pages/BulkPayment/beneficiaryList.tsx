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
import {deleteBeneficiaryId} from '../../containers/loanApis';


interface DocumentData {
  id: any; 
  name: string;
  alias: string;
  date: string;
}

interface DocumentData2 {
  fullName: string;
  bankName: string;
  accNumber: string;
  amount: number;
}

interface DocumentTableProps {
  documents: DocumentData[];
  onViewMore: (document: DocumentData) => void;
  onDelete: (id: number) => void;
}

  
interface DocumentTable2Props {
  documents2: DocumentData2[];
  onViewMore: (document: DocumentData) => void;

}


export const DocumentTable: React.FC<DocumentTableProps> = ({ documents, onViewMore ,  onDelete}) => {
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
                  <Button title='Delete'  onClick={() => onDelete(index)} className='text-[12px] !w-auto bg-white ml-2 !px-4 !text-[#FF0000] ' />
               
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
              <td className="border-x-1 px-4 py-1 text-center">{document.bankName}</td>
              <td className="border-x-1 px-4 py-1 text-center">{document.accNumber}</td>
              <td className="border-x-1 px-4 py-1 text-center">{document.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const BulkPayment = () => {
  const [contents, setContents] = useState<any>(TableData);
  const [isLoading, setisLoading] = useState(false);
  const [search, setSearch] = useState<string>('');
  const [paymentLinkModal, setPaymentLinkModal] = useState(false);
  const [paymentLinkModal2, setPaymentLinkModal2] = useState(false);
  const [state, setState] = useState<any>({
    search: "",
    role: "",
    status: "",
    submittingError: false,
    isExport: false,
    errorMssg: ''
  });

  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [documents2, setDocuments2] = useState<DocumentData2[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<DocumentData | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  
  const CLOUD_NAME = "your-cloud-name";
  const UPLOAD_PRESET = "upload_preset";

  const togglePaymentLinkModal = () => {
    setPaymentLinkModal(!paymentLinkModal);
  };

  const togglePaymentLinkModal2 = () => {
    setPaymentLinkModal2(!paymentLinkModal2);
  };

  const handleExport = () => {
    exportToExcel(contents, "List of Loan Applications");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | any) => {
    setSearch(e.target.value);
    setState({
      ...state,
      [e?.target?.name]: e?.target?.value,
      submittingError: false
    });
  };

  const handleFileUploadToCloudinary = async (file: File): Promise<string> => {
    if (!file) {
      throw new Error("File is null or undefined");
    }
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
  
    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dc2zavmxp/upload", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to upload file to Cloudinary");
      }
  
      const data = await response.json();
      return data.secure_url; 
    } catch (error) {
      console.error("Error uploading file to Cloudinary:", error);
      throw error;
    }
  };

  
const handleDelete = async (id: number) => {
  console.log("uu",id, documents)
  try {
    const response = await deleteBeneficiaryId(id);
    if (response) {
      console.log("00",id, documents)

      setDocuments((prevDocs) =>
        
        prevDocs.filter((doc) =>  2 != id)
      
      );
      console.log(`Document with id ${id} deleted successfully.`, response, documents);
    } else {
      console.error(`Unexpected response from delete API:`, response);
    }
  } catch (err: any) {
    const errorMessage = err?.response?.data?.respDescription || err.message || "Unknown error occurred";
    console.error(`Failed to delete document with id ${id}:`, errorMessage);
  }
};

  const handleFileUpload = async (eventOrFile: File | React.ChangeEvent<HTMLInputElement>) => {
    let file: File | null = null;
  
    if (eventOrFile instanceof File) {
      file = eventOrFile;
    } else {
      file = eventOrFile.target.files?.[0] || null;
    }
  
    // Check if file is null before proceeding
    if (!file) {
      console.error("No file selected");
      return;
    }
  
    const reader = new FileReader();
    reader.onload = async (e) => {
      const ab = e.target?.result;
      const workbook = XLSX.read(ab, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
  
      try {
      
        const uploadedUrl = await handleFileUploadToCloudinary(file as File); 
console.log(documents,"k")
        const Id = documents.length > 0 ? Math.max(...documents.map((doc) => doc.id)) + 1 : 1;
        const newDocument: DocumentData = {
          id: Id,
          name: file!.name || "Untitled Document",
          alias:  "Untitled Document",
          date: new Date().toLocaleString(),
        };
  
        setDocuments((prevDocs) => [...prevDocs, newDocument]);
        console.log("File uploaded successfully:", uploadedUrl);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
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

  const handleDragLeave = () => {
    setIsDragging(false);
  };

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
      <DocumentTable documents={documents} onViewMore={handleViewMore}  onDelete={handleDelete}/>

      <div className="flex flex-col items-center p-4">
        {selectedDocument && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg max-w-5xl w-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">
                  {selectedDocument.name} ({selectedDocument.alias})
                </h2>
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
              <DocumentTable2 documents2={documents2} onViewMore={handleViewMore}  />
              <div className="flex items-center justify-end mt-4">
              <Button
                  title="Save List"
                  onClick={() => {}}
                  className="text-[12px] !w-auto bg-white border border-[1px] border-[#00ADEF] rounded-[8px] mr-[12px] !px-4 !text-[#00adef] hover:!text-[#fff] hover:!bg-[#00adef]"
                />
                <Button
                  title="Initiate Bulk Payment"
                  onClick={() => {}}
                  className="text-[12px] !w-auto bg-white border border-[1px] border-[#00ADEF] rounded-[8px] !px-4 !text-[#00adef] hover:!text-[#fff] hover:!bg-[#00adef]"
                />

              </div>
            </div>
          </div>
        )}
      </div>

      <PaymentLinkModal
        isOpen={paymentLinkModal}
        toggleDropdown={togglePaymentLinkModal}
        onAddDocument={(newDoc) => setDocuments((prevDocs) => [...prevDocs, newDoc])}
      />

      <PaymentLinkModal2
        isOpen={paymentLinkModal2}
        toggleDropdown={togglePaymentLinkModal2}
        onAddDocument={(newDoc) => setDocuments2((prevDocs) => [...prevDocs, newDoc])}
      />
    </DashboardLayout>
  );
};

export default BulkPayment;







   
   