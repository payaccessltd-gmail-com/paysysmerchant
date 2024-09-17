import React, { useEffect, useState } from "react";
import { Button } from "../../../components/reusables/DefaultButton";
import DefaultInput from "../../../components/reusables/DefaultInput";
import DefaultTextArea from "../../../components/reusables/DefaultTextArea";
import CustomDropDown from "../../../components/reusables/dropdowns/CustomDropDown";
import ReactNaijaStateLgaSelect from "../../../components/stateSelect";
import { fetchAMerchantData } from "../../../containers/dashboardApis";
import { Storage } from "../../../Utils/Stores/inAppStorage";
import { apiCall } from "../../../Utils/URLs/axios.index";
import { Toaster } from "react-hot-toast";
import Loading from "../../../components/Loading";

const Profile = () => {
  const { userId } = Storage.getItem("userDetails") || {};
  const [payload, setPayload] = useState<any>({});
  const [isLoading, setisLoading] = useState(false);

  const [state, setState] = useState<any>({
    name: "",
    description: "",
    email: "",
    category: "",
    phone: "",
    firstName: "",
    lastName: "",
    myEmail: "",
    address: "",
    landmark: "",

    role: "",
    password: "",
    submittingError: false,
    isSubmitting: false,
    errorMssg: "",
  });

  const {
    name,
    description,
    email,
    firstName,
    lastName,
    phone,
    submittingError,
    myEmail,
    address,
    landmark,
    role,
    errorMssg,
    isSubmitting,
  } = state;

  const [naijaState, setNaijaState] = useState("");
  const [towns, setLga] = useState([]);
  const [naijaLga, setNaijaLga] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedLga, setSelectedLga] = useState("");
  const [category, setcategory] = useState(
    "Select the nature of your business"
  );
  const options = [
    "commerce",
    "finance",
    "agriculture",
    "Technology",
    "Others",
  ];
  async function fetchData() {
    setisLoading(true);
    await fetchAMerchantData(userId).then((res: any) => {
      const {
        email: memail,
        name: mname,
        description: mdescription,
        category: mcategory,
        phone: mphone,
        address: maddress,
        landmark: mlandmark,
        state: mstate,
        lga: mlga,
        userid,
      } = res || {};
      setState({
        ...state,
        email: memail || "",
        name: mname || "",
        description: mdescription || "",
        category: mcategory || "",
        phone: mphone || "",
        address: maddress || "",
        landmark: mlandmark || "",

        firstName: userid?.firstName || "",
        lastName: userid?.lastName || "",
        myEmail: userid?.email || "",
        role: userid?.role?.roleName || "",
      });
      setcategory(mcategory || "Select the nature of your business");
      setNaijaState(mstate || "");
      setSelectedState(mstate || "");
      setSelectedLga(mlga || "");
      setNaijaLga(mlga || "");
      setisLoading(false);
    });
  }

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
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState((state: any) => ({
      ...state,
      isSubmitting: true,
    }));
    setisLoading(true);

    try {
      const payload = {
        name: state.name,
        phone: state.phone,
        email: state.email,
        description: state.description,
        category: category,
        address: state.address,
        state: selectedState,
        lga: selectedLga,
        landmark: state.landmark,
      };
      setPayload(payload);
      const response = await apiCall({
        name: "editUser",
        urlExtra: `/${userId}`,
        data: {
          name,
          description,
          email,
          category,
          phone,
          address,
          landmark,
          state: selectedState,
          lga: selectedLga,
        },
        action: (): any => {
          setPayload({
            description: "",
            password: "",
            submittingError: false,
            isSubmitting: false,
            errorMssg: "",
          });
          return ["success"];
        },
        successDetails: {
          title: "User Updated",
          text: "User details have been updated successfully",
          icon: "",
        },
        errorAction: (err?: any) => {
          if (err && err?.response?.data) {
            setPayload({
              ...payload,
              submittingError: true,
              isSubmitting: false,
              errorMssg:
                err?.response?.data?.respDescription ||
                "Action failed, please try again",
            });
            return [""];
          } else {
            setState({
              ...state,
              submittingError: true,
              isSubmitting: false,
              errorMssg:
                err?.response?.respDescription ||
                "Action failed, please try again",
            });
          }
        },
      });
    } catch (e) {
      console.error(e + " 'Caught Error.'");
    } finally {
      setisLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="mb-[30px]">
          <Toaster />

          <div className="grid mt-5">
            <p className="text-[16px] font-semibold">Business Information</p>
            <div className="grid md:grid-cols-2 gap-[20px] mt-10">
              <DefaultInput
                label="Business Name"
                value={name}
                name="name"
                handleChange={handleChange}
              />
              <CustomDropDown
                label="Business Category"
                onHandleChange={() => {}}
                value={category}
                options={options}
                setValue={setcategory}
              />

              <DefaultInput
                label="Email"
                placeHolder="Stromag@mailiator.com"
                name="email"
                value={email}
                handleChange={handleChange}
              />
              <DefaultInput
                label="Phone Number"
                placeHolder="08050599502"
                name="phone"
                value={phone}
                handleChange={handleChange}
              />
              <DefaultTextArea
                name="description"
                value={description}
                label="Business Description"
                placeHolder="Give us a little info about what your business is all about"
                id=""
                handleChange={handleChange}
              />
            </div>
          </div>

          <div className="grid mt-5">
            <p className="text-[16px] font-semibold mb-8">
              Location Information
            </p>
            <ReactNaijaStateLgaSelect
              naijaState={naijaState}
              naijaLga={naijaLga}
              towns={towns || []}
              setNaijaState={setNaijaState}
              setNaijaLga={setNaijaLga}
              stateVal={(val: any) => setSelectedState(val)}
              lgaVal={(val: any) => setSelectedLga(val)}
              setLga={setLga}
              lgaPlaceholder={selectedLga || "Select LGA"}
              statePlaceholder={selectedState || "Select State"}
              stateClassName="placeholder:text-gray-450 placeholder:text-sm placeholder:min-w-max w-full leading-6 text-base font-400 border px-[10px] py-3 rounded-lg "
              lgaClassName="placeholder:text-gray-450 placeholder:text-sm placeholder:min-w-max w-full leading-6 text-base font-400 border px-[10px] py-3 rounded-lg h-fit "
            />
            <div className="grid md:grid-cols-2 gap-[20px] mt-10">
              {/* <CustomDropDown
            label="State"
            onHandleChange={() => {}}
            value={selectedState}
            options={stateOptions}
            setValue={setSelectedState}
          /> */}
              {/* <CustomDropDown
            label="LGA"
            onHandleChange={() => {}}
            value={LGA}
            options={LGAoptions}
            setValue={setLGA}
          /> */}
              <DefaultInput
                label="Address"
                placeHolder="Enter Business Address"
                name="address"
                value={address}
                handleChange={handleChange}
              />
              <DefaultInput
                label="Address Landmark"
                placeHolder="Landmark"
                name="landmark"
                value={landmark}
                handleChange={handleChange}
              />
            </div>
          </div>

          <div className="grid mt-5">
            <p className="text-[16px] font-semibold">Personal Information</p>
            <div className="grid md:grid-cols-2 gap-[20px] mt-10">
              <DefaultInput
                label="First Name"
                value={firstName}
                name="firstName"
                handleChange={handleChange}
              />
              <DefaultInput
                label="Last Name"
                value={lastName}
                name="lastName"
                handleChange={handleChange}
              />
              <DefaultInput
                label="Email"
                value={myEmail}
                name="myEmail"
                handleChange={handleChange}
              />
              <Button title="Update Changes" onClick={handleSubmit} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
