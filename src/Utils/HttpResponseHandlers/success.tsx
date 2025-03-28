
import React from "react";
import { notify } from "./toaster";
import { PaysysIcon } from "../../components/reusables/icons";


export default function successAlert(details: { title: any; text: any; icon: any; }, response: { data: any; errs: any; message: any; statusCode: any; }) {


    const { title, text, icon } = details || {}
    const { data, errs, message, statusCode } = response || {}

  

    return notify({ header: `${title ? title : "Successful!"}`, details: text ? text : message ? message : null, icon: <PaysysIcon /> })
}