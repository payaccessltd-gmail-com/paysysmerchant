import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/dashboard/Index";
import DateInput from "../../components/reusables/DateInput/DateInput";
import { Button } from "../../components/reusables/DefaultButton";
import CustomDropDown from "../../components/reusables/dropdowns/CustomDropDown";
import { branchPerformance, fetchBranchData } from "../../containers/branchesApis";
import { fetchTerminalData, terminalPerformance } from "../../containers/terminalApis";
import { fetchEODData } from "../../containers/transactionApis";
import successAlert from "../../Utils/HttpResponseHandlers/success";
import { apiCall } from "../../Utils/URLs/axios.index";
import { Toaster } from "react-hot-toast";

// import DatePicker from 'react-datepicker'

const Reports = () => {
  const navigate = useNavigate()
  const [authenticated, setAuth] = useState(false)
  const [showEOD, setShowEOD] = useState<any>([])
  const [id, setId] = useState<any>('')
  const [isLoading, setIsLoading] = useState(false)
  const [terminals, setTerminals] = useState("Select Terminals")
  const [branchList, setBranchList] = useState([]);
  const [terminalList, setTerminalList] = useState([]);
  const [title, setTitle] = useState<any>('Send Report');
  const [description, setDescription] = useState<any>('  Generating an EOD report will send the generated report to your email address.');
  const [showErrMsg, setShowErrMsg] = useState<any>(false);
  const options = [
    { name: "Merchant EOD", id: 0 },
    { name: "Branch EOD", id: 1 },
    { name: "Terminal EOD", id: 2 },
    { name: "Branch Performance", id: 3 },
    { name: "Terminal Performance", id: 4 },
  ];
  const [reportType, setReportType] = useState("Select Report Type");
  const [branch, setBranch] = useState("Select Branch");
  // const [date, setDate] = useState({endDate:'',startDate:''})

  const [state, setState] = useState<any>({
    branchId: "",
    type: "",
    isExport: true,
    giveMoreDetails: false,
    submittingError: false,
    isSubmitting: false,
    errorMssg: "",
    startDate: null,
    endDate: null,
  })

  const { type, isSubmitting, startDate, endDate, branchId }: any = state
  // const {endDate, startDate}= date

  useEffect(() => {
    if (reportType === options[0].name) setState((prevDate: any) => ({
      ...prevDate,
      type: 'MERCHANT',
    }))
    if (reportType === options[1].name) setState((prevDate: any) => ({
      ...prevDate,
      type: 'BRANCH',
    }))
    if (reportType === options[2].name) setState((prevDate: any) => ({
      ...prevDate,
      type: 'TERMINAL',
    }))

    if (reportType === 'Merchant EOD' || reportType === 'Branch EOD' || reportType === 'Terminal EOD') {
      setDescription('Generating an EOD report will send the generated report to your email address.');
      setTitle('Send Report');
    } else if (reportType === 'Branch Performance') {
      setDescription('Branch performance data require end and start dates!');
      setTitle('View Branch Performance');
    } else if (reportType === 'Terminal Performance') {
      setDescription('Terminal performance data require end and start dates!');
      setTitle('View Terminal Performance');
    }
  }, [reportType])
  // console.log(type,'the type of the report')


  const closeAlert = () => {
    setShowErrMsg(false);
  }
  const handleDateChange = (event: any) => {
    const { name, value } = event.target;
    setState((prevDate: any) => ({
      ...prevDate,
      [name]: value,
    }));
  };
  // console.log(startDate, endDate, 'the dates')

  function displayBranchList() {
    fetchBranchData(0, 1000).then((res) => {
      setBranchList(res.content)
    }).catch((err) => {
      console.error(err)
    })
  }

  function displayTerminalList() {
    fetchTerminalData(0, 1000).then((res) => {
      // const name=res.details.map((item:any) => item?.name)
      setTerminalList(res.details)
    }).catch((err) => {
      console.error(err)
    })
  }

  function getTerminalPerformance() {
    if (startDate !== null && endDate !== null) {
      terminalPerformance(startDate, endDate).then((res: any) => {
        //  console.log('get Terminal response>>>', res);
        navigate("/reports/performance/terminal", { state: JSON.stringify(res) });
      });
    } else {
      //display error msg
      setShowErrMsg(true);
      setTimeout(() => setShowErrMsg(false), 2000);
    }

  }

  function getBranchPerformance() {
    if (startDate !== null && endDate !== null) {
      branchPerformance(startDate, endDate).then((res: any) => {
         console.log('get Branch response>>>', res);
        navigate("/reports/performance/branch", { state: JSON.stringify(res) });
      })
    } else {
      //display error msg
      setShowErrMsg(true);
      setTimeout(() => setShowErrMsg(false), 2000);
    }

  }

  useEffect(() => {
    displayBranchList();
    displayTerminalList();
    // getTerminalPerformance();
  }, [])
  // const [name]:any=Array.isArray(branchList)
  // ? branchList.map((item) => item?.name)
  // : [];
  // console.log(branchList,terminalList, 'the branches from report')

  const handleSubmit = async () => {
    setState({
      ...state,
      isSubmitting: true
    });

    if (reportType === 'Merchant EOD' || reportType === 'Branch EOD' || reportType === 'Terminal EOD') {
      setDescription('Generating an EOD report will send the generated report to your email address.');
      setTitle('Send Report');

      fetchEODData(0, state?.branchId, type, state?.isExport, startDate, endDate, 0, 10).then((res) => {
        setState({
          ...state,
          isSubmitting: false
        })


      })
        .catch((err) => {
          if (err && err?.response?.data) {
            setState({
              ...state,
              submittingError: true,
              isSubmitting: false,
              errorMssg: err?.response?.data?.errorMssg || err?.response?.errorMssg || err?.response?.data?.respDescription || err?.response?.respDescription || "Action failed, please try again"
            })
          }
        }).then(() => {
          setIsLoading(false)
          const successDetails = { title: "Report successfully sent to your email ", text: "", icon: "" }
          successAlert(successDetails, { data: '', statusCode: '', message: '', errs: '' });
          setState({
            ...state,
            submittingError: true,
            isSubmitting: false,
            errorMssg: "",
            startDate: '',
            endDate: '',
          })
          setReportType('Select Report Type')
        })
    } else if (reportType === 'Branch Performance') {
      setDescription('Branch performance data require end and start dates!');
      setTitle('View Branch Performance');
      getBranchPerformance();
    } else if (reportType === 'Terminal Performance') {
      setDescription('Terminal performance data require end and start dates!');
      setTitle('View Terminal Performance');
      getTerminalPerformance();
    }


  }
  //console.log(startDate,'the date')
  useEffect(() => {
    const response = apiCall({
      name: "getCurrentLogin",
      action: (): any => (["skip"]),
      errorAction: (): any => (navigate("/"))
    })

    response.then(res => {
      setAuth(true)
    })

  })

  // console.log(id,'the merchantId')

  // if(authenticated)
  return (
    <DashboardLayout>
      <Toaster />
      <p className="mt-5 font-semibold">Report</p>
      <div className="mt-10 w-full md:w-[400px] bg-[#F9F9F9] rounded-sm p-[20px] gap-[20px] grid">
        <p className="text-[20px]">Generate Report</p>
        <CustomDropDown
          label="Report Type"
          options={options}
          value={reportType}
          setValue={setReportType}
        />
        {reportType === 'Branch EOD' && <CustomDropDown
          label="Select Branch"
          options={branchList}
          value={branch}
          setValue={setBranch}
          setId={setId}
        />}
        {reportType === 'Terminal EOD' && <CustomDropDown
          label="Select Terminal"
          options={terminalList}
          value={terminals}
          setValue={setTerminals}
        />}
        <DateInput label='Select Date' name='date' startname='startDate' endname='endDate' onChange={handleDateChange} startDate={startDate} endDate={endDate} />
        {
          showErrMsg &&
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5" role="alert">
            <span className="block sm:inline">{'Please Select Date intervals!'}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" >
              <svg onClick={closeAlert} className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
            </span>
          </div>
        }
        <Button title={title} onClick={handleSubmit} />
        <p className="font-[12px] italic">
          {/* {description} */}
          {
            reportType === 'Merchant EOD' || reportType === 'Branch EOD' || reportType === 'Terminal EOD' || reportType === 'Select Report Type' ?
              <>
                {description}
              </>
              :
              reportType === 'Branch Performance' || reportType === 'Terminal Performance' ?
                <div className="flex items-center p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800" role="alert">
                  <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">Warning alert!</span> {description}
                  </div>
                </div>
                :
                <></>
          }
        </p>

      </div>
    </DashboardLayout>
  );
  // else return (<div></div>)
};

export default Reports;
