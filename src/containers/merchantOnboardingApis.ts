import { apiCall } from "../Utils/URLs/axios.index";

//confirmBvn

const fetchBankList = async (): Promise<any> => {

    const response = await apiCall({
        name: "listBanks",
        params: {},
        action: (): any => (["skip"])
    })
    return response;
}

const confirmBVN = async (bvn: any): Promise<any> => {

    const response = await apiCall({
        name: "confirmBvn",
        params: {bvn},
        action: (): any => (["skip"])
    })
    return response;
}

const confirmOTP = async (otp: any): Promise<any> => {

    const response = await apiCall({
        name: "validateOtp",
        params: {otp},
        action: (): any => (["skip"])
    })
    return response;
}



const accNameEnquires = async (payload: any): Promise<any> => {

    const response = await apiCall({
        name: "accNameEnquiry",
        data: JSON.stringify(payload),
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"])
    })
    return response;
}











export { fetchBankList, confirmBVN, confirmOTP, accNameEnquires};