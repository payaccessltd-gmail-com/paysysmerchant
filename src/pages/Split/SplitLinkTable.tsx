import React, { useState } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableComponent from "../../components/reusables/Table";
import { header } from "./MockData";
import CurrencyFormat from "react-currency-format";
import dayjs from "dayjs";

const SplitLinkTable = ({paymentLinkTable, setpages,number,isLoading}:any) => {
  const [changePage, setchangePage] = useState("");
  //const {pageDetails, paymentLinks} = paymentLinkTable
  //const {size,totalPages,numberElements,totalElements}=pageDetails ?? {}
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



  
  return (
    <TableComponent
      headers={header}
      currentPage={number} totalPages={'1'} totalValue={'1'} changePage={changeCurrentPage} isLoading={isLoading}
    >
      {paymentLinkTable?.map((val: any, index: any) => (
        <TableRow
          key={index}
          className="flex items-center border-b-[1px]  justify-between space-x-[6em]  text-left px-[2em] py-[2em] text-[black] min-w-full "
        >
          <TableCell>
            <div className="text-[12px] text-primary">
              <p>{val.id}</p>
            </div>
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
                  val?.linkStatus === "PENDING" ? "bg-red-400" : "ACTIVE" ? "bg-[#009236]" : "bg-yellow-400"
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
          <p className="text-[12px]">{val?.linkId}</p>
          </TableCell>
          <TableCell>
          <p className="text-[12px] ">  <p className="text-[12px] "><p className="text-[12px] "><CurrencyFormat
                value={val?.totalAmount || 0}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
              /></p></p></p>
          </TableCell>
        </TableRow>
      ))}
    </TableComponent>
  );
};

export default SplitLinkTable;
