import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import OpenInvoice from "./OpenInvoice";
import StandardInvoice from "./StandardInvoice";

const RequestPayment = () => {
  const navigate = useNavigate();
  const [isOpen, setisOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<any>(0);

  const handleOptionChange = (index: number) => {
    setSelectedOption(index);
  };
  function toggleModal() {
    setisOpen(!isOpen);
  }

  return (
    <div className="px-[9%] py-[6%]">
      <div
        className="flex gap-2 items-center text-[14px] cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <IoIosArrowBack />
        Back
      </div>

      <div className="grid gap-[8px] mt-[38px] mb-[50px]">
        <p className="font-bold text-[20px]">Create an Invoice</p>
        <p className="text-[16px]">
          Receive payments from your clients using our invoice.
        </p>
      </div>

      <div className="m-auto rounded-2xl w-full md:w-3/4 border-[1px] ">
        <div className=" bg-[#177196] w-full py-[20px] pb-[35px] rounded-t-2xl text-white text-center">
          <p className="text-[16px]">
            What kind of invoice will you like to create
          </p>

          <div className="flex gap-[15%] m-auto justify-center mt-[32px] text-left px-[20px]">
            <div className="lg:w-1/4 flex h-fit gap-2">
              <input
                type="radio"
                name="invoiceType"
                value="simple"
                checked={selectedOption === 0}
                onChange={() => handleOptionChange(0)}
                className="hidden"
              />
              <div
                className={`relative flex items-center cursor-pointer w-[22px] h-[22px] p-2 rounded-full border-[1px] bg-white ${
                  selectedOption === 0 && "border-primary !bg-primary"
                }`}
                onClick={() => handleOptionChange(0)}
              >
                <div
                  className={`absolute grid justify-center items-center inset-0 ${
                    selectedOption === 0 ? "visible" : "invisible"
                  }`}
                >
                  <FaCheck className="text-white text-[15px] m-auto" />
                </div>
              </div>

              <div className="grid gap-1">
                <p className="text-[14px] font-semibold">
                  Simple / Open invoice
                </p>
                <p className="">
                  Set amount, descriptions and get payment form customer
                </p>
              </div>
            </div>
            <div className="lg:w-1/4 flex h-fit gap-2">
              <input
                type="radio"
                name="invoiceType"
                value="standard"
                checked={selectedOption === 1}
                onChange={() => handleOptionChange(1)}
                className="hidden"
              />
              <div
                className={`relative flex items-center cursor-pointer w-[22px] h-[22px] p-2 rounded-full border-[1px] bg-white ${
                  selectedOption === 1 && "border-primary !bg-primary"
                }`}
                onClick={() => handleOptionChange(1)}
              >
                <div
                  className={`absolute grid justify-center items-center inset-0 ${
                    selectedOption === 1 ? "visible" : "invisible"
                  }`}
                >
                  <FaCheck className="text-white text-[15px] m-auto" />
                </div>
              </div>

              <div className="grid gap-1">
                <p className="text-[14px] font-semibold">Standard invoice</p>
                <p className="">
                  Set Item quantity, tax etc and invoice a customer PDF , and
                  transfer link.
                </p>
              </div>
            </div>
          </div>
        </div>

       {selectedOption===0?<OpenInvoice/>:<StandardInvoice/>}
      </div>
     
    </div>
  );
};

export default RequestPayment;
