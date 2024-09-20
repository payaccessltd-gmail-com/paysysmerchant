import React, { InputHTMLAttributes } from "react"
import { MouseEventHandler } from "react"
import { AxiosRequestHeaders } from "axios";


export type DefaultButtonType = {
    handleClick?: MouseEventHandler<HTMLButtonElement> | undefined,
}

export type endpointTypes = {
    url: string;
    method: string;
    headers?: AxiosRequestHeaders | undefined;
    auth?: boolean
}

export type endPointlistTypes = {
    loginUser: endpointTypes;
    validatePin: endpointTypes;
    validatePassword: endpointTypes;
    changePin: endpointTypes;
    changePassword: endpointTypes;
    forgotPin: endpointTypes;
    dashboardStats: endpointTypes;
    transactionVolumes: endpointTypes;
    recentTransaction: endpointTypes;
    listBranch: endpointTypes;
    createBranch: endpointTypes;
    deleteBranch: endpointTypes;
    deactivateBranch: endpointTypes;
    branchDetails: endpointTypes;
    listTerminals: endpointTypes;
    terminalDetails: endpointTypes;
    requestTerminal: endpointTypes;
    terminalStats: endpointTypes;
    getMerchantDetails: endpointTypes;
    getNewMerchantDetails: endPointlistTypes;
    getMerchant: endpointTypes;
    renameTerminal: endpointTypes;
    repairTerminal: endpointTypes;
    terminalUnlinkRequest: endpointTypes;
    terminalLinkRequest: endpointTypes;
    deactivateTerminal: endpointTypes;
    transSummary: endpointTypes;
    transHistory: endpointTypes;
    disburseFunds: endpointTypes;
    getMerchantAdmins: endpointTypes;
    topBranches: endpointTypes;
    getRoles: endpointTypes;
    selfOnboarding: endpointTypes;
    updatePassword: endpointTypes;
    resetPassword: endpointTypes;
    branchTerminals: endpointTypes;
    confirmBvn: endpointTypes;
    generateOtp: endpointTypes;
    validateOtp: endpointTypes;
    uploadUtility: endpointTypes;
    uploadMOI: endpointTypes;
    uploadRegDoc: endpointTypes;
    listBanks: endpointTypes;
    branchTransactions: endpointTypes;
    creaeteMerchantAdmins: endpointTypes;
    creaeteMerchantUser: endpointTypes;
    getInstitutionDetails: endpointTypes;
    getInstitutionAdmins: endpointTypes;
    creaeteInstitutionUser: endpointTypes;
    editUser: endpointTypes;
    deleteUser: endpointTypes;
    deactivateUser: endpointTypes;
    creaeteInstitutionAdmins: endpointTypes;
    accNameEnquiry: endpointTypes;
    branchTransactionsStat: endpointTypes;
    eodReport: endpointTypes;
    balance:endpointTypes;
    getLoansList: endpointTypes;
    listBeneficiary:endpointTypes;
    requestLoan: endPointlistTypes;
    acceptLoan: endPointlistTypes;
    repayLoan: endPointlistTypes;
    createPaymentLink: endPointlistTypes;
    createSplitLink: endPointlistTypes;
    getAllSplitLinks: endPointlistTypes;
    getAllBusinessLinks: endPointlistTypes;
    getAllSingleLink: endPointlistTypes;
    getAllBranchLinks: endPointlistTypes;
}


export type urlPropTypes = {
    urlExtra?: string
    name?: string
    data?: any
    params?: any
    action?: (data: any) => string[] | undefined
    errorAction?: (err: any) => string[] | undefined
    successDetails?: { title: any; text: any; icon: any; }
}

export type lecPropTypes = {
    textVariant?: string,
    containerVariant?: string,
    error?: string
    handleClick?: MouseEventHandler<HTMLDivElement> | undefined,
    handleClear?: MouseEventHandler<HTMLDivElement> | undefined,

}

export type stateTypes = {
    Abia: string[],

    Adamawa: string[],
    "Akwa Ibom": string[],
    Anambra: string[],
    Bauchi: string[],
    Benue: string[],
    Borno: string[],
    Bayelsa: string[],
    "Cross River": string[],
    Delta: string[],
    Ebonyi: string[],
    Edo: string[],
    Ekiti: string[],
    Enugu: string[],
    "Federal Capital Territory": string[],
    Gombe: string[],
    Imo: string[],
    Jigawa: string[],
    Kebbi: string[],
    Kaduna: string[],
    Kano: string[],
    Kogi: string[],
    Katsina: string[],
    Kwara: string[],
    Lagos: string[],
    Nassarawa: string[],
    Niger: string[],
    Ogun: string[],
    Ondo: string[],
    Osun: string[],
    Oyo: string[],
    Plateau: string[],
    Rivers: string[],
    Sokoto: string[],
    Taraba: string[],
    Yobe: string[],
    Zamfara: string[]
}