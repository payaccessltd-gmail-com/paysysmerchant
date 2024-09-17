import { useEffect, useState } from "react";
import { Button } from "../components/reusables/DefaultButton";
import DefaultInput from "../components/reusables/DefaultInput";
import CustomDropDown from "../components/reusables/dropdowns/CustomDropDown";
import Overlay from "../components/reusables/Overlay/Overlay";
import { Toaster } from "react-hot-toast";
import Loading from "../components/Loading";
import { SpinnerIcon } from "../components/reusables/icons";
import { Image } from "../assets";
import { LoanReasons } from "../pages/Loans/Mocks";
import { getShowPopUp } from "./Emmiters/RxjsServices";
import { loanRequest } from "../containers/loanApis";

const Modal = ({ toggleDropdown, isOpen, stage, setStage, message }: any) => {
  const [branchList, setBranchList] = useState<any>([]);
  const [branch, setbranch] = useState("Select Purpose");
  const [merchantId, setMerchantId] = useState<any>(0);
  const [isLoading, setisLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState<any>(true);
  const [showModal, setShowModal] = useState<any>(true);
  const [state, setState] = useState<any>({
    amount: "",
    requestDuration: "",
    description: "",
    giveMoreDetails: true,
    submittingError: false,
    isSubmitting: false,
    errorMssg: "",
    loanProduct:{}
  });
  const [showSuccessAlert, setShowSuccessAlert] = useState<any>(false);

  const {
    amount,
    requestDuration,
    description,
    giveMoreDetails,
    submittingError,
    errorMssg,
    isSubmitting,
    loanProduct
  } = state;

  useEffect(() => {
    const getPopupData = getShowPopUp.subscribe({
      next: (data: boolean) => {
        setShowModal(data);
      }
    });
  }, [showModal])


  useEffect(() => {
    const getUserDetails: any = localStorage.getItem('merchantDetails');
    const parseDetails = JSON.parse(getUserDetails);
    setMerchantId(parseDetails.id);
    setBranchList(LoanReasons);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue: any = e.target.value.replace(/[^0-9]/g, '');
    let formattedAmount = new Intl.NumberFormat('en-US').format(inputValue);
    setState({
      ...state,
      [e.target.name]: formattedAmount,
      submittingError: false,
    });

    // console.log("lenght>>>", e?.target?.value?.length);

    if (e?.target?.value?.length > 0) {
      setIsDisabled(false)
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setisLoading(true);
    setState((state: any) => ({
      ...state,
      isSubmitting: true,
    }));
    setTimeout(() => {
      setisLoading(false);
      setStage(1);
    }, 3000);
    setTimeout(() => {
      toggleDropdown()
    }, 6000);

    const inputValueWithoutCommas = amount.replace(/,/g, '');
    
    const requestAmount= Number(inputValueWithoutCommas)
    const loanPurpose= branch === 'Select Purpose' ? null : branch
    // console.log("request payload>>", payload);

    loanRequest(merchantId,requestAmount,requestDuration,loanProduct,loanPurpose).then((res: any) => {
      setShowSuccessAlert(true);
      setTimeout(() => window.location.reload(), 3000);
    }).catch((err: any) => {
      console.error("Error from Loan Request>>", err);
    }).finally(() => {
      console.info('Loan request implementation!');
      setState({});
    })
  };
  // console.log(state, "the terminal state");
  return (
    <Overlay toggleDropdown={toggleDropdown} isOpen={isOpen}>
      <Toaster />
      {/* <p className="text-[20px] font-bold">Loan Request</p> */}
      {isLoading ? (
        <div role="status" className="m-auto w-fit h-fit grid items-center">
          <div className="m-auto text-center my-10">
            <SpinnerIcon className="m-auto" />
            <p>Loading...</p>
            <p>Do not close the modal</p>
          </div>
        </div>
      ) : stage === 0 ? (
        <div className="m-auto grid mb-10 items-center text-center">
          {/* <img src={Image.success} alt="success" className="m-auto" /> */}

          {
            showModal === true ?
              <div>
                <img src={Image.success} alt="success" className="m-auto" />
              </div>
              :
              showModal === false ?
                <div>
                  <img src={Image.error} alt="error" className="m-auto" height={100} width={100} /><br />
                </div>
                :
                <></>
          }
          <br />
          <p className="text-black font-bold mb-3 text-[20px]">{message}</p>
          {/* <p className="text-[#656C75] text-[12px]">We are in the process of assessing the optimal loan
          amount for you. Once the assessment is done
          we will prompt you with an offer
          </p> */}
        </div>
      ) : showSuccessAlert === true ? (
        <></>
      ) :
        <></>
      }
    </Overlay>
  );
};

export default Modal;
