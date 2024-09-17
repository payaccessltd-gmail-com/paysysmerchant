import DashboardLayout from "../../components/dashboard/Index";
import { Button } from "../../components/reusables/DefaultButton";
import exportToExcel from "../../Utils/ExportExcel";
import WithdrawalTable from "./components/WithdrawalTable";
import { BsArrowUpRight } from "react-icons/bs";
import DateInput from "../../components/reusables/DateInput/DateInput";
import { useEffect, useState } from "react";
import WithdrawalModal from "./components/WithdrawalModal";
import { getBalance } from "../../containers/dashboardApis";
import CurrencyFormat from "react-currency-format";
import Loading from "../../components/Loading";
import { recentWithdrawals } from "../../containers/transactionApis";

const Withdrawal = () => {
  const [isLoading, setisLoading] = useState(false);
  const [isLoadingTable, setisLoadingTable] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [date, setDate] = useState({ endDate: "", startDate: "" });
  const [withdrawalModal, setWithdrawalModal] = useState(false);
  const [walletBalance, setWalletBalance] = useState("");
  const [withdrawalTable, setWithdrawalTable] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const { endDate, startDate } = date;
  const handleDateChange = (event: any) => {
    const { name, value } = event.target;
    setDate((prevDate) => ({
      ...prevDate,
      [name]: value,
    }));
  };

  const [pages, setpages] = useState<any>({
    number: 0,
    pageSize: 10,
    totalPages: 0,
    numberElements: 0,
    totalElements: 0,
  });
  const { number, pageSize, totalPages, numberElements, totalElements } = pages;
  const handleExport = () => {
    exportToExcel(withdrawals, "Withdrawals");
  };
  async function toggleWithdrawalRequestModal() {
    await setWithdrawalModal(!withdrawalModal);
  }
  // const walletBalance='345,000.50'
  async function balance() {
    setisLoading(true);

    try {
      const res=await getBalance() 
      setWalletBalance(res.balance || 0);
    } catch (error:any) {
      console.log(error)
    } finally {
      setisLoading(false);
      setRefresh(false);

    }
  }
  useEffect(() => {
    balance()
  }, [refresh]);

  async function getWithdrawal() {
    setisLoadingTable(true);
    
    try {
      const res = await recentWithdrawals(number, pageSize, startDate, endDate);
      setWithdrawalTable(res);
      setpages({
        number: res.pageDetails.number,
        totalPages: res.pageDetails.totalPages,
        pageSize: res.pageDetails.size,
        numberElements: res.pageDetails.numberElements,
        totalElements: res.pageDetails.totalElements,
      });
      setRefresh(false)
      setWithdrawals(res.withdrawals);
    } catch (error) {
      console.error(error);
    } finally {
      setisLoadingTable(false);
    }
  }

  useEffect(() => {
    getWithdrawal();
  }, [refresh, startDate, endDate, number]);
  useEffect(() => {
    const currentDate = new Date();
    const tomorrowDate = new Date(currentDate);
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const threeMonthsAgo = new Date(currentDate);
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    const formattedEndDate = tomorrowDate.toISOString().split('T')[0];
    const formattedStartDate = threeMonthsAgo.toISOString().split('T')[0];
  
    setDate({
      endDate: formattedEndDate,
      startDate: formattedStartDate
    });
    setRefresh(false)
  
    getWithdrawal();
  }, [refresh]);
  return (
    <DashboardLayout>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <p className="text-[16px] mt-5">Withdrawal</p>
          <div className="flex justify-between flex-wrap items-end gap-[20px]">
            <div className="mt-5 rounded-md bg-primary text-white flex justify-between p-[20px] md:w-[453px] w-full items-center">
              <div className="grid ">
                <p className="text-[11px]">Wallet Balance</p>
                <p className="text-[26px]">
                  <CurrencyFormat
                    value={walletBalance || 0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₦"}
                  />{" "}
                </p>
              </div>
              <div className="md:w-[120px] ">
                <Button
                  title="Withdraw"
                  className="!bg-[white] !text-primary !m-auto"
                  onClick={toggleWithdrawalRequestModal}
                />
              </div>
            </div>
            <div className="flex gap-3 h-fit items-end ">
              <DateInput
                label="Select Date"
                name="date"
                startname="startDate"
                endname="endDate"
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
              />
              {withdrawals.length > 0 && (
                <div className="w-fit grid ">
                  <Button
                    onClick={handleExport}
                    title="Export"
                    className="!bg-white !mt-0 !text-[#3C4257] !border-[1px] shadow-sm m-auto"
                    icon={<BsArrowUpRight className="font-bold" />}
                  />
                </div>
              )}
            </div>
          </div>
          <WithdrawalTable
            withdrawalTable={withdrawalTable}
            page={pages}
            setpages={setpages}
            number={number}
            isLoading={isLoadingTable}
          />
          <WithdrawalModal
            toggleDropdown={toggleWithdrawalRequestModal}
            walletBalance={walletBalance}
            isOpen={withdrawalModal}
            setRefresh={setRefresh}
          />
        </>
      )}
    </DashboardLayout>
  );
};

export default Withdrawal;
