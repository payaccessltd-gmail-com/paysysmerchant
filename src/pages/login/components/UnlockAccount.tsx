import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Image } from "../../../assets";
import Loading from "../../../components/Loading";
import { Button } from "../../../components/reusables/DefaultButton";
import DefaultInput from "../../../components/reusables/DefaultInput";
import { getUserSecurityQuestions, unlockSecurityQuestions } from "../../../containers/securityApis";
import errorAlert from "../../../Utils/HttpResponseHandlers/error";
import OnboardingLayout from "./OnboardingLayout";

const UnlockAccount = () => {
    const navigate=useNavigate()
 const [step, setStep] = useState(1)
    const [securityQuestions, setsecurityQuestions] = useState([])

    const [isLoading, setisLoading] = useState(false)
    const initialState: { [key: string]: string } = {};


    securityQuestions.forEach((_: any, index: any) => {
        initialState[`SecQuestion${index + 1}`] = "";
      });
  const [answers, setAnswers] = useState<any>(initialState);

  const isAnyAnswerInvalid =
    Object.values(answers).length < 2 ||
    Object.values(answers).some(
      (answer: string | unknown) =>
        typeof answer !== "string" || (answer as string).trim() === ""
    );
    const [email, setEmail] = useState('')

//console.log(email,'the email >>>',isAnyAnswerInvalid)

    async function getQuestions() {
        try {
            const res:any= await getUserSecurityQuestions(email)
           // console.log(res)
            
            if(res.respCode === "96"){
                const err=res.respBody
                errorAlert({title:'Error',text:`${res.respDescription}`,errors:'',icon:''})
                return
            }
            setsecurityQuestions(res)
        } catch (error:any) {
            console.error(error)
            setStep(1)
            errorAlert({title:'Error',text:'Something went wrong!Please try again Later',errors:'',icon:''})
        }
    }

    const handleChange = (name: string, value: string) => {
    setAnswers((prevAnswers: any) => ({
      ...prevAnswers,
      [name]: value,
    }));
  };

    useEffect(() => {
      if(step===2) getQuestions()
      else return
    }, [step])

  //   console.log(
  //   answers.question1,
  //   answers.question2,
  //   answers.question3,
  //   "the answerr"
  // );
  async function handleSubmit() {
    setisLoading(true)
    try {
        const res=await unlockSecurityQuestions(securityQuestions[0],securityQuestions[1],answers.question1,answers.question2,email)
       // console.log(res)
        if(res.respCode==='96'){
            const err=res.respDescription
                errorAlert({title:'Error',text:`${err}`,errors:'',icon:''})
            return
        }
        navigate('/')
    } catch (error:any) {
        console.error(error)
    } finally {
        setisLoading(false)
    }
  }

 // console.log(securityQuestions,'the securi')
    
  return (
    <OnboardingLayout>
      <Toaster />
      <div className="grid h-screen  items-center px-[20px] lg:px-[40px] md:w-3/4 m-auto">
        <div className="grid gap-[20px] ">
          <div className=" w-full  grid gap-[20px] mb-[35px]">
            <img src={Image.logo} alt="paysys logo" className="m-auto w-[80px] h-[80px]" />
            <p className="text-black font-sfpro-semibold text-center text-[25px] font-500">
              Unlock Account
            </p>
          </div>
          {step===1&&
          <div className="grid gap-[17px]">
          <p className="text-[#656C75] font-semibold text-[24px]">Input Your email</p>

<DefaultInput label='Email' name='email' value={email} handleChange={(e:any)=>{setEmail(e.target.value)}}/>

<Button title='Unlock Email' onClick={()=>{setStep(2)}}/>
          </div>}

          {step===2 &&securityQuestions.length>0 ?
 securityQuestions.length > 0 &&securityQuestions.map((val:any,index:any)=>(
          <div className="grid gap-[17px]">
          <p className="text-[#656C75] font-semibold text-[24px]">Answer your security questions below 
to unlock your account</p>
<DefaultInput label={val} name={`question${index + 1}`}
              value={answers[`question${index + 1}`]}
              placeHolder={`Security Question ${index + 1}`}
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(`question${index + 1}`, e.target.value)
              } />
<Button title='Submit' onClick={handleSubmit} isDisabled={isAnyAnswerInvalid}/>
          </div>
))
:<p className="text-center text-[20px]">You have no security questions set! Kindly Contact support</p>

        }
        </div>
        <div className="grid gap-1">
                <p className="text-[16px]">
                  Remember Password?{" "}
                  <span
                    className="text-primary underline m-0 hover:cursor-pointer"
                    onClick={() => navigate("/")}
                  >
                    Login
                  </span>{" "}
                </p>
              </div>
      </div>
    </OnboardingLayout>
  );
};

export default UnlockAccount;
