import TableComponent from "../../components/reusables/Table";
import { headers} from "./Mocks";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { useEffect, useState } from "react";
import RepairRequest from "../Terminals/components/RepairRequest";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import CurrencyFormat from 'react-currency-format';

const LoanTable = ({ data, isLoading,setpages, terminalData,number,page }: any) => {
  const [detail, setdetail] = useState([]);

  //console.log("vvvvvvv>>>",page);
useEffect(() => {
 setdetail(data.details);
// console.log("data>>>", data?.details);
}, [data])


  const navigate = useNavigate();
  

  const [value, setvalue] = useState(null);

  const [openModal, setOpenModal] = useState(false);
 

  function toggleDropdown(val: any) {
    setOpenModal(!openModal);
    setvalue(val);
  }


  const [changePage, setchangePage] = useState('')

  const changeCurrentPage = (data: any) => {
    setchangePage(data.selected)
    setpages((prevState:any) => ({
      ...prevState,
      number: data,
      // pageNo:data
    }))
  }

  const {  pageSize, totalPages, numberElements, totalElements } = page??{};
//console.log("details>>", detail);

  return (
    
      <TableComponent
        headers={headers}
        currentPage={number} totalPages={totalPages} totalValue={totalElements} changePage={changeCurrentPage}
        isLoading={isLoading} data={detail}//isLoading
      >
        {detail?.map((val: any, index: number) => (
          <TableRow
            key={index}
            className="flex cursor-pointer items-center border-b-[1px]  justify-between space-x-[6em]  text-left px-[2em] py-[2em] text-[black] min-w-full "
            onClick={() => {
              if (val?.loanStatus === "OFFER_ACCEPTED" || val?.loanStatus === "LOAN_ACTIVE" || val?.loanStatus === "FULLY_REPAID") {
                navigate("/loans/repayments", { state: val });  //navigate("/loans/summary", { state: val }); is the old UI
              } else if(val?.loanStatus === "OFFER_READY"){
                navigate('/loans/acceptance', { state: val });
              }else {
                navigate(`/loans/${index + 1}`, { state: val });
              }

            }}
          >
            <TableCell>
              <div className="text-[12px] text-primary">
                <p>
                  {/* {val?.requestAmount || "N/A"} */}
                  <CurrencyFormat value={val?.requestAmount || ""} displayType={'text'} thousandSeparator={true} fixedDecimalScale={true} decimalScale={2} prefix={"₦"} />
                </p>
              </div>
            </TableCell>

            <TableCell>
              <div className="grid gap-2 text-[12px] text-green-500">
                <p>
                  <CurrencyFormat value={val?.offeredAmount || "N/A"} displayType={'text'} thousandSeparator={true} fixedDecimalScale={true} decimalScale={2} prefix={"₦"} />
                </p>
                {/* <p className="text-primary">{val.requestDate}</p> */}
              </div>
            </TableCell>
            <TableCell>
              <div className="grid gap-2 text-[12px]">
                <p>{val?.requestDuration || "N/A"}</p>
                {/* <p className="text-primary">{val.duration}</p> */}
              </div>
            </TableCell>
            <TableCell>
              <div className="grid gap-2 text-[12px]">
                <p>
                  {dayjs(val?.requestDate || new Date()).format(
                    "MMM DD, YYYY hh:mm:ss"
                  )}
                </p>
                {/* <p className="text-primary">{val.requestDate}</p> */}
              </div>
            </TableCell>
            <TableCell>
              <div className="grid gap-2 text-[12px]">
                <p>{val?.loanPurpose || "N/A"}</p>
                {/* <p className="text-primary">{val.requestDate}</p> */}
              </div>
            </TableCell>
            <TableCell>
              <div className="grid gap-2 text-[12px]">
                {/* <p>{val?.kickoffDate || "N/A"}</p> */}
                {
                  val?.kickoffDate === null ? "N/A" :
                    <>
                      {dayjs(val?.kickoffDate).format(
                        "MMM DD, YYYY hh:mm:ss"
                      )}
                    </>
                }
              </div>
            </TableCell>
            <TableCell>
              <div className="grid gap-2 text-[12px]">
                <p>{val?.offeredDuration || "N/A"}</p>
                {/* <p className="text-primary">{val.requestDate}</p> */}
              </div>
            </TableCell>
            <TableCell>
              <div className="grid gap-2 text-[12px]">
                <p>{val?.loanProductName || "N/A"}</p>
                {/* <p className="text-primary">{val.requestDate}</p> */}
              </div>
            </TableCell>
            
            <TableCell>
              <div className="grid gap-2 text-[12px]">
                {/* <p>{val?.approvedDate || "N/A"}</p> */}
                {
                  val?.approvedDate === null ? "N/A" :
                    <>
                      {dayjs(val?.approvedDate).format(
                        "MMM DD, YYYY hh:mm:ss"
                      )}
                    </>
                }
                <p>

                </p>
                {/* <p className="text-primary">{val.requestDate}</p> */}
              </div>
            </TableCell>

            <TableCell>
              <div className="flex gap-2 items-center">
                <div
                  className={`p-1 h-fit rounded-full ${
                    val?.loanStatus === "LOAN_ACTIVE" ? "bg-[#009236]" :
                      val?.loanStatus === "PENDING_APPROVAL" ? "bg-yellow-400" :
                        val?.loanStatus === "OFFER_READY" ? "bg-lime-500" :
                          val?.loanStatus === "LOAN_OVERDUE" ? "bg-rose-800" :
                            val?.loanStatus === "LOAN_DUE" ? "bg-rose-200" :
                              val?.loanStatus === "LOAN_DECLINED" ? "bg-red-900" :
                                val?.loanStatus === "OFFER_ACCEPTED" ? "bg-green-500" :
                                val?.loanStatus  === "FULLY_REPAID" ? "bg-lime-300" :
                                  <></>
                    } `}
                ></div>
                <p className="text-xs">{val?.loanStatus}</p>
              </div>
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
//profile
export default LoanTable;
