'use client';

import * as React from 'react';
import { Pie, PieChart, Label } from 'recharts';

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

export const description = 'Maverick Spend Rate';

const rawData = {
  maverick_spend: 50000,
  total_spend: 200000,
};

export function MaverickSpendRateChart() {
  const maverickRate = React.useMemo(
    () => (rawData.maverick_spend / rawData.total_spend) * 100,
    []
  );

  const chartData = [
    { status: 'Maverick Spend', value: maverickRate, fill: 'var(--chart-1)' },
    { status: 'Other Spend', value: 100 - maverickRate, fill: 'var(--chart-2)' },
  ];

  return (
    <Card className="flex flex-col bg-gradient-to-tr from-primary/10 to-background">
      <CardHeader className="items-center pb-0">
        <CardTitle>Maverick Spend Rate</CardTitle>
        <CardDescription>Percentage of Maverick vs Total Spend</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center pb-4">
        <ChartContainer
          config={{
            value: { label: 'Spend' },
            maverick: { label: 'Maverick Spend', color: 'var(--chart-1)' },
            other: { label: 'Other Spend', color: 'var(--chart-2)' },
          }}
          className="flex items-center justify-center h-[180px] w-[180px]"
        >
          <PieChart width={240} height={240}>
          <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel hideIndicator />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="status"
              innerRadius={35}
              outerRadius={65}
              strokeWidth={3}
              labelLine={false}
              label={false}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-base font-bold"
                        >
                          {maverickRate.toFixed(1)}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 16}
                          className="fill-muted-foreground text-xs"
                        >
                          Maverick Rate
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        <div className=" flex flex-wrap justify-center gap-2">
          {chartData.map((item) => (
            <div key={item.status} className="flex items-center gap-1">
              <span
                className="inline-block w-2.5 h-2.5 rounded-sm"
                style={{ backgroundColor: item.fill }}
              />
              <span className="text-xs text-muted-foreground">
                {item.status}:{' '}
                <span className="font-medium text-foreground">
                  {item.value.toFixed(1)}%
                </span>
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
