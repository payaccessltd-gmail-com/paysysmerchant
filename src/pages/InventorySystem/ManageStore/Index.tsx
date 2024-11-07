
import { useEffect, useState } from "react";
import InventoryDashboardLayout from "../../../components/inventory/layout/Index";
import Loading from "../../../components/Loading";
import Cards from "../../../components/inventory/components/cards";


const InventoryManageStore = () => {
  const [loading, setLoading] = useState(true);
 
  return (
    <InventoryDashboardLayout>
      <div className="grid bg-[#fff]  gap-[20px] pl-[40px] pr-[80px] py-[20px]">  
        <Cards/>
        <Cards/>
        <Cards/>
        </div>
    </InventoryDashboardLayout>
  );
};



export default InventoryManageStore;
