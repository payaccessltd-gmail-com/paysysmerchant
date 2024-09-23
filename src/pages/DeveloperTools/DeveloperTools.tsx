

import CustomCopyText from "../../components/CustomCopyText";
import DashboardLayout from "../../components/dashboard/Index";
import { Button } from "../../components/reusables/DefaultButton";

const DeveloperTools = () => {
  return (
    <DashboardLayout>
      <p className="text-[40px] font-bold text-[#177196]">Developers Tools</p>

      <div className="lg:w-[50%] m-auto mt-[55px] grid gap-[20px]">
        <div className="border-[2px] bg-white p-[20px] rounded-lg border-[#EEF8FF] grid gap-[20px]">
          <div className="grid text-center">
            <p className=" font-bold text-[16px] text-[#0C394B]">
              API Configuration (Test mode)
            </p>
            <p className="text-[14px] text-[#0C394B]">Test Mode</p>
          </div>

          <div className="grid">
            <CustomCopyText
              label="Test Secret  Key"
              text="PAY23456789000444444434567"
            />
            <p className="text-[#CA6B1B] text-[12px] font-bold">
              Generates new Secret key{" "}
            </p>
          </div>
          <CustomCopyText
            label="Test Public Key"
            text="PA2344-5566-7788-9900-98888"
          />
        </div>

        <div className="border-[2px] bg-white p-[20px] rounded-lg border-[#EEF8FF] grid gap-[20px]">
          <div className="grid text-center">
            <p className=" font-bold text-[16px] text-[#0C394B]">
            Merchant Credentials
            </p>
            <p className="text-[14px] text-[#0C394B]">Test Mode</p>
          </div>

            <CustomCopyText
              label="Merchant Code"
              text="PAY23456789000444444434567"
            />
           <CustomCopyText
              label="Client ID"
              text="PAY23456789000444444434567"
            />
          <CustomCopyText
            label="Pay Item ID"
            text="PA2344-5566-7788-9900-98888"
          />
        </div>

        <div className="border-[2px] bg-white p-[20px] rounded-lg border-[#EEF8FF] grid gap-[20px]">
          <div className="grid text-center">
            <p className=" font-bold text-[16px] text-[#0C394B]">
            Wed hook for Goodness oil & Gas
            </p>
            <p className="text-[14px] text-[#0C394B]">Add a web hook endpoint</p>
          </div>

            <CustomCopyText
              label="Test webhook URL"
              text="PAY23456789000444444434567"
            />
            <CustomCopyText
              label="Test Callback URL"
              text="PAY23456789000444444434567"
            />
          <CustomCopyText
            label="Pay Item ID"
            text="PA2344-5566-7788-9900-98888"
          />
        </div>

        <div className="m-auto w-3/4">
            <Button title='Save changes'/>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DeveloperTools;
