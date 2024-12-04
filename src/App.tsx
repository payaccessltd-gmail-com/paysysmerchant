import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/login/Index";
import CreateAccount from "./pages/login/components/CreateAccount";
import ForgotPassword from "./pages/login/components/ForgotPassword";
import ResetPassword from "./pages/login/components/ResetPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import Transaction from "./pages/Transaction/Index";
import Withdrawal from "./pages/Withdrawal/Index";
import Reports from "./pages/Reports/Index";
import Users from "./pages/Users/Index";
import Branches from "./pages/Branches/Index";
import Terminals from "./pages/Terminals/Index";
import Settings from "./pages/Settings/Index";
import CreatePin from "./pages/Registrations/CreatePin";
import AddBvn from "./pages/Registrations/AddBvn";
import BussinessType from "./pages/Registrations/BussinessType";
import BusinessInfo from "./pages/Registrations/BusinessInfo";
import VerifyEmail from "./pages/Registrations/VerifyEmail";
import VerifyPhoneNumber from "./pages/Registrations/VerifyPhoneNumber";
import BusinessLocation from "./pages/Registrations/BusinessLocation";
import DirectorProfile from "./pages/Registrations/DirectorProfile";
import DocumentUpload from "./pages/Registrations/DocumentUpload";
import SettlementInformation from "./pages/Registrations/SettlementInformation";
import PrivateRoute from "./Utils/PrivateRoute";
import ViewBranch from "./pages/Branches/components/ViewBranch";
import Airtime from "./pages/Airtime";
import Bills from "./pages/Bills";
import Utilities from "./pages/Bills/components/Utilities";
import Cable from "./pages/Bills/components/Cable";
import Betting from "./pages/Bills/components/Betting";
import BettingPage from "./pages/Bills/components/BettingPage";
import ElectricityPage from "./pages/Bills/components/ElectricityPage";
import CablePage from "./pages/Bills/components/CablePage";
import Recipients from "./pages/Recipients";
import RecipientsPage from "./pages/Recipients/components/RecipientsPage";

import LoansProfile from "./pages/BulkPayment/LoansProfile";
import LoanSummary from "./pages/BulkPayment/LoanSummary";
import TerminalPerformance from "./pages/Reports/TerminalPerformance";
import BranchPerformance from "./pages/Reports/BranchPerformance";
import SecurityQuestion from "./pages/Registrations/SecurityQuestion";
import UnlockAccount from "./pages/login/components/UnlockAccount";
import SecurityDashboard from "./pages/SecurityQuestion/Index";
import LoanOfferAcceptance from "./pages/BulkPayment/LoanOfferAcceptance";
import LoanRepaymentSchedule from "./pages/BulkPayment/LoanRepaymentSchedule";
import LoanOfferLetter from "./pages/BulkPayment/LoanOfferLetter";
import BuildBot from "./pages/AI_Bot/BuildBot";
import DeleteAccount from "./pages/AccountDeletion";
import PaymentLink from "./pages/PaymentLink/Index";
import Invoice from "./pages/Invoice/Index";
import Split from "./pages/Split/index";
import DeveloperTools from "./pages/DeveloperTools/DeveloperTools";
import InventoryDashboard from "./pages/InventorySystem/Dashboard/Index";
import InventoryInventory from "./pages/InventorySystem/Inventory/Inventory";
import InventoryReports from "./pages/InventorySystem/Reports/Index";
import InventorySuppliers from "./pages/InventorySystem/Supplier/Index";
import InventoryOrder from "./pages/InventorySystem/Order/Index";
import InventoryManageStore from "./pages/InventorySystem/ManageStore/Index";
import BulkPayment from "./pages/BulkPayment";
import BulkPaymentBeneficiaryList from "./pages/BulkPayment/index2";


