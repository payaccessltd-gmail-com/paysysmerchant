import React, { useEffect, useState } from 'react'
import { Image } from '../../../assets'
import { getBalance, getPreviousDayCollection } from '../../../containers/dashboardApis'
import CurrencyFormat from 'react-currency-format';

const AccountDetails = ({ data,todayCollection }: any) => {
  const { thisWeekGraphData, lastWeekGraphData, currentWeekCardGraphData, totalCollectionAmount, currentWeekTransferGraphData, currentWeekCollectionsGraphData, currentWeekCashGraphData, totalTransactionAmount, walletBalance, branchStats, terminalStats } = data || {}
const {todayCollection:todayCollect} =todayCollection ?? {}

  // console.log(totalCollectionAmount
  // ,'coming from the dashboard')
  //state values
  const [trans, setTrans] = useState(true)
  const [wallets, setWallets] = useState(false)
  // const [cardType, setCardType] = useState(false)
  // const [transferType, setTransferType] = useState(false)
  // const [cashType, setCashType] = useState(false)
  // const [typeChecker, setTypeChecker] = useState(false)
  const [displayAmount, setDisplayAmount] = useState(0);
  const [yesterdayCollection, setYesterdayCollection] = useState<any>(0);
  const [todaysCollection, setTodaysCollection] = useState<any>(0);
  
  async function balance() {
    try {
      const res=await getBalance() 
      setDisplayAmount(res.balance || 0)
    } catch (error:any) {
      console.log(error)
    }
  }
  useEffect(() => {
    balance()
  }, [wallets, trans, walletBalance, totalTransactionAmount]);

  useEffect(() => {
    getPreviousDayCollection().then((res:any) => {
     // console.log('response>>>', res?.yesterdaysCollection);
      setYesterdayCollection(res?.yesterdaysCollection);
    }).catch((err:any) => {
      console.error("err from yesterdays collection>>>", err);
    })
  },[yesterdayCollection])

  const { totalBranches } = branchStats || {}
  const { totalTerminals } = terminalStats || {}

  const details = [
    {
      amount: <CurrencyFormat
        value={displayAmount || 0}
        displayType={'text'}
        thousandSeparator={true}
        prefix={"₦"}
      />,
      title: 'Your Account Balance',
      image: Image.icon1
    },
    {
      amount: <CurrencyFormat
        value={ yesterdayCollection || 0} //totalCollectionAmount
        displayType={'text'}
        thousandSeparator={true}
        prefix={"₦"}
      />,
      title: 'Previous Day Collection',   //Total collection Balance
      image: Image.icon2
    },
    {
      amount: <CurrencyFormat
        value={ todayCollect || 0} //totalCollectionAmount
        displayType={'text'}
        thousandSeparator={true}
        prefix={"₦"}
      />,
      title: "Today's Collection",   //Total collection Balance
      image: Image.icon5
    },
    {
      amount: totalBranches || 0, title: 'Branches',
      image: Image.icon3
    },
    {
      amount: totalTerminals || 0, title: 'Terminals',
      image: Image.icon4
    },
  ]
  return (
    <div className={`grid ${details.length === 5 ? 'lg:grid-cols-5 md:grid-cols-2' : 'lg:grid-cols-4 md:grid-cols-2'} rounded-lg bg-primary p-[20px] gap-[20px]`}>
    {details.map((val, index) => (
      <div key={index} className={`${index === 1 && ' border-r-white'} border-b-[1px] md:border-b-0 flex gap-[20px] px-[20px] pb-[10px] md:items-center md:justify-center justify-between ml-5`}>
        {/* lg:border-r-[1px]  is the white border line at LHS of border-r-white*/}
        <img src={val?.image} alt="" height={25} width={25}/>
        <div className="grid text-right md:text-center">
          <p className='text-[20px] text-white text-sm font-medium'>{val.amount}</p>
          <p className="text-[#F0BE0D] text-[12px] font-medium">{val.title}</p>
        </div>
      </div>
    ))}
  </div>
  )

  {/* <div className='grid lg:grid-cols-4 md:grid-cols-2 rounded-lg bg-primary p-[20px] gap-[20px]'>
{details.map((val, index) => (
  <div key={index} className={`${index === 1 && 'lg:border-r-[1px]   border-r-white'} border-b-[1px] md:border-b-0 flex gap-[20px] px-[20px] pb-[10px] md:items-center md:justify-center  justify-between ml-5`}>
    <img src={val?.image} alt="" height={25} width={25}/>
    <div className="grid text-right md:text-center">
      <p className='text-[20px] text-white text-sm font-medium'>{val.amount}</p>
      <p className="text-[#F0BE0D] text-[12px] font-medium">{val.title}</p>
    </div>
  </div>

))}
</div> */}
}

export default AccountDetails

