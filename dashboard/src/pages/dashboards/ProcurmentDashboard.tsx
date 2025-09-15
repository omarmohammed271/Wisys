'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  LabelList,
  Bar,
  BarChart,
  PieChart,
  Pie,
  Label,
} from 'recharts';
import * as React from 'react';
import { TopSuppliersChart } from '@/components/Charts/ProcurementDshboardCharts/TopSuppliers';
import { EmergencyPurchaseChart } from '@/components/Charts/ProcurementDshboardCharts/SpendDistributionChart';
import { MonthlyCostAvoidanceChart } from '@/components/Charts/ProcurementDshboardCharts/MonthlySpendChart';
import StatsCardData from '@/components/Cards/StatsCardData';
import { SpendUnderManagementChart } from '@/components/Charts/ProcurementDshboardCharts/SpendUnderManagementChart';
import { ChartPieLabelList } from '@/components/Charts/ProcurementDshboardCharts/ROIChart';
import { CostReductionTrendChart } from '@/components/Charts/ProcurementDshboardCharts/AverageDeliveryTimeTrendChart';
import { POCycleTimeChart } from '@/components/Charts/ProcurementDshboardCharts/TopSavingChart';
import { TCPSavingChart } from '@/components/Charts/ProcurementDshboardCharts/TCPSavingPresChart';
import { MaverickSpendRateChart } from '@/components/Charts/ProcurementDshboardCharts/OpenClosedPOsChart';
import { ChartTcoSavingOutsource } from '@/components/Charts/ProcurementDshboardCharts/TCOSavingOutsource';

const savingsData = [
  { month: 'Jan', savings: 6.2 },
  { month: 'Feb', savings: 7.5 },
  { month: 'Mar', savings: 8.1 },
  { month: 'Apr', savings: 7.9 },
  { month: 'May', savings: 8.8 },
  { month: 'Jun', savings: 9.2 },
];



export default function ProcurementDashboard() {
  return (
    <div className="p-3 flex flex-col h-full space-y-2">
      {/* ── Stat Cards ── */}
      <StatsCardData />

      {/* ── Charts ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 auto-rows-[350px]">
        <SpendUnderManagementChart />
        <ChartPieLabelList />
        <TopSuppliersChart />
        <CostReductionTrendChart />
        <MonthlyCostAvoidanceChart />

        <POCycleTimeChart />

        <TCPSavingChart />

        <ChartTcoSavingOutsource />

        <MaverickSpendRateChart />
        <EmergencyPurchaseChart />


      </div>
    </div>
  );
}
