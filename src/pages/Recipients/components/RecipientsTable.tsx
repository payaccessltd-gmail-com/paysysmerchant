import React, { useState, useEffect } from 'react'
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableComponent from "../../../components/reusables/Table";
import { headers, rows } from "./MockData";
import { useNavigate } from 'react-router-dom';
import { listBeneficiaries } from '../../../containers/withdrawalApis';
import RecipientsPage from './RecipientsPage';


//{  pageDetails, setPageNo, isLoading ,state,setState}: any
const RecipientsTable = ({  pageDetails, setPageNo ,state,setState}: any) => {
  const navigate = useNavigate();
  const [changePage, setchangePage] = useState("");
  const [pageable, setPageable] = useState<any>({});
  const [isLoading, setIsLoading] = useState<any>(true);

  const [data, setdata] = useState({
    content: ["null", "null"],
    totalElements: 0,
    totalPages: 0,
    number: 0
  });
  let { content, totalElements, totalPages, number } = data;

  const changeCurrentPage = (data: any) => {
    setchangePage(data?.selected);
  };

  function getBeneficiaryList() {
    listBeneficiaries(pageable?.pageNumber, pageable?.pageSize, "TRANSFER").then((res: any) => {
      setIsLoading(!isLoading);
      setPageable(res?.pageable);
      setdata({
        content: res?.content,
        totalElements: res?.totalElements,
        totalPages: res?.totalPages,
        number: res?.number,
      });
    }).catch((err: any) => {
      console.error("error>>>", err);
    })
  }

  useEffect(() => {
    getBeneficiaryList();
  },[])

  return (
    <TableComponent
      headers={headers}
      currentPage={pageable?.pageNumber} //pageSize 
      totalPages={totalPages}
      totalValue={totalElements}
      changePage={changeCurrentPage}
      isLoading={isLoading}
    >
      {content?.map((val: any, index: any) => (
        <TableRow
          key={index}
          className="flex items-center border-b-[1px]  justify-between space-x-[6em]  text-left px-[2em] py-[2em] text-[black] min-w-full hover:cursor-pointer hover:bg-gray-100 "
          onClick={() => navigate(`${val?.id}`, { state: val })}
        >
          <TableCell>
            <p className="text-[12px] ">{val.beneficiaryName}</p>
          </TableCell>
          <TableCell>
            <p className="text-[12px] ">{val.id}</p>
          </TableCell>
          <TableCell>
            <p className="text-[12px] ">{val.beneficiaryType}</p>
          </TableCell>
          <TableCell>
            <p className="text-[12px] ">{val.beneficiaryValue}</p>
          </TableCell>
          <TableCell>
             <div className="flex gap-2 items-center">
              <div
                className={`p-1 h-fit rounded-full ${
                  val.beneficiaryStatus === "ACTIVE" ? "bg-[#009236]" : "bg-red-400"
                } `}
              ></div>
              <p className="text-[12px]">{val.beneficiaryStatus}</p>
            </div>
          </TableCell>
        </TableRow>
      ))}
       {/* <RecipientsPage data={recipientProperties} /> */}
    </TableComponent>
  )
}

export default RecipientsTable