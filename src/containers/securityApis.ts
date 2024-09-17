import { apiCall } from "../Utils/URLs/axios.index";

const getSecurityQuestions = async (): Promise<any> => {

    const response = await apiCall({
        name: "allSecurityQuestions",
        action: (): any => (["skip"])
    })
    return response;
}


const answerSecurityQuestions = async (question1:any,question2:any,answer1:any,answer2:any,email:any): Promise<any> => {

    const response = await apiCall({
        name: "answerSecurityQuestions",
        data:{email,question1,answer1,question2,answer2},
        action: (): any => ([]),
        successDetails:{title:'Success',text:'Security Questions has been answered successfully',icon:''}
    })
    return response;
}
//answerSecurityQuestions
const getUserSecurityQuestions = async (email:any): Promise<any> => {

    const response = await apiCall({
        name: "userSecurityQuestions",
        data:{email},
        // params:{email},
        // urlExtra:`/${email}`,
        action: (): any => (["skip"])
    })
    return response;
}

const addSecurityQuestions = async (question1:any,question2:any,question3:any,answer1:any,answer2:any,answer3:any): Promise<any> => {

    const response = await apiCall({
        name: "addSecurityQuestions",
        data:{question1,answer1,question2,answer2,question3,answer3},
        action: (): any => ([]),
        successDetails:{title:'Success',text:'Security Questions has been added successfully',icon:''}
    })
    return response;
}

const unlockSecurityQuestions = async (question1:any,question2:any,answer1:any,answer2:any,email:any): Promise<any> => {

    const response = await apiCall({
        name: "unlockSecurityQuestions",
        data:{email,question1,answer1,question2,answer2},
        action: (): any => ([]),
        successDetails:{title:'Success',text:'Security Questions has been added successfully',icon:''}
    })
    return response;
}
const otpSecurityQuestions = async (username:any): Promise<any> => {

    const response = await apiCall({
        name: "OTPPasswordWithSecQuestions",
        data:{username},
        action: (): any => ([]),
        successDetails: {
            title: "Successful",
            text: `Please check your email/phone number an OTP has been sent to you.`,
            icon: ""
        },
    })
    return response;
}
const updatePasswordSecurityQuestions = async (userEmail:any,password:any,confirmPassword:any,tokenToChangePassword:any): Promise<any> => {

    const response = await apiCall({
        name: "updatePasswordWithSecurityQuestions",
        data:{userEmail,password,confirmPassword,tokenToChangePassword},
        action: (): any => ([]),
        successDetails:{title:'Success',text:"Password updated Successfully! You'd be redirected to the Login page.",icon:''}
    })
    return response;
}

export {getSecurityQuestions,getUserSecurityQuestions,addSecurityQuestions,unlockSecurityQuestions,otpSecurityQuestions,updatePasswordSecurityQuestions,answerSecurityQuestions};
