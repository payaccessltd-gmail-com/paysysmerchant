import React, { useEffect, useRef, useState } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Button } from "../../../components/reusables/DefaultButton";
import { MdRecycling } from "react-icons/md";
import TableComponent from "../../../components/reusables/Table";
import { headers } from "./Mockdata";
import { BsThreeDotsVertical } from "react-icons/bs";
import DeactivateBranch from "./DeactivateBranch";
import { useNavigate } from "react-router-dom";

const BranchTable = ({ data, isLoading ,setRefresh,setPageNo}: any) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [showDeactivate, setDeactivateModal] = useState(false);
  const [delId, setDelId] = useState("");
  const [delName, setDelName] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { content, pageable, totalElements, totalPages } = data;
  const [changePage, setchangePage] = useState("");
const navigate=useNavigate()
  const changeCurrentPage = (data: any) => {
    //console.log(data,'the page number');
    setPageNo(data)
    setchangePage(data.selected);
  };
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    }

    if (isDropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownVisible]);

  const showDeactivateModal = (id: any, name: any) => {
    setDeactivateModal((prevShoW: boolean) => !prevShoW);
    setDelId(id);
    setDelName(name);
  };
 // console.log(isDropdownVisible, "the dropdown");
  return (
    <>
    
    <TableComponent
      headers={headers}
      currentPage={1}
      totalPages={totalPages}
      totalValue={totalElements}
      changePage={changeCurrentPage}
      isLoading={isLoading}
    >
      {content?.map((val: any, index: any) => (
        <TableRow
          key={index}
          className="flex items-center border-b-[1px]  justify-between space-x-[6em]  text-left px-[2em] py-[2em] text-[black] min-w-full "
        >
          <TableCell>
            <div className="text-[12px] text-primary">
              <p>{val.name}</p>
            </div>
          </TableCell>
          <TableCell>
            <p className="text-[12px] ">{val.accountNumber}</p>
          </TableCell>
          <TableCell>
            <div className="grid gap-2 text-[12px]">
              <p>{val.email}</p>
              <p className="text-primary">{val.phone}</p>
            </div>
          </TableCell>
          <TableCell>
            <p className="text-[12px]">{val.description}</p>
          </TableCell>
          <TableCell>
            <p className="text-[12px]">{val.branchId}</p>
          </TableCell>

          <TableCell>
            <div className="flex gap-2 items-center">
              <div
                className={`p-1 h-fit rounded-full ${
                  val.status === "ACTIVE" ? "bg-[#009236]" : "bg-red-400"
                } `}
              ></div>
              <p className="text-[12px]">{val.status}</p>
            </div>
          </TableCell>
          <TableCell>
            <div className="relative">
              <BsThreeDotsVertical
                onClick={() => {
                  setActiveIndex(index);
                  setIsDropdownVisible(!isDropdownVisible);
                }}
                className="text-[20px] hover:cursor-pointer"
              />

              {activeIndex === index && isDropdownVisible && (
                <div
                  className="absolute left-[-100%]  bg-white w-[120px] grid border-[1px] rounded-md shadow-md  z-10 text-[10px]"
                  ref={dropdownRef}
                >
                  <p className="hover:bg-[#F7F8FA] p-[10px] hover:cursor-pointer" onClick={()=>{navigate(`${val.id}`)}}>
                    View Branch
                  </p>
                  {val.status === "ACTIVE" && (
                    <p
                      className="hover:bg-[#F7F8FA] p-[10px] hover:cursor-pointer"
                      onClick={() => {showDeactivateModal(val?.id, val?.name); setIsDropdownVisible(false)}}
                    >
                      Deactivate Branch
                    </p>
                  )}
                  {/* <p className="hover:bg-[#F7F8FA] p-[10px] hover:cursor-pointer">
                    Delete Branch
                  </p> */}
                </div>
              )}
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableComponent>
    <DeactivateBranch toggleDropdown={showDeactivateModal} isOpen={showDeactivate} delId={delId} delName={delName} setRefresh={setRefresh}/>
    </>
  );
};

export default BranchTable;
