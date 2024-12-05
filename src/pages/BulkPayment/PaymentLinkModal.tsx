import React, { useState } from 'react'
import { Storage } from "../../Utils/Stores/inAppStorage";
import { Image } from '../../assets'
import { Button } from '../../components/reusables/DefaultButton'
import DefaultInput from '../../components/reusables/DefaultInput'
import Overlay from '../../components/reusables/Overlay/Overlay'
import { apiCall } from '../../Utils/URLs/axios.index'
import PaymentLinkModal2 from './PaymentLinkModal2';


interface DocumentData2 {
    fullName: string;
    accName: string;
    accountNumber: string;
    amount: number;
}


interface DocumentTable2Props {
  documents: DocumentData2[];
}


export const DocumentTable2: React.FC<DocumentTable2Props> = ({ documents}) => {
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
          {documents.map((document, index) => (
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

const PaymentLinkModal: React.FC<{
    isOpen: boolean;
    toggleDropdown: () => void;
    onAddDocument: (doc: any) => void;
  }> = ({ isOpen, toggleDropdown, onAddDocument }) => {
    const businessId: any = localStorage.getItem('businessID')
    const { onboardingStage, userId, lastName } = Storage.getItem(
        "userDetails"
    ) || { onboardingStage: "", userId: 0, firstName: "", lastName: "" };
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
    const [documents2, setDocuments2] = useState<DocumentData2[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        alias: '',
        startDate: null,
        endDate: null,
      });
    const { name, amount, description, branchId, expiryDate, startDate, endDate, isSubmitting } = state;
    const [paymentLinkModal2, setPaymentLinkModal2] = useState(true)

  
  
    async function togglepaymentLinkModal2() {
      await setPaymentLinkModal2(!paymentLinkModal2)
    }
    
  const togglePaymentLinkModal2 = () => {
    setPaymentLinkModal2(!paymentLinkModal2);
  };
  
  const handleAddDocument2 = (newDocument: DocumentData2) => {
    let file: File | null = null;

 

   if (!file) return;

   const reader = new FileReader();
   reader.onload = (e) => {
    //  const ab = e.target?.result;
    //  const workbook = XLSX.read(ab, { type: "binary" });
    //  const sheetName = workbook.SheetNames[0];
    //  const worksheet = workbook.Sheets[sheetName];
    //  const jsonData = XLSX.utils.sheet_to_json(worksheet);

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
   console.log("oo")
 };
   const showModalFunc = () => {
        setState({
         
            amount: '',
            name: '',
            description: '',
            branchId: '',
            merchantId: '',
            expiryDate: '',
            linkType: '',
            invoiceId: '',
            submittingError: false,
            isSubmitting: false,
            errorMssg: ""
        })
        toggleDropdown()
        // showModal();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
            isSubmitting: false,
            submittingError: false,
            errorMssg: ""
        });
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
    // const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    //     setState({
    //       ...state,
    //       [e.target.name]: e.target.value,
    //     });
    //   };

    // async function handleSubmit() {
        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault(); 
            toggleDropdown();
            setState((state: any) => ({
                ...state,
                isSubmitting: true
            }));
            // console.log("Form Data Submitted:", {
            //     name: state?.name,
            //     merchantId: userId,
            //     amount: state?.amount,
            //     description: state?.description,
            //     branchId: state?.branchId,
            //     expiryDate: state?.expiryDate,
            //     linkType: state?.linkType,
            //     invoiceId: state?.invoiceId,
            // });
        
            // const newDocument: DocumentData = {
            //     name: state.name || "Untitled",
            //     date: new Date().toLocaleString(),
            //   };
            // let formData = new FormData();
            // state && formData.append("name", state?.name || "");
            // state && formData.append("merchantId", userId || "");
            // state && formData.append('amount', state?.amount || "");
            // state && formData.append('description', state?.description || "");
            // state && formData.append('branchId', state?.branchId || "");
            // state && formData.append('expiryDate', state?.expiryDate || "");
            // state && formData.append('linkType', state?.linkType || "");
            // state && formData.append('invoiceId', state?.invoiceId || "");
            // onAddDocument(formData);
            const newDocument = {
                ...formData,
                date: new Date().toLocaleString(),
              };
              onAddDocument(newDocument);

            // try {
            //     const response = await apiCall({
            //         name: "createPaymentLink",
            //         data: formData,
            //         action: (): any => {
            //             setState({
            //                 ...state,
            //                 isSubmitting: false,
            //                 submittingError: false,
            //                 errorMssg: ""
            //             });
            //             setTimeout(() => {
            //                 showModalFunc();
            //             }, 3000);
            //             window.location.reload();
            //             console.log("paymentLinkdata", state);
            //             return [];
            //         },
            //         successDetails: {
            //             title: "Documents Submitted",
            //             text: `Your Business Registration documents have been submitted for review`,
            //             icon: ""
            //         },
            //         errorAction: (err?: any) => {
            //             if (err && err?.response?.data) {
            //                 setState({
            //                     ...state,
            //                     submittingError: true,
            //                     isSubmitting: false,
            //                     errorMssg: err?.response?.data?.errorMssg || err?.response?.errorMssg || err?.response?.data?.respDescription || err?.response?.respDescription || "Action failed, please try again"
            //                 });
            //                 return ["skip"];
            //             } else {
            //                 setState({
            //                     ...state,
            //                     submittingError: true,
            //                     isSubmitting: false,
            //                     errorMssg: "Action failed, please try again"
            //                 });
            //             }
            //         }
            //     }).then(async (res: any) => {
            //         setState({
            //             submittingError: false,
            //             isSubmitting: false,
            //             errorMssg: ""
            //         });
            //     });
            // } catch (e) {
            //     console.error(e + " 'Caught Error.'");
            // }
        };
        
    //}



    return (
        <Overlay toggleDropdown={toggleDropdown} isOpen={isOpen}>
            <div className="grid gap-[20px] w-[70vw] md:w-[30vw] ">
                <div className="grid">
                    <p className="text-[#5C5F61] text-[20px] font-bold">Create Beneficiary List</p>
                    <p className="text-[#07222D] text-[14px]">Complete and enter the following form below  </p>
                </div>




              
       
      
   

        <DefaultInput label="Name" name="name" value={formData.name} handleChange={handleChange} />
        <DefaultInput label="Alias" name="alias" value={formData.alias} handleChange={handleChange} />
        {/* <DateInput
          label="Select Date"
            name="date"
          startDate={formData.startDate}
          endDate={formData.endDate}
          onChange={handleChange}
        /> */}
        <Button title='Add Beneficiary List' onClick={handleSubmit} />

                {/* <DefaultInput label='name' placeHolder='name' value={name} name='name' handleChange={handleChange} />
                <DefaultInput label='alais' placeHolder='name' value={name} name='name' handleChange={handleChange} />
             
                <DateInput
            label="Select Date"
            name="date"
            startname="startDate"
            endname="endDate"
            onChange={handleChange}
            startDate={startDate}
            endDate={endDate}
          />
     

               
                <div className="m-auto w-full">
                    <Button title='Add Beneficiary' onClick={handleSubmit} />
                </div> */}
            </div>

            
<PaymentLinkModal2  isOpen={paymentLinkModal2}
toggleDropdown={togglePaymentLinkModal2}
onAddDocument={handleAddDocument2}  />


        </Overlay>
    )
}

export default PaymentLinkModal



