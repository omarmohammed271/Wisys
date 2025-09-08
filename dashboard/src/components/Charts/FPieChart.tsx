import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { Cell, Pie, PieChart } from 'recharts';

export default function FPieChart() {
  const expenseData = [
    { key: 'salaries', name: 'Salaries', value: 4000 },
    { key: 'operations', name: 'Operations', value: 3000 },
    { key: 'marketing', name: 'Marketing', value: 2000 },
    { key: 'rAndD', name: 'R&D', value: 2780 },
  ];
  const expenseConfig = {
    salaries: { label: 'Salaries', color: 'var(--chart-1)' },
    operations: { label: 'Operations', color: 'var(--chart-2)' },
    marketing: { label: 'Marketing', color: 'var(--chart-3)' },
    rAndD: { label: 'R&D', color: 'var(--chart-4)' },
  };
  return (
    <Card className="border-border h-[250px]">
      <CardHeader>
        <CardTitle>Expense Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={expenseConfig}
          className="h-[170px] w-full flex items-center justify-center"
        >
          <PieChart width={250} height={170}>
            <Pie
              data={expenseData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={65}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {expenseData.map((entry) => (
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
