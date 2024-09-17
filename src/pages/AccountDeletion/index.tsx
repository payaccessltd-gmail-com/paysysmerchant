import { Checkbox } from "@material-ui/core";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Image } from "../../assets";
import { Button } from "../../components/reusables/DefaultButton";
import DefaultInput from "../../components/reusables/DefaultInput";
import { deleteAccountApi } from "../../containers/userApis";
import successAlert from "../../Utils/HttpResponseHandlers/success";
import PolicyModal from "./PolicyModal";

const DeleteAccount = () => {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    accountNo: "",
    reason: "",
    otherReason: "",
  });
  const { firstName, lastName, email, number, accountNo, reason, otherReason } =
    state;
  const options = [
    "Account no longer needed",
    "Dissatisfied with services",
    "Difficulty accessing services",
    "Relocating to a different area",
    "Found a better financial alternative.",
    "Others",
  ];
  const [policy, setpolicy] = useState(false);
  const [checked, setchecked] = useState(false);
  function togglepolicy() {
    setpolicy(!policy);
  }
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setState({
      ...state,
      [e.target.name?.trim()]: e.target.value,
      // submittingError: false,
    });
  };
  async function handleSubmit() {
    setisLoading(true)
            try {
                const res= await deleteAccountApi(firstName,lastName,email)
                successAlert(
                    {
                      title: "success",
                      text: "Thank you for your request. Your account closure process has begun, and you will receive a confirmation email shortly. For any inquiries, please contact our customer support.",
                      icon: "",
                    },
                    { data: "", errs: "", message: "", statusCode: "" }
                  )   

            } catch (error:any) {
                console.log(error)
            } finally {
                setisLoading(false)
setState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    accountNo: "",
    reason: "Choose your reason",
    otherReason: ""
})
            }
            
  }
  const [isLoading, setisLoading] = useState(false)
  return (
    <div className="grid gap-[20px] py-[10%] lg:py-[5%] px-[10%] ">
      <Toaster />
      <p className="font-bold text-[30px] text-center md:text-left">
        <img src={Image.logo} alt="Logo" />
        Build Microfinance Bank Account Closure Request Form
      </p>
      <p className=" lg:w-1/2 md:w-3/4 text-gray-500">
        Fill in all required information on this form. Once completed, click the "Submit" button at the bottom of this page. A representative may
        contact you for additional verification. Once confirmed, your account
        will be scheduled for deletion.
      </p>

      <div className="grid  gap-3 lg:w-1/2 md:w-3/4">
        <DefaultInput
          label="First Name"
          placeHolder="Enter your First name"
          handleChange={handleChange}
          name='firstName'
          value={firstName}
        />
        <DefaultInput
          label="Last Name"
          placeHolder="Enter your Last name"
          handleChange={handleChange}
          name='lastName'
          value={lastName}
        />
        <DefaultInput
          label="Email"
          placeHolder="Enter your email"
          handleChange={handleChange}
          name='email'
          value={email}
        />
        <DefaultInput
          label="Account Number"
          placeHolder="Enter your account number"
          handleChange={handleChange}
          value={accountNo}
          name='accountNo'
        />
        <DefaultInput
          label="Phone Number"
          placeHolder="Enter your Phone Number"
          handleChange={handleChange}
          value={number}
          name='number'
        />
        <div className="grid gap-2 mt-5 text-left h-fit">
          <label>Select reason for account closure</label>
          <select
            name="reason"
            onChange={handleChange}
            className="placeholder:text-gray-450 placeholder:text-sm placeholder:min-w-max leading-6 text-base font-400 border px-6 py-5 rounded-lg"
          >
            <>
              <option className="text-gray-200 text-xs min-w-max w-full">
                Choose your reason
              </option>

              {options?.map((each: any, i: any) => {
                return (
                  <option value={each} key={i}>
                    {each || ""}
                  </option>
                );
              })}
            </>
          </select>
        </div>

        {reason === "Others" && (
          <DefaultInput
            label="Other reasons"
            placeHolder="Enter your reason"
            name="otherReason"
            handleChange={handleChange}
            value={otherReason}
          />
        )}

        <p className="text-[12px] text-gray-400">
          Please read the{" "}
          <span
            className="underline cursor-pointer text-blue-300"
            onClick={togglepolicy}
          >
            Data Deletion and Retention
          </span>{" "}
          Policy
        </p>
        <div className="flex gap-2 ">
          <Checkbox
            checked={checked}
            onChange={() => setchecked(!checked)}
            className="h-fit "
          />
          <p className="text-[13px]">
            {" "}
            I confirm that I wish to close my account and request the deletion
            of my personal data as described above. I understand that certain
            data may be retained as required by law.
          </p>
        </div>
        <Button
          title="Submit"
          isLoading={isLoading}
          onClick={handleSubmit
          }
          isDisabled={
            !checked ||
            number === "" ||
            accountNo === "" ||
            email === "" ||
            lastName === "" ||
            firstName === ""|| reason===''
          }
        />
      </div>
      <PolicyModal toggleDropdown={togglepolicy} isOpen={policy} />
    </div>
  );
};

export default DeleteAccount;
