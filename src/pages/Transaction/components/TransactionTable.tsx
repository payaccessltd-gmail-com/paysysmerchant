import TableComponent from "../../../components/reusables/Table";
import { headers, TableData } from "./mockData";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { useState } from "react";
import TransSummary from "./TransSummary";
import dayjs from "dayjs";
import CurrencyFormat from "react-currency-format";

const TransactionTable = ({ data, pageDetails, setPageNo, isLoading ,state,setState}: any) => {
 
  const { pageSize, PageNumber, PageTotalElements, PageTotalPages } =
    pageDetails;
  const [changePage, setchangePage] = useState("");


  const changeCurrentPage = (data: any) => {
   // console.log(data, "the number");
    setchangePage(data?.selected);
    setPageNo(data);
  };

  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState([]);

  function toggleDropdown(val: any) {
    setOpenModal(!openModal);
    setValue(val);
  }
  return (
    <TableComponent
      headers={headers}
      currentPage={PageNumber}
      totalPages={PageTotalPages}
      totalValue={PageTotalElements}
      changePage={changeCurrentPage}
      isLoading={isLoading}
    >
      {data?.map((val: any, index: any) => (
        <TableRow
          key={index}
          className="flex items-center border-b-[1px]  justify-between space-x-[6em]  text-left px-[2em] py-[2em] text-[black] min-w-full hover:cursor-pointer hover:bg-gray-100"
          onClick={() => {
            toggleDropdown(val);
          }}
        >
          <TableCell>
            <div className="text-[12px] flex-wrap flex gap-x-5">
              <p>{dayjs(val?.date).format("DD MMMM YYYY, hh:mm A")}</p>
            </div>
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
            <p className="text-[12px]">{val.transactionId}</p>
          </TableCell>
          {/* <TableCell>
            <p className="text-[12px] text-primary">{val.name || 'N/A'}</p>
          </TableCell> */}
          <TableCell>
            <p className="text-[12px]">{val.transactionType}</p>
          </TableCell>
          <TableCell>
            <div className="flex gap-2 items-center">
              <div
                className={`p-1 h-fit rounded-full ${
                  val.status === "FAILED" ? "bg-red-500" : "bg-[#009236]"
                } `}
              ></div>
              <p className="text-[12px]">{val.status}</p>
            </div>
          </TableCell>
        </TableRow>
      ))}
      <TransSummary
        toggleDropdown={toggleDropdown}
        data={value}
        isOpen={openModal}
        state={state}
        setState={setState}
      />
    </TableComponent>
  );
};

export default TransactionTable;
