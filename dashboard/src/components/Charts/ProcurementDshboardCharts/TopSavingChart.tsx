'use client';

import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  CartesianGrid, 
  LabelList 
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

// TCO Saving
function tcoSaving(capexPurchase: number, opex5yr: number, avgBidCapex: number, opex5yrBid: number): number {
  const actualTco = capexPurchase + opex5yr;
  const bidTco = avgBidCapex + opex5yrBid;
  return actualTco - bidTco;
}

//  PO Cycle TCO Saving
const poCycleData = [
  { month: 'Jan', days: tcoSaving(50000, 20000, 45000, 18000) },
  { month: 'Feb', days: tcoSaving(52000, 21000, 47000, 19000) },
  { month: 'Mar', days: tcoSaving(48000, 19000, 46000, 18500) },
  { month: 'Apr', days: tcoSaving(51000, 20000, 45500, 18000) },
  { month: 'May', days: tcoSaving(49500, 19500, 46000, 18200) },
  { month: 'Jun', days: tcoSaving(48500, 19200, 45000, 18000) },
];

export function POCycleTimeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>PO Cycle Time</CardTitle>
        <CardDescription>Avg. days per month (TCO Saving)</CardDescription>
      </CardHeader>
      <CardContent className="size-[100%] mt-11 mx-auto">
        <ChartContainer config={{}}>
          <BarChart margin={{top:10}} data={poCycleData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="days" fill="var(--chart-2)" radius={4}>
              <LabelList
                dataKey="days"
                position="top"
                className="fill-foreground text-xs"
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
