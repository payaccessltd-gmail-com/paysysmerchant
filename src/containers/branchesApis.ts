import { apiCall } from "../Utils/URLs/axios.index";


const fetchBranchData = async (
    pageNo: any = 0, pageSize: any = 10,
    search: any = "", status: any = "",
    isExport: any = false
): Promise<any> => {

    const response = await apiCall({
        name: "listBranch",
        params: {
            pageNo,
            pageSize,
            searchBranchName: search,
            filterStatus: status,
            isExport
        },
        action: (): any => (["skip"])
    })
    return response;
}

const branchPerformance = async (
    dateFrom: string,
    dateTo: string
    ): Promise<any> => {
    const response = await apiCall({
        name: "branchPerformance",
        params: {
            dateFrom,
            dateTo
        },
        action: (): any => (["skip"])
    })
    return response;
}


const fetchBranchDetailData = async (id: any): Promise<any> => {
    if (id) {
        const response = await apiCall({
            name: "branchDetails",
            urlExtra: `/${id}`,
            action: (): any => (["skip"])
        })
        return response;
    }
}

const fetchBranchTransData = async (
    id: any, pageNo: any,
    pageSize: any, search: any,
    status: any, tranType: any,  
    collectionType: any, isExport: any,
    dateRangeBefore: any = "",
    dateRangeAfter: any = "",
): Promise<any> => {
    if (id) {
        const response = await apiCall({
            name: "branchTransactions",
            params: {
                branchId: id,
                pageNo,
                pageSize,
                search,
                tranStatus:status,
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
}

const fetchBranchTransStatData = async (id: any): Promise<any> => {
    if (id) {
        const response = await apiCall({
            name: "branchTransactionsStat",
            urlExtra: `/${id}`,
            // params: {
            //     pageNo,
            //     pageSize,
            // },
            action: (): any => (["skip"]),
            errorAction: (): any => (["skip"])
        })
        return response;
    }
}

const deleteBranch = async (delId: any, handleDeleting: (val: boolean) => void) => {
    handleDeleting(true);
    try {
        const response = await apiCall({
            name: "deleteBranch",
            urlExtra: `/${delId}`,
            action: (): any => {
                handleDeleting(false);
                return []
            },
            successDetails: { title: "Successful!", text: "Branch deleted successfully", icon: "" },
            errorAction: (err?: any) => {
                if (err && err?.response?.data) {
                    handleDeleting(false);
                    return []
                } else {
                    handleDeleting(false);
                }
            }
        })
        window.location.reload();
    } catch (e) {
        console.error(e + " 'Caught Error.'");
    };
}

const deactivateBranch = async (delId: any, handleDeactivating: (val: boolean) => void) => {
    handleDeactivating(true);
    try {
        const response = await apiCall({
            name: "deactivateBranch",
            urlExtra: `/${delId}`,
            action: (): any => {
                handleDeactivating(false);
                return []
            },
            successDetails: { title: "Branch deactivated successfully", text: "", icon: "" },
            errorAction: (err?: any) => {
                if (err && err?.response?.data) {
                    handleDeactivating(false);
                    return []
                } else {
                    handleDeactivating(false);
                }
            }
        })
    } catch (e) {
        console.error(e + " 'Caught Error.'");
    };
}

export {branchPerformance, fetchBranchData, fetchBranchDetailData, deleteBranch, deactivateBranch, fetchBranchTransData, fetchBranchTransStatData };