
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

 const options = {
  plugins: {
    title: {
      display: true,
      text: '',
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ['Mon','Tue','Wed','Thurs','Fri','Sat','Sun'];

 


const Graph = ({data}:any) => {
  const {currentWeekCardGraphData,currentWeekCashGraphData,currentWeekTransferGraphData

  }=data
const card: number[] = Array.isArray(currentWeekCardGraphData?.axis)
? currentWeekCardGraphData.axis.map((item:any) => item.total)
: []
const CashGraph=Array.isArray(currentWeekCardGraphData?.axis)
? currentWeekCashGraphData?.axis.map((item:any) => item.total) :[]
const TransferGraph=Array.isArray(currentWeekCardGraphData?.axis)
? currentWeekTransferGraphData?.axis.map((item:any) => item.total) :[]

// console.log(TransferGraph,'transfer')
// console.log(card,'cardr')
// console.log(CashGraph,'CashGraph')

const graphdata = {
  labels,
  datasets: [
    {
      label: 'Card',
      data: labels.map((label,index) => card[index]),
      backgroundColor: 'rgba(125, 124, 246, 1)',
    },
    {
      label: 'Transfer',
      data: labels.map((label,index) => TransferGraph[index]),
      backgroundColor: 'rgba(91, 198, 242, 1)',
    },
    {
      label: 'Cash',
      data: labels.map((label,index) => CashGraph[index]),
      backgroundColor: 'rgba(100, 164, 254, 1)',
    },
  ],
};

  return (
    <div className="overflow-x-auto w-full" >
        <Bar options={options} data={graphdata} />
<p className='text-white'> from the dashboard</p>
    </div>
  )
}

export default Graph