import React, { useState } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableComponent from "../../components/reusables/Table";
import { TerminalHeader, header, rows } from "./Mocks";
import { useLocation } from 'react-router-dom';
import CurrencyFormat from "react-currency-format";

const TerminalPerformanceTable = ({ search }: any) => {
    const [changePage, setchangePage] = useState("");

    const changeCurrentPage = (data: any) => {
        // console.log(data);
        setchangePage(data?.selected);
    };
    const location = useLocation();
//   console.log('searched>>>', JSON.parse(location?.state));


    return (
        <TableComponent
            headers={TerminalHeader}
            currentPage={1}
            totalPages={1}
            totalValue={1}
            changePage={changeCurrentPage}
            isLoading={JSON.parse(location?.state)?.length === 0 ? true : false}
        >
            {JSON.parse(location?.state)?.filter((item: any) => {
                return search?.toLowerCase() === '' || search?.toUpperCase() === '' ? item :
                    item.branch?.toLowerCase()?.includes(search) || item.branch?.toUpperCase()?.includes(search) ||
                    item.terminaId?.toLowerCase()?.includes(search) || item.terminaId?.toUpperCase()?.includes(search) ||
                    item.amount?.toLowerCase()?.includes(search) || item.amount?.toUpperCase()?.includes(search) ||
                    item.value?.toLowerCase()?.includes(search) || item.value?.toUpperCase()?.includes(search)
            })?.map((val: any, index: any) => (
                <TableRow
                    key={index}
                    className="flex items-center border-b-[1px]  justify-between space-x-[6em]  text-left px-[2em] py-[2em] text-[black] min-w-full "
                >
                    <TableCell>
                        <div className="text-[12px] text-primary">
                            <p>{index + 1}</p>
                        </div>
                    </TableCell>
                    <TableCell>
                        <p className="text-[12px] ">{val.branch}</p>
                    </TableCell>
                    <TableCell>
                        <p className="text-[12px] ">{val.terminaId}</p>
                    </TableCell>
                    <TableCell>
                        <p className="text-[12px] ">
                            <CurrencyFormat
                                value={val?.amount || 0}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"₦"}
                            />
                        </p>
                    </TableCell>
                    <TableCell>
                        <p className="text-[12px] ">{val.value}</p>
                    </TableCell>
                    {/* <TableCell>
            <div className="flex gap-2 items-center">
              <div
                className={`p-1 h-fit rounded-full ${
                  val.status === "Successful" ? "bg-[#009236]" : "bg-red-400"
                } `}
              ></div>
              <p className="text-[12px]">{val.status}</p>
            </div>
          </TableCell> */}
                </TableRow>
            ))}
        </TableComponent>
    );
};

export default TerminalPerformanceTable;
