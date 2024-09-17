import { apiCall } from "../Utils/URLs/axios.index";




const fetchTerminalData = async (pageNo: any = 0, pageSize: any = 10, search: any = "", status: any = "", isExport: any = false): Promise<any> => {

    const response = await apiCall({
        name: "listTerminals",
        params: {
            pageNo,
            pageSize,
            searchTerminal: search,
            filterStatus: status,
            isExport
        },
        action: (): any => (["skip"])
    })
    return response;
}

const terminalPerformance = async (
    dateFrom: string,
    dateTo: string
    ): Promise<any> => {
    const response = await apiCall({
        name: "terminalPerformance",
        params: {
            dateFrom,
            dateTo
        },
        action: (): any => (["skip"])
    })
    return response;
}

const fetchRequestTerminal = async (branchId:any,numberOfTerminals:any,description:any,giveMoreDetails:any): Promise<any> => {

    const response = await apiCall({
        name: "requestTerminal",
        data: {
             branchId,
             numberOfTerminals,
             description,
             giveMoreDetails
        },
        action: (): any => (["skip"]),
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

const repairTerminalRequest = async (branch:any,terminalId:any,description:any): Promise<any> => {

    const response = await apiCall({
        name: "repairTerminal",
        data: {
             terminalId,
             branch,
             issue:description
        },
        action: (): any => (["skip"]),
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

const fetchTerminalDetailData = async (id: any): Promise<any> => {

    const response = await apiCall({
        name: "terminalDetails",
        urlExtra: `/${id}`,
        action: (): any => (["skip"])
    })
    return response;
}

const fetchTerminalStatsData = async (): Promise<any> => {

    const response = await apiCall({
        name: "terminalStats",
        action: (): any => (["skip"])
    })
    return response;
}

const deleteTerminal = async (delId: any, handleDeleting: (val: boolean) => void) => {
    handleDeleting(true);
    try {
        const response = await apiCall({
            name: "deleteTerminal",
            urlExtra: `/${delId}`,
            action: (): any => {
                handleDeleting(false);
                return []
            },
            successDetails: { title: "Successful!", text: "Terminal deleted successfully", icon: "" },
            errorAction: (err?: any) => {
                if (err && err?.response?.data) {
                    handleDeleting(false);
                    return []
                } else {
                    handleDeleting(false);
                }
            }
        })
    } catch (e) {
        console.error(e + " 'Caught Error.'");
    };
}

const deactivateTerminal = async (delId: any, handleDeactivating: (val: boolean) => void) => {
    handleDeactivating(true);
    try {
        const response = await apiCall({
            name: "deactivateTerminal",
            urlExtra: `/${delId}`,
            action: (): any => {
                handleDeactivating(false);
                return []
            },
            successDetails: { title: "Successful!", text: "Terminal deactivated successfully", icon: "" },
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

export {terminalPerformance, fetchTerminalData, fetchTerminalDetailData, fetchTerminalStatsData, deleteTerminal, deactivateTerminal,fetchRequestTerminal,repairTerminalRequest };