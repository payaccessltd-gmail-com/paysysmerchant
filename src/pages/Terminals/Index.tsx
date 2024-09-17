import DashboardLayout from '../../components/dashboard/Index'
import { Button } from '../../components/reusables/DefaultButton'
import exportToExcel from '../../Utils/ExportExcel';
import {BsArrowUpRight} from 'react-icons/bs'
import {AiOutlineSearch} from 'react-icons/ai'
import { TableData } from './components/MockData';
import TerminalTable from './components/TerminalTable';
import { useEffect, useState } from 'react';
import TerminalRequest from './components/TerminalRequest';
import SearchInput from '../../components/reusables/SearchInput/SearchInput';
import { fetchTerminalData } from '../../containers/terminalApis';

const Terminals = () => {
  const [pageNo, setPageNo] = useState<any>(0)
    const [pageSize, setPageSize] = useState<any>(10)
    const [terminalData, setTerminalData] = useState([])
    const [content, setcontent] = useState([])
    const [isLoading, setisLoading] = useState(false)

    const [state, setState] = useState<any>({
        search: "",
        role: "",
        status: "",
        submittingError: false,
        isExport: false,
        errorMssg:''
    })
    const { search, role, status, isExport } = state

  const [terminalModal, setTerminalModal] = useState(false)
  const handleExport = () => {
    exportToExcel(content, "List of Terminals");
  };
 async function toggleTerminalRequestModal() {
  await setTerminalModal(!terminalModal)
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
    // setSearched(e.target.value)
    setState({
        ...state,
        [e.target.name]: e.target.value,
        submittingError: false
    });
}

//console.log(search,'from search')

  useEffect(() => {
    setisLoading(true)

    fetchTerminalData(pageNo, pageSize, search, status, isExport).then((res)=>{
     // console.log(res,'the terminal data')
      setTerminalData(res)
      setcontent(res.details)
    }).catch((err)=>{
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
      // setRefresh(false)
    })
  }, [search,pageNo,status,pageSize])
  const {details}:any=terminalData
  return (
    <DashboardLayout >
    <div className="flex justify-between items-center">
    <p className="grid gap-[20px] text-[16px] font-sfpro-medium mt-[20px]">
        Terminals
      </p>
      <div className="w-fit">

      <Button title='Terminal Request' onClick={toggleTerminalRequestModal}/>
      </div>
    </div>
    <div className="flex justify-between w-full mt-[20px]">
      <SearchInput placeholder='Search' name='search' value={search} onChange={handleChange}/>
      
    {content.length >0&&
          <div className="w-fit ">
          <Button onClick={handleExport} title='Export' className='!bg-white !mt-0 !text-[#3C4257] !border-[1px] shadow-sm m-auto' icon={<BsArrowUpRight  className="font-bold"/>}/>
          </div>
        
        }
    </div>
    <TerminalTable data={content} isLoading={isLoading} terminalData={terminalData}/>
    <TerminalRequest toggleDropdown={toggleTerminalRequestModal} isOpen={terminalModal}/>
    </DashboardLayout>
  )
}

export default Terminals