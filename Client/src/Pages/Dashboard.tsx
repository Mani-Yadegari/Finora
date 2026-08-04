import BalanceCard from "../components/dashboard/BalanceCard";
import StatCard from "../components/dashboard/StatCard";
import FinanceChart from "../components/dashboard/FinanceChart";
import SavingChart from "../components/dashboard/SavingChart";

import { Wallet, ReceiptText, ArrowLeftRight } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <BalanceCard />

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-[2.7fr_1fr]
          gap-6
        "
      >
        <FinanceChart />

        <SavingChart />
      </div>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
        "
      >
        {/* Income */}
        <StatCard
          icon={Wallet}
          title="Monthly Income"
          value="$12,540"
          change="+12.5%"
          type="income"
          iconColor="text-green-400"
          iconBg="bg-green-500/10"
        />

        {/* Expense */}
        <StatCard
          icon={ReceiptText}
          title="Monthly Expense"
          value="$2,340"
          change="-4.5%"
          type="expense"
          iconColor="text-red-400"
          iconBg="bg-red-500/10"
        />

        {/* Cash Flow */}
        <StatCard
          icon={ArrowLeftRight}
          title="Cash Flow"
          value="$10,200"
          change="+18.3%"
          type="cashflow"
          iconColor="text-cyan-400"
          iconBg="bg-cyan-500/10"
        />
      </div>
    </div>
  );
};

export default Dashboard;