function App() {

  
  return (
    <Router>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
        <Route path="/unlock-account" element={<UnlockAccount />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/transaction"
          element={
            <PrivateRoute>
              <Transaction />
            </PrivateRoute>
          }
        />
        <Route
          path="/withdrawal"
          element={
            <PrivateRoute>
              <Withdrawal />
            </PrivateRoute>
          }
        />
        <Route
          path="/securityQuestion"
          element={
            <PrivateRoute>
              <SecurityDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/recipients"
          element={
            <PrivateRoute>
              <Recipients />
            </PrivateRoute>
          }
        />
         <Route
          path="/bulk-payment"
          element={
            <PrivateRoute>
              <BulkPayment/>
            </PrivateRoute>
          }
        />
         <Route
          path="/beneficiary-list"
          element={
            <PrivateRoute>
              <BulkPaymentBeneficiaryList/>
            </PrivateRoute>
          }
        />
           <Route
          path="/bulk-payment/:id"
          element={
            <PrivateRoute>
              <LoansProfile />
            </PrivateRoute>
          }
        />
         <Route
          path="/bulk-payment/summary"
          element={
            <PrivateRoute>
              <LoanSummary />
            </PrivateRoute>
          }
        />
         <Route
          path="/bulk-payment/acceptance"
          element={
            <PrivateRoute>
              <LoanOfferAcceptance />
            </PrivateRoute>
          }
        />
         <Route
          path="/bulk-payment/repayments"
          element={
            <PrivateRoute>
              <LoanRepaymentSchedule />
            </PrivateRoute>
          }
        />
           <Route
          path="/bulk-payment/offer-letter"
          element={
            <PrivateRoute>
              <LoanOfferLetter />
            </PrivateRoute>
          }
        />
        <Route
          path="/recipients/:id"
          element={
            <PrivateRoute>
              <RecipientsPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/reports/eod"
          element={
            <PrivateRoute>
              <Reports />
            </PrivateRoute>
          }
        />
            <Route
          path="/reports/performance/terminal"
          element={
            <PrivateRoute>
              <TerminalPerformance />
            </PrivateRoute>
          }
        />
            <Route
          path="/reports/performance/branch"
          element={
            <PrivateRoute>
              <BranchPerformance />
            </PrivateRoute>
          }
        />
        <Route
          path="/airtime"
          element={
            <PrivateRoute>
              <Airtime />
            </PrivateRoute>
          }
        />
        <Route
          path="/bills"
          element={
            <PrivateRoute>
              <Bills />
            </PrivateRoute>
          }
        />
        <Route
          path="/bills/utilities"
          element={
            <PrivateRoute>
              <Utilities />
            </PrivateRoute>
          }
        />
         <Route
          path="/bills/utilities/:id"
          element={
            <PrivateRoute>
              <ElectricityPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/bills/cable"
          element={
            <PrivateRoute>
              <Cable />
            </PrivateRoute>
          }
        />
        <Route
          path="/bills/cable/:id"
          element={
            <PrivateRoute>
              <CablePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/bills/betting"
          element={
            <PrivateRoute>
              <Betting />
            </PrivateRoute>
          }
        />
        <Route
          path="/bills/betting/:id"
          element={
            <PrivateRoute>
              <BettingPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
        <Route
          path="/branches"
          element={
            <PrivateRoute>
              <Branches />
            </PrivateRoute>
          }
        />
        <Route
          path="/branches/:id"
          element={
            <PrivateRoute>
              <ViewBranch />
            </PrivateRoute>
          }
        />
        <Route
          path="/terminals"
          element={
            <PrivateRoute>
              <Terminals />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route
          path="/registrations/create-pin"
          element={
            <PrivateRoute>
              <CreatePin />
            </PrivateRoute>
          }
        />
        <Route
          path="/registrations/bvn"
          element={
            <PrivateRoute>
              <AddBvn />
            </PrivateRoute>
          }
        />
        <Route
          path="/registrations/business-type"
          element={
            <PrivateRoute>
              <BussinessType />
            </PrivateRoute>
          }
        />
        <Route
          path="/registrations/business-information"
          element={
            <PrivateRoute>
              <BusinessInfo />
            </PrivateRoute>
          }
        />
        <Route
          path="/registrations/security-questions"
          element={
            <PrivateRoute>
              <SecurityQuestion />
            </PrivateRoute>
          }
        />
        <Route
          path="/registrations/verify-email-address"
          element={
            <PrivateRoute>
              <VerifyEmail />
            </PrivateRoute>
          }
        />
        <Route
          path="/registrations/verify-phone-number"
          element={
            <PrivateRoute>
              <VerifyPhoneNumber />
            </PrivateRoute>
          }
        />
        <Route
          path="/registrations/business-location"
          element={
            <PrivateRoute>
              <BusinessLocation />
            </PrivateRoute>
          }
        />
        <Route
          path="/registrations/director-profile"
          element={
            <PrivateRoute>
              <DirectorProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/registrations/document-upload"
          element={
            <PrivateRoute>
              <DocumentUpload />
            </PrivateRoute>
          }
        />
        <Route
          path="/registrations/settlement-information"
          element={
            <PrivateRoute>
              <SettlementInformation />
            </PrivateRoute>
          }
        />
         <Route
          path="/customers/build-bot"
          element={
            <PrivateRoute>
              <BuildBot />
            </PrivateRoute>
          }
        />
        <Route
          path="/payment-link"
          element={
            <PrivateRoute>
              <PaymentLink />
            </PrivateRoute>
          }
        />
        <Route
          path="/split"
          element={
            <PrivateRoute>
              <Split/>
            </PrivateRoute>
          }
        />
        <Route
          path="/invoice"
          element={
            <PrivateRoute>
              <Invoice/>
            </PrivateRoute>
          }
        />
         <Route
          path="/developer-tools"
          element={
            <PrivateRoute>
              <DeveloperTools/>
            </PrivateRoute>
          }
        />
         <Route
          path="/inventory/dashboard"
          element={
            <PrivateRoute>
              <InventoryDashboard/>
            </PrivateRoute>
          }
        />
         <Route
          path="/inventory/inventory"
          element={
            <PrivateRoute>
              <InventoryInventory/>
            </PrivateRoute>
          }
        />
         <Route
          path="/inventory/reports"
          element={
            <PrivateRoute>
              <InventoryReports/>
            </PrivateRoute>
          }
        />
         <Route
          path="/inventory/suppliers"
          element={
            <PrivateRoute>
              <InventorySuppliers/>
            </PrivateRoute>
          }
        />
         <Route
          path="/inventory/order"
          element={
            <PrivateRoute>
              <InventoryOrder/>
            </PrivateRoute>
          }
        />
         <Route
          path="/inventory/manage-store"
          element={
            <PrivateRoute>
              <InventoryManageStore/>
            </PrivateRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
