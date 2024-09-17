import { useEffect, useRef, useState } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { teamHeaders } from "./MockData";
import TableComponent from "../../../components/reusables/Table";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  fetchMerchantAdminsData,
  fetchRoles,
} from "../../../containers/userApis";
import ManageUser from "./ManageUser";
import DeactivateUser from "./DeactivateUser";
const UserTable = ({ search,setRefresh,refresh }: any) => {
  const [changePage, setchangePage] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [manageUserModal, setmanageUserModal] = useState(false)
  const [deactivateUserModal, setDeactivateUserModal] = useState(false)
  const [merchantDetails, setmerchantDetails] = useState([])
  const [merchantId, setmerchantId] = useState(0)
  const [pageDetails, setpageDetails] = useState({
    PageNumber: 0,
    PageNumberElements: 0,
    PageSize: 10,
    PageTotalElements: 0,
    PageTotalPages: 0,
  });
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

const showManageUser =(val:any)=>{
  setmanageUserModal((prevShoW: boolean) => !prevShoW);
  //console.log('val>>>', val);
  setmerchantDetails(val)
}

const showDeactivateUser =(val:any)=>{
  setDeactivateUserModal((prevShoW: boolean) => !prevShoW)
  setmerchantId(val)
}

  const {
    PageNumber,
    PageNumberElements,
    PageSize,
    PageTotalElements,
    PageTotalPages,
  } = pageDetails;
  const [details, setDetails] = useState([]);
  const [state, setState] = useState<any>({
    // search: "",
    role: "",
    status: "ALL",
    submittingError: false,
  });
  const { role, status } = state;
 // console.log("the search", search);

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

  useEffect(() => {
    setisLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetchRoles();
      //  console.log(response, "the roles");
        let dataMap =
          response?.map((each: any, i: number) => {
            return { name: each?.roleName, label: each?.roleName, id: i };
          }) || [];
        let [data] = dataMap.map((val: any) => {
          return val.name;
        });
        setState({
          ...state,
          role: data,
        });
      } catch (error) {
        // Handle errors here
        console.error(error);
      } finally {
        setisLoading(false);
      }
    };
    fetchData();
  }, []);

  async function fetchMerchant() {
    try {
      const response = await fetchMerchantAdminsData(
        PageNumber,
        PageSize,
        search,
        "",
        status
      );
    //  console.log(response, "from function");
      setDetails(response.details);
      setpageDetails({
        PageNumber: response.pageDetails.PageNumber,
        PageNumberElements: response.pageDetails.PageNumberElements,
        PageSize: response.pageDetails.PageSize,
        PageTotalPages: response.pageDetails.PageTotalPages,
        PageTotalElements: response.pageDetails.PageTotalElements,
      });
    } catch (error) {}
    finally{
      setRefresh(false)
    }
  }

  useEffect(() => {
    fetchMerchant();
  }, [search, PageNumber,refresh]);

  const changeCurrentPage = (data: any) => {
   // console.log(data);
    setchangePage(data.selected);
    setpageDetails({
      ...pageDetails,
      PageNumber: data,
    });
  };

  return (
    <>
      <TableComponent
        headers={teamHeaders}
        currentPage={PageNumber}
        totalPages={PageTotalPages}
        totalValue={PageTotalElements}
        changePage={changeCurrentPage}
        isLoading={isLoading}
      >
        {details?.map((val: any, index: any) => (
          <TableRow
            key={index}
            className="flex items-center border-b-[1px]  justify-between space-x-[6em]  text-left px-[2em] py-[2em] text-[black] min-w-full "
          >
            <TableCell>
              <p className="text-[12px] ">{val.email}</p>
            </TableCell>
            <TableCell>
              <div className="grid gap-2 text-[12px]">
                <p>
                  {val.firstName} {val.lastName}
                </p>
                <p className="text-primary">{val.UserID}</p>
              </div>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">{val.role}</p>
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
              <p className=" text-[20px]">
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
                      className={val?.status === 'ACTIVE' ? `absolute left-[-100%]  bg-white w-[120px] grid border-[1px] rounded-md shadow-md  z-10 text-[10px]` : ''}
                      ref={dropdownRef}
                    >
                
                      {val.status === "ACTIVE" && (
                        <>
                         <p className="hover:bg-[#F7F8FA] p-[10px] hover:cursor-pointer" onClick={() => {showManageUser(val); setIsDropdownVisible(false)}}>
                         Manage Merchant
                       </p>
                        <p
                          className="hover:bg-[#F7F8FA] p-[10px] hover:cursor-pointer"
                          onClick={() => {showDeactivateUser(val.id); setIsDropdownVisible(false)}}
                        >
                          Deactivate Merchant
                        </p>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </p>
            </TableCell>
          </TableRow>
        ))}
      </TableComponent>
      <ManageUser toggleDropdown={showManageUser} isOpen=
      {manageUserModal} value={merchantDetails}/>
      <DeactivateUser toggleDropdown={showDeactivateUser} isOpen={deactivateUserModal} merchantId={merchantId} setRefresh={setRefresh}/>
    </>
  );
};

export default UserTable;
