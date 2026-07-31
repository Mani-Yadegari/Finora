import SpendingChart from "../components/analytics/SpendingChart";
import IncomeChart from "../components/analytics/IncomeChart";
import CategoryCard from "../components/analytics/CategoryCard";

const Analytics = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-semibold">Analytics</h2>

        <p className="text-zinc-400 mt-2">Understand your financial habits</p>
      </div>

      <div
        className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-6
      "
      >
        <SpendingChart />

        <IncomeChart />
      </div>

      <CategoryCard />
    </div>
  );
};

export default Analytics;
