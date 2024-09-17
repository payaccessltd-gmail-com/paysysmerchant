import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Button } from "../../components/reusables/DefaultButton";
import NavBarItems from "../../components/reusables/NavBarItems";
import RegistrationSideBar from "../../components/reusables/RegistrationSideBar";
import SecurityQuestionPage from "../../components/reusables/SecurityQuestionPage";
import { getSecurityQuestions } from "../../containers/securityApis";
import SecurityModal from "./SecurityModal";

const SecurityQuestion = () => {
  const [clickedQuestions, setClickedQuestions] = useState<string[]>([]);
  const getOnboardingStage:any = localStorage.getItem('onboardingStage');
//  console.log(getOnboardingStage,'the onboaring')
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
     // console.log(res);
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

  
  return (
    <div>
      <NavBarItems />
      <Toaster />
      <div className="md:flex bg-[#FDFDFD]">
        <aside className="md:w-1/4 p-4 hidden sm:block">
          <RegistrationSideBar />
        </aside>
        <SecurityQuestionPage/>
      </div>
     
    </div>
  );
};

export default SecurityQuestion;
