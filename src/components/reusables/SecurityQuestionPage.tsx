import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { Button } from "../../components/reusables/DefaultButton";
import NavBarItems from "../../components/reusables/NavBarItems";
import RegistrationSideBar from "../../components/reusables/RegistrationSideBar";
import { getSecurityQuestions } from "../../containers/securityApis";
import SecurityModal from "../../pages/Registrations/SecurityModal";

const SecurityQuestionPage = () => {
  const [clickedQuestions, setClickedQuestions] = useState<string[]>([]);
  const getOnboardingStage:any = localStorage.getItem('onboardingStage');
 // console.log(getOnboardingStage,'the onboaring')
  const [questions, setquestions] = useState<any>([]);


 // console.log(clickedQuestions, "the question");

  useEffect(() => {
    const handleBackButton = (event: any) => {
      event.preventDefault(); // Prevent default browser behavior
      // Optionally, you can show a message or perform any other action here
    };

    window.history.pushState({ page: "myComponent" }, "", ""); // Reset the history state
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []); // Empty dependency array to run effect only once

  async function getSecurity() {
    try {
      const res = await getSecurityQuestions();
      setquestions(res);
    //  console.log(res);
    } catch (error: any) {
      console.error(error);
    }
  }
  useEffect(() => {
    getSecurity();
  }, []);

  const handleClick = (index: any) => {
    const question: any = questions[index]?.question;
    const questionIndex = clickedQuestions.indexOf(question);

    if (questionIndex === -1) {
      // Add question if not already present
      if (clickedQuestions.length < 3) {
        setClickedQuestions([...clickedQuestions, question]);
      }
    } else {
      // Remove question if already present
      const updatedQuestions = [...clickedQuestions];
      updatedQuestions.splice(questionIndex, 1);
      setClickedQuestions(updatedQuestions);
    }
  };

  const [step, setstep] = useState(false);
  function toggleStep() {
    setstep(!step);
  }
 // console.log(clickedQuestions.length);
  return (
    <>
      
        <main className="p-[40px] w-full md:w-3/4 bg-[#FDFDFD] ">
          <div className="grid gap-[14px]">
            <p className="text-[26px] text-black">Setup Security Question</p>
            <p className="text-[20px] text-[#656C75] font-semibold">
              Select 3 different questions
            </p>
          </div>

          <div className="grid w-full md:w-1/2 gap-[20px] mt-[40px]">
            {questions.map((val: any, index: any) => (
              <div
                className={`rounded-lg p-[17px] bg-white hover:bg-[#5BC6F2] hover:bg-opacity-30  ${
                  clickedQuestions.length === 3
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }  ${
                  clickedQuestions.includes(val.question) &&
                  " border-[1px] border-[#5BC6F2]"
                }`}
                key={index}
                onClick={() => handleClick(index)}
              >
                <p className="text-[#656C75] text-[14px]">{val.question}</p>
              </div>
            ))}
            <Button
              title="Continue"
              isDisabled={clickedQuestions.length < 3}
              onClick={toggleStep}
            />
          </div>
        </main>
      
      <SecurityModal
        toggleDropdown={toggleStep}
        isOpen={step}
        questions={clickedQuestions}
      />
    </>
  );
};

export default SecurityQuestionPage;
