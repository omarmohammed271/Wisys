import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import {
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  Scatter,
} from 'recharts';

export default function FLollipopChart() {
  const data = [
    { kpi: 'ROI', value: 120 },
    { kpi: 'Liquidity', value: 98 },
    { kpi: 'Growth', value: 86 },
    { kpi: 'Efficiency', value: 99 },
    { kpi: 'Risk', value: 85 },
  ];

  const config = {
    value: { label: 'Score', color: 'var(--chart-1)' },
  };

  return (
    <Card className="border-border h-[250px]">
      <CardHeader>
        <CardTitle>KPIs Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="h-[170px] w-full">
          <ComposedChart
            width={250}
            height={170}
            data={data}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="kpi" />
            <YAxis />
            <Tooltip content={<ChartTooltipContent nameKey="kpi" />} />

            {/* العصاية */}
            <Bar
              dataKey="value"
              fill="var(--chart-1)"
              barSize={4}
              radius={[2, 2, 0, 0]}
            />

            {/* الدائرة */}
            <Scatter dataKey="value" fill="var(--chart-1)" shape="circle" />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
