import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/Index";
import { Button } from "../../components/reusables/DefaultButton";
import exportToExcel from "../../Utils/ExportExcel";
import { TableData } from "./components/Mockdata";
import { BsArrowUpRight } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import NewBranch from "./components/NewBranch";
import BranchTable from "./components/BranchTable";
import { fetchBranchData } from "../../containers/branchesApis";
import SearchInput from "../../components/reusables/SearchInput/SearchInput";

const Branches = () => {
  const [BranchModal, setBranchModal] = useState(false);
  const [pageNo, setPageNo] = useState<any>(0);
  const [pageSize, setPageSize] = useState<any>(10);
  const [searched, setSearched] = useState<string>("");
  const [content, setContent] = useState([])
  const [branchData, setBranchData] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [state, setState] = useState<any>({
    search: "",
    role: "",
    status: "",
    submittingError: false,
    isExport: false,
    errorMssg:'',
    isSubmitting:false
  });

  const { search, role, status, isExport } = state;
  const handleExport = () => {
    exportToExcel(content, "List of Branches");
  };
 async function toggleBranchRequestModal() {
  await setBranchModal(!BranchModal);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
    setSearched(e.target.value)
    setState({
        ...state,
        [e.target.name]: e.target.value,
        submittingError: false
    });
}
  useEffect(() => {
    setisLoading(true)
    // if(refresh) {
      
    // }
    fetchBranchData(pageNo, pageSize, search, status, isExport).then((res)=>{
    //  console.log(res,'from api')
      setContent(res.content)
      setBranchData(res)
    }) .catch((err)=>{
      console.error(err,'from the trans summary')
      if (err && err?.response?.data) {
        setState({
            ...state,
            submittingError: true,
            isSubmitting: false,
            errorMssg: err?.response?.data?.errorMssg || err?.response?.errorMssg || err?.response?.data?.respDescription || err?.response?.respDescription || "Action failed, please try again"
        })}
    }).then(()=>{
      setisLoading(false)
      setRefresh(false)
    })
  }, [search,status,role,isExport,refresh,pageNo])
  // console.log(search,'the search')
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center">
        <p className="grid gap-[20px] text-[16px] font-semibold mt-[20px]">
          Branches
        </p>
        <div className="w-fit">
          <Button
            title="Add Branch"
            onClick={toggleBranchRequestModal}
            className="!w-[181px]"
          />
        </div>
      </div>
      <div className="flex justify-between w-full mt-[20px]">
      <SearchInput placeholder='Search by name' name='search' value={search} onChange={handleChange}/>
        {content.length > 0 && (
          <div className="w-fit ">
            <Button
              onClick={handleExport}
              title="Export"
              className="!bg-white !mt-0 !text-[#3C4257] !border-[1px] shadow-sm m-auto"
              icon={<BsArrowUpRight className="font-bold" />}
            />
          </div>
        )}
      </div>
      <BranchTable data={branchData} isLoading={isLoading} setRefresh={setRefresh} setPageNo={setPageNo}/>
      <NewBranch
        toggleDropdown={toggleBranchRequestModal}
        isOpen={BranchModal}
        setRefresh={setRefresh}
      />
    </DashboardLayout>
  );
};

export default Branches;
