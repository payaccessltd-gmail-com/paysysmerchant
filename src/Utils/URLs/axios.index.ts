import axios from "axios";
import { urlPropTypes } from "./types";
import { endPoints } from './apiLib'
// import errorAlert from '../../actions/error'
// import successAlert from '../../actions/success'
import errorHandler from "../Stores/errorHandler";
import successAlert from "../HttpResponseHandlers/success";
import { Storage } from "../Stores/inAppStorage";
import { baseURL } from "./api.env";

const baseUrl = (): any => `${baseURL}`;
// For testing purposes only
export const _set_root_url = (newUrl: any): any => newUrl



export const apiCall = ({ urlExtra, name, data = {}, params = {}, action = () => undefined, errorAction = () => undefined, successDetails = { title: "", text: "", icon: "" } }: urlPropTypes) => new Promise((res, rej) => {

    let theName = name as keyof typeof endPoints
    let userDetails: any = Storage?.getItem('userDetails') || '{}'
    let { token } = userDetails || { token: "" }

    let headers: any = endPoints[theName] ? endPoints[theName].headers ? endPoints[theName].headers : {} : {}

    if (endPoints[theName]?.auth) headers['Authorization'] = `Bearer ${token}`

    axios({
        url: `${baseUrl()}${endPoints[theName] ? endPoints[theName].url : ""}${urlExtra ? urlExtra : ""}`,
        method: endPoints[theName] ? endPoints[theName].method : "",
        headers: endPoints[theName] ? endPoints[theName].headers : undefined,
        data,
        params
    })
        .then(async r => {
            const returned = await action(r.data);
            if (r.status === 401 ) {
                // Handle 401 Unauthorized error (log out and redirect to login)
                // Example: Redirect to the login page
                window.location.href = '/';
              //  console.log(r,'from the api')
            } 
            else if ((r.data.respCode === "00" ||  r.data.respCode === "SUCCESS" || r.data.respCode==='OK' || r.data.respCode === "200") && !returned?.includes("skip")) {
                successAlert(successDetails, r.data);
             //   console.log("successZZZ>>>", successDetails)
             //   console.log("successYYY>>>",  r.data)
                r?.data?.respBody ? res(r.data.respBody) : res(r.data)
            } else if (r.data.respCode === "00" || r.status === 200 ||r.data.respCode === "200" ) {
                r?.data?.respBody ? res(r.data.respBody) : res(r.data)
            }
            else if (r.data.respCode !== "00" && r.status !== 200) {
                errorHandler(r)
            } else if (returned?.includes("push")) {
                successAlert(successDetails, r.data)
            } else {
                console.error("Response Error 1:", r)
            }
        })
        .catch(async err => {
            // console.error('errrrrrrrrr>>>', err);
            const returned = await errorAction(err)
            if (!returned?.includes("skip")) {
                console.error("Response Error 2:", err)
                errorHandler(err)
                rej(err)
            } else {
                console.error("Response Error 3:", err)
                rej(err);
                return err
            }
        });
});
