import React, { useState } from "react";
import { Button } from "../../../components/reusables/DefaultButton";
import DefaultInput from "../../../components/reusables/DefaultInput";
import Overlay from "../../../components/reusables/Overlay/Overlay";
import { apiCall } from "../../../Utils/URLs/axios.index";
import  { Toaster } from "react-hot-toast";
import { ErrorCard } from "../../../Utils/HttpResponseHandlers/error";

const DeactivateBranch = ({ toggleDropdown, isOpen, delId, delName ,setRefresh}: any) => {
  const [state, setState] = useState<any>({
    description: "",
    password: "",
    submittingError: false,
    isSubmitting: false,
    errorMssg: "",
  });
  const { description, password, submittingError, errorMssg, isSubmitting } =
    state;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      submittingError: false,
    });
  };

  async function handleSubmit() {
    setRefresh(false)
    setState((state: any) => ({
        ...state,
        isSubmitting: true
    }))
    try {
        const response = await apiCall({
            name: "deactivateBranch",
            urlExtra: `/${delId}`,
            data: {
                description,
                password
            },
            action: (): any => {
                setState({
                    ...state,
                    isSubmitting: false,
                    submittingError: false,
                })
                // location.reload();
                return []
            },
            successDetails: { title: "Successful!", text: "Branch deactivated successfully", icon: "" },
            errorAction: (err?: any) => {
                if (err && err?.response?.data) {
                    setState({
                        ...state,
                        submittingError: true,
                        isSubmitting: false,
                        errorMssg: err?.response?.data || "Action failed, please try again"
                    })
                    return ["skip"]
                } else {
                    setState({
                        ...state,
                        submittingError: true,
                        isSubmitting: false,
                        errorMssg: "Action failed, please try again"
                    })
                }
            }
        })
            .then(async (res: any) => {
                setRefresh(true)
                setState({
                    description: "",
                    password: "",
                    submittingError: false,
                    isSubmitting: false,
                    errorMssg: ""
                })
                setTimeout(() => {
                    // Your code to close the dropdown
                  toggleDropdown()
                  }, 3000);
            })
    } catch (e) {
        console.error(e + " 'Caught Error.'");
    };
  }
  return (
    <Overlay toggleDropdown={toggleDropdown} isOpen={isOpen}>
      <Toaster/>

      <div className="md:w-[400px]">
      <ErrorCard handleClear={() => setState({ ...state, submittingError: false })} error={errorMssg} containerVariant={!submittingError ? "hidden" : ""} />
        <p className=" text-2xl font-700 ">Deactivate this Branch</p>
        <p className=" text-gray-400  text-base font-300 leading-7 mt-3">
          {`Are you sure you want to deactivate “${delName}” 
                            The Branch will be Inactive and will not be able to perform 
                            transactions while deactivated, do you still want to continue?`}
        </p>
        <div className="mt-5 grid gap-[20px]">
          {/* fake fields are a workaround for chrome autofill getting the wrong fields */}
          <input
            style={{ display: "none" }}
            type="text"
            name="fakeusernameremembered"
          />
          <input
            style={{ display: "none" }}
            type="password"
            name="fakepasswordremembered"
          />
          <DefaultInput
            type="text"
            name="description"
            value={description}
            label={"Enter Description"}
            topLabel={"Description"}
            handleChange={handleChange}
            placeholder="Enter Description"
          />

          <DefaultInput
            type="password"
            name="password"
            value={password}
            label={"Enter Password"}
            topLabel={"Password"}
            handleChange={handleChange}
            placeholder="Enter Password"
          />

          <Button
            title="Deactivate Branch"
            className={"!bg-red-500"}
            // isDisabled={allowSubmit}
            isLoading={isSubmitting}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </Overlay>
  );
};

export default DeactivateBranch;
