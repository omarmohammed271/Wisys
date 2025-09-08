import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from 'recharts';

export default function FRadarChart() {
  const radarData = [
    { kpi: 'ROI', value: 120 },
    { kpi: 'Liquidity', value: 98 },
    { kpi: 'Growth', value: 86 },
    { kpi: 'Efficiency', value: 99 },
    { kpi: 'Risk', value: 85 },
  ];
  const radarConfig = {
    value: { label: 'Score', color: 'var(--chart-1)' },
  };
  return (
    <Card className="border-border h-[250px]">
      <CardHeader>
        <CardTitle>KPIs Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={radarConfig} className="h-[170px] w-full">
          <RadarChart
            width={250}
            height={170}
            outerRadius={65}
            data={radarData}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="kpi" />
            <PolarRadiusAxis />
            <Radar
              name="Finance"
              dataKey="value"
              stroke="var(--color-value)"
              fill="var(--color-value)"
              fillOpacity={0.6}
              label={{ fill: 'var(--color-value)', fontSize: 10 }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
