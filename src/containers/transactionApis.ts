import { Storage } from "../Utils/Stores/inAppStorage";
import { apiCall } from "../Utils/URLs/axios.index";


const fetchTranSummaryData = async (pageNo: any, pageSize: any, branch: any, dateRangeBefore: any, dateRangeAfter: any): Promise<any> => {

    const response = await apiCall({
        name: "transSummary",
        params: {
            pageNo,
            pageSize,
            branch,
            dateRangeBefore,
            dateRangeAfter: dateRangeAfter
        },
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"])
    })
    return response;
}


const fetchTransactonsData = async (pageNo: any, pageSize: any): Promise<any> => {

    const response = await apiCall({
        name: "transSummary",
        params: {
            pageNo,
            pageSize,
        },
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"])
    })
    return response;
}

const fetchTransHistoryData = async (pageNo: any, pageSize: any, search: any,
    tranType: any, isExport: any, dateRangeBefore: any, dateRangeAfter: any, status: any
): Promise<any> => {

    const response = await apiCall({
        name: "transHistory",
        params: {
            pageNo,
            pageSize,
            search,
            tranStatus: status,
            tranType,
            // action:tranType,
            isExport,
            dateRangeBefore,
            dateRangeAfter
        },
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"])
    })
    return response;
}

const transactionDetails=async(id:any): Promise<any>=>{
    const response = await apiCall({
        name: "transDetails",
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"]),
        urlExtra:id
    })
    return response;
}
const recentWithdrawals=async(pageNo: any,pageSize:any,startDate:any,endDate:any): Promise<any>=>{
    const response = await apiCall({
        name: "getMerchantWithdrawals",
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"]),
        params:{
            page:pageNo,
            size:pageSize,
            startDate,
            endDate
        }
        // urlExtra:id
    })
    return response;
}

const recentBiliing=async(pageNo: any,pageSize:any,startDate:any,endDate:any): Promise<any>=>{
    const response = await apiCall({
        name: "bettingHistory",
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"]),
        params:{
            page:pageNo,
            size:pageSize,
            startDate,
            endDate
        }
        // urlExtra:id
    })
    return response;
}
const fetchBalanceData = async (pageNo: any, pageSize: any): Promise<any> => {

    const response = await apiCall({
        name: "transSummary",
        params: {
            pageNo,
            pageSize,
        },
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"])
    })
    return response;
}


const fetchEODData = async (idT: any, branchId: any, type: any, isExport: any, start: any, end: any, pageNo: any, pageSize: any): Promise<any> => {

    const { id, userid } = Storage.getItem("merchantDetails") || {}

    const response = await apiCall({
        name: "eodReport",
        params: {
            id: userid?.entityId || id || 0,
            branchId,
            type,
            isExport:true,
            start,
            end,
            // pageNo,
            // pageSize,
        },
        successDetails: { title: "EOD Generated", text: "Your EOD report has been generated and sent successfully.", icon: "" },
        action: (): any => (["success"]),
        errorAction: (err?: any) => {
            if (err && err?.response?.data) {
                return [""]
            } else {
                return [""]
            }
        }
    })
    return response;
}

const fetchDataPlans = async (): Promise<any> => {

    const response = await apiCall({
        name: "getDataPlans",
        params: {},
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"])
    })
    return response;
}

const airtimePurchase = async (payload:{}): Promise<any> => {

    const response = await apiCall({
        name: "airtimePurchase",
        data: payload,
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"])
    })
    return response;
}

const dataPurchase = async (payload:{}): Promise<any> => {

    const response = await apiCall({
        name: "dataPurchase",
        data: payload,
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"])
    })
    return response;
}





export { fetchTranSummaryData,recentWithdrawals, fetchTransactonsData, fetchTransHistoryData, fetchEODData, fetchBalanceData,transactionDetails, fetchDataPlans,airtimePurchase, dataPurchase,recentBiliing}
