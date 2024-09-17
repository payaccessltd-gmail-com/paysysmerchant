import classNames from "classnames";
 import toast, { Toaster } from "react-hot-toast";
import { MdOutlineClose } from "react-icons/md";
import { HiLightningBolt } from "react-icons/hi";

 import styles from "./actions.module.css";


export const notify = ({ header, details, icon }: any) =>
    toast.custom(
        (t: any) => (
            <div
                className={classNames([
                    styles?.notificationWrapper,
                    t.visible ? "top-0 " : "-top-96",'bg-white rounded-md md:!max-w-[40vw] p-[20px] text-center relative shadow-md border-2 transition-all duration-300'
                ])}
            >
                <div className={`${styles?.iconWrapper,!t.visible&&''} grid m-auto justify-center items-center`}>
                    <span style={{ width: 10, height: 10 }} className='m-auto' >
                        {icon || <HiLightningBolt />}
                    </span>
                <div className={`mt-[40px]`}>
                    <h1 className="font-bold text-lg">{header || ""}</h1>
                    <p>
                        {details || ""}
                    </p>
                </div>
                <div className='absolute top-[5%] right-[5%]' >
                    <MdOutlineClose className="cursor-pointer" color="black" onClick={() => toast.dismiss(t.id)}/>
                </div>
                </div>
            </div>
        ),
        { id: "unique-notification", position: "top-center" }
    );