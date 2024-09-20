import { AxiosRequestHeaders } from "axios";
import { endPointlistTypes } from "../types";


//API END-PONT DOCUMENTATIONx
let headers = {
    'Content-Type': 'application/json',
    crossDomain: true,
} as unknown as AxiosRequestHeaders;

let FileHeaders = {
    'Content-Type': 'multipart/form-data',
    crossDomain: true,
} as unknown as AxiosRequestHeaders;


export const endPoints: endPointlistTypes | any = {

    //Authentication
    loginUser: {
        url: '/api/v1/login',
        method: 'POST',
        headers: headers,
    },
    validatePassword: {
        url: '/api/v1/auth/validatepassword',
        method: 'PUT',
        headers: headers,
        auth: true
    },
    changePassword: {
        url: '/api/v1/auth/changepassword',
        method: 'PUT',
        headers: headers,
    },
    validatePin: {
        url: '/api/v1/auth/validatepin',
        method: 'PUT',
        headers: headers,
        auth: true
    },
    changePin: {
        url: '/api/v1/auth/changepin',
        method: 'PUT',
        headers: headers,
    },
    forgotPin: {
        url: '/api/v1/auth/forgotpin',
        method: 'POST',
        headers: headers,
    },
    updatePassword: {
        url: '/api/v1/auth/updatepassword',
        method: 'POST',
        headers: headers,
    },
    resetPassword: {
        url: '/api/v1/auth/resetpassword',
        method: 'POST',
        headers: headers,
    },
    confirmBvn: {
        url: '/api/v1/bvn/getDetails',
        method: 'GET',
        headers: headers,
        auth: true
    },
    generateOtp: {
        url: '/api/v1/otp/generate',
        method: 'POST',
        headers: headers,
        auth: true
    },
    validateOtp: {
        url: '/api/v1/otp/validate',
        method: 'POST',
        headers: headers,
        auth: true
    },
    uploadUtility: {
        url: '/api/v1/document/upload_file',
        method: 'POST',
        headers: FileHeaders,
        auth: true
    },
    uploadMOI: {
        url: '/api/v1/merchant/upload_means_of_identity',
        method: 'POST',
        headers: FileHeaders,
        auth: true
    },
    uploadRegDoc: {
        url: '/api/v1/merchant/upload_business_reg_doc',
        method: 'POST',
        headers: FileHeaders,
        auth: true
    },
    listBanks: {
        url: '/api/v1/banks/getBanks',
        method: 'GET',
        headers: headers,
        auth: true
    },


    //fund transfer

    accNameEnquiry: {
        url: '/api/v1/fundsTransfer/nameEnquiry',
        method: 'POST',
        headers: headers,
        auth: true
    },

    listBeneficiary:{
        url: '/api/v1/Beneficiary/listBeneficiary',
        method: 'GET',
        headers: headers,
        auth: true
    },




    //dashboardStats
    dashboardStats: {
        url: '/api/v1/merchantdashboard/stats',
        method: 'GET',
        headers: headers,
        auth: true
    },
    topBranches: {
        url: '/api/v1/merchantdashboard/topBranches',
        method: 'GET',
        headers: headers,
        auth: true
    },
    transactionVolumes: {
        url: '/api/v1/merchantdashboard/transactionVolumes',
        method: 'GET',
        headers: headers,
        auth: true
    },
    recentTransaction: {
        url: '/api/v1/merchantdashboard/recentTransactions',
        method: 'GET',
        headers: headers,
        auth: true
    },

    //branch management
    listBranch: {
        url: '/api/v1/merchant/listBranch',
        method: 'GET',
        headers: headers,
        auth: true
    },

    branchTransactions: {

        url: '/api/v1/transaction/getBranchTransactionHistory',
        method: 'GET',
        headers: headers,
        auth: true
    },

    branchTransactionsStat: {

        url: '/api/v1/transaction/getBranchTerminalTransactionStat',
        method: 'GET',
        headers: headers,
        auth: true
    },
    createBranch: {
        url: '/api/v1/branch/createBranch',
        method: 'POST',
        headers: headers,
        auth: true
    },
    deleteBranch: {
        url: '/api/v1/branch/deleteBranch',
        method: 'DELETE',
        headers: headers,
        auth: true
    },
    deactivateBranch: {
        url: '/api/v1/branch/deactivate',
        method: 'PATCH',
        headers: headers,
        auth: true
    },
    branchDetails: {
        url: '/api/v1/branch/getBranch',
        method: 'GET',
        headers: headers,
        auth: true
    },
    branchTerminals: {
        url: '/api/v1/branch/listTerminals',
        method: 'GET',
        headers: headers,
        auth: true
    },

    //terminal management
    listTerminals: {
        url: '/api/v1/merchant/listTerminals',
        method: 'GET',
        headers: headers,
        auth: true
    },
    requestTerminal: {
        url: '/api/v1/terminal/requestTerminal',
        method: 'POST',
        headers: headers,
        auth: true
    },
    renameTerminal: {
        url: '/api/v1/terminal/renameTerminal',
        method: 'PUT',
        headers: headers,
        auth: true
    },
    repairTerminal: {
        url: '/api/v1/terminal/terminalRepairRequest',
        method: 'POST',
        headers: headers,
        auth: true
    },
    terminalDetails: {
        url: '/api/v1/terminal/getTerminal',
        method: 'GET',
        headers: headers,
        auth: true
    },
    terminalStats: {
        url: '/api/v1/terminal/terminalStats',
        method: 'GET',
        headers: headers,
        auth: true
    },
    terminalLinkRequest: {
        url: '/api/v1/terminal/linkTerminal',
        method: 'PUT',
        headers: headers,
        auth: true
    },
    terminalUnlinkRequest: {
        url: '/api/v1/terminal/terminalUnlinkRequest',
        method: 'PUT',
        headers: headers,
        auth: true
    },
    deactivateTerminal: {
        url: '/api/v1/terminal/deactivateTerminal',
        method: 'PUT',
        headers: headers,
        auth: true
    },

    //merchant management
    getMerchantDetails: {
        url: '/api/v1/merchant/getMerchants/user/',
        method: 'GET',
        headers: headers,
        auth: true
    },
    getNewMerchantDetails: {
        url: '/api/v1/merchant/getAcctNo/',
        method: 'GET',
        headers: headers,
        auth: true
    },
    getMerchant: {
        url: '/api/v1/merchant/getMerchants/user/',
        method: 'GET',
        headers: headers,
        auth: true
    },


    getMerchantAdmins: {
        url: '/api/v1/user/all',
        method: 'GET',
        headers: headers,
        auth: true
    },

    creaeteMerchantUser: {
        url: '/api/v1/user/create',
        method: 'POST',
        headers: headers,
        auth: true
    },

    creaeteMerchantAdmins: {
        url: '/api/v1/user/merchantAdmin',
        method: 'POST',
        headers: headers,
        auth: true
    },

    //merchant management
    getInstitutionDetails: {
        url: '/api/v1/merchant/getMerchants/user/',
        method: 'GET',
        headers: headers,
        auth: true
    },

    getInstitutionAdmins: {
        url: '/api/v1/user/all',
        method: 'GET',
        headers: headers,
        auth: true
    },

    creaeteInstitutionUser: {
        url: '/api/v1/user/create',
        method: 'POST',
        headers: headers,
        auth: true
    },

    deleteUser: {
        url: '/api/v1/user/deleteUser',
        method: 'PUT',
        headers: headers,
        auth: true
    },

    deactivateUser: {
        url: '/api/v1/user/deactivateUser',
        method: 'PUT',
        headers: headers,
        auth: true
    },
     
    editUser: {
        url: '/api/v1/merchant/updateProfile',
        method: 'PATCH',
        headers: headers,
        auth: true
    },

    creaeteInstitutionAdmins: {
        url: '/api/v1/user/merchantAdmin',
        method: 'POST',
        headers: headers,
        auth: true
    },

    //Transaction Management
    transSummary: {
        url: '/api/v1/transaction/getMerchantBranchTransactionSummary',
        method: 'GET',
        headers: headers,
        auth: true
    },

    transHistory: {
        url: '/api/v1/transaction/getMerchantTransactionHistory',
        method: 'GET',
        headers: headers,
        auth: true
    },

    eodReport: {
        url: '/api/v1/report/endOfDayReport',
        method: 'GET',
        headers: headers,
        auth: true
    },

    disburseFunds: {
        url: '/api/v1/fundsTransfer/disburse',
        method: 'POST',
        headers: headers,
        auth: true
    },
    balance: {
        url: '/api/v1/merchant/balance',
        method: 'GET',
        headers: headers,
        auth: true
    },
    getLoansList: {
        url: '/api/v1/loans/loans/getLoansList',
        method: 'GET',
        headers: headers,
        auth: true
    },
    requestLoan:{
        url: '/api/v1/loans/loans/requestLoan',
        method: 'POST',
        headers: headers,
        auth: true
    },
    acceptLoan:{
        url: '/api/v1/loans/loans/acceptLoan',
        method: 'POST',
        headers: headers,
        auth: true
    },
    repayloan:{
        url: '/api/v1/loans/loans/repayloan',
        method: 'POST',
        headers: headers,
        auth: true
    },
    repaymentlist:{
        url: '/api/v1/loans/loans/repaymentlist',
        method: 'GET',
        headers: headers,
        auth: true
    },
    getLoanProperty:{
        url: '/api/v1/loans/loans/getLoanProperty',
        method: 'GET',
        headers: headers,
        auth: true
    },
    payfullamount:{
        url: '/api/v1/loans/loans/payfullamount',
        method: 'POST',
        headers: headers,
        auth: true
    },
    balances:{
        url: '/api/v1/loans/loans/balance',
        method: 'GET',
        headers: headers,
        auth: true
    },
    rejectLoan:{
        url: '/api/v1/loans/loans/rejectLoan',
        method: 'POST',
        headers: headers,
        auth: true
    },
    rejectOffer:{
        url: '/api/v1/loans/loans/rejectOffer',
        method: 'POST',
        headers: headers,
        auth: true
    },
    earlyRepayment:{
        url: '/api/v1/loans/loans/earlyRepayment',
        method: 'POST',
        headers: headers,
        auth: true
    },
    
    //roles management
    getRoles: {
        url: '/api/v1/roles/all',
        method: 'GET',
        headers: headers,
        auth: true
    },

    selfOnboarding: {
        url: '/api/v1/merchant/selfOnboarding',
        method: 'POST',
        headers: headers,
    },
    deleteAccount: {
        url: '/api/v1/user/close-account-request',
        method: 'POST',
        headers: headers,
    },

     //Payment Link
     createPaymentLink: {
        url: '/api/v1/paymentlinks/createPaymentLink',
        method: 'POST',
        headers: headers,
        auth: true
    },

    createSplitLink: {
        url: '/api/v1/split/createBranch',
        method: 'POST',
        headers: headers,
        auth: true
    },


    getAllSplitLinks: {
        url: '/api/v1/paymentlinks/getAllSplitLinks/',
        method: 'GET',
        headers: headers,
        auth: true
    },
    getAllSingleLink: {
        url: '/api/v1/paymentlinks/getAllSingleLink/',
        method: 'GET',
        headers: headers,
        auth: true
    },
    getAllBusinessLinks: {
        url: '/api/v1/paymentlinks/getAllBusinessLinks/',
        method: 'GET',
        headers: headers,
        auth: true
    },
    getAllBranchLinks: {
        url: '/api/v1/paymentlinks/getAllBranchLinks/',
        method: 'GET',
        headers: headers,
        auth: true
    },
}
