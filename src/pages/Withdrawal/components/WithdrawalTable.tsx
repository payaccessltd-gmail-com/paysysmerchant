import React, { useState } from 'react'
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableComponent from '../../../components/reusables/Table';
import { headers} from './MockData';
import CurrencyFormat from "react-currency-format";
import dayjs from "dayjs";

const WithdrawalTable = ({withdrawalTable, setpages,number,isLoading}:any) => {
  const {pageDetails, withdrawals:transactions} = withdrawalTable
  const {size,totalPages,numberElements,totalElements}=pageDetails ?? {}

    const [changePage, setchangePage] = useState('')
   
console.log('')
    
    const changeCurrentPage = (data: any) => {
        setchangePage(data?.selected)
        setpages((prevState:any)=>({
          ...prevState,
          number:data,
          pageNo:data
        }))
    }

  return (
    <TableComponent headers={headers} currentPage={number} totalPages={totalPages} totalValue={totalElements} changePage={changeCurrentPage} isLoading={isLoading}>
        {transactions?.map((val:any, index:any) => (
          <TableRow
            key={index}
            className="flex items-center border-b-[1px]  justify-between space-x-[6em]  text-left px-[2em] py-[2em] text-[black] min-w-full "
          >
            <TableCell>
                <div className="text-[12px] gap-x-3 flex flex-col md:flex-row">
                <p>{dayjs(val?.date).format("DD MMMM YYYY, hh:mm A")}</p>
                </div>
            </TableCell>
            <TableCell>
              <p className="text-[12px] "><CurrencyFormat
                value={val?.amount || 0}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
              /></p>
            </TableCell>
            <TableCell>
              <p className='text-[12px]'>{val.sessionId || "N/A"}</p>
               
            </TableCell>
            <TableCell>
              <p className="text-[12px] text-primary">{val.accountName} </p>
              <p className="text-[12px]">{val.account || "N/A"}</p>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">{val.bank || "N/A"}</p>
            </TableCell>
            
            <TableCell>
                <div className="flex gap-2 items-center">
                {/* p-1 h-fit rounded-full bg-[#009236] */}
                    <div className={
                      `p-1 h-fit rounded-full ${
                        val.status === 'SUCCESS' ? 'bg-[#009236]' : val.status === 'FAILED' ? 'bg-red-500' : null
                      }`
                    }></div>
              <p className="text-[12px]">
            {val.status}
            </p>
                </div>
                
            </TableCell>
            
          </TableRow>
        ))}
        
      </TableComponent>
  )
}

export default WithdrawalTable