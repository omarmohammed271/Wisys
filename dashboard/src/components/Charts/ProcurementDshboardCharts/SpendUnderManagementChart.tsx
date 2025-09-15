'use client';

import * as React from 'react';
import { PieChart, Pie, Label, type PieLabelRenderProps } from 'recharts';

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

const spendData = [
  { type: 'Managed', value: 420000, fill: 'var(--chart-1)' },
  { type: 'Unmanaged', value: 180000, fill: 'var(--chart-2)' },
];

export function SpendUnderManagementChart() {
  const totalSpend = React.useMemo(
    () => spendData.reduce((sum, item) => sum + item.value, 0),
    []
  );

  const sumPercentage = React.useMemo(
    () => (totalSpend ? (spendData[0].value / totalSpend) * 100 : 0),
    [totalSpend]
  );

  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle>Spend Under Management</CardTitle>
        <CardDescription>Jan – Jun 2024</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center pb-0">
        {/* Pie Chart */}
        <ChartContainer className="mx-auto w-[180px] h-[180px]" config={{}}>
          <PieChart>
            <ChartTooltip />
            <Pie
              data={spendData}
              dataKey="value"
              nameKey="type"
              innerRadius={40}
              outerRadius={60}
              strokeWidth={5}
            >
              <Label
                position="center"
                content={({ viewBox }) => {
                  const { cx, cy } = viewBox as PieLabelRenderProps; // ✅ safe cast for Pie

                  return (
                    <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan
                        x={cx}
                        y={90}
                        className="fill-foreground text-2xl font-bold"
                      >
                        {`${Math.round(sumPercentage)}%`}
                      </tspan>
                      <tspan
                        x={cx}
                        y={110}
                        className="fill-muted-foreground text-sm"
                      >
                        Managed
                      </tspan>
                    </text>
                  );
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        {/* Legend بخط صغير */}
        <div className="mt-2 flex gap-4 text-xs">
          {spendData.map((item) => (
            <div key={item.type} className="flex items-center gap-1">
              <span
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: item.fill }}
              />
              <span>{item.type}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
