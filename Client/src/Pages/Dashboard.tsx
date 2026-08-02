import BalanceCard from "../components/dashboard/BalanceCard";
import StatCard from "../components/dashboard/StatCard";
import FinanceChart from "../components/dashboard/FinanceChart";
import RecentTransactions from "../components/dashboard/RecentTransactions";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <BalanceCard />

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-6
      "
      >
        <StatCard title="Monthly Income" value="$8,450" change="+8.2%" />

        <StatCard title="Monthly Expense" value="$2,340" change="-4.5%" />

        <StatCard title="Saving Rate" value="72%" change="+3.1%" />
      </div>
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
    </div>
  );
};

export default Dashboard;
