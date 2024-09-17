import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../../components/dashboard/Index";
import Loading from "../../../components/Loading";
import { Button } from "../../../components/reusables/DefaultButton";
import { apiCall } from "../../../Utils/URLs/axios.index";

const Cable = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [cablePlans, setCablePlans] = useState<any>([]);
  const [cableName, setCableName] = useState<any>([]);
  const [selectedBetting, setSelectedBetting] = useState("");
  const [id, setId] = useState(0);

  async function getCablePlans() {
    setisLoading(true);
    try {
      const response: any = await apiCall({
        name: "cableTvPlans",
        action: (): any => {return ["skip"]},
      });
      setCablePlans(response);
    } catch (error) {
      console.error(error);
    } finally {
      setisLoading(false);
    }
  }
 // console.log(cablePlans, "the cable plans");
  useEffect(() => {
    getCablePlans();
  }, []);

  const handleCheckboxChange = (value: any) => {
    setCableName(value);
    setId(value?.id || 0);
    setSelectedBetting(value?.billerName);
  };
 // console.log(cableName, "the cable name of the product");
  const handleSubmit = () => {
    navigate(`${id}`, { state: cableName });
  };

  return (
    <DashboardLayout>
      {isLoading ? (
        <Loading />
      ) : (
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
              / Cable bills
            </p>
          </div>
          <p className="text-[20px] font-bold mt-5">Cable Bills</p>
          <div className="mt-5 rounded-md bg-[#F9F9F9] md:w-[400px] w-full p-[20px] grid gap-[20px]">
            {cablePlans.map((val: any) => (
              <div className="flex gap-5 items-center">
                <label
                  key={val.billerName}
                  className="flex gap-5 items-center hover:cursor-pointer"
                >
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
            <Button
              title="Continue"
              onClick={handleSubmit}
              isDisabled={id === 0 ? true : false}
            />
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default Cable;
