import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../../components/dashboard/Index";
import Loading from "../../../components/Loading";
import { Button } from "../../../components/reusables/DefaultButton";
import { apiCall } from "../../../Utils/URLs/axios.index";

const Betting = () => {
  const navigate = useNavigate();
  const [bettingName, setBettingName] = useState<any>([]);
  const [bettingOption, setBettingOption] = useState<any>([]);
  const [bettingPlans, setbettingPlans] = useState<any>([]);
  const [selectedBetting, setSelectedBetting] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [id, setId] = useState("");

  const handleCheckboxChange = (value: string) => {
    setSelectedBetting(value);
  };

  const handleSubmit = () => {
  //  console.log(selectedBetting);
    navigate(`${id}`, { state: bettingOption });
  };
  async function getBettingPlans() {
    setisLoading(true);
    try {
      const response: any = await apiCall({
        name: "bettingPlans",
        action: (): any => {return ["skip"]},
      });
      const res = response ? response?.map((val: any) => val.billerName) : [];
      setBettingName(res);
      setbettingPlans(response);
    } catch (error) {
      console.error(error);
    } finally {
      setisLoading(false);
    }
  }

  useEffect(() => {
    getBettingPlans();
  }, []);

  useEffect(() => {
    if (bettingPlans.length > 0) {
      const betting = bettingPlans.find(
        (bank: any) => selectedBetting === bank?.billerName
      );

      if (betting) {
       // console.log(betting, "the betting");
        setBettingOption(betting.options);

        if (betting.options.length > 0) {
          const [option] = betting.options;
          const { id } = option;
          setId(id);
        }
      }
    }
  }, [selectedBetting]);

  return (
    <DashboardLayout>
      {isLoading ? (
        <Loading />
      ) : (
        <>
        <div className="flex gap-2 py-5 items-center text-slate-400 border-b-[1px]">
            <IoMdArrowBack className="hover:text-black hover:cursor-pointer " onClick={() => navigate(-1)}/>
            <p className="text-[15px]  ">
              <span
                className="hover:underline hover:cursor-pointer hover:text-black"
                onClick={() => navigate("/bills")}
              >
                Bills /
              </span>{" "}
              Betting bills
            </p>
          </div>
          
          <p className="text-[20px] font-bold mt-5">Betting</p>
          <div className="mt-5 rounded-md bg-[#F9F9F9] md:w-[400px] w-full p-[20px] grid gap-[20px]">
            {bettingName.map((val: any) => (
              <div className="flex gap-5 items-center">
                <label key={val} className="flex gap-5 items-center hover:cursor-pointer">
                  <input
                    type="radio"
                    name={`${val}`}
                    id={val}
                    checked={selectedBetting === val}
                    onChange={() => handleCheckboxChange(val)}
                  />
                  <p className="text-[#636363] text-[12px]">{val}</p>
                </label>
              </div>
            ))}
            <Button title="Continue" onClick={handleSubmit} />
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default Betting;
