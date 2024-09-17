import TableComponent from "../../../components/reusables/Table";
import { headers, TableData } from "./MockData";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { useEffect, useState } from "react";
import { Button } from "../../../components/reusables/DefaultButton";
import { MdRecycling } from "react-icons/md";
import RepairRequest from "./RepairRequest";
import dayjs from "dayjs";

const TerminalTable = ({ data, isLoading, terminalData }: any) => {
  const [PageTotalElements, setPageTotalElements] = useState(0);
  const [PageNumber, setPageNumber] = useState(0);
  const [PageTotalPages, setPageTotalPages] = useState(0);
  const { pageDetails }: any = terminalData;
  useEffect(() => {
    if (typeof pageDetails === "object") {
      const { PageTotalElements, PageTotalPages, PageNumber }: any =
        pageDetails;
      setPageTotalElements(PageTotalElements);
      setPageNumber(PageNumber);
      setPageTotalPages(PageTotalPages);
    }
  }, [pageDetails]);

  const [changePage, setchangePage] = useState("");
  const [value, setvalue] = useState(null);
  const changeCurrentPage = (data: any) => {
    //console.log(data);
    setchangePage(data.selected);
  };

  const [openModal, setOpenModal] = useState(false);

 async function toggleDropdown(val: any) {
   await setOpenModal(!openModal);
    setvalue(val);
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
          className="flex items-center border-b-[1px]  justify-between space-x-[6em]  text-left px-[2em] py-[2em] text-[black] min-w-full "
        >
          <TableCell>
            <div className="text-[12px] text-primary">
              <p>{val.branch}</p>
            </div>
          </TableCell>
          <TableCell>
            <p className="text-[12px] ">{val.serialNumber}</p>
          </TableCell>
          <TableCell>
            <div className="grid gap-2 text-[12px]">
              <p>{val.Name}</p>
              <p className="text-primary">{val.terminalId}</p>
            </div>
          </TableCell>
          <TableCell>
            <p className="text-[12px] text-primary">
              {dayjs(val?.dateCreated).format("DD MMMM YYYY, hh:mm A")}
            </p>
          </TableCell>

          <TableCell>
            <div className="flex gap-2 items-center">
              <div
                className={`p-1 h-fit rounded-full ${
                  val.status === "ENABLED" ? "bg-[#009236]" : "bg-red-400"
                } `}
              ></div>
              <p className="text-[12px]">{val.status}</p>
            </div>
          </TableCell>
          <TableCell
            onClick={() => {
              toggleDropdown(val);
            }}
          >
            <Button
              title="Repair Request"
              className="!bg-white !mt-0 !text-[#3C4257] !border-[1px] shadow-sm m-auto"
              icon={<MdRecycling className="font-bold" />}
            />
          </TableCell>
        </TableRow>
      ))}
      <RepairRequest
        toggleDropdown={toggleDropdown}
        data={value}
        isOpen={openModal}
      />
    </TableComponent>
  );
};

export default TerminalTable;
