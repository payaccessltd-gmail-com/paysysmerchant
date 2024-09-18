import { useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import DashboardLayout from '../../components/dashboard/Index'
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaRegNewspaper } from "react-icons/fa6";
import { contents, headers } from "./mockData";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import { Button } from "../../components/reusables/DefaultButton";
import DefaultInput from "../../components/reusables/DefaultInput";
import CustomDropDown from "../../components/reusables/dropdowns/CustomDropDown";
import DefaultTable from "../../components/reusables/tables/DefaultTable";

const Invoice = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const dropdownRef = useRef<any>(null);
  const [status, setstatus] = useState("Show all");
  const navigate = useNavigate();
  return (
    <DashboardLayout>
      <p className="text-[40px] font-bold text-[#177196]">Invoice</p>
      <div className="flex flex-wrap items-center justify-between">
      <div className="flex gap-[20px] items-center">
        <div className="relative">
          <div
            className=" !border-[#EAF9FF] !border-[1px] !bg-[#D6F5FF33] !bg-opacity-[20%] !text-[#02425C] !py-[12px] !px-[7px] flex gap-2 text-[16px] items-center rounded-lg"
            onClick={toggleDropdown}
          >
            <p>Filter</p>
            <IoIosArrowDown />
          </div>

          {isOpen && (
            <div
              className="absolute top-full mt-[10px] left-0 rounded-lg bg-white border-[1px] p-[22px] grid gap-[20px]"
              ref={dropdownRef}
            >
              <CustomDropDown
                label="Status"
                className="!w-full"
                options={["Show all", "POS", "Money"]}
                value={status}
                setValue={setstatus}
              />

              <DefaultInput label="Amount" placeHolder="00.00" />

              <div className="flex items-end gap-[1px] w-full">
                <DefaultInput type="date" label="Time range" />
                <DefaultInput type="date" />
              </div>

              <Button title="filter" />
            </div>
          )}
        </div>
        <div className="flex items-center">
          <input
            className="border-[1px] border-[#DCF6FF] text-[#49454F] text-[16px] bg-[#F3FCFF] py-[10px] px-[20px] w-full md:w-[30vw] rounded-md"
            placeholder="Search Invoice ID, customer email or name"
          />
          <IoIosSearch className="ml-[-10%] text-[#48454f]" />
        </div>
      </div>
{contents.length>0 && <div className="md:w-[20vw]">
    <Button title='Generate Invoice' onClick={() => navigate("request-payment")}/>
        </div>}
      </div>

      {contents.length>0?<DefaultTable
       header={headers}
       noData={false}
       tableBody={contents.map((val: any, index: any) => (
         <tr key={`row-${index} `} className="border-b-[1px] border-b-[#BAE5F44F] border-b-opacity-[31%] cursor-pointer hover:bg-grey" onClick={()=>navigate('request-payment/preview',{state:{val}})}>
           
           
           <td className="text-center text-sm font-400 py-5 px-6">
             {val?.amount || ""}
           </td>
           <td className="text-center text-sm font-400 py-5 px-6">
             {val?.name || ""}
           </td>
           <td className="text-center text-sm font-400 py-5 px-6">
             {val?.invoiceNo|| ""}
           </td>
           <td className={`text-center text-sm font-400 py-5 px-6 `}>
            <div className={`min-w-[93px] flex rounded-full p-[10px]  text-white items-center justify-center ${val.status==='Not paid'?'bg-[#C61010]  ':val.status==='Paid'?'bg-[#1F932D]':val.status==='Pending'?'bg-[#D6A12E]':'bg-[#115570]'}`}>
             {val?.status || ""}
              {val?.status==='Draft'?<MdKeyboardDoubleArrowRight />:<IoMdCheckmark />}
            </div>
           </td>
           <td className="text-center text-sm font-400 py-5 px-6">
             {val?.date || ""}
           </td>
           <td className="text-center text-sm font-400 py-5 px-6">
           </td>
         </tr>
       ))}
       totalPages={2}
       totalValue={2}
       currentPage={1}
     />:
      
      <div className="h-[52vh]  text-center grid justify-center items-center w-[60%] lg:w-[50%] mx-auto">
        <div className="h-fit grid gap-[10px]">
          <div className="bg-[#BFEFFF33] bg-opacity-[20%] text-secondary text-[55px] w-fit m-auto rounded-md p-[20px]">
            <FaRegNewspaper />
          </div>
          <p className="text-[#07222D] text-[16px] font-bold">
            No pending Invoice
          </p>
          <p className="text-[14px] text-[#555555] ">
            Start receiving money for client. Use this feature to bill your
            customers easily or send Standard invoices.
          </p>
          <div className="m-auto w-3/4">
            <Button
              title="Generate Invoice"
              onClick={() => navigate("request-payment")}
            />
          </div>
        </div>
      </div>
      }
    </DashboardLayout>
  );
};

export default Invoice;
