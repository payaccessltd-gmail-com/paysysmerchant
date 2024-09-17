import React, { Fragment, useEffect, useRef, useState } from "react";
import { Image } from "../../assets";
import { AiOutlineBell, AiOutlineMenu } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import {
  financialMenuItems,
  managerMenuItems,
  paymentMenuItems,
} from "./SideBarItems";
import { Storage } from "../../Utils/Stores/inAppStorage";
import { SpinnerIcon } from "../reusables/icons";
import { Menu, Transition } from "@headlessui/react";
import SecurityPopOver from "../../pages/SecurityQuestion/SecurityPopOver";
import { fetchImpactLoanEligibility } from "../../containers/loanApis";


const DashboardLayout = ({ children, isLoading }: any) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState("");
  const [userFullName, setUserFullName] = useState<any>("");
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const getOnboardingStage:any = localStorage.getItem('onboardingStage');
  
  const logoutBtn = ["Settings", "Log out"];

  function handleLogoutBtn(val: any) {
    if (val === 0) return navigate("/settings");
    else {
      navigate("/");
      localStorage?.clear();
    }
  }
  const divRef = useRef<HTMLDivElement | null>(null);
  const [divWidth, setDivWidth] = useState(0);

  

  function getDateTime(){
    const currentHour = new Date()?.getHours();
    if (currentHour >= 0 && currentHour < 12) {
      setTimeOfDay("Good Morning");
    } else if (currentHour >= 12 && currentHour < 18) {
      setTimeOfDay("Good Afternoon");
    } else if(currentHour >= 18 && currentHour <= 23){
      setTimeOfDay("Good Evening");
    }
  }

  useEffect(() => {
    // Function to update the div width
    const updateWidth = () => {
      if (divRef.current) {
        const width = divRef?.current?.clientWidth;
        setDivWidth(width);
      }
      getDateTime();
    };

    // Initial update
    updateWidth();

    // Attach a resize event listener to the window
    window.addEventListener("resize", updateWidth);

    // Cleanup by removing the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const dynamicWidthClass = `${divWidth + 30}px`;
  function toggleDropdown() {
    setNavbarOpen(!navbarOpen);
  }
  const handleModalClick = (event: React.MouseEvent) => {
    // Prevent event propagation to the backdrop element
    event.stopPropagation();
  };

  const [displayName, setDisplayName] = useState("");

  const [displayNameSub, setDisplayNameSub] = useState("");

  const [accType, setAccType] = useState("");

  const { firstName, lastName, accountType, merchantDetails,secreteQuestionsSet } = Storage.getItem(
    "userDetails"
  ) || { firstName: "", lastName: "", accountType: "" };

  const { name } = merchantDetails || {};

const [security, setsecurity] = useState(!secreteQuestionsSet &&
  getOnboardingStage !== 'settlement' &&
  location?.state?.securityQuestion===true)

function togglesecurity() {
  setsecurity(!security)
}
  function decodeUserDetails(){
    const getUserDetails:any = localStorage.getItem('userDetails');
    const parseDetails:any = JSON.parse(getUserDetails);
    const parts:any = parseDetails?.token.split('.');
    const decodedPayload:any = atob(parts[1]);
    const userDetails:any = JSON.parse(decodedPayload)
    const getUserParams:any = JSON.parse(userDetails?.sub);
    setUserFullName(`${getUserParams?.firstName} ${getUserParams?.lastName}`);
  }
  useEffect(() => {
    decodeUserDetails();
    setDisplayName(name || "");
    setDisplayNameSub(`${firstName || ""} ${lastName || ""}`);
    setAccType(accountType || "");
  }, [name, accountType]);


  return (
    <>
      <div className="relative z-0">
        <div
          className="fixed hidden h-full p-[20px] md:w-1/5 lg:w-1/6 bg-[#F9F9F9] md:grid justify-between overflow-y-auto w-[30%]"
          ref={divRef}
        >
          <div className=" w-fit mb-[40px]">
            <img
              src={Image.logo}
              alt="logo"
              onClick={() => navigate("/dashboard")}
              className="hover:cursor-pointer"
            />
            <div className="grid w-full gap-[20px] mt-[40px] items-center ">
              <p className="text-[16px] font-bold ">Business Financials</p>
              <div className="grid gap-[20px] justify-between  m-auto md:m-0">
                {financialMenuItems?.map((items) => (
                  <div
                    className="flex items-center gap-[10px]   text-center w-full hover:cursor-pointer group"
                    onClick={() => navigate(`${items.route}`)}
                  >
                    <div
                      className={`rounded-lg w-[50px] h-[50px] grid  group-hover:bg-primary  ${
                        currentPath.includes(items.route)
                          ? "bg-primary"
                          : "bg-[#ECEFF7]"
                      }`}
                    >
                      {items.icon}
                    </div>
                    <p
                      className={`text-[14px] font-500 ${
                        currentPath.includes(items.route)
                          ? "text-black"
                          : "text-[#747474]"
                      }`}
                    >
                      {items.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid w-full gap-[20px] mt-[40px] items-center ">
              <p className="text-[16px] font-bold ">Payments</p>
              <div className="grid gap-[20px] justify-between  m-auto md:m-0">
                {paymentMenuItems?.map((items) => (
                  <div
                    className="flex items-center gap-[10px]   text-center w-full hover:cursor-pointer group"
                    onClick={() => navigate(`${items.route}`)}
                  >
                    <div
                      className={`rounded-lg w-[50px] h-[50px] grid  group-hover:bg-primary  ${
                        currentPath.includes(items.route)
                          ? "bg-primary"
                          : "bg-[#ECEFF7]"
                      }`}
                    >
                      {items.icon}
                    </div>
                    <p
                      className={`text-[14px] font-500 ${
                        currentPath.includes(items.route)
                          ? "text-black"
                          : "text-[#747474]"
                      }`}
                    >
                      {items.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid w-full gap-[20px] mt-[40px]">
              <p className="text-[16px] font-bold  ">Business Manager</p>
              <div className="grid  gap-[20px] justify-between m-auto md:m-0">
                {managerMenuItems?.map((items) => (
                  <div
                    className="flex items-center gap-[10px]  text-center hover:cursor-pointer group"
                    onClick={() => navigate(`${items.route}`)}
                  >
                    <div
                      className={`rounded-lg w-[50px] h-[50px] grid group-hover:bg-primary  ${
                        currentPath.includes(items.route)
                          ? "bg-primary"
                          : "bg-[#ECEFF7]"
                      }`}
                    >
                      {items.icon}
                    </div>
                    <p
                      className={`text-[14px] font-500 ${
                        currentPath.includes(items.route)
                          ? "text-black"
                          : "text-[#747474]"
                      }`}
                    >
                      {items.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-[#F9F9F9]">{divWidth}</p>

          <div className="bg-[#ECEFF7] p-[20px] gap-[20px] rounded-lg md:m-auto   grid">
            <div className="flex gap-2">
              <p>Need help?</p>
            </div>

            <p>
              Get in touch with our{" "}
              <span className="text-primary m-0">support team </span> or visit
              our <span className="text-primary m-0">FAQ</span>
            </p>
          </div>
        </div>
      </div>
      <div
        className={`grid  pr-[20px]  `}
        style={{ paddingLeft: dynamicWidthClass }}
      >
        <div className="flex justify-between pt-[30px] md:hidden">
          <img
            src={Image.logo}
            alt="logo"
            onClick={() => navigate("/dashboard")}
            className=" w-[10em] hover:cursor-pointer"
          />
          <div className="flex items-center gap-2">
          <div className="relative">
              <Menu>
                <Menu.Button>
                  <AiOutlineBell className="text-[25px] mt-[10px]"/>
                </Menu.Button>
                <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >

                <Menu.Items className="absolute right-[0] z-10  w-[140px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 text-[16px] focus:outline-none grid">
                  {logoutBtn.map((val: any, index: any) => (
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${active && "bg-primary "} py-[5px]`}
                          onClick={() => handleLogoutBtn(index)}
                        >
                          {val}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>

        </Transition>
              </Menu>
            </div>
          <button
            className=" flex inset-0 z-50 relative w-10 h-10 text-black focus:outline-none"
            onClick={toggleDropdown}
          >
            <div className="absolute w-5 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
              <span
                className={`absolute h-0.5 w-5 bg-black transform transition duration-300 ease-in-out ${
                  navbarOpen ? "rotate-45 delay-200" : "-translate-y-1.5"
                }`}
              ></span>
              <span
                className={`absolute h-0.5 bg-black transform transition-all duration-200 ease-in-out ${
                  navbarOpen ? "w-0 opacity-50" : "w-5 delay-200 opacity-100"
                }`}
              ></span>
              <span
                className={`absolute h-0.5 w-5 bg-black transform transition duration-300 ease-in-out ${
                  navbarOpen ? "-rotate-45 delay-200" : "translate-y-1.5"
                }`}
              ></span>
            </div>
          </button>

          </div>
        </div>

        <div className="border-b-[1px] py-[30px] flex  justify-between gap-[20px]">
          <div className="">
            <p className="text-[21px] font-bold ">
              {timeOfDay},{" "}
              <span className="m-0 text-primary">
                {name || userFullName}
              </span>{" "}
            </p>
          </div>
          <div className="md:flex gap-[40px] justify-end text-[#292D32] text-[24px] items-center hidden">
            <div className="rounded-full p-[10px] bg-[#E7E9F1]">
              <CiSearch />
            </div>
            <div className="relative">
              <Menu>
                <Menu.Button>
                <div className="flex gap-2 items-center ">
              <div
                className="rounded-full p-[5px] h-fit bg-[#00ACEF] text-white cursor-pointer"
                // onClick={() => {
                //   navigate("/");
                //   localStorage?.clear();
                // }}
              >
                {`${firstName?.charAt(0)}${lastName?.charAt(0)}`}
              </div>
              <div className="grid gap-[1px] text-[13px]">
                <p className="text-[#020607] font-bold">
                  {firstName} {lastName}
                </p>
                <p className="text-[#3186FD]">{name}</p>
              </div>
            </div>
                </Menu.Button>
                <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >

                <Menu.Items className="absolute left-[0] z-10 mt-2 w-[140px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 text-[16px] focus:outline-none grid ">
                  {logoutBtn.map((val: any, index: any) => (
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${active && "bg-primary"} py-[10px]`}
                          onClick={() => handleLogoutBtn(index)}
                        >
                          {val}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>

        </Transition>
              </Menu>
            </div>
            {/* <div className="flex gap-2 items-center ">
              <div
                className="rounded-full p-[5px] h-fit bg-[#071B7B] text-white cursor-pointer"
                // onClick={() => {
                //   navigate("/");
                //   localStorage?.clear();
                // }}
              >
                {`${firstName?.charAt(0)}${lastName?.charAt(0)}`}
              </div>
              <div className="grid gap-[1px] text-[13px]">
                <p className="text-[#020607] font-bold">
                  {firstName} {lastName}
                </p>
                <p className="text-[#3186FD]">{name}</p>
              </div>
            </div> */}
          </div>
        </div>
        {isLoading ? (
          <div className="m-auto w-fit  grid items-center">
            <div className="m-auto text-center">
              <SpinnerIcon className="m-auto" />
              <p>Loading...</p>
            </div>
          </div>
        ) : (
          children
        )}
        {/* {children} */}
      </div>

      {/* small sidebar */}
      
      <div
        className={`md:hidden  h-screen flex  inset-0 p-0 transform delay-100 transition-all duration-300 fixed ${
          navbarOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-full"
        }
`}
      >
        <div
          className=" w-screen h-screen fixed inset-0 z-40 backdrop-blur-[.6px] "
          onClick={toggleDropdown}
        ></div>
        <div className="fixed z-50  h-full p-[20px] bg-[#F9F9F9] grid justify-between overflow-y-auto w-[65%] md:hidden font-500">
          <div className=" w-fit mb-[40px]">
            <img
              src={Image.logo}
              alt="logo"
              onClick={() => navigate("/dashboard")}
              className="hover:cursor-pointer"
            />
            <div className="grid w-full gap-[20px] mt-[40px] items-center ">
              <p className="text-[16px] font-bold ">Business Financials</p>
              <div className="grid gap-[20px] justify-between  m-auto md:m-0">
                {financialMenuItems?.map((items) => (
                  <div
                    className="flex items-center gap-[10px] font-semibold text-center w-full hover:cursor-pointer group"
                    onClick={() => navigate(`${items.route}`)}
                  >
                    <div
                      className={`rounded-lg w-[50px] h-[50px] grid  group-hover:bg-primary  ${
                        currentPath.includes(items.route)
                          ? "bg-primary"
                          : "bg-[#ECEFF7]"
                      }`}
                    >
                      {items.icon}
                    </div>
                    <p
                      className={`text-[14px] font-semibold  ${
                        currentPath.includes(items.route)
                          ? "text-black"
                          : "text-[#747474]"
                      }`}
                    >
                      {items.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid w-full gap-[20px] mt-[40px] items-center ">
              <p className="text-[16px] font-bold ">Payments</p>
              <div className="grid gap-[20px] justify-between  m-auto md:m-0">
                {paymentMenuItems?.map((items) => (
                  <div
                    className="flex items-center gap-[10px]   text-center w-full hover:cursor-pointer group"
                    onClick={() => navigate(`${items.route}`)}
                  >
                    <div
                      className={`rounded-lg w-[50px] h-[50px] grid  group-hover:bg-primary  ${
                        currentPath.includes(items.route)
                          ? "bg-primary"
                          : "bg-[#ECEFF7]"
                      }`}
                    >
                      {items.icon}
                    </div>
                    <p
                      className={`text-[14px] font-500 ${
                        currentPath.includes(items.route)
                          ? "text-black"
                          : "text-[#747474]"
                      }`}
                    >
                      {items.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid w-full gap-[20px] mt-[40px]">
              <p className="text-[16px] font-bold  ">Business Manager</p>
              <div className="grid  gap-[20px] justify-between m-auto md:m-0">
                {managerMenuItems?.map((items) => (
                  <div
                    className="flex items-center gap-[10px]  text-center hover:cursor-pointer group"
                    onClick={() => navigate(`${items.route}`)}
                  >
                    <div
                      className={`rounded-lg w-[50px] h-[50px] grid group-hover:bg-primary  ${
                        currentPath.includes(items.route)
                          ? "bg-primary"
                          : "bg-[#ECEFF7]"
                      }`}
                    >
                      {items.icon}
                    </div>
                    <p
                      className={`text-[14px] font-500 ${
                        currentPath.includes(items.route)
                          ? "text-black"
                          : "text-[#747474]"
                      }`}
                    >
                      {items.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-[#ECEFF7] p-[20px] gap-[20px] rounded-lg md:m-auto   grid">
            <div className="flex gap-2">
              <p>Need help?</p>
            </div>

            <p>
              Get in touch with our{" "}
              <span className="text-primary m-0">support team </span> or visit
              our <span className="text-primary m-0">FAQ</span>
            </p>
          </div>
        </div>
      </div>
      <SecurityPopOver toggleDropdown={togglesecurity} isOpen={security}/>
    </>
  );
};

export default DashboardLayout;
