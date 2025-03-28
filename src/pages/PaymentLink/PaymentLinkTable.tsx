import React, { useEffect, useRef, useState } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableComponent from "../../components/reusables/Table";
import { header } from "./MockData";
import CurrencyFormat from "react-currency-format";
import dayjs from "dayjs";
import { paymentLinkBaseURL } from "../../Utils/URLs/api.env";
import { BsThreeDotsVertical } from "react-icons/bs";


const PaymentLinkTable = ({paymentLinkTable, setpages,number,isLoading}:any) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [showDeactivate, setDeactivateModal] = useState(false);
  const [delId, setDelId] = useState("");
  const [delName, setDelName] = useState("");
  const [changePage, setchangePage] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {pageDetails, paymentLinks} = paymentLinkTable
  const {size,totalPages,numberElements,totalElements}=pageDetails ?? {}
  const changeCurrentPage = (data: any) => {
    console.log("any",data);
    setchangePage(data?.selected);
    setpages((prevState:any)=>({
      ...prevState,
      number:data,
      pageNo:data
    }))
  };
  console.log("data", paymentLinkTable)
  const showDeactivateModal = (id: any, name: any) => {
    setDeactivateModal((prevShoW: boolean) => !prevShoW);
    setDelId(id);
    setDelName(name);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    }

    if (isDropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownVisible]);

  
  return (
    <TableComponent
      headers={header}
      currentPage={number} totalPages={totalPages} totalValue={paymentLinkTable.length} changePage={changeCurrentPage} isLoading={isLoading}
    >
      {paymentLinkTable?.map((val: any, index: any) => (
        <TableRow
          key={index}
          className="flex items-center border-b-[1px]  justify-between space-x-[6em]  text-left px-[2em] py-[2em] text-[black] min-w-full "
        >
          <TableCell>
     
              <p>{val?.linkId}</p>
         
          </TableCell>
          <TableCell>
            <p className="text-[12px] ">  <p className="text-[12px] "><p className="text-[12px] "><CurrencyFormat
                value={val?.amount || 0}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
              /></p></p></p>
          </TableCell>
          <TableCell>
            <p className="text-[12px] ">{val.currency}</p>
          </TableCell>
          <TableCell>
          <p className="text-[12px] ">{val?.description}</p>
          </TableCell>
          <TableCell>
            <p className="text-[12px] ">{dayjs(val?.date).format("DD MMMM YYYY, hh:mm A")}</p>
          </TableCell>
          <TableCell>
          <p className="text-[12px] ">{dayjs(val?.expiryDate).format("DD MMMM YYYY, hh:mm A")}</p>
          </TableCell>
          <TableCell>
          <p className="text-[12px] ">{val?.linkType}</p>
          </TableCell>
          <TableCell>
            <div className="flex gap-2 items-center">
              <div
                className={`p-1 h-fit rounded-full ${
                  val?.linkStatus === "EXPIRED" ? "bg-red-400" : "ACTIVE" ? "bg-[#009236]" : "bg-yellow-400"
                } `}
              ></div>
              <p className="text-[12px]">{val?.linkStatus}</p>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex gap-2 items-center">
              <div
                className={`p-1 h-fit rounded-full ${
                  val?.transactionStatus === "PENDING" ? "bg-red-400" : "ACTIVE" ? "bg-[#009236]" : "bg-yellow-400"
                } `}
              ></div>
              <p className="text-[12px]">{val?.transactionStatus}</p>
            </div>
          </TableCell>
          <TableCell>
          <div className="text-[12px] text-primary cursor-pointer">
              <p> 
              <a href={`${paymentLinkBaseURL}${"/"}${val?.linkId}`} target="_blank">{`${paymentLinkBaseURL}${"/"}${val?.linkId}`}</a>
              </p>
            </div>
            
          </TableCell>
          <TableCell>
            <div className="relative">
              <BsThreeDotsVertical
                onClick={() => {
                  setActiveIndex(index);
                  setIsDropdownVisible(!isDropdownVisible);
                }}
                className="text-[20px] hover:cursor-pointer"
              />

              {activeIndex === index && isDropdownVisible && (
                <div
                  className="absolute left-[-50%]  bg-white w-[60px] grid border-[1px] rounded-md shadow-md  z-10 text-[10px]"
                  ref={dropdownRef}
                >
                  <p className="hover:bg-[#F7F8FA] p-[10px] text-[#FF0000] hover:cursor-pointer" onClick={()=>{}}>
                    Delete
                  </p>
                 
                  {/* <p className="hover:bg-[#F7F8FA] p-[10px] hover:cursor-pointer">
                    Delete Branch
                  </p> */}
                </div>
              )}
            </div>
          </TableCell>
       
        </TableRow>
      ))}
    </TableComponent>
  );
};

export default PaymentLinkTable;
