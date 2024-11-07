import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import ReactPaginate from "react-paginate";
import { Image } from "../../assets";
import { SpinnerIcon } from "./icons";

const TableComponent = ({
  headers,
  children,
  data = [] ,
  isLoading = false,
  totalPages = 0,
  totalValue = 0,
  currentPage = 0,
  hasPagination = true,
  handlePageChange,
  changePage,
}: any) => {



  const changeCurrentPage = (data: any) => {
    console.log(data);
    changePage(data?.selected);
  };
  return (
    <>
      {isLoading}
      <div className="overflow-x-auto">
        <div className="bg-white rounded-md   my-[20px] shadow-lg max-w-full overflow-x-auto ">
          <TableContainer className={`lg:w-full  `}>
            <Table>
              <TableHead>
                <TableRow
                  className={` w-full  items-center border-b-[2px] border-b-[#B9BCC0] font-light flex text-[14px]  text-left  px-[20px] space-x-[60px]`}
                >
                  {headers?.map((header: any, index: any) => (
                    <th key={index}
                      className={`text-[#747C91] text-left  pl-[20px] py-[10px] `}
                    >
                      {header.charAt(0).toUpperCase() + header.slice(1)}
                    </th>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={headers?.length}>
                      <div className="m-auto w-fit  grid items-center">
                        <div className="m-auto text-center">
                          <SpinnerIcon className="m-auto" />
                          <p>Loading...</p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : totalValue?.totalPages ===  0 || data === undefined ? (
                  <TableRow>
                    <TableCell colSpan={headers?.length}>
                      <div className="p-[100px] m-auto w-full">
                        <img src={Image.noData} alt="" className="m-auto" />
                        <p className="text-[#626F86] text-[15px] mt-5 text-center">
                          No data available to analyse yet
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  children
                )}
              </TableBody>
            </Table>

            <div className="min-w-full flex flex-wrap gap-5 justify-between items-center px-5 py-10 bg-white rounded-b-[8px] text-[14px] ">
              <p className="text-[#3C4257]">{totalValue} results</p>
              {totalValue > 0 && (
                <div className="w-fit">
                  <ReactPaginate
                    className="flex justify-center gap-3 text-[#BCBCBC] items-center"
                    activeLinkClassName="bg-[#0F2218]  rounded-[4.5px] px-5 py-2 text-white"
                    previousLabel={"Prev"}
                    nextLabel={"Next"}
                    nextClassName="text-[#3C4257]"
                    previousClassName="text-[#3C4257]"
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={4}
                    onPageChange={changeCurrentPage}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                  />
                </div>
              )}
            </div>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default TableComponent;
