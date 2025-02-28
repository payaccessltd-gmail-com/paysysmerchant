import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import DashboardLayout from '../../components/dashboard/Index';
import { Button } from '../../components/reusables/DefaultButton';
import SearchInput from '../../components/reusables/SearchInput/SearchInput';
import { headers, TableData } from './Mocks';
import { apiCall } from '../../Utils/URLs/axios.index'
import { deleteBulkUploadItemId } from '../../containers/loanApis';
import { v4 as uuidv4 } from 'uuid';
import { getAllbeneficiaryListItem, getBulkUploadSchedule } from '../../containers/dashboardApis'
import BranchTable from "../Branches/components/BranchTable";


interface DocumentData {
  id: any;
  name: string;
  date: string;
  content: any[];
  url?: string;
}

interface DocumentTableProps {
  documents: DocumentData[];
  onViewMore: (document: DocumentData) => void;
  onDelete: (id: number) => void;
}

// interface DocumentData {
//   id: any;  // Ensure id is explicitly defined as a number
//   beneficiaryListName: string;
//   alias: string;
//   date: string;
// }

interface DocumentData2 {
  id: number;  // Ensure id is explicitly defined as a number
  beneficiaryName: string;
  fullName: string;
  bankName: string;
  accountNo: string;
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
  onDelete: (id: number) => void;

}


interface Row {
  id: number;
  [key: string]: string | number;
}

interface ColumnType {
  key: string;
  name: string;
}

const ExcelSheet: React.FC = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [columns, setColumns] = useState<ColumnType[]>([]);

  // const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (!file) return;
  //   const reader = new FileReader();

  //   reader.onload = (e) => {
  //     if (!e.target?.result) return;
  //     const data = new Uint8Array(e.target.result as ArrayBuffer);
  //     const workbook = XLSX.read(data, { type: "array" });
  //     const sheetName = workbook.SheetNames[0];
  //     const worksheet = workbook.Sheets[sheetName];
  //     const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  //     if (jsonData.length > 0) {
  //       const cols: ColumnType[] = jsonData[0].map((col, index) => ({ key: index.toString(), name: String(col) }));
  //       const rowData: Row[] = jsonData.slice(1).map((row, rowIndex) => {
  //         const rowObj: Row = { id: rowIndex };
  //         cols.forEach((col, colIndex) => {
  //           rowObj[col.key] = row[colIndex] ? String(row[colIndex]) : "";
  //         });
  //         return rowObj;
  //       });
  //       setColumns(cols);
  //       setRows(rowData);
  //     }
  //   };
  //   reader.readAsArrayBuffer(file);
  // };

  // const handleDownload = () => {
  //   if (columns.length === 0 || rows.length === 0) return;
  //   const worksheetData = [columns.map((col) => col.name), ...rows.map((row) => columns.map((col) => row[col.key]))];
  //   const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  //   XLSX.writeFile(workbook, "exported_data.xlsx");
  // };

  const handleDownloadSample = () => {
    const sampleData = [["Name", "Age", "Email"], ["John Doe", "30", "john@example.com"], ["Jane Doe", "25", "jane@example.com"]];
    const worksheet = XLSX.utils.aoa_to_sheet(sampleData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sample");
    XLSX.writeFile(workbook, "sample_data.xlsx");
  };

  return (
    <div className="p-4">
      {/* <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="mb-4" /> */}
      {/* <Button  title="Download Excel" onClick={handleDownload} className="mb-4">Download Excel</Button> */}
      <Button title="Download Sample Excel Sheet" onClick={handleDownloadSample} className="mb-4">Download Sample Excel</Button>
      {/* <DataGrid columns={columns as Column<Row>[]} rows={rows} rowKeyGetter={(row:any) => row.id.toString()} /> */}
    </div>
  );
};

