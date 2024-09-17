import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../components/reusables/DefaultButton";
import DefaultInput from "../../components/reusables/DefaultInput";
import Overlay from "../../components/reusables/Overlay/Overlay";
import { addSecurityQuestions } from "../../containers/securityApis";
import { apiCall } from "../../Utils/URLs/axios.index";

const SecurityModal = ({ toggleDropdown, isOpen, questions }: any) => {
    const location = useLocation();

  const navigate = useNavigate();
  const initialState: { [key: string]: string } = {};
  questions.forEach((_: any, index: any) => {
    initialState[`SecQuestion${index + 1}`] = "";
  });
  const [answers, setAnswers] = useState<any>(initialState);
  const [isLoading, setisLoading] = useState(false);
  const isAnyAnswerInvalid =
    Object.values(answers).length === 0 ||
    Object.values(answers).some(
      (answer: string | unknown) =>
        typeof answer !== "string" || (answer as string).trim() === ""
    );

  const handleChange = (name: string, value: string) => {
    setAnswers((prevAnswers: any) => ({
      ...prevAnswers,
      [name]: value,
    }));
  };
  
  async function handleSubmit() {
    setisLoading(true);
    try {
      
      
      if(location.pathname === '/registrations/security-questions') {
        await apiCall({
            name: "selfOnboarding",
            data: {
                secreteQuestionRequestDto:{
                    question1:questions[0],
                    question2:questions[1],
                    question3:questions[2],
                    answer1:answers.SecQuestion1,
                    answer2:answers.SecQuestion2,
                    answer3:answers.SecQuestion3

                },
              stage: "securityQuestions"
            },
            action: (): any => {
              return ["skip"]
            }
          })
          localStorage.setItem("onboardingStageKey", "securityQuestions");
      await localStorage.setItem(
        "onboardingStage",
        JSON.stringify({ onboardingStage: "securityQuestions" })
      );
      setTimeout(() => {
        navigate("/registrations/bvn");
      }, 200);
      } else{
        const res = await addSecurityQuestions(
            questions[0],
            questions[1],
            questions[2],
            answers.SecQuestion1,
            answers.SecQuestion2,
            answers.SecQuestion3
          );
        //  console.log(res);
          if (res.respCode === 96) {
            throw new Error(res.respDescription);
          }
        navigate("/dashboard");
      }
      
    } catch (error: any) {
      console.error(error);
    } finally {
      setisLoading(false);
    }
  }

  return (
    <Overlay toggleDropdown={toggleDropdown} isOpen={isOpen}>
      <div className="text-black">
        <Toaster />
        <p className="font-bold text-[30px]">Answer the security Questions</p>
        <div className="my-[25px] grid gap-[20px]">
          {questions.map((val: any, index: any) => (
            <DefaultInput
              name={`SecQuestion${index + 1}`}
              value={answers[`SecQuestion${index + 1}`]}
              label={val}
              placeHolder={`Security Question ${index + 1}`}
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(`SecQuestion${index + 1}`, e.target.value)
              }
            />
          ))}
        </div>
        <Button
          title="Set Questions"
          isDisabled={isAnyAnswerInvalid}
          onClick={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </Overlay>
  );
};

export default SecurityModal;
