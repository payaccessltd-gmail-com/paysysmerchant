import { useEffect, useState } from "react";
import DashboardLayout from "../../../components/dashboard/Index";
import { useParams } from "react-router-dom";
import {
  fetchBranchDetailData,
  fetchBranchTransData,
} from "../../../containers/branchesApis";
import { Image } from "../../../assets";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableComponent from "../../../components/reusables/Table";
import { viewBranchHeaders } from "./Mockdata";
import { Button } from "../../../components/reusables/DefaultButton";
import { AiOutlineSearch } from "react-icons/ai";
import { BsArrowUpRight } from "react-icons/bs";
import exportToExcel from "../../../Utils/ExportExcel";
import DateInput from "../../../components/reusables/DateInput/DateInput";
import dayjs from "dayjs";
import CurrencyFormat from "react-currency-format";
import CustomDropDown from "../../../components/reusables/dropdowns/CustomDropDown";

const ViewBranch = () => {
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState({ id: 0, text: "", name: "" });
  const [transactionType, setTransactionType] = useState('Select Transaction Type')
  const options=['All','Transfer','Purchase','Cash']
  const tabsData = [
    { id: 0, text: "All", name: "" },
    { id: 1, text: "Successful", name: "SUCCESS" },
    { id: 2, text: "Failed", name: "FAILED" },
    { id: 3, text: "Pending", name: "PENDING" },
  ];
  const [branchTrans, setBranchTrans] = useState([]);
  const [changePage, setchangePage] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [transSummary, setTransSummary] = useState({
    approvedTransactionValue: 0,
    approvedTransactionVolume: 0,
    collection: 0,
    failedTransactionValue: 0,
    failedTransactionVolume: 0,
    totalTransactionValue: 0,
  });
  const {
    approvedTransactionValue,
    approvedTransactionVolume,
    collection,
    failedTransactionValue,
    failedTransactionVolume,
    totalTransactionValue,
  } = transSummary;
  const [pageDetails, setpageDetails] = useState({
    PageNumber: 0,
    PageNumberElements: 0,
    PageSize: 10,
    PageTotalElements: 0,
    PageTotalPages: 0,
  });
  const {
    PageNumber,
    PageNumberElements,
    PageSize,
    PageTotalElements,
    PageTotalPages,
  } = pageDetails;
  const [branchDetails, setBranchDetails] = useState({
    name: "",
    branchStatus: "",
    accountNo: "",
  });
  const { name, branchStatus, accountNo } = branchDetails;
  const [state, setState] = useState<any>({
    search: "",
    tranType: null,
    collectionType: null,
    role: null,
    status: null,
    submittingError: false,
    isExport: false,
    startDate: null,
    endDate: null,
  });

  const {
    search,
    role,
    tranType,
    collectionType,
    status,
    date,
    isExport,
    startDate,
    endDate,
  } = state;

  async function fetchBranchDetails() {
    setisLoading(true);
    try {
      const res = await fetchBranchDetailData(id);
      setBranchDetails({
        name: res.name,
        branchStatus: res.status,
        accountNo: res.accountNumber,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setisLoading(false);
    }
  }

  async function fetchBranchTrans() {
    setisLoading(true);
    try {
      const res = await fetchBranchTransData(
        id,
        PageNumber,
        PageSize,
        search,
        status,
        tranType,
        collectionType,
        isExport,
        startDate,
        endDate
      );
      setBranchTrans(res?.transactionDetails);
      setpageDetails({
        PageNumber: res?.pageDetails.PageNumber,
        PageNumberElements: res?.pageDetails.PageNumberElements,
        PageSize: res?.pageDetails.PageSize,
        PageTotalElements: res?.pageDetails.PageTotalElements,
        PageTotalPages: res?.pageDetails.PageTotalPages,
      });
      setTransSummary({
        approvedTransactionValue:
          res?.transactionSummary?.approvedTransactionValue,
        approvedTransactionVolume:
          res?.transactionSummary?.approvedTransactionVolume,
        collection: res?.transactionSummary?.collection,
        failedTransactionValue: res?.transactionSummary?.failedTransactionValue,
        failedTransactionVolume:
          res?.transactionSummary?.failedTransactionVolume,
        totalTransactionValue: res?.transactionSummary?.totalTransactionValue,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setisLoading(false);
    }
  }
  const details = [
    {
      amount: approvedTransactionValue || 0,
      title: "Approved Transaction Value",
    },
    {
      amount: approvedTransactionVolume || 0,
      title: "Number of Approved Transactions",
    },
    { amount: collection || 0, title: "Collection" },
    { amount: failedTransactionValue || 0, title: "Failed Transaction Value" },
    {
      amount: failedTransactionVolume || 0,
      title: "Number of Failed Transactions ",
    },
    { amount: totalTransactionValue || 0, title: "Total Transaction Value" },
  ];
  useEffect(() => {
    fetchBranchDetails();
  }, [id]);

  useEffect(() => {
    fetchBranchTrans();
  }, [id, PageNumber, status, search, startDate, endDate,tranType]);

  const changeCurrentPage = (data: any) => {
   // console.log(data);
    setchangePage(data.selected);
    setpageDetails({
      ...pageDetails,
      PageNumber: data,
    });
  };
  const handleDateChange = (event: any) => {
    const { name, value } = event.target;
    setState((prevDate: any) => ({
      ...prevDate,
      [name]: value,
    }));
  };
  const handleExport = () => {
    exportToExcel(branchTrans, `${name} Transactions`);
  };

  useEffect(() => {
    setState({
      ...state,
      status: selectedTab.name,
    });
  }, [selectedTab]);
 // console.log(branchTrans)

  useEffect(() => {
    if(transactionType==='All') {
        setState({
          ...state,
          tranType: '',
        });
    } else if(transactionType==='Select Transaction Type') {
        setState({
          ...state,
          tranType: '',
        });} else {
        setState({
            ...state,
            tranType:transactionType ,
          });
    }
  }, [transactionType]);

 // console.log(tranType,'the transaction type from the view branch')
  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      submittingError: false,
    });
  }
 // console.log(search, "the status on the view branch");

  return (
    <DashboardLayout>
      <div className="mt-7 grid gap-[20px]">
        <div className="">
          <p className="text-[20px] font-bold flex justify-between">
            {name}{" "}
            <span className="flex gap-1 font-normal items-center text-[14px]">
              <div
                className={`p-1 h-fit rounded-full ${
                  branchStatus === "ACTIVE" ? "bg-[#009236]" : "bg-red-400"
                } `}
              ></div>
              {branchStatus}
            </span>
          </p>
          <p className="text-[14px] text-[#697386] flex gap-5 items-center"> {accountNo} </p>
        </div>
        <div className="grid  md:grid-cols-3 rounded-lg bg-primary p-[20px] gap-[20px]">
          {details.map((val, index) => (
            <div
              key={index}
              className={` border-b-[1px] md:border-b-0 flex gap-[20px] px-[20px] pb-[10px] md:items-center md:justify-center lg:justify-start  justify-between`}
            >
              <img src={Image.wallet} alt="" />
              <div className="grid text-right md:text-center lg:text-left">
                <p className="text-[20px] text-white">{val.amount}</p>
                <p className="text-[#F0BE0D] text-[12px]">{val.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center mt-10">
        <p className="grid gap-[20px] text-[20px] font-semibold mt-[20px] items-center">
          Branch Transactions
        </p>
        
      </div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-y-[20px] w-full mt-[20px] gap-x-[50px]">
      {/* <div className="flex justify-between gap-3 w-full mt-[20px] items-end"> */}
        <div className="flex gap-[10px] items-center ">
          <DateInput
            label="Select Date"
            name="date"
            startname="startDate"
            endname="endDate"
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
        <div className="md:w-[400px]">
        <CustomDropDown
          label="Transaction Type"
          options={options}
          value={transactionType}
          setValue={setTransactionType}
        />

        </div>
        
      </div>

      <div className="flex justify-between gap-3 w-full mt-[20px] items-end flex-wrap">
        <div className="flex  justify-between items-center gap-[20px] text-[14px] w-fit">
          {tabsData.map((tab) => (
            <p
              className={` py-[5px] hover:cursor-pointer ${
                selectedTab.id === tab.id
                  ? " border-0 border-b-[3px] text-primary border-solid border-primary  "
                  : "text-[#697386]"
              }`}
              onClick={() => {
                setSelectedTab(tab);
              }}
            >
              {tab.text}
            </p>
          ))}
        </div>
        <div className="flex gap-3 justify-between w-full md:w-fit items-center">
        <div className="relative ">
          <div className="absolute text-[20px] top-[14px] left-[14px] text-[#7B7B7B]">
            <AiOutlineSearch />
          </div>
          <input
            type="text"
            className="placeholder:text-[#7B7B7B] border-[#D0D5DD] border-[1px] rounded-md py-[10px] pl-[44px] bg-[#F7F8FA] "
            placeholder="Search by Trans ID"
            value={search}
            onChange={handleChange}
            name="search"
          />
        </div>
        {branchTrans.length > 0 && (
          <div className="w-full md:w-fit ">
            <Button
              onClick={handleExport}
              title="Export"
              className="!bg-white !mt-0 !text-[#3C4257] !border-[1px] shadow-sm m-auto"
              icon={<BsArrowUpRight className="font-bold" />}
            />
          </div>
        )}
        </div>
      </div>
      <TableComponent
        headers={viewBranchHeaders}
        currentPage={PageNumber}
        totalPages={PageTotalPages}
        totalValue={PageTotalElements}
        changePage={changeCurrentPage}
        isLoading={isLoading}
      >
        {branchTrans?.map((val: any, index: any) => (
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
              <p className="text-[12px] ">{val.transactionId}</p>
            </TableCell>
            <TableCell>
              <CurrencyFormat
                value={val?.amount || 0}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
              />
            </TableCell>
            <TableCell>
                <div className="grid">
              <p className="text-[12px]">{val.transactionType}</p>
              <p className="text-[12px] text-[#697386]">{val.action}</p>

                </div>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">
                {dayjs(val?.date).format("DD MMMM YYYY, hh:mm A")}
              </p>
            </TableCell>

            <TableCell>
              <div className="flex gap-2 items-center">
                <div
                  className={`p-1 h-fit rounded-full ${
                    val.status === "SUCCESS" ? "bg-[#009236]" : "bg-red-400"
                  } `}
                ></div>
                <p className="text-[12px]">{val.status}</p>
              </div>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        ))}
      </TableComponent>
    </DashboardLayout>
  );
};

export default ViewBranch;
