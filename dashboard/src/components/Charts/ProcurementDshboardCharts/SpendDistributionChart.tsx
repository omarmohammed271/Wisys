'use client';

import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

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

export const description = 'Emergency Purchase Rate';

//  Emergency Purchase Rate
function emergencyPurchaseRate(emergencyPurchases: number, totalPurchases: number): number {
  return (emergencyPurchases / totalPurchases) * 100;
}

const emergencyPurchases = 45;
const totalPurchases = 400;

const emergencyRate = emergencyPurchaseRate(emergencyPurchases, totalPurchases);

const chartData = [
  { category: 'Emergency', amount: emergencyPurchases, fill: 'var(--chart-1)' },
  { category: 'Normal', amount: totalPurchases - emergencyPurchases, fill: 'var(--chart-2)' },
];

const chartConfig = {
  amount: { label: 'Purchases' },
  emergency: { label: 'Emergency', color: 'var(--chart-1)' },
  normal: { label: 'Normal', color: 'var(--chart-2)' },
};

export function EmergencyPurchaseChart() {
  return (
    <Card className="flex  flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Emergency Purchase Rate</CardTitle>
        <CardDescription>January – June 2024</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto w-[180px] h-[180px]"
        >
          <PieChart width={240} height={240}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              innerRadius={40}
              outerRadius={60}
              strokeWidth={3}
            >
              {/* ✅ Center Label showing % */}
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
                          className="fill-foreground text-lg font-bold"
                        >
                          {emergencyRate.toFixed(1)}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 20}
                          className="fill-muted-foreground text-xs"
                        >
                          Emergency
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        {/* Legend */}
        <div className="flex mt-1 flex-wrap justify-center gap-1">
          {chartData.map((item) => (
            <div key={item.category} className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-sm"
                style={{ backgroundColor: item.fill }}
              />
              <span className="text-xs text-muted-foreground">
                {item.category}:{' '}
                <span className="font-medium text-foreground">
                  {item.amount}
                </span>
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
