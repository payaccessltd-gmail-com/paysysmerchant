import React, { useEffect, useState } from 'react';
import { Image } from "../../../assets";
import { listBeneficiaryTransactions } from '../../../containers/withdrawalApis';
import dayjs from "dayjs";
import { SpinnerIcon } from '../../../components/reusables/icons';
import { useLocation } from 'react-router-dom';

function ResipientsTransferList() {
    const [content, setContent] = useState<any>([]);
    const [pageLength, setPageLength] = useState<any>(6);
    const [pageFetched, setPageFetched] = useState<any>(false);
    const location = useLocation();
    const { state }: any = location;
    // console.log("testings>>>", state);

    function getBeneficiaryTransfers() {
        listBeneficiaryTransactions(0, 10, state?.id).then((res: any) => {
           // console.log("res123>>>", res?.content);
            setContent(res?.content);
            setPageFetched(true);
        }).catch((err: any) => {
            console.error("error>>>", err);
            setPageFetched(true)
        })
    }

    useEffect(() => {
        getBeneficiaryTransfers();
    }, [])

    const showAll = () => {
        if (pageLength === 6) {
            setPageLength(10);
            //   console.log("page length>>", pageLength);
        } else if (pageLength === 10) {
            setPageLength(6);
            //  console.log("page length>>", pageLength);
        }
    }
    //content.slice(0, pageLength)       let arrayOfTenRows = new Array(10).fill(null);
    let arrayOfTenRows:any = new Array(10).fill(null);

    const tableValue = content.slice(0, pageLength)?.map((item: any, index: number) => (
        <>
            <div className="grid grid-cols-3 gap-4" key={index}>
                <div className=" p-4 font-medium">
                    {/* {item?.transactionDate} */}
                    {dayjs(item?.transactionDate || new Date() || "N/A").format(
                        "MMM DD, YYYY hh:mm:ss"
                    )}
                </div>
    
                <div className="max-w-full p-4">
                {/* {`${item?.bankName} - ${item?.accountNumber}`} */}
                  <span className='font-medium'>{item?.bankName || "N/A"}</span> - <span>{item?.accountNumber || "N/A"}</span>  
                </div>
           
                <div className="font-medium p-4">
                    {`NGN ${item?.amount || "N/A"}`}
                </div>
            </div>
            <hr />
        </>
    ))

    return (
        <>
            <div className="max-h-500  p-[20px] cursor-pointer bg-[#F9F9F9] w-full m-auto grid items-center justify-center"  style={{ marginTop: '-60px' }}>
                {
                    content?.length === 0 ?
                        <div>
                            {
                                pageFetched === true ?
                                    <>
                                        <img src={Image.folder} alt="" className="m-auto" />
                                        <p className="text-center text-[16px]">No transfers</p>
                                        <p className="text-center text-[16px]">
                                            {" "}
                                            This recipient hasn't recieved any successful transfers
                                        </p>
                                    </>
                                    :
                                    <>
                                        <SpinnerIcon />
                                    </>

                            }

                        </div>
                        :
                        <>
                        {/* style={{ marginTop: '-600px' }}fixed top-40  */}
                            <div className='max-h-500 overflow-y-auto ' style={{ marginTop: '10px' }} >
                                <div className="grid grid-cols-3 gap-4 static top-0 right-0 ">
                                    <div className=" p-4 font-medium" >Recent Transfers</div>
                                    <div className=" p-4"></div>
                                    <div className=" p-4" onClick={() => showAll()}>
                                        {
                                            pageLength === 6 ?
                                                <>
                                                    <a className='text-blue-700 cursor-pointer hover:underline font-bold' >View All</a>
                                                </>
                                                : pageLength === 10 ?
                                                    <>
                                                        <a className='text-blue-700 cursor-pointer hover:underline' >View less</a>
                                                    </>
                                                    :
                                                    <></>
                                        }
                                    </div>
                                </div>
                                <br />

                                {tableValue}
                            </div>
                        </>
                }
            </div>
        </>
    )
}

export default ResipientsTransferList


