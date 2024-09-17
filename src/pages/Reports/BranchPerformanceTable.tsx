import React, { useEffect, useState } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableComponent from "../../components/reusables/Table";
import { BranchHeader } from "./Mocks";
import { useLocation } from 'react-router-dom';
import CurrencyFormat from "react-currency-format";

const BranchPerformanceTable = ({search}: any) => {
  const [changePage, setchangePage] = useState("");
 // console.log(search,'the data')
  const [filteredData, setFilteredData] = useState([]);
  const changeCurrentPage = (data: any) => {
   // console.log(data);
    setchangePage(data.selected);
  };
  const location = useLocation();

  useEffect(() => {
    // Filter data based on search input
    const filtered = JSON.parse(location?.state)?.filter((item: any) => {
      return search?.toLowerCase() === '' || search?.toUpperCase() === '' ? item :
          item.name?.toLowerCase()?.includes(search) || item.name?.toUpperCase()?.includes(search) ||
          item.amount?.toString()?.toLowerCase()?.includes(search) || item.amount?.toString()?.toUpperCase()?.includes(search) ||
          item.value?.toLowerCase()?.includes(search) || item.value?.toUpperCase()?.includes(search) 
  });
    setFilteredData(filtered);
  }, [search, location.state]);

  return (
    <TableComponent
      headers={BranchHeader}
      currentPage={1}
      totalPages={1}
      totalValue={filteredData.length}
      changePage={changeCurrentPage}
      isLoading={JSON.parse(location?.state)?.length === 0 ? true : false}
    >
      {filteredData?.map((val: any, index: any) => (
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
            <p className="text-[12px] ">{val.name}</p>
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
            <p className="text-[12px] ">{val.date}</p>
          </TableCell> */}
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

export default BranchPerformanceTable;
