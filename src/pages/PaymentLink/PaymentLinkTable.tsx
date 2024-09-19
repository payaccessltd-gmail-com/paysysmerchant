import React, { useState } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableComponent from "../../components/reusables/Table";
import { header } from "./MockData";
import CurrencyFormat from "react-currency-format";
import dayjs from "dayjs";

const PaymentLinkTable = ({paymentLinkTable, setpages,number,isLoading}:any) => {
  const [changePage, setchangePage] = useState("");
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



  
  return (
    <TableComponent
      headers={header}
      currentPage={number} totalPages={totalPages} totalValue={totalElements} changePage={changeCurrentPage} isLoading={isLoading}
    >
      {paymentLinks?.map((val: any, index: any) => (
        <TableRow
          key={index}
          className="flex items-center border-b-[1px]  justify-between space-x-[6em]  text-left px-[2em] py-[2em] text-[black] min-w-full "
        >
          <TableCell>
            <div className="text-[12px] text-primary">
              <p>{val.customerId}</p>
            </div>
          </TableCell>
          <TableCell>
            <p className="text-[12px] ">{val.vasType}</p>
          </TableCell>
          <TableCell>
            <p className="text-[12px] ">{val.vasBundle}</p>
          </TableCell>
          <TableCell>
            <p className="text-[12px] "><p className="text-[12px] "><CurrencyFormat
                value={val?.amount || 0}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
              /></p></p>
          </TableCell>
          <TableCell>
            <p className="text-[12px] ">{dayjs(val?.date).format("DD MMMM YYYY, hh:mm A")}</p>
          </TableCell>
          <TableCell>
            <p className="text-[12px] ">{val.transactionId}</p>
          </TableCell>
          <TableCell>
            <div className="flex gap-2 items-center">
              <div
                className={`p-1 h-fit rounded-full ${
                  val.status === "SUCCESS" ? "bg-[#009236]" : "bg-red-400"
                } `}
              ></div>
              <p className="text-[12px]">{val.status}</p>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableComponent>
  );
};

export default PaymentLinkTable;
