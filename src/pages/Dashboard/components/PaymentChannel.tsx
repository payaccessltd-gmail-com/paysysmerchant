import { useEffect, useState } from "react"
import CustomDropDown from "../../../components/reusables/dropdowns/CustomDropDown"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { fetchMerchantDashboardStats } from "../../../containers/dashboardApis";

ChartJS.register(ArcElement, Tooltip, Legend);

const PaymentChannel = () => {
  const [transactionObj, setTransactionObj] = useState<any>({});
  const [state, setState] = useState<any>({
      search: "",
      tranType: null,
      collectionType: null,
      role: null,
      status: null,
      value: {},
      pageSize: 0,
      pageNo: 0,
      submittingError: false,
      isExport: false,
      date: {
          // startDate: value.startDate || null,
          // endDate: value.endDate || null
      }
  });
  const {search, tranType, status, date, isExport,
    value, 
    pageSize,
     pageNo
   }:any = state;

   // const { transactionVolumeTransfer, totalTransactionsToday, transactionVolumeCard, transactionVolumeCash } = data?.transactionVolume || {};
   
    function fetchMerchantStats(){
      fetchMerchantDashboardStats(pageNo, pageSize, search, tranType, isExport, date?.startDate, date?.endDate, status)
      .then(res => {
        //  console.log("res dashboard data>>", res?.transactionVolume);
          setTransactionObj(res?.transactionVolume);
      }).catch((err: any) => {
        console.error("error from dashboard piechart>>>", err);
      }).finally(() => {
          console.info("Fetch Merchant's Dashboard Stats!")
  })
  }
  
  
      useEffect(() => {
          fetchMerchantStats();
      },[]);

    const [transaction, setTransaction] = useState('Last 7 days');
    const options=['Last 7 days','1 week', '2 weeks', '3 weeks'];
    
    const data = {
      // ['Card', 'Transfer', 'Cash']
        labels: [
          'Card', 'Transfer', 'Cash'
          // `Card: ${transactionObj?.transactionVolumeCard}`, 
          // `Transfer: ${transactionObj?.transactionVolumeTransfer}`, 
          // `Cash: ${transactionObj?.transactionVolumeCash}`
        ],
        datasets: [
          {
            label: 'Totals',
            data: [
              transactionObj?.transactionVolumeCard, 
              transactionObj?.transactionVolumeTransfer, 
              transactionObj?.transactionVolumeCash
            ],
            backgroundColor: [
              'rgba(245, 128, 31, 1)',
              'rgba(91, 198, 242, 1)',
              '#E3ECFF'
            ],
            borderColor: [
              'rgba(245, 128, 31, 1)',
              'rgba(91, 198, 242, 1)',
              '#E3ECFF'
            ],
            borderWidth: 1,
          },
          
        ],
        plugins: {
            legend: {
              position: 'left',
              rtl : true,
              labels: {
                usePointStyle: true,
                pointStyle: 'circle',
                padding: 20,
              }
            }}
      };

      const optionss = {
        plugins: {
          legend: {
            position: 'left',
            rtl : true,
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 20,
            }
          }
        },
    }
    
  return (
    <div className="rounded-lg bg-[#F9F9F9] py-[12px] px-[20px] h-full">
<div className="grid md:grid-cols-2 items-center justify-between">
    <p className="text-[16px] font-bold">Payment Channel</p>
    <CustomDropDown label='' placeHolder="Last 7 days" onHandleChange={()=>{}} value={transaction} options={options} setValue={setTransaction} />
</div>
<div className="grid w-[200px] items-center gap-[20px] justify-center m-auto">
<Doughnut data={data}  />

</div>
    </div>
  )
}

export default PaymentChannel