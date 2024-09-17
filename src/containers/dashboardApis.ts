import { Storage } from "../Utils/Stores/inAppStorage";
import { apiCall } from "../Utils/URLs/axios.index";

const fetchDashData = async (): Promise<any> => {

    const response = await apiCall({
        name: "dashboardStats",
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"])
    })
    return response;
}

const getBalance = async (): Promise<any> => {

    const response = await apiCall({
        name: "balance",
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"])
    })
    return response;
}

const getPreviousDayCollection = async (): Promise<any> => {

    const response = await apiCall({
        name: "yesterdaysCollection",
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"])
    })
    return response;
}


const fetchMerchantData = async (): Promise<any> => {

    const { userId } = Storage.getItem("userDetails") || {};

    const response = await apiCall({
        name: "getMerchantDetails",
        urlExtra: `${userId?.entityId || userId || 0}`,
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"])
    })
        .then(async (res: any) => {
            const { token } = res;
            const { id, name, email, phone, description, category, type, pin, bvn } = res;

            await Storage.setItem('merchantDetails', res || {})
        })
    return response;
}

const fetchAMerchantData = async (id: any): Promise<any> => {
    try {
        const response = await apiCall({
            name: "getMerchantDetails",
            urlExtra: `${id || 0}`,
            action: (): any => (["skip"]),
            errorAction: (): any => ([""])
        })
        return response;
    } catch (e) {
        console.error("error>>",e)
    }
}

const fetchDashBranchData = async (): Promise<any> => {

    const response = await apiCall({
        name: "topBranches",
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"])
    })
    return response;
}
//getCollectionBalance
const fetchCollectionBalance = async (): Promise<any> => {

    const response = await apiCall({
        name: "getCollectionBalance",
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"])
    })
    return response;
}
const fetchRecentTransaction = async (): Promise<any> => {

    const response = await apiCall({
        name: "recentTransaction",
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"])
    })
    return response;
}

const fetchMerchantDashboardStats = async (pageNo: any, pageSize: any, search: any,
    tranType: any, isExport: any, dateBefore: any, dateAfter: any, status: any
): Promise<any> => {

    const response = await apiCall({
        name: "merchantStats",
        params: {
            pageNo,
            pageSize,
            search,
            tranStatus: status,
            tranType,
            // action:tranType,
            isExport,
            dateBefore,
            dateAfter
        },
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"])
    })
    return response;
}


export {getPreviousDayCollection,fetchCollectionBalance, fetchDashData, fetchMerchantData, fetchDashBranchData, fetchAMerchantData , getBalance , fetchRecentTransaction, fetchMerchantDashboardStats};