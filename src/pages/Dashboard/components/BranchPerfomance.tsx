import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableComponent from "../../../components/reusables/Table";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CurrencyFormat from "react-currency-format";

const BranchPerformance = ({ data }: any) => {
  const navigate = useNavigate();
  const [changePage, setchangePage] = useState<any>("");

  const headers = ["Name", "Count", "Volume"];

  const changeCurrentPage = (data: any) => {
    setchangePage(data?.selected);
  };

  // Ensure data is an array, otherwise fallback to an empty array
  const branchData = Array.isArray(data) ? data : [];

  return (
    <>
      <div className="flex justify-between items-center mt-[40px]">
        <p className="font-semibold text-[15px]">Branch Performance Summary</p>
        <p className="text-[12px]">Last 7 days</p>
      </div>

      {branchData.length > 0 ? (
        <TableComponent
          headers={headers}
          currentPage={1}
          totalPages={1}
          totalValue={branchData.length || 0}
          changePage={changeCurrentPage}
        >
          {branchData.map((val: any, index: any) => (
            <TableRow
              key={index}
              className="flex items-center border-b-[1px] justify-between space-x-[6em] text-left px-[2em] py-[2em] text-[black] min-w-full"
            >
              <TableCell>
                <p className="text-[12px] text-primary">{val?.name}</p>
              </TableCell>
              <TableCell>
                <p className="text-[12px]">{val?.value}</p>
              </TableCell>
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
            </TableRow>
          ))}
        </TableComponent>
      ) : (
        <p className="text-[14px] text-gray-500 mt-[20px]">No branch performance data available.</p>
      )}
    </>
  );
};

export default BranchPerformance;
