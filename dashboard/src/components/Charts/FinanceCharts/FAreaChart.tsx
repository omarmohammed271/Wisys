import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../../ui/chart';
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  LabelList,
} from 'recharts';

export default function FAreaChart() {
  const areaData = [
  { month: 'Jan', profit: 2400 },
  { month: 'Feb', profit: 1398 },
  { month: 'Mar', profit: 980 },
  { month: 'Apr', profit: 3908 },
  { month: 'May', profit: 4800 },
  { month: 'Jun', profit: 3800 },
];
const areaConfig = {
  profit: { label: 'Profit', color: 'var(--chart-1)' },
};

  return (
    <div>
      <Card className="border-border h-[270px]">
        <CardHeader>
          <CardTitle>Profit Trend</CardTitle>
          <CardDescription>Monthly profit</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={areaConfig} className="h-[170px] w-full">
            <AreaChart data={areaData} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <Area
                dataKey="profit"
                type="monotone"
                stroke="var(--color-profit)"
                fill="var(--color-profit)"
                fillOpacity={0.2}
              >
                <LabelList dataKey="profit" position="top" fontSize={10} />
              </Area>
              <ChartTooltip content={<ChartTooltipContent />} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