export const DocumentTable: React.FC<DocumentTableProps> = ({ documents, onViewMore, onDelete }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white border-b">
        <thead>
          <tr >
            <th className="border-x-1 px-4 py-4 ">File Name</th>
            <th className="border-x-1 px-4 py-4 ">Upload Date</th>
            <th className="border-x-1 px-4 py-4 ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document, index) => (
            <tr key={index} className="border-t">
              <td className="border-x-1 px-4 py-1 text-center">{document.name}</td>
              <td className="border-x-1 px-4 py-1 text-center">{document.date}</td>
              <td className="px-4 py-1 flex items-center justify-center">
                <Button
                  title="View More"
                  onClick={() => onViewMore(document)}
                  className="text-[12px] !w-auto bg-white border border-[1px] border-[#00ADEF] rounded-[8px] !px-4 !text-[#00adef]"
                />
                <Button
                  title="Delete"
                  onClick={() => onDelete(document.id)}
                  className="text-[12px] !w-auto bg-white ml-2 !px-4 !text-[#FF0000]"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const BulkPayment = () => {
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [documents2, setDocuments2] = useState<DocumentData2[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<DocumentData | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedDocumentId, setSelectedDocumentId] = useState<number | null>(null);
  const [state, setState] = useState<any>({

    name: '',
    amount: '',
    description: '',
    branchId: '',
    expiryDate: '',
    startDate: null,
    endDate: null,
    isSubmitting: false,
    errorMssg: '',
  })

  const handleDelete = async (id: any) => {
    try {
      const response = await deleteBulkUploadItemId(id);


      if (response?.respDescription == "SUCCESS") {
        const updatedData = documents.filter((row) => row.id !== id);
        setDocuments(updatedData);
        window.location.reload();

      } else {
        console.error(`Failed to delete document with id ${id}. Response:`, response);
      }

    } catch (err: any) {
      const errorMessage = err?.response?.data?.respDescription || err.message || "Unknown error occurred";
      console.error(`Failed to delete document with id ${id}:`, errorMessage);
      window.location.reload();

    }
  };

  // const handleExport = () => {
  //   exportToExcel(contents, "List of Loan Applications");
  // };

  function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | any) {
    setSearch(e.target.value)
    setState({
      ...state,
      [e?.target?.name]: e?.target?.value,
      submittingError: false
    });
  }
  // const handleFileUpload = (eventOrFile: File | React.ChangeEvent<HTMLInputElement>) => {
  //   let file: File | null = null;

  //   if (eventOrFile instanceof File) {
  //     file = eventOrFile;
  //   } else {
  //     file = eventOrFile.target.files?.[0] || null;
  //   }

  //   if (!file) return;

  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     const ab = e.target?.result;
  //     const workbook = XLSX.read(ab, { type: "binary" });
  //     const sheetName = workbook.SheetNames[0];
  //     const worksheet = workbook.Sheets[sheetName];
  //     const jsonData = XLSX.utils.sheet_to_json(worksheet);

  //     const newDocument: DocumentData = {
  //       name: file?.name || "Untitled Document",
  //       date: new Date().toLocaleString(),
  //       content: jsonData,
  //     };

  //     setDocuments((prevDocs) => [...prevDocs, newDocument]);
  //   };
  //   reader.readAsBinaryString(file);
  // };

  async function fetchData2(id: any) {
    try {
      const res = await getAllbeneficiaryListItem(id);

      if (res && Array.isArray(res)) {
        const newDocuments = res.map((item: any) => ({
          id: item.id,
          beneficiaryName: item.beneficiaryName || "N/A",
          fullName: item.fullName || "N/A",
          bankName: item.bankName || "N/A",
          accountNo: item.accountNo || "N/A",
          amount: item.amount || 0,
        }));

        setDocuments2(newDocuments);
      } else {
        console.warn("Unexpected response format:", res);
        setDocuments2([]);
      }
    } catch (error) {
      console.error("Error fetching beneficiary data:", error);
    }
  }
  const handleViewMore = (document: DocumentData) => {
    setSelectedDocument(document);
    setSelectedDocumentId(document.id); // Store the ID
    fetchData2(document.id); // Fetch details
  };

  const handleCloseModal = () => {
    setSelectedDocument(null);
  };






  // const handleFileUpload = async (eventOrFile: File | React.ChangeEvent<HTMLInputElement>) => {
  //   let file: File | null = null;

  //   if (eventOrFile instanceof File) {
  //     file = eventOrFile;
  //   } else {
  //     file = eventOrFile.target.files?.[0] || null;
  //   }

  //   if (!file) {
  //     console.error("No file selected");
  //     return; 
  //   }

  //   const reader = new FileReader();
  //   reader.onload = async (e) => {
  //     const ab = e.target?.result;
  //     if (!ab) {
  //       console.error("Failed to read file");
  //       return;
  //     }

  //     const workbook = XLSX.read(ab, { type: "binary" });
  //     const sheetName = workbook.SheetNames[0];
  //     const worksheet = workbook.Sheets[sheetName];
  //     const jsonData = XLSX.utils.sheet_to_json(worksheet);

  //     try {
  //       const formData = new FormData();
  //       formData.append("file", file!);
  //       formData.append("upload_preset", "unsigned_upload");
  //       const response = await fetch(`https://api.cloudinary.com/v1_1/dc2zavmxp/upload`, {
  //         method: "POST",
  //         body: formData,
  //       });

  //       const data = await response.json();

  //       if (response.ok) {
  //         const Id = documents.length > 0 ? Math.max(...documents.map((doc) => doc.id)) + 1 : 1;

  //         const newDocument: DocumentData = {
  //           // id: uuidv4(),
  //           id: Id,
  //           name: file!.name,
  //           date: new Date().toLocaleString(),
  //           content: jsonData,
  //           url: data.secure_url,
  //         };





  //         const payload = new FormData();
  //         payload.append("files", "");
  //         payload.append("merchantId", "merchantId");
  //         try {
  //           const response = await apiCall({
  //             name: "uploadBulkPaySchedule",
  //             data: payload,
  //             action: (): any => {
  //               setState({
  //                 ...state,
  //                 isSubmitting: false,
  //                 submittingError: false,
  //                 errorMssg: ""
  //               });
  //               window.location.reload();
  //               return []
  //             },
  //             successDetails: {
  //               title: "Documents Submitted",
  //               text: `Your Business Registration documents have been submitted for review`,
  //               icon: ""
  //             },
  //             errorAction: (err?: any) => {
  //               if (err && err?.response?.data) {
  //                 setState({
  //                   ...state,
  //                   submittingError: true,
  //                   isSubmitting: false,
  //                   errorMssg: err?.response?.data?.errorMssg || err?.response?.errorMssg || err?.response?.data?.respDescription || err?.response?.respDescription || "Action failed, please try again"
  //                 })
  //                 return ["skip"]
  //               } else {
  //                 setState({
  //                   ...state,
  //                   submittingError: true,
  //                   isSubmitting: false,
  //                   errorMssg: "Action failed, please try again"
  //                 })
  //               }
  //             }
  //           })
  //             .then(async (res: any) => {
  //               setState({
  //                 submittingError: false,
  //                 isSubmitting: false,
  //                 errorMssg: ""
  //               })
  //             })

  //         } catch (e) {
  //           console.error(e + " 'Caught Error.'");
  //         };
  //       } else {
  //         console.error("Error uploading to Cloudinary:", data.error.message);
  //       }
  //     } catch (err) {
  //       console.error("Upload failed:", err);
  //     }
  //   };
  //   reader.readAsBinaryString(file);
  // };

  const handleFileUpload = async (e: any) => {

    const file = e.target.files?.[0];
    if (!file) return;

    const payload = new FormData();
    payload.append("files", file);
    payload.append("merchantId", "10");

    // const payload = new FormData();


    //      const file = e.target.files || null;

    // payload.append("files",  "https://paysysbucket.fra1.digitaloceanspaces.com/paysysbucket/bulkpayfiles/12_1738945583510_WhatsApp Image 2025-02-04 at 10.33.07.jpeg");
    // payload.append("merchantId", "10");
    try {
      const response = await apiCall({
        name: "uploadBulkPaySchedule",
        data: payload,
        action: (): any => {
          setState({
            ...state,
            isSubmitting: false,
            submittingError: false,
            errorMssg: ""
          });
          // window.location.reload();
          //   return []
        },
        successDetails: {
          title: "Documents Submitted",
          text: `Your Business Registration documents have been submitted for review`,
          icon: ""
        },
        errorAction: (err?: any) => {
          if (err && err?.response?.data) {
            setState({
              ...state,
              submittingError: true,
              isSubmitting: false,
              errorMssg: err?.response?.data?.errorMssg || err?.response?.errorMssg || err?.response?.data?.respDescription || err?.response?.respDescription || "Action failed, please try again"
            })
            return ["skip"]
          } else {
            setState({
              ...state,
              submittingError: true,
              isSubmitting: false,
              errorMssg: "Action failed, please try again"
            })
          }
        }
      })
        .then(async (res: any) => {
          setState({
            submittingError: false,
            isSubmitting: false,
            errorMssg: ""
          })
        })

    } catch (e) {
      console.error(e + " 'Caught Error.'");
    };
  };
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
  async function fetchData() {

    try {

      const res = await getBulkUploadSchedule();


      if (res && Array.isArray(res)) {
        const newDocuments = res.map((item) => ({
          id: item.id || item.fileaddress,
          name: item.status || "Unknown File",
          date: item.dateCreated || new Date().toLocaleString(),
          content: item.content || [],
          url: item.fileaddress || "",
        }));

        setDocuments(newDocuments);
      }
    } catch (error) {
      console.error("Error fetching merchant data:", error);
    } finally {

    }

  }

  useEffect(() => {

    fetchData();

  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-between p-4">
        <ExcelSheet />
        {selectedDocument && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg max-w-5xl w-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold ">{selectedDocument.name} - {selectedDocument.date}</h2>
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

        {/* {(showBulkPaymentList === true || contents?.length === 0) && ( */}
        <div
          className={`w-full max-w-sm p-4 mb-10 border-dashed border-2 rounded-lg ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
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
        {/* )} */}
      </div>

      {/* <div className="flex justify-between w-full mt-[20px]">
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
    </div> */}

      <DocumentTable documents={documents} onViewMore={handleViewMore} onDelete={handleDelete} />


    </DashboardLayout>
  );
};

export default BulkPayment;
