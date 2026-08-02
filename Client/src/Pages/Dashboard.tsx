import BalanceCard from "../components/dashboard/BalanceCard";
import StatCard from "../components/dashboard/StatCard";
import FinanceChart from "../components/dashboard/FinanceChart";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import { Wallet, ArrowDown, ChartPie } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <BalanceCard />
      <div
        className="
  grid
  grid-cols-1
  xl:grid-cols-3
  gap-6
"
      >
        <div className="xl:col-span-2">
          <FinanceChart />
        </div>

        <RecentTransactions />
      </div>

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-6
      "
      >
        <StatCard
          icon={Wallet}
          title="Total Balance"
          value="$12,540"
          change="+12.5%"
          iconColor="text-green-400"
          iconBg="bg-green-500/10"
          changeColor="text-green-400"
        />

        <StatCard
          icon={ArrowDown}
          title="Monthly Expense"
          value="$2,340"
          change="-4.5%"
          iconColor="text-red-400"
          iconBg="bg-red-500/10"
          changeColor="text-red-400"
        />

        <StatCard
          icon={ChartPie}
          title="Saving Rate"
          value="72%"
          change="+3.1%"
          iconColor="text-blue-400"
          iconBg="bg-blue-500/10"
          changeColor="text-blue-400"
        />
      </div>
    </div>
  );
};

export default Dashboard;
