import DashboardLayout from "../../components/dashboard/Index";
import { CiCalendar, CiSearch } from "react-icons/ci";
import { MdOutlineAir } from "react-icons/md";
import dayjs from "dayjs";
import { contents, headers } from "./component/Mockdata";
//import DefaultTable from "../../components/reuseables/tables/DefaultTable";
import { useEffect, useState } from "react";
import AddSplit from "./component/AddSplit";
//import { listSplitbyBranch, listSplitbyBusiness } from "../../containers/splitAPI";
import { Toaster } from "react-hot-toast";
import { Button } from "../../components/reusables/DefaultButton";


const Split = () => {
  const [showModal, setshowModal] = useState(false)
  const businessId: any = localStorage.getItem('businessID')
  const [content, setcontent] = useState<any>(['array']);
  const [showSpinner, setShowSpinner] = useState<any>(false);
  //console.log(businessId,'the branch id') ....   
  const toggleModal = () => {
    setshowModal(!showModal);
  };
  async function getList() {
    // try {
    //   const res = await listSplitbyBusiness(businessId);
    //   setcontent(res);
    //   // if (content[0] === 'array') {
    //   //   setShowSpinner(true);
    //   // } else {
    //   //   setShowSpinner(false);
    //   // }
    // } catch (error: any) {
    //   console.log(error)
    // }
  }

  useEffect(() => {
    getList()
  }, [showModal])

  return (
    <DashboardLayout>
      <Toaster />
      <p className="text-[40px] font-bold text-[#177196]">Split/Skill</p>

      <div className="flex justify-between gap-[20px] flex-wrap w-[100%] mt-[50px]">
        <div className="border-[1px] border-[#D6F5FFD9] bg-[#F3FCFF] rounded-md px-[15px] py-[11px] flex items-center text-[16px] text-[#49454F]  w-[40%] justify-between h-fit">
          <input type="text" className="border-0  bg-[#F3FCFF] w-full focus:outline-none" placeholder="Search " />
          <CiSearch className=" text-[17px]" />
        </div>

        <div className="flex flex-wrap items-center gap-[20px] h-fit">
          <div className=" !border-[#EAF9FF] !border-[1px] !bg-[#D6F5FF33] !bg-opacity-[20%] !text-[#02425C] !py-[12px] !px-[7px] flex gap-2 text-[16px] items-center rounded-lg whitespace-nowrap">
            <p>May 29 2023</p>
            <CiCalendar />
          </div>
          {content.length > 0 &&

            <Button title='Add' className='md:!w-fit !m-0' onClick={toggleModal} />
          }
        </div>

      </div>


{/* 
      {
        showSpinner &&
        <>
          <div role="status" style={{ marginLeft: "550px" }}>
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-cyan-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </>
      } */}

      {content[0] !== 'array'?
        // <DefaultTable
        //   header={headers}
        //   noData={false}
        //   tableBody={content.map((val: any, index: any) => (
        //     <tr key={`row-${index} `} className="border-b-[1px] border-b-[#BAE5F44F] border-b-opacity-[31%]">
        //       <td className="text-center text-sm font-400 py-5 px-6">
        //         {val?.accountName || ""}
        //       </td>
        //       <td className="text-center text-sm font-400 py-5 px-6">
        //         {val?.accountNumber || ""}
        //       </td>
        //       <td className="text-center text-sm font-400 py-5 px-6">
        //         {val?.bank || ""}
        //       </td>
        //       <td className="text-center text-sm font-400 py-5 px-6">
        //         {val?.spitRation || ""}
        //       </td>
        //       <td className="text-center text-sm font-400 py-5 px-6">
        //         {dayjs(val?.dateCreated || new Date()).format(
        //           "MMM DD, YYYY"
        //         )}
        //       </td>
        //       <td className="text-center text-sm font-400 py-5 px-6">
        //         {val?.paymentLink || ""}
        //       </td>
        //       <td className="text-center text-sm font-400 py-5 px-6">
        //         {val?.status || ""}
        //       </td>
        //     </tr>

        //   ))}
        //   totalPages={2}
        //   totalValue={2}
        //   currentPage={1}
        // />
        <div>Table</div>
         :
        content?.length === 0 ?
        <>
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
                title="Add spit / skim"
                onClick={toggleModal}
              />
            </div>
          </div>
        </div>
        </>
        :
        content[0] === 'array' ?
        <>
         <div role="status" style={{ marginLeft: "550px" }}>
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-cyan-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </>
        :
        <></>
      }
      <AddSplit clicked={toggleModal} show={showModal} />
    </DashboardLayout>
  )
}

export default Split