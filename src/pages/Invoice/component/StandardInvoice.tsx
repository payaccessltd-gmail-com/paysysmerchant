
import { useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import DefaultInput from "../../../components/reusables/DefaultInput";
import { Button } from "../../../components/reusables/DefaultButton";
import DefaultTextArea from "../../../components/reusables/DefaultTextArea";

const StandardInvoice = () => {
  const navigate = useNavigate();
  const [additionalEmails, setAdditionalEmails] = useState(0);

  const handleAddMore = () => {
    setAdditionalEmails((prev:any) => prev + 1);
  };
  const handleCancel = () => {
    setAdditionalEmails((prev) => prev - 1);
  };


  return (
    <div className="py-[30px] px-[5%] md:px-[15%] grid gap-[20px] bg-[#f7fdff]">
      <DefaultInput label="Customer Name" placeHolder="Enter customer name" />
      <div className="grid ">
        <div className="grid gap-[20px]">
      {[...Array(additionalEmails)].map((_, index) => (
        <DefaultInput
          label="Customer Email"
          placeHolder="Enter customer Email address"
        />


      ))}

        </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center text-secondary text-[16px] gap-2 cursor-pointer" onClick={handleAddMore}>
          <GoPlus />
          <p>Add additional email address</p>
        </div>
{/* Render cancel button for additional inputs */}
{additionalEmails > 1 && (
            <button onClick={handleCancel}>
              <RxCross2 />
            </button>
          )}
      </div>
      </div>

      <div className="grid lg:grid-cols-[2fr_1fr_2fr] gap-[10px]">
        <DefaultInput
          label="Invoice item"
          placeHolder="Product or service name"
        />
        <DefaultInput label="Qty" placeHolder="0" type="number" />
        <DefaultInput label="Cost per unit" placeHolder="0.00" />
      </div>
      <div className="grid lg:grid-cols-[2fr_1fr_2fr] gap-[10px]">
        <DefaultInput
          label="Invoice item"
          placeHolder="Product or service name"
        />
        <DefaultInput label="Qty" placeHolder="0" type="number" />
        <DefaultInput label="Cost per unit" placeHolder="0.00" />
      </div>
      <DefaultInput label="Due Date" placeHolder="27th may 2023" />
      <DefaultInput label="Amount (optional)" placeHolder="0.00" />
      <DefaultTextArea
        label="Invoice note (optional)"
        placeHolder="Say something about the invoice" name={""} value={""} handleChange={undefined} id={""}      />

      <DefaultInput label="Tax payment(%)" placeHolder="0.00" />
      <div className="grid gap-[10px] md:grid-cols-[1fr_1fr] items-end">
        <DefaultInput label="Discount " placeHolder="Percentage " />
        <DefaultInput placeHolder="0.00" type="number" />
      </div>
      <DefaultInput label="Shipping fee (optional)" placeHolder="0.00" />

      <div className="flex justify-between items-center font-bold text-[16px]">
        <p className=" text-[#07222D]">Subtotal</p>
        <p className="text-[#666666] ">00.000</p>
      </div>

      <div className="flex justify-between items-center font-bold text-[16px]">
        <p className=" text-[#07222D]">Grand Total</p>
        <p className="text-[#666666] ">00.000</p>
      </div>

      <div className="m-auto w-3/4">
        <Button title="Preview " onClick={() => navigate("preview")} />
        <Button title="Save as Draft" />
      </div>
    </div>
  );
};

export default StandardInvoice;
