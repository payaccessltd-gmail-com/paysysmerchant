import { apiCall } from "../Utils/URLs/axios.index";

const listBeneficiaries = async (pageNo:any=0, pageSize:any=10, beneficiaryType:any): Promise<any> => {

    const response = await apiCall({
        name: "listBeneficiary",
        params: {
            pageNo,
            pageSize,
            beneficiaryType
        },
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"])
    })
    return response;
}
///v1/Beneficiary/delete  listTransactions
const deleteBeneficiary = async (id: any) => {
    const response = await apiCall({
        name: "delete",
        urlExtra: `/${id}`,
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"])
    })
    return response;
}

const listBeneficiaryTransactions = async (pageNo:any,pageSize:any ,id: any) => {
    const response = await apiCall({
        name: "listTransactions",
        params: {
            pageNo,
            pageSize,
            beneficiaryId: id
        },
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"])
    })
    return response;
}

export {  listBeneficiaries, deleteBeneficiary, listBeneficiaryTransactions};