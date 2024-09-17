import { apiCall } from "../Utils/URLs/axios.index";

const loanRequest = async (merchantId:any,requestAmount:any, requestDuration:any,loanProduct:any,loanPurpose:any): Promise<any> => {

    const response = await apiCall({
        name: "requestLoan",
        data: {merchantId,requestAmount,requestDuration,loanProductId:loanProduct,loanPurpose},
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"])
    })
    return response;
}

const fetchLoanRequests = async (pageNo: any, pageSize: any, search:any, id:any): Promise<any> => {

    const response = await apiCall({
        name: "getLoansList",
        params: {
            pageNo,
            pageSize,
             search
        },
        
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"]),
        urlExtra:`/${id}`
    })
    return response;
}

const acceptLoan = async (id:any): Promise<any> => {

    const response = await apiCall({
        name: "acceptLoan",
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"]),
        urlExtra:`/${id}`
    })
    return response;
}

const repayLoan = async (id:any): Promise<any> => {
    const response = await apiCall({
        name: "repayloan",
        data: {id: id},
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"]),
        // urlExtra:`/${id}`
    })
    return response;
}


const repayAllLoans = async (id:any): Promise<any> => {
    const response = await apiCall({
        name: "payfullamount",
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"]),
        urlExtra:`/${id}`
    })
    return response;
}

const rejectLoans = async (id:any): Promise<any> => {
    const response = await apiCall({
        name: "rejectLoan",
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"]),
        urlExtra:`/${id}`
    })
    return response;
}


const rejectLoanOffer = async (id:any): Promise<any> => {
    const response = await apiCall({
        name: "rejectOffer",
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"]),
        urlExtra:`/${id}`
    })
    return response;
}


const fetchLoanBalance = async (id:any): Promise<any> => {
    const response = await apiCall({
        name: "balances",
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"]),
        urlExtra:`/${id}`
    })
    return response;
}

const fetchRepaymentList = async (loanId:any): Promise<any> => {
    const response = await apiCall({
        name: "repaymentlist",
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"]),
        urlExtra:`/${loanId}`
    })
    return response;

}


const getLoanProperty = async (): Promise<any> => {
    const response = await apiCall({
        name: "getLoanProperty",
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"]),
    })
    return response;
}

const earlyRepayment = async (): Promise<any> => {
    const response = await apiCall({
        name: "earlyRepayment",
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"]),
    })
    return response;
}

const fetchLoanproduct = async (): Promise<any> => {
    const response = await apiCall({
        name: "getLoansProduct",
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"]),
    })
    return response;
}
const fetchImpactLoanEligibility = async (): Promise<any> => {
    const response = await apiCall({
        name: "getImpactLoanEligibility",
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"]),
    })
    return response;
}


export {earlyRepayment,rejectLoanOffer,rejectLoans,getLoanProperty,fetchLoanBalance, repayAllLoans, fetchRepaymentList,acceptLoan,repayLoan, fetchLoanRequests, loanRequest,fetchLoanproduct,fetchImpactLoanEligibility}