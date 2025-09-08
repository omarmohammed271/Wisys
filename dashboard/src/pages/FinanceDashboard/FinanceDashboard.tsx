'use client';

import * as React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  LabelList,
} from 'recharts';
import StatsCard from '@/components/Cards/StatsCards';
import {
  BookCheck,
  CalendarSync,
  FileQuestion,
  Hourglass,
  Repeat2,
  Users,
} from 'lucide-react';
import StatsCardData from '@/components/Cards/StatsCardData';
import FLineChart from '@/components/Charts/FLineChart';
import FAreaChart from '@/components/Charts/FAreaChart';
import FBarChart from '@/components/Charts/FBarChart';
import FPieChart from '@/components/Charts/FPieChart';
import FRadialChart from '@/components/Charts/FRadialChart';
import FRadarChart from '@/components/Charts/FRadarChart';

// -------- line: Revenue vs Expenses --------

// -------- area: Profit Trend --------

// -------- bar: Profit Margin by Department --------


// -------- pie: Expense Breakdown --------


// -------- radial (donut): Budget vs Actual --------


// -------- radar: KPIs Performance --------


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
        {/* Radar Chart */}
        <FRadarChart />
      </div>
    </>
  );
}
