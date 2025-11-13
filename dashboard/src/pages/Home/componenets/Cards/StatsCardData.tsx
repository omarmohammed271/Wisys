import StatsCard from "@/components/Cards/StatsCards";
import {
  TrendingUp,
  PieChart,
  BarChart3,
  LineChart,
  Activity,
  Wallet,
  Scale,
  Target
} from 'lucide-react';

export default function StatsCardData() {
  return (
    <div>
      <div className="grid h-fit grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-2">
        <StatsCard
          className="border border-border p-4 rounded-2xl"
          title="Total Revenue (YTD)"
          value="↑ +12% YoY"
          icon={<TrendingUp />}
        />

        <StatsCard
          className="border border-border p-4 rounded-2xl"
          title="Gross Profit Margin"
          value="42.5%"
          icon={<PieChart />}
        />

        <StatsCard
          className="border border-border p-4 rounded-2xl"
          title="Operating Margin"
          value="19.3%"
          icon={<BarChart3 />}
        />

        <StatsCard
          className="border border-border p-4 rounded-2xl"
          title="Net Profit Margin"
          value="11.2%"
          icon={<LineChart />}
        />

        <StatsCard
          className="border border-border p-4 rounded-2xl"
          title="EBITDA"
          value="SAR 45.8 M"
          icon={<Activity />}
        />

        <StatsCard
          className="border border-border p-4 rounded-2xl"
          title="Cash Position"
          value="SAR 30 M"
          icon={<Wallet />}
        />

        <StatsCard
          className="border border-border p-4 rounded-2xl"
          title="Debt-to-Equity Ratio"
          value="0.65"
          icon={<Scale />}
        />

        <StatsCard
          className="border border-border p-4 rounded-2xl"
          title="Forecast Accuracy (YTD)"
          value="94%"
          icon={<Target />}
        />
      </div>
    </div>
  );
}
