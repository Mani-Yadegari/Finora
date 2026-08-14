import AnalyticsHeader from "../components/analytics/AnalyticsHeader";
import SpendingBreakdown from "../components/analytics/SpendingBreakdown";
import InsightsCard from "../components/analytics/InsightsCard";
import TopMerchants from "../components/analytics/TopMerchants";
import SpendingTrend from "../components/analytics/SpendingTrend";

const Analytics = () => {
  return (
    <div
      className="
      relative
      min-h-full
      space-y-8
      overflow-visible
      "
    >
      <AnalyticsHeader />

      <div
        className="
        grid
        grid-cols-1
        gap-6
        xl:grid-cols-2
        "
      >
        <SpendingBreakdown />

        <InsightsCard />
      </div>

      <div
        className="
        grid
        grid-cols-1
        gap-6
        xl:grid-cols-2
        "
      >
        <TopMerchants />

        <SpendingTrend />
      </div>
    </div>
  );
};

export default Analytics;
