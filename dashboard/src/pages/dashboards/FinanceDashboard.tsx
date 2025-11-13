'use client';
import StatsCardData from '@/pages/Home/componenets/Cards/StatsCardData';

import RevenueExpenseLineChart from '@/components/Charts/FinanceCharts/FLineChart';
import ProfitTrendChart from '@/components/Charts/FinanceCharts/FAreaChart';
import DepartmentMarginBarChart from '@/components/Charts/FinanceCharts/FBarChart';
import DepartmentExpenseLollipopChart from '@/components/Charts/FinanceCharts/FPieChart';
import BudgetActualBubbleChart from '@/components/Charts/FinanceCharts/FRadialChart';
import LollipopChart from '@/components/Charts/FinanceCharts/FLollipopChart';

export default function ProcurementDashboard() {
  return (
    <div className="p-3 flex flex-col h-full space-y-2">
      {/* ── Stat Cards ── */}
      <div className="">

        <StatsCardData />

      </div>

      {/* Charts Section */}
      <div className="space-y-2 md:grid flex-1 grid-cols-1 min-[2400px]:max-h-[85.5vh] *:*:h-[500px] *:*:xl:h-1/2 md:grid-cols-2 xl:grid-cols-3 gap-2">

        <div className=" flex flex-col space-y-2 col-span-1">
          <RevenueExpenseLineChart
            months={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
            revenues={[4200, 5100, 4600, 5800, 6000, 6500]}
            expenses={[2700, 2900, 3100, 3400, 3600, 4000]}
          />
          <ProfitTrendChart
            months={["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
            profits={[4200, 5100, 4600, 5800, 6000, 6500]}
          />
        </div>

        <div className=" flex flex-col space-y-2 col-span-1">
          <DepartmentMarginBarChart
            departments={["Ops", "Support", "R&D", "Legal"]}
            margins={[3500, 4200, 3900, 3100]}
          />
          <DepartmentExpenseLollipopChart
            departments={["IT", "Support", "Ops", "R&D"]}
            expenses={[3500, 2700, 4000, 3200]}
          />
        </div>

        <div className=" flex flex-col space-y-2 col-span-1">
          <BudgetActualBubbleChart
            categories={["Marketing", "R&D", "Operations", "Sales"]}
            budgetValues={[100, 80, 120, 90]}
            actualValues={[85, 70, 110, 95]}
          />
          <LollipopChart
            kpis={["ROI", "Liquidity", "Growth", "Efficiency", "Risk"]}
            scores={[120, 98, 86, 99, 85]}
          />
        </div>
        
      </div>
    </div>
  );
}
