import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../../components/dashboard/Index";
import Loading from "../../../components/Loading";
import { Button } from "../../../components/reusables/DefaultButton";
import { apiCall } from "../../../Utils/URLs/axios.index";

const Utilities = () => {
  const [isLoading, setisLoading] = useState(false);
  const [electricityPlans, setElectricityPlans] = useState<any>([]);
  const [electricityName, setElectricityName] = useState<any>([]);
  const [selectedBetting, setSelectedBetting] = useState("");
  const [id, setId] = useState(0);

  const navigate = useNavigate();
  const handleCheckboxChange = (value: any) => {
    setElectricityName(value);
    setId(value?.id || 0)
    setSelectedBetting(value?.billerName);
  };

  async function getelectricityPlans() {
    setisLoading(true);
    try {
      const response: any = await apiCall({
        name: "electricityPlans",
        action: (): any => {return ["skip"]},
      });
      setElectricityPlans(response);
    } catch (error) {
      console.error(error);
    } finally {
      setisLoading(false);
    }
  }

 // console.log(electricityPlans, "the electricity plans");
  //console.log(electricityName, "the value");

  useEffect(() => {
    getelectricityPlans();
  }, []);

  const handleSubmit = () => {
    // console.log(selectedBetting);
    navigate(`${id}`, { state: electricityName });
  };

  return (
    <DashboardLayout>
      {isLoading?(<Loading/>):
      <>
      <div className="flex gap-2 py-5  text-slate-400 border-b-[1px] items-center">
            <IoMdArrowBack className="hover:text-black hover:cursor-pointer " onClick={() => navigate(-1)}/>
            <p className="text-[15px]  ">
              <span
                className="hover:underline hover:cursor-pointer hover:text-black "
                onClick={() => navigate("/bills")}
              >
                Bills
              </span>{" "}
              / Utilities
            </p>
          </div>
      <p className="text-[20px] font-bold mt-5">Utility Bills</p>
      <div className="mt-5 rounded-md bg-[#F9F9F9] md:w-[400px] w-full p-[20px] grid gap-[20px]">
        {electricityPlans.map((val: any) => (
          <div className="flex gap-5 items-center  ">
            <label key={val.billerName} className="flex gap-5 items-center hover:cursor-pointer">
              <input
                type="radio"
                name={`${val.billerName}`}
                id={val.billerName}
                checked={selectedBetting === val.billerName}
                onChange={() => handleCheckboxChange(val)}
              />
              {val.iconUrl && <img src={val.iconUrl} alt="" />}
              <p className="text-[#636363] text-[12px]">{val.billerName}</p>
            </label>
          </div>
        ))}
        <Button title="Continue" onClick={handleSubmit} isDisabled={id===0?true:false}/>
      </div>
      
      </>
      }
    </DashboardLayout>
  );
};

export default Utilities;
