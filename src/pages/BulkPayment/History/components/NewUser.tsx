import React, { useEffect, useState } from "react";
import { Button } from "../../../../components/reusables/DefaultButton";
import DefaultInput from "../../../../components/reusables/DefaultInput";
import CustomDropDown from "../../../../components/reusables/dropdowns/CustomDropDown";
import Overlay from "../../../../components/reusables/Overlay/Overlay";
import { fetchBranchData } from "../../../../containers/branchesApis";
import { createMerchantAdmin, fetchRoles } from "../../../../containers/userApis";
import { Storage } from "../../../../Utils/Stores/inAppStorage";
import { apiCall } from "../../../../Utils/URLs/axios.index";
import { Toaster } from "react-hot-toast";
import successAlert from '../../../../Utils/HttpResponseHandlers/success'
import { ErrorCard } from "../../../../Utils/HttpResponseHandlers/error";


const NewUser = ({ toggleDropdown, isOpen,setRefresh }: any) => {
  const [branchList, setBranchList] = useState([]);
  const [branchId, setBranchId] = useState(0);
  const [branch, setbranch] = useState("Select Branch");
  const [role, setRole] = useState("Select Role");
  const [roleOptions, setRoleOptions] = useState([]);
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const { id } = Storage.getItem("merchantDetails") || {};
  const [disableBtn, setdisableBtn] = useState<any>(true);
  const [loading, setLoading] = useState<any>(false);

  const [state, setState] = useState<any>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    roleId: "",
    branchId: "",
    submittingError: false,
    isSubmitting: false,
    errorMssg: "",
  });
  const {
    firstName,
    lastName,
    email,
    password,
    roleId,
    submittingError,
    errorMssg,
    isSubmitting,
  } = state;
  function displayBranchList() {
    fetchBranchData(0, 1000)
      .then((res) => {
        setBranchList(res.content);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async function fetchRolesQuery() {
    try {
      const res = await fetchRoles(id, "BRANCH");
    //  console.log(res, "the rolesss");
      setRoleOptions(res.map((val: any) => val?.roleName));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchRolesQuery();
  }, []);

  useEffect(() => {
    if (role !== "Select Role")
      fetchRoles(id, "BRANCH")
        .then((res) => {
          const response = res;
          if (res.map((item: any) => item?.roleName === role)) {
            const matchingItem = res.find(
              (item: any) => item?.roleName === role
            );
            // console.log(matchingItem,'the so  called role')
            setState({
              ...state,
              roleId: matchingItem?.id,
            });
          }
       //   console.log(roleId, "from roles");
        })
        .catch((err) => {
          console.error(err);
        });
  }, [role]);

  useEffect(() => {
    if (branch !== "Select Branch")
      fetchBranchData(0, 1000)
        .then((res) => {
          if (res.content.some((item: any) => item?.name === branch)) {
            const matchingItem = res.content.find(
              (item: any) => item?.name === branch
            );
            setBranchId(matchingItem.id);
          }
        //  console.log(branchId, "from branches");
        })
        .catch((err) => {
          console.error(err);
        });
  }, [branch]);

  useEffect(() => {
    displayBranchList();
  }, []);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      submittingError: false,
    });
    setdisableBtn(false);
  };

 // console.log(firstName.replace(/\s+/g, ' ').trim(),'the name')

  async function handleSubmit(e: React.FormEvent) {
    setLoading(true);
    e.preventDefault();
    setState((state: any) => ({
      ...state,
      isSubmitting: true,
    }));
    if(branch==='Select Branch'){
      setState((state: any) => ({
        ...state,
        isSubmitting: false,
        errorMssg:'Please select branch',
        submittingError:true
      }));
    }
    else if(firstName===''){
      setState((state: any) => ({
        ...state,
        isSubmitting: false,
        errorMssg:'Please input the first name',
        submittingError:true
      }));
    }else if(lastName===''){
      setState((state: any) => ({
        ...state,
        isSubmitting: false,
        errorMssg:'Please input the last name',
        submittingError:true
      }));
    }else if(role==='Select Role'){
      setState((state: any) => ({
        ...state,
        isSubmitting: false,
        errorMssg:'Please select role',
        submittingError:true
      }));
    }else if(email===''){
      setState((state: any) => ({
          ...state,
          isSubmitting: false,
          errorMssg:'Please provide an email address',
          submittingError:true
        }));
    } else if(email?.match(mailformat )=== null ){
      setState((state: any) => ({
          ...state,
          isSubmitting: false,
          errorMssg:'Please input a valid email',
          submittingError:true
        }));
    }else if(password===''){
      setState((state: any) => ({
        ...state,
        isSubmitting: false,
        errorMssg:'Please provide password',
        submittingError:true
      }));
    }else{
      try {
        const response= await createMerchantAdmin( firstName.replace(/\s+/g, ' ').trim(),
          lastName.replace(/\s+/g, ' ').trim(),
          email.replace(/\s+/g, ' ').trim(),
          password,
           email.replace(/\s+/g, ' ').trim(),
          roleId,
          branchId)
          const successDetails={ title: "New User Created", text: "Congratulations, You have created a new user and it is pending approval.", icon: "" }
          successAlert(successDetails, {data:'',statusCode:'',message:'',errs:''});
          setLoading(false);
//  console.log(response,'the response from the api')
setTimeout(() => window.location.reload(), 2000);
      } catch (err:any) {
        setLoading(false);
       // console.log(err?.response.data+ " 'Caught Error.'");
        if (err && err?.response?.data) {
          setState({
              ...state,
              submittingError: true,
              isSubmitting: false,
              errorMssg: err?.response?.data?.respDescription || "Action failed, please try again"
          })}
      } finally {
        setRefresh(true)
        setTimeout(()=>{toggleDropdown();
          setState({
            ...state,
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            roleId: "",
            branchId: "",
            errorMssg:''
          });
          setRole("Select Role");
          setbranch("Select Branch");
        }, 3000);
  
      }

    }
  }

 // console.log(errorMssg,'the error', state)

  return (
    <Overlay toggleDropdown={toggleDropdown} isOpen={isOpen}>
      <Toaster />
      <p className="text-[20px]">Add New Admin</p>
      <ErrorCard handleClear={() => setState({ ...state, submittingError: false })} error={errorMssg} containerVariant={!submittingError ? "hidden" : "mb-2"} />
      <div className="grid gap-[20px] md:grid-cols-2  max-h-[400px] overflow-auto">
        <CustomDropDown
          label="Select Branch"
          options={branchList}
          value={branch}
          setValue={setbranch}
        />
        <DefaultInput
          label="First Name"
          placeHolder="First Name"
          name="firstName"
          value={firstName}
          handleChange={handleChange}
          required={true}
        />
        <DefaultInput
          label="Last Name"
          placeHolder="Last Name"
          name="lastName"
          value={lastName}
          handleChange={handleChange}
          required={true}

        />
        <DefaultInput
          label="Email Address"
          placeHolder="Email Address"
          name="email"
          value={email}
          handleChange={handleChange}
        />
        <CustomDropDown
          label="Select Role"
          options={roleOptions}
          value={role}
          setValue={setRole}
        />
        <DefaultInput
          label="Admin Password"
          placeHolder=""
          name="password"
          value={password}
          type="password"
          handleChange={handleChange}
          required={true}

        />
        <div className="mb-2">
          {/* <Button title="Create User" onClick={handleSubmit} isLoading={isSubmitting} /> */}
          <button disabled={disableBtn} onClick={handleSubmit} className={`w-full rounded-lg bg-primary text-white py-[10px] px-[10px] mt-[20px] flex gap-2 items-center justify-center transition-all duration-500 hover:brightness-110 ${disableBtn && 'bg-blue-400 cursor-not-allowed'}`}>
                            <span>Create User</span>
                            {
                                loading &&
                                <div role="status" className="ml-2">
                                    <svg aria-hidden="true"
                                        className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                                        viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor" />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            }
                        </button>
        </div>
        

      </div>
    </Overlay>
  );
};

export default NewUser;
