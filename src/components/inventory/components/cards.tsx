import { Image } from '../../../assets'


const Cards = () => {
  const details = [
    {
      icon: Image.downloadFile,
      amount: "₦",
      title: 'text prop',
      header: 'text prop',
    },
    {
      icon: Image.downloadFile,
      amount: "₦",
      title: 'text prop',
      header: 'text prop',
    },
    {
      icon: Image.downloadFile,
      amount: "₦",
      title: 'text prop',
      header: 'text prop',
    },
    {
      icon: Image.downloadFile,
      amount: "₦",
      title: 'text prop',
      header: 'text prop',
    },
    {
      icon: Image.downloadFile,
      cardName: "Card Name",
      amount: "₦",
      title: 'text prop',
      header: 'text prop',
    },
  ]
  return (
    <div className={`grid border rounded-lg  ${details.length === 5 ? 'lg:grid-cols-1 md:grid-cols-2' : 'lg:grid-cols-4 md:grid-cols-2'}  bg-[#fff] p-[20px] `}>
      <p className="text-[#383E49] text-[20px] font-medium">Card Title</p>
      <div className={`grid ${details.length === 5 ? 'lg:grid-cols-5 md:grid-cols-2' : 'lg:grid-cols-4 md:grid-cols-2'}  bg-[#fff] py-[20px] gap-[10px]`}>
       {details.map((val, index) => (
      <div key={index} className={`${index === 1 && ' border-r-[#F0F1F3]'} border-r-[1px] md:border-b-0 flex items-center justify-center gap-[10px] px-[10px] py-[10px]  bg-[#fff] w-full`}>
        {/* lg:border-r-[1px]  is the white border line at LHS of border-r-white*/}
       
        <div className="grid items-center justify-center text-right md:text-left">
        <p className="text-black text-[10px] font-medium">{val.header}</p>
        <img src={val?.icon} alt="" height={25} width={25} className="text-secondary"/>
          <p className='text-[20px] text-black text-sm font-medium'>{val.amount}</p>
          <p className="text-black text-[10px] font-medium">{val.title}</p>
        </div>
      </div>
    ))}
       </div>
    </div>
  
   

  );
};
export default Cards;
