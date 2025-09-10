import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../../ui/chart';
import { LineChart, Line, CartesianGrid, XAxis } from 'recharts'; // ✅ من recharts
import { LineChart as LineChartIcon } from 'lucide-react'; // ✅ الأيقونة

export default function FLineChart() {
  const lineData = [
    { date: '2024-01-01', revenue: 4000, expense: 2400 },
    { date: '2024-02-01', revenue: 3000, expense: 1398 },
    { date: '2024-03-01', revenue: 2000, expense: 980 },
    { date: '2024-04-01', revenue: 2780, expense: 3908 },
    { date: '2024-05-01', revenue: 1890, expense: 4800 },
    { date: '2024-06-01', revenue: 2390, expense: 3800 },
    { date: '2024-07-01', revenue: 3490, expense: 4300 },
  ];

  const lineConfig = {
    revenue: { label: 'Revenue', color: 'var(--chart-1)' },
    expense: { label: 'Expense', color: 'var(--chart-2)' },
  };

  return (
    <>
      <Card className="border-border h-[270px] ">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChartIcon className="h-5 w-5" />
            Revenue vs Expenses
          </CardTitle>
          <CardDescription>Last 7 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={lineConfig} className="h-[170px] w-full">
            <LineChart data={lineData} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={1}
              />
              <Line
                dataKey="revenue"
                type="monotone"
                stroke="var(--color-revenue)"
                strokeWidth={2}
                dot={false}
                label={{ position: 'top', fontSize: 10 }}
              />
              <Line
                dataKey="expense"
                type="monotone"
                stroke="var(--color-expense)"
                strokeWidth={2}
                dot={false}
                label={{ position: 'top', fontSize: 10 }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
}
