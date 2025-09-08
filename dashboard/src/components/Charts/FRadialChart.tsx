import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { Cell, Pie, PieChart } from 'recharts';

export default function FRadialChart() {
  const budgetData = [
    { key: 'budget', name: 'Budget', value: 100 },
    { key: 'actual', name: 'Actual', value: 85 },
  ];
  const budgetConfig = {
    budget: { label: 'Budget', color: 'var(--chart-1)' },
    actual: { label: 'Actual', color: 'var(--chart-2)' },
  };
  return (
    <Card className="border-border h-[250px]">
      <CardHeader>
        <CardTitle>Budget vs Actual</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={budgetConfig}
          className="h-[170px] w-full flex items-center justify-center"
        >
          <PieChart width={250} height={170}>
            <Pie
              data={budgetData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={30}
              outerRadius={55}
              paddingAngle={5}
              label={({ name, value }) => `${name}: ${value}`}
            >
              {budgetData.map((entry) => (
                <Cell key={entry.key} fill={`var(--color-${entry.key})`} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
