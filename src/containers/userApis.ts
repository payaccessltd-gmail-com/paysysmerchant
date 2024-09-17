import { Storage } from "../Utils/Stores/inAppStorage";
import { apiCall } from "../Utils/URLs/axios.index";





const fetchMerchantAdminsData = async (pageNo: any, pageSize: any, search: string, role: string, status: string): Promise<any> => {

    const response = await apiCall({
        name: "getMerchantAdmins",
        params: {
            pageNo,
            pageSize,
            isEnabled:status,
            search,
            role
        },
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"])
    })
    return response;
}

const createMerchantAdmin=async(firstName:any,lastName:any,email:any,password:any,username:any,roleId:any,branchId:any): Promise<any> =>{
    const response = await apiCall({
        name: "creaeteMerchantAdmins",
        data: {
          firstName,
          lastName,
          email,
          password,
          username,
          accountType: "BRANCH",
          roleId,
          branchId,
        },
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"])
    })
    return response;
}
const deleteAccountApi=async(firstName:any,lastName:any,email:any): Promise<any> =>{
    const response = await apiCall({
        name: "deleteAccount",
        data: {
          firstName,
          lastName,
          email,
        },
        action: (): any => (['success']),
        successDetails: { title: " success", text: "Thank you for your request. Your account closure process has begun, and you will receive a confirmation email shortly. For any inquiries, please contact our customer support.", icon: "" },
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

const fetchRoles = async (id: any = "", accType: any = ""): Promise<any> => {

    const { userId, accountType } = Storage.getItem("userDetails")

    const response = await apiCall({
        name: "getRoles",
        urlExtra: `/${userId}`,
        params: {
            roleLevel: accType || accountType,
            institutionID: id || userId
        },
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"])
    })
    return response;
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


export { fetchMerchantAdminsData, fetchRoles, deleteBranch, deactivateBranch,createMerchantAdmin,deleteAccountApi };