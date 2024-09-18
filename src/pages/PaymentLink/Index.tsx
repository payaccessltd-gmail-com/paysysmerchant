
import { CiCalendar, CiSearch } from "react-icons/ci";
import { MdOutlineAir } from "react-icons/md";
import dayjs from "dayjs";
//import DefaultTable from "../../components/reuseables/tables/DefaultTable";
import { useEffect, useState } from "react";
//import { listSplitbyBranch, listSplitbyBusiness } from "../../containers/splitAPI";
import { Toaster } from "react-hot-toast";
import { headers } from "./components/MockData";
//import { listPaymentbyBusiness } from "../../containers/paymentLinkAPI";
import CreatePayment from "./CreatePayment";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/reusables/DefaultButton";
import DashboardLayout from "../../components/dashboard/Index";

const PaymentLink = () => {
  const [showModal, setshowModal] = useState(false)
  const businessId: any = localStorage.getItem('businessID')
  const [content, setcontent] = useState([]);
  const navigate = useNavigate();
  //console.log(businessId,'the branch id')    
  const toggleModal = () => {
    setshowModal(!showModal);
  };

  async function getList() {
    // try {
    //   const res = await listPaymentbyBusiness(businessId)
    //   console.log(res)
    //   setcontent(res)
    // } catch (error: any) {
    //   console.log(error)
    // }
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <DashboardLayout>
      <Toaster />
      <p className="text-[40px] font-bold text-[#177196]">Payment Link</p>

      <div className="flex justify-between gap-[20px] flex-wrap w-[100%] mt-[50px]">
        <div className="border-[1px] border-[#D6F5FFD9] bg-[#F3FCFF] rounded-md px-[15px] py-[11px] flex items-center text-[16px] text-[#49454F]  md:w-[40%] justify-between h-fit ">
          <input type="text" className="border-0  bg-[#F3FCFF] w-full focus:outline-none" placeholder="Search " />
          <CiSearch className=" text-[17px]" />
        </div>

        <div className="flex flex-wrap items-center gap-[20px] h-fit">
          <div className=" !border-[#EAF9FF] !border-[1px] !bg-[#D6F5FF33] !bg-opacity-[20%] !text-[#02425C] !py-[12px] !px-[7px] flex gap-2 text-[16px] items-center rounded-lg whitespace-nowrap w-full md:w-fit">
            <p>May 29 2023</p>
            <CiCalendar />
          </div>


          <Button title='Create Payment Link' className='md:!w-fit !m-0' onClick={toggleModal} />
        </div>

      </div>
      {content.length > 0 ? 
      <div>Table</div>
      // <DefaultTable
      //   header={headers}
      //   noData={false}
      //   tableBody={content.map((val: any, index: any) => (
      //     <tr key={`row-${index} `} className="border-b-[1px] border-b-[#BAE5F44F] border-b-opacity-[31%]">
      //       <td className="text-center text-sm font-400 py-5 px-6">
      //         {val?.linkId || ""}
      //       </td>
      //       <td className="text-center text-sm font-400 py-5 px-6">
      //         {val?.amount || ""}
      //       </td>
      //       <td className="text-center text-sm font-400 py-5 px-6">
      //         {val?.currency || ""}
      //       </td>
      //       <td className="text-center text-sm font-400 py-5 px-6">
      //         {val?.description || ""}
      //       </td>
      //       {/* <td className="text-center text-sm font-400 py-5 px-6">
      //        {val?.branchId || ""}
      //      </td>   */}

      //       <td className="text-center text-sm font-400 py-5 px-6">
      //         {dayjs(val?.dateCreated || new Date()).format(
      //           "MMM DD, YYYY"
      //         )}
      //       </td>
      //       <td className="text-center text-sm font-400 py-5 px-6">
      //         {dayjs(val?.expiryDate || new Date()).format(
      //           "MMM DD, YYYY"
      //         )}
      //       </td>
      //       <td className="text-center text-sm font-400 py-5 px-6">
      //         {val?.linkType || ""}
      //       </td>
      //       <td className="text-center text-sm font-400 py-5 px-6">
      //         {val?.linkStatus || ""}
      //       </td>
      //       <td className="text-center text-sm font-400 py-5 px-6">
      //         {val?.transactionStatus || ""}
      //       </td>
      //       <td className="text-center text-sm font-400 py-5 px-6">
      //         {val?.invoiceId || "N/A"}
      //       </td>
      //       <td className="text-center text-sm font-400 py-5 px-6">
      //         {val?.totalAmount || "N/A"}
      //       </td>
      //       <td className="text-center text-sm font-400 py-5 px-6">

      //         <div className="text-xs text-lime-500 cursor-pointer">
      //           <a onClick={() => navigate('/payWithpayAccess')}>
      //             {`https://pay-access.com/payWithpayAccess/${val?.linkId?.toLowerCase()}`}
      //             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
      //               <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h6.793l-2.647-2.646a.5.5 0 1 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 1 1-.708-.708L11.293 8.5H4.5A.5.5 0 0 1 4 8z" />
      //             </svg>
      //           </a>
      //         </div>
      //       </td>
      //     </tr>
      //   ))}
      //   totalPages={2}
      //   totalValue={2}
      //   currentPage={1}
      // />
       :

        <div className="h-[52vh]  text-center grid justify-center items-center w-[60%] lg:w-[50%] mx-auto">
          <div className="h-fit grid gap-[10px]">
            <div className="bg-[#BFEFFF33] bg-opacity-[20%] text-secondary text-[55px] w-fit m-auto rounded-md p-[20px]">
              <MdOutlineAir />
            </div>
            <p className="text-[#07222D] text-[16px] font-bold">
              nothing to see here
            </p>
            <p className="text-[14px] text-[#555555] ">
              You will be able to request for pos when your account has been actived
            </p>
            <div className="m-auto w-3/4">
              <Button
                title="Create Payment Link"
                onClick={toggleModal}
              />
            </div>
          </div>
        </div>
      }

      <CreatePayment clicked={toggleModal} show={showModal} />
    </DashboardLayout>
  )
}

export default PaymentLink