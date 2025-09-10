'use client';
import StatsCardData from '@/components/Cards/StatsCardData';
import FLineChart from '@/components/Charts/FinanceCharts/FLineChart';
import FAreaChart from '@/components/Charts/FinanceCharts/FAreaChart';
import FBarChart from '@/components/Charts/FinanceCharts/FBarChart';
import FPieChart from '@/components/Charts/FinanceCharts/FPieChart';
import FRadialChart from '@/components/Charts/FinanceCharts/FRadialChart';
import FLollipopChart from '@/components/Charts/FinanceCharts/FLollipopChart';



// -------- Dashboard --------
export default function FinanceDashboard() {
  return (
    <>
      <StatsCardData />

      <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Line Chart */}
        <FLineChart />

        {/* Area Chart */}

        <FAreaChart />
        {/* Bar Chart */}
        <FBarChart />

        {/* Pie Chart (Expense Breakdown) */}
        
        <FPieChart />
        {/* Radial / Donut: Budget vs Actual */}
        
        <FRadialChart />

        <FLollipopChart />
      </div>
    </>
  );
}
