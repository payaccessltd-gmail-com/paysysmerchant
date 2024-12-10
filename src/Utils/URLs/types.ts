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
    auth?: boolean;
    urlExtra?: string
}

export type endPointlistTypes = {
    loginUser: endpointTypes;
    updateTerminal: endpointTypes;
    validatePin: endpointTypes;
    validatePassword: endpointTypes;
    changePin: endpointTypes;
    changePassword: endpointTypes;
    forgotPin: endpointTypes;
    dashboardStats: endpointTypes;
    deleteBranch: endpointTypes;
    deactivateBranch: endpointTypes;
    branchDetails: endpointTypes;
    listTerminals: endpointTypes;
    terminalDetails: endpointTypes;
    requestTerminal: endpointTypes;
    terminalStats: endpointTypes;
    getMerchantDetails: endpointTypes;
    getNewMerchantDetails: endpointTypes;
    renameTerminal: endpointTypes;
    repairTerminal: endpointTypes;
    terminalUnlinkRequest: endpointTypes;
    terminalLinkRequest: endpointTypes;
    deactivateTerminal: endpointTypes;
    transSummary: endpointTypes;
    transHistory: endpointTypes;
    topBranches: endpointTypes;
    getRoles: endpointTypes;
    selfOnboarding: endpointTypes;
    updatePassword: endpointTypes;
    resetPassword: endpointTypes;
    branchTerminals: endpointTypes;
    confirmBvn: endpointTypes;
    generateOtp: endpointTypes;
    validateOtp: endpointTypes;
    uploadMOI: endpointTypes;
    uploadRegDoc: endpointTypes;
    listBanks: endpointTypes;
    listInstitution: endpointTypes;
    createInstitution: endpointTypes;
    createInstitutionUser: endpointTypes;
    listMerchant: endpointTypes;
    institutionListMerchant: endpointTypes;
    createMerchant: endpointTypes;
    createMerchanUser: endpointTypes;
    deleteMerchant: endpointTypes;
    deactivateMerchant: endpointTypes;
    getAllUsers: endpointTypes;
    listApproval: endpointTypes;
    authorizeApproval: endpointTypes;
    getBranchList:endpointTypes;
    accNameEnquiry: endpointTypes;
    createBranch:endpointTypes;
    inactiveTerminal:endpointTypes;
    EODTerminal:endpointTypes;
    tranSummary:endpointTypes;
    totalOnboarded:endpointTypes;
    reliabilityReport:endpointTypes;
    merchantTransaction:endpointTypes;
    aggregatorsTransaction:endpointTypes;
    aggregatorsMerchant:endpointTypes;
    terminalData:endpointTypes;
    merchantData:endpointTypes;
    topMerchantData:endpointTypes;
    recentTransactionData:endpointTypes;
    collectionBalances:endpointTypes;
    getBranchDetails:endpointTypes;
    merchantCount:endpointTypes;
    terminalCount:endpointTypes;
    getAllTransactionDetails:endpointTypes;
    superadminUpdateAdminUser:endpointTypes;
    deactivateUser:endpointTypes;
    editMerchant:urlPropTypes;
    ReverseFunds:endpointTypes;
    getMerchantWithdrawals:endpointTypes;
    bettingPlans:endpointTypes;
    electricityPlans:endpointTypes;
    cableTvPlans:endpointTypes;
    validateVas:endpointTypes;
    electricitySub:endpointTypes;
    cableTvSub:endpointTypes;
    bettingSub:endpointTypes;
    createPaymentLink:endPointlistTypes;
    createSplitLink:endPointlistTypes;
    getAllSplitLinks: endPointlistTypes;
    getAllBusinessLinks: endPointlistTypes;
    getAllSingleLink: endPointlistTypes;
    getAllBranchLinks: endPointlistTypes;
    uploadBulkPaySchedule:endPointlistTypes;
    deleteBulkUploadItemId:endPointlistTypes;
    deleteBeneficiaryId:endPointlistTypes;
    CreateBeneficiary:endPointlistTypes;
    CreateBeneficiaryItem:endPointlistTypes;
    getBulkUploadSchedule:endPointlistTypes;
    getAllbeneficiaryList:endPointlistTypes;
    getAllbeneficiaryItemId:endPointlistTypes;

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


// Example file: src/types/businessType.ts
export enum MerchantTypeEnum {
    INDIVIDUAL,
    CORPORATE
}


export enum IdentityTypeEnum {
    NIN, PASSPORT, VOTERS_CARD, DRIVERS_LICENSE , SELFIE, BVN, CAC
}