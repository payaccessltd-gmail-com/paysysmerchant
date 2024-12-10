import React, { useState } from 'react'
import { Storage } from "../../Utils/Stores/inAppStorage";
import { Image } from '../../assets'
import { Button } from '../../components/reusables/DefaultButton'
import DefaultInput from '../../components/reusables/DefaultInput'
import Overlay from '../../components/reusables/Overlay/Overlay'
import { apiCall } from '../../Utils/URLs/axios.index'
//import PaymentLinkModal2 from './PaymentLinkModal2';


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
      
        isSubmitting: false,
        errorMssg: '',
    })
    const [documents2, setDocuments2] = useState<DocumentData2[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        alias: '',
       
      });
    const { name, amount, description, branchId, expiryDate, startDate, endDate, isSubmitting } = state;
  //  const [paymentLinkModal2, setPaymentLinkModal2] = useState(true)

  
  
//     async function togglepaymentLinkModal2() {
//       await setPaymentLinkModal2(!paymentLinkModal2)
//     }
    
//     const togglePaymentLinkModal2 = () => {
//     setPaymentLinkModal2(!paymentLinkModal2);
//   };
  
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
        console.log("okll", formData)
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
          
           
           
              
                let formData = new FormData();
                state && formData.append("name", state.name);
              
                const newDocument = {
                    ...formData,
                    // id: 1,
                    name: state.name,
                    alias:state.alias,
                    date: new Date().toLocaleString(),
                  };
                  console.log( state.name,"kdd")
               
                  onAddDocument(newDocument);
                try {
                    const response = await apiCall({
                        name: "CreateBeneficiary",
                        data: formData,
                        action: (): any => {
                            setState({
                                ...state,
                                isSubmitting: false,
                                submittingError: false,
                                errorMssg: ""
                            });
                          
                           
                        
                          
                       
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
       
        <Button title='Add Beneficiary List' onClick={handleSubmit} />

              
            </div>


        </Overlay>
    )
}

export default PaymentLinkModal



