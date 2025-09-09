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

  const renderLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
    value,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) / 2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        fontSize={11}
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${name} ${value} (${(percent * 100).toFixed(0)}%)`}
      </text>
    );
  };

  return (
    <Card className="border-border h-[250px]">
      <CardHeader>
        <CardTitle>Budget vs Actual</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={budgetConfig}
          className="h-[150px] w-full flex items-center justify-center"
        >
          <PieChart width={250} height={170}>
            <Pie
              data={budgetData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={30}
              outerRadius={65}
              paddingAngle={5}
              labelLine={false}  
              label={renderLabel}  
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
