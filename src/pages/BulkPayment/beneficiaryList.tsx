import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import DashboardLayout from '../../components/dashboard/Index'
import { Button } from '../../components/reusables/DefaultButton'
import exportToExcel from '../../Utils/ExportExcel';
import { headers, TableData } from './Mocks';
// import PaymentLinkModal from "./PaymentLinkModal";
// import PaymentLinkModal2 from "./PaymentLinkModal2";
import { deleteBeneficiaryId } from '../../containers/loanApis';
import DefaultInput from "../../components/reusables/DefaultInput";
import { fetchbulkPay, getAllbeneficiaryList, getAllbeneficiaryListItem } from "../../containers/dashboardApis";
import PaymentLinkModal from "./PaymentLinkModal";
import PaymentLinkModal2 from "./PaymentLinkModal2";

interface DocumentData {
  id: number;  // Ensure id is explicitly defined as a number
  beneficiaryListName: string;
  alias: string;
  date: string;
}

interface DocumentData2 {
  id: number;  // Ensure id is explicitly defined as a number
  beneficiaryName: string;
  fullName: string;
  bankName: string;
  accountNumber: string;
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

export const DocumentTable: React.FC<DocumentTableProps> = ({ documents, onViewMore, onDelete }) => {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white border-b">
        <thead>
          <tr>
            <th className="border-x-1 px-4 py-4 ">File Name</th>
            <th className="border-x-1 px-4 py-4 ">Alias</th>
            <th className="border-x-1 px-4 py-4 ">Upload Date</th>
            <th className="border-x-1 px-4 py-4 ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document, index) => (
            <tr key={index} className="border-t">
              <td className="border-x-1 px-4 py-1 text-center">{document.beneficiaryListName}</td>
              <td className="border-x-1 px-4 py-1 text-center">{document.alias}</td>
              <td className="border-x-1 px-4 py-1 text-center">{document.date}</td>
              <td className=" px-4 py-1 flex items-center justify-center">
                <Button title='  View More' onClick={() => onViewMore(document)} className='text-[12px] !w-auto bg-white border border-[1px] border-[#00ADEF] rounded-[8px] !px-4 !text-[#00adef] ' />
                <Button title='Delete' onClick={() => onDelete(document.id)} className='text-[12px] !w-auto bg-white ml-2 !px-4 !text-[#FF0000] ' />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



export const DocumentTable2: React.FC<DocumentTable2Props> = ({ documents2, onViewMore, onDelete }) => {


  const [data, setData] = useState(documents2);
  const [editRowId, setEditRowId] = useState<any | null>(null);
  const [editFormData, setEditFormData] = useState({ fullName: "", bankName: "", accountNumber: "", amount: "" });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (row: DocumentData2) => {
    setEditRowId(row.id);
    setEditFormData({
      fullName: row.fullName,
      bankName: row.bankName,
      accountNumber: row.accountNumber,
      amount: row.amount.toString(),
    });
  };

  const handleSave = () => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === editRowId ? { ...row, ...editFormData, amount: Number(editFormData.amount) } : row
      )
    );
    setEditRowId(null);
  };


  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white border-b">
        <thead>
          <tr>
            <th className="border-x-1 px-4 py-4 ">Beneficiary Name</th>
            <th className="border-x-1 px-4 py-4 ">Bank Name</th>
            <th className="border-x-1 px-4 py-4 ">Account No</th>
            <th className="border-x-1 px-4 py-4 ">Amount</th>
            <th className="border-x-1 px-4 py-4 ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents2.map((document, index) => (
            <tr key={index} className="border-t">
              {editRowId === document.id ? (
                <>
                  <td className="border-x-1 px-4 py-1 text-center">
                    <input
                      name="fullName"
                      type="text"
                      value={editFormData.fullName}
                      onChange={handleChange}
                      className="border p-1 w-full"
                    />
                  </td>
                  <td className="border-x-1 px-4 py-1 text-center">
                    <input
                      name="bankName"
                      type="text"
                      value={editFormData.bankName}
                      onChange={handleChange}
                      className="border p-1 w-full"
                    />
                  </td>
                  <td className="border-x-1 px-4 py-1 text-center">
                    <input
                      name="accountNumber"
                      type="text"
                      value={editFormData.accountNumber}
                      onChange={handleChange}
                      className="border p-1 w-full"
                    />
                  </td>
                  <td className="border-x-1 px-4 py-1 text-center">
                    <input
                      name="amount"
                      type="text"
                      value={editFormData.amount}
                      onChange={handleChange}
                      className="border p-1 w-full"
                    />
                  </td>
                  <td className="border-x-1 px-4 py-1 text-center">

                    <Button
                      title="Save"
                      className="!w-[60px] px-3 py-1 bg-blue-500 text-white rounded"
                      onClick={handleSave}
                    />
                  </td>
                </>
              ) : (
                <>
                  <td className="border-x-1 px-4 py-1 text-center">{document.beneficiaryName}</td>
                  <td className="border-x-1 px-4 py-1 text-center">{document.bankName}</td>
                  <td className="border-x-1 px-4 py-1 text-center">{document.accountNumber}</td>
                  <td className="border-x-1 px-4 py-1 text-center">{document.amount}</td>
                  <td className="border-x-1 px-4 py-1 text-center flex items-center justify-center">
                    <Button
                      title=" Edit"
                      className=" !w-[60px] px-3 py-1 "
                      onClick={() => handleEditClick(document)}
                    />
                    <Button title='Delete' onClick={() => onDelete(document.id)} className='text-[12px] !w-auto bg-white ml-2 !px-4 !text-[#FF0000] ' />

                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


const ExcelSheet: React.FC = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [columns, setColumns] = useState<ColumnType[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();

    reader.onload = (e) => {
      if (!e.target?.result) return;
      const data = new Uint8Array(e.target.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      if (jsonData.length > 0) {
        const cols: ColumnType[] = jsonData[0].map((col, index) => ({ key: index.toString(), name: String(col) }));
        const rowData: Row[] = jsonData.slice(1).map((row, rowIndex) => {
          const rowObj: Row = { id: rowIndex };
          cols.forEach((col, colIndex) => {
            rowObj[col.key] = row[colIndex] ? String(row[colIndex]) : "";
          });
          return rowObj;
        });
        setColumns(cols);
        setRows(rowData);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // const handleDownload = () => {
  //   if (columns.length === 0 || rows.length === 0) return;
  //   const worksheetData = [columns.map((col) => col.name), ...rows.map((row) => columns.map((col) => row[col.key]))];
  //   const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  //   XLSX.writeFile(workbook, "exported_data.xlsx");
  // };

  const handleDownloadSample = () => {
    const sampleData = [["BName", "Age", "Email"], ["John Doe", "30", "john@example.com"], ["Jane Doe", "25", "jane@example.com"]];
    const worksheet = XLSX.utils.aoa_to_sheet(sampleData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sample");
    XLSX.writeFile(workbook, "sample_data.xlsx");
  };

  return (
    <div className="p-4">

      <Button title="Download Sample Excel Sheet" onClick={handleDownloadSample} className="mb-4">Download Sample Excel</Button>

    </div>
  );
};



const BulkPayment = () => {
  const [contents, setContents] = useState<any>(TableData);
  const [isLoading, setisLoading] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState<number | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMssg, setErrorMssg] = useState('');
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
  const [deletingId, setDeletingId] = useState<number | null>(null);


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


  const handleDeletes = async (id: any) => {
    try {
      const response = await deleteBeneficiaryId(id);

      // setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== id));
      // const updatedData = data.filter((row) => row.id !== rowId);

      if (response?.respDescription == "SUCCESS") {
        // const updatedData = documents.filter((row) => row.id !== id);
        // setDocuments(updatedData);
        // window.location.reload();
        setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== id));



      } else {
        console.error(`Failed to delete document with id ${id}. Response:`, response);
      }
      // if (response?.success) {
      //   setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== id));
      //   console.log(`Document with id ${id} deleted successfully.`);
      // } else {
      //   console.error(`Failed to delete document with id ${id}. Response:`, response);
      // }
    } catch (err: any) {
      const errorMessage = err?.response?.data?.respDescription || err.message || "Unknown error occurred";
      console.error(`Failed to delete document with id ${id}:`, errorMessage);
      // window.location.reload();

    }
  };

  const handleDelete = async (id: number) => {
    //   console.log(" id:", id, documents);

    if (!id) {
      console.error("Error: ID is undefined or null.");
      return;
    }

    try {
      const response = await deleteBeneficiaryId(id);
      if (response?.respDescription === "SUCCESS") {
        setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== id));

      } else {
        console.error("Failed to delete. Response:", response);
      }
    } catch (err: any) {
      console.error("Error deleting document:", err);
    }
  };

  const handleFileUpload = async (eventOrFile: File | React.ChangeEvent<HTMLInputElement>) => {
    let file: File | null = null;

    if (eventOrFile instanceof File) {
      file = eventOrFile;
    } else {
      file = eventOrFile.target.files?.[0] || null;
    }

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
        //  console.log(documents, "k")
        const Id = documents.length > 0 ? Math.max(...documents.map((doc) => doc.id)) + 1 : 1;
        const newDocument: DocumentData = {
          id: Id,
          beneficiaryListName: file!.name || "Untitled Document",
          alias: "Untitled Document",
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




  async function fetchData() {
    try {
      const res = await getAllbeneficiaryList();

      if (res && Array.isArray(res)) {
        const newDocuments = res.map((item: any) => ({
          id: item.id,
          beneficiaryListName: item.beneficiaryListName || "N/A",
          alias: item.alias || "N/A",
          date: item.date || new Date().toLocaleString(),
        }));
        setDocuments(newDocuments);

      }

    } catch (error) {
      console.error("Error fetching merchant data:", error);

    } finally {

    }

  }

  async function fetchData2(id: any) {
    try {
      const res = await getAllbeneficiaryListItem(id);

      if (res && Array.isArray(res)) {
        const newDocuments = res.map((item: any) => ({
          id: item.id,
          beneficiaryName: item.beneficiaryName || "N/A",
          fullName: item.fullName || "N/A",
          bankName: item.bankName || "N/A",
          accountNumber: item.accountNumber || "N/A",
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

  useEffect(() => {
    fetchData();
  }, []);


  const handleViewMore = (document: DocumentData) => {
    setSelectedDocument(document);
    setSelectedDocumentId(document.id); // Store the ID
    fetchData2(document.id); // Fetch details
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
  const handleBulkPay = async (e: React.FormEvent, id: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMssg('');




    try {
      const res = await fetchbulkPay(id);
      if (res && Array.isArray(res)) {
        const formattedBanks = res.map(item => ({
          id: item.id,

        }));

      }
    } catch (error) {
      console.error("Error fetching beneficiary list:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center my-12">
        <p className="grid gap-[20px] text-[16px] font-semibold mt-[20px]">Beneficiary List</p>
        <ExcelSheet />
        <Button
          title="Add Beneficiary List"
          className="!w-[181px]"
          onClick={togglePaymentLinkModal}
        />
      </div>
      <DocumentTable documents={documents} onViewMore={handleViewMore} onDelete={handleDelete} />

      <div className="flex flex-col items-center p-4">
        {selectedDocument && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg max-w-5xl w-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">
                  {selectedDocument.beneficiaryListName} ({selectedDocument.alias})
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
              <DocumentTable2 documents2={documents2} onViewMore={handleViewMore} onDelete={handleDelete} />
              <div className="flex items-center justify-end mt-4">
                <Button
                  title="Save List"
                  onClick={() => { }}
                  className="text-[12px] !w-auto bg-white border border-[1px] border-[#00ADEF] rounded-[8px] mr-[12px] !px-4 !text-[#00adef] hover:!text-[#fff] hover:!bg-[#00adef]"
                />
                <Button
                  title="Initiate Bulk Payment"
                  onClick={handleBulkPay}
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
        //onAddDocument={(newDoc) => setDocuments((prevDocs) => [...prevDocs, newDoc])}
        onAddDocument={(newDoc: DocumentData) => setDocuments((prevDocs) => [...prevDocs, newDoc])}

      />


      <PaymentLinkModal2
        isOpen={paymentLinkModal2}
        toggleDropdown={togglePaymentLinkModal2}
        onAddDocument={(newDoc) => setDocuments2((prevDocs) => [...prevDocs, newDoc])}
        id={selectedDocumentId} />


    </DashboardLayout>
  );
};

export default BulkPayment;
