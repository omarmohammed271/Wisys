import StatsCard from "@/components/Cards/StatsCards";
import { AgeDist } from "@/components/Charts/HRDashboardCharts/AgeDist";
import { AttendanceChart } from "@/components/Charts/HRDashboardCharts/AttendanceChart";
import { GenderDist } from "@/components/Charts/HRDashboardCharts/GenderDist";
import { TurnoverChart } from "@/components/Charts/HRDashboardCharts/TurnoverChart";
import { AverageDeliveryTimeTrendChart } from "@/components/Charts/ProcurementDshboardCharts/AverageDeliveryTimeTrendChart";
import { MonthlySpendChart } from "@/components/Charts/ProcurementDshboardCharts/MonthlySpendChart";
import { OpenClosedPOsChart } from "@/components/Charts/ProcurementDshboardCharts/OpenClosedPOsChart";
import { SpendDistributionChart } from "@/components/Charts/ProcurementDshboardCharts/SpendDistributionChart";
import { SupplierPerformanceChart } from "@/components/Charts/ProcurementDshboardCharts/SupplierPerformanceChart";
import { TopSuppliersChart } from "@/components/Charts/ProcurementDshboardCharts/TopSuppliers";
import {
  CalendarSync,
  Repeat2,
  Users,
  Hourglass,
  FileQuestion,
  TrendingUp,
} from "lucide-react";

export default function ProcurmentDashboard() {
  return (
    <div className="p-3 flex flex-col h-full space-y-2">
      {/* Stat Cards */}
      <div className="grid h-fit grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2">
        <StatsCard
          className="border border-border p-4 rounded-2xl"
          title="Total Suppliers"
          value={48}
          icon={<Users />}
        />

        <StatsCard
          className="border border-border p-4 rounded-2xl"
          title="Open POs"
          value={126}
          icon={<FileQuestion />}
        />

        <StatsCard
          className="border border-border p-4 rounded-2xl"
          title="Pending Deliveries"
          value={32}
          icon={<CalendarSync />}
        />

        <StatsCard
          className="border border-border p-4 rounded-2xl"
          title="Avg. Delivery Time"
          value="5.2 days"
          icon={<Hourglass />}
        />

        <StatsCard
          className="border border-border p-4 rounded-2xl"
          title="Spend This Month"
          value="$142K"
          icon={<TrendingUp />}
        />

        <StatsCard
          className="border border-border p-4 rounded-2xl"
          title="Savings Rate"
          value="8.5%"
          icon={<Repeat2 />}
        />
      </div>


      {/* Charts Section */}
      <div className="grid flex-1 grid-cols-1 lg:grid-cols-3 gap-2">
        {/* Upper */}
        <div className=" flex flex-col space-y-2">
            <TopSuppliersChart />
            <OpenClosedPOsChart />
        </div>
        <div className=" flex flex-col gap-y-2 col-span-1 overflow-hidden">
            <AverageDeliveryTimeTrendChart />
            <SpendDistributionChart />
        </div>
        <div className=" flex flex-col gap-y-2 col-span-1 overflow-hidden">
            <SupplierPerformanceChart />
            <MonthlySpendChart />
        </div>
      </div>
    </div>
  );
}
