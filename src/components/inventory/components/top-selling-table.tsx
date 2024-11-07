import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableComponent from "../../../components/reusables/Table";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import CurrencyFormat from "react-currency-format";





const  TopSellingTable = ({data}:any) => {

  const navigate=useNavigate()
    const [changePage, setchangePage] = useState('')
    const {recentTransactions}=data
  const headers = [
    "Amount",
    "Branch",
    "Amount Impacted",
    "Transaction Type",
    "Date",
  ];
  
  const changeCurrentPage = (data: any) => {
    setchangePage(data?.selected)
}

  return (
   
    <>
    
<div className={`grid border rounded-lg  bg-[#fff] px-[20px] pt-[20px] `}>

     <p className="text-[#383E49] text-[20px] font-medium">Table Title</p>
      
    


   
    <TableComponent headers={headers} currentPage={1} totalPages={1} totalValue={recentTransactions?.length || 0} changePage={changeCurrentPage}>
      {recentTransactions?.map((val:any, index:any) => (
        <TableRow
          key={index}
          className="flex items-center border-b-[1px]  justify-between space-x-[6em]  text-left px-[2em] pt-[2em] text-[black] min-w-full "
        >
          <TableCell>
            <p className="text-[12px]">
            <CurrencyFormat
              value={val?.amount || 0}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₦"}
            />
            </p>
          </TableCell>
          <TableCell>
            <p className="text-[12px] text-primary">{val?.name}</p>
          </TableCell>
          <TableCell>
            <p className="text-[12px]">
            <CurrencyFormat
              value={val?.amountImpact || 0}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₦"}
            />
            </p>
          </TableCell>
          <TableCell>
            <p className="text-[12px]">{val?.transactionType}</p>
          </TableCell>
          <TableCell>
            <p className="text-[12px]">{dayjs(val?.transactionDate ).format('DD MMMM YYYY, hh:mm A') }</p>
          </TableCell>
          <TableCell>
            <p className="text-[12px]">{val?.time}</p>
          </TableCell>
        </TableRow>
      ))}
    </TableComponent>

    </div>
 


  </>

  )
}

export default TopSellingTable