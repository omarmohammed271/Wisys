'use client';

import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis,
  CartesianGrid, 
  LabelList 
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

// %TCO Saving
function tcoSavingPercentage(
  capexPurchase: number,
  opex5yr: number,
  avgBidCapex: number,
  opex5yrBid: number
): number {
  const actualTco = capexPurchase + opex5yr;
  const bidTco = avgBidCapex + opex5yrBid;
  if (actualTco === 0) return 0;
  return ((actualTco - bidTco) / actualTco) * 100;
}

//  PO Cycle %TCO Saving
const poCycleData = [
  { month: 'Jan', days: tcoSavingPercentage(50000, 20000, 45000, 18000) },
  { month: 'Feb', days: tcoSavingPercentage(52000, 21000, 47000, 19000) },
  { month: 'Mar', days: tcoSavingPercentage(48000, 19000, 46000, 18500) },
  { month: 'Apr', days: tcoSavingPercentage(51000, 20000, 45500, 18000) },
  { month: 'May', days: tcoSavingPercentage(49500, 19500, 46000, 18200) },
  { month: 'Jun', days: tcoSavingPercentage(48500, 19200, 45000, 18000) },
];

export function TCPSavingChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>PO Cycle Time</CardTitle>
        <CardDescription>Avg. days per month (%TCO Saving)</CardDescription>
      </CardHeader>
      <CardContent className="size-[100%] mt-11 mx-auto">
        <ChartContainer config={{}}>
          <BarChart
            data={poCycleData}
            layout="vertical" // Horizontal Bar Chart
            margin={{ top:0, right: 5, left:-30, bottom: -10 }}
          >
            <CartesianGrid vertical={false} horizontal={true} />
            <XAxis type="number" />
            <YAxis dataKey="month" type="category" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="days" fill="var(--chart-2)" radius={4}>
              <LabelList
                dataKey="days"
                position="right"
                className="fill-foreground text-xs"
                formatter={(value: number) => `${value.toFixed(1)}%`}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
