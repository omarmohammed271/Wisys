"use client"

import StatsCard from "@/components/Cards/StatsCards"
import { DowntimeByMachineChart } from "@/components/Charts/ManufacturingDashboardCharts/DowntimeByMachineChart"
import { MaintenanceComplianceTrendChart } from "@/components/Charts/ManufacturingDashboardCharts/MaintenanceComplianceTrendChart"
import { OEETrendChart } from "@/components/Charts/ManufacturingDashboardCharts/OEETrendChart"
import { ProductionOutputByShiftChart } from "@/components/Charts/ManufacturingDashboardCharts/ProductionOutputByShiftChart"
import { ScrapRateChart } from "@/components/Charts/ManufacturingDashboardCharts/ScrapRateChart"
import { TopDowntimeChart } from "@/components/Charts/ManufacturingDashboardCharts/TopDowntimeChart"
import {
  Activity,
  Factory,
  Wrench,
  TrendingDown,
  BarChart3,
  Timer,
} from "lucide-react"

export default function ManufacturingDashboard() {
  return (
    <div className="p-3 flex flex-col h-full space-y-2">
      {/* ── Stat Cards ── */}
      <div className="grid h-fit grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2">
        <StatsCard
          className="border border-border p-4 rounded-2xl"
          title="OEE"
          value="80%"
          icon={<Activity />}
        />
        <StatsCard
          className="border border-border p-4 rounded-2xl"
          title="Total Output"
          value="42,500 Units"
          icon={<Factory />}
        />
        <StatsCard
          className="border border-border p-4 rounded-2xl"
          title="Downtime Hours"
          value={61}
          icon={<Timer />}
        />
        <StatsCard
          className="border border-border p-4 rounded-2xl"
          title="Scrap Rate"
          value="5.4%"
          icon={<TrendingDown />}
        />
        <StatsCard
          className="border border-border p-4 rounded-2xl"
          title="Compliance Rate"
          value="92%"
          icon={<Wrench />}
        />
        <StatsCard
          className="border border-border p-4 rounded-2xl"
          title="Shift Efficiency"
          value="88%"
          icon={<BarChart3 />}
        />
      </div>

      {/* ── Charts Section ── */}
      <div className="grid flex-1 grid-cols-1 lg:grid-cols-3 gap-2">
        <div className="flex flex-col space-y-2">
          <OEETrendChart />
          <DowntimeByMachineChart />
        </div>
        <div className="flex flex-col space-y-2">
          <ScrapRateChart />
          <TopDowntimeChart />
        </div>
        <div className="flex flex-col space-y-2">
          <ProductionOutputByShiftChart />
          <MaintenanceComplianceTrendChart />
        </div>
      </div>
    </div>
  )
}
