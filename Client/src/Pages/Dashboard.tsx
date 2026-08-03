import BalanceCard from "../components/dashboard/BalanceCard";
import StatCard from "../components/dashboard/StatCard";
import FinanceChart from "../components/dashboard/FinanceChart";
import SavingChart from "../components/dashboard/SavingChart";
import { Wallet, ArrowDown, ChartPie } from "lucide-react";

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
          icon={ArrowDown}
          title="Monthly Expense"
          value="$2,340"
          change="-4.5%"
          type="expense"
          iconColor="text-red-400"
          iconBg="bg-red-500/10"
        />

        {/* Saving Rate */}
        <StatCard
          icon={ChartPie}
          title="Saving Rate"
          value="72%"
          change="+3.1%"
          type="balance"
          iconColor="text-blue-400"
          iconBg="bg-blue-500/10"
        />
      </div>
    </div>
  );
};

export default Dashboard;
