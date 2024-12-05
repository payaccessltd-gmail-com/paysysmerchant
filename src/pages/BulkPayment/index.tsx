import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import DashboardLayout from '../../components/dashboard/Index'
import { Button } from '../../components/reusables/DefaultButton'
import exportToExcel from '../../Utils/ExportExcel';
import { BsArrowUpRight } from 'react-icons/bs'
import SearchInput from '../../components/reusables/SearchInput/SearchInput';
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
              <td className="border-x-1 px-4 py-1 text-center">{document.name}</td>
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




const BulkPayment = () => {
  const [contents, setContents] = useState<any>(TableData)
  const [isLoading, setisLoading] = useState(false);
  const [merchantId, setMerchantId] = useState<any>(0);
  const [seach, setSearch] = useState<any>('');
  const [showBulkPaymentList, setShowBulkPaymentList] = useState<any>(false);
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<DocumentData | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [pages, setpages] = useState<any>({
    number: 0,
    pageSize: 10,
    totalPages: 0,
    numberElements: 0,
    totalElements: 0,
  });

  const { number, pageSize, totalPages, numberElements, totalElements } = pages;

  const [state, setState] = useState<any>({
    search: "",
    role: "",
    status: "",
    submittingError: false,
    isExport: false,
    errorMssg: ''
  })
  const { search, role, status, isExport }: any = state;


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




  // async function loanList() {
  //   const getMerchantDetails: any = localStorage.getItem('merchantDetails');
  //   const parseMervhantDetails = JSON.parse(getMerchantDetails);
  //   const merchantId = parseMervhantDetails?.id;
  //   setisLoading(true);

  //   try {
  //     const res: any = await fetchLoanRequests(number, pageSize, search, merchantId).then((res: any) => {
  //       setContents(res);
  //       setpages({
       
  //         number: res.pageDetails.PageNumber,
  //         pageSize: res.pageDetails.PageSize,
  //         totalPages: res.pageDetails.PageTotalElements,
  //         numberElements: res.pageDetails.PageNumberElements,
  //         totalElements: res.pageDetails.PageTotalPages
  //       })
  //     });

  //     const filterThrough = contents?.find((elem: any) => elem?.loanStatus === "OFFER_READY")
  //     if (filterThrough) {
  //       setShowBulkPaymentList(false);
  //     } else setShowBulkPaymentList(true);
  //   } catch (error: any) {
  //     console.error(error)
  //   } finally {
  //     setisLoading(false);
  //   }
  // }


  useEffect(() => {
    // loanList()
  }, [number, pageSize, search])




  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    if (file) handleFileUpload(file); 
  };


  return (
  <DashboardLayout>
    <div className="flex flex-col items-center p-4">
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg max-w-5xl w-full">
            <div  className="flex items-center justify-between mb-4">
             <h2  className="text-lg font-semibold ">{selectedDocument.name} - {selectedDocument.date}</h2> 
             <button onClick={handleCloseModal} className="text-red-500 text-[28px] mb-[10px]">
               &times;
            </button>
            </div> 
          
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
    Bulk Payment
      </p>

      {(showBulkPaymentList === true || contents?.length === 0) && (
        <div
          className={`w-full max-w-sm p-4 border-dashed border-2 rounded-lg ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p className="text-center text-gray-500">
            Drag & drop your file here or click to upload
          </p>
          <label className="block mt-4 w-full text-center">
            <span className="text-primary cursor-pointer underline">
              Upload Excel Sheet
            </span>

            <input
              type="file"
              accept=".xlsx, .xls, .csv"
              onChange={(event) => handleFileUpload(event)}
              className="hidden"
            />

          </label>
        </div>
      )}
    </div>

    <div className="flex justify-between w-full mt-[20px]">
      <SearchInput
        placeholder="Search"
        name="search"
        value={search}
        onChange={handleChange}
        className="mb-4"
      />

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

    <DocumentTable documents={documents} onViewMore={handleViewMore} />
   
  </DashboardLayout>
  );
};

export default BulkPayment;