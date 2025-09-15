'use client';

import { TrendingUp } from 'lucide-react';
import { LabelList, Pie, PieChart, ResponsiveContainer } from 'recharts';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const procurementData = [
  { category: 'Managed Spend', value: 420000, fill: 'var(--chart-1)' },
  { category: 'Unmanaged Spend', value: 180000, fill: 'var(--chart-2)' },
  { category: 'Indirect Spend', value: 90000, fill: 'var(--chart-3)' },
  { category: 'Direct Spend', value: 250000, fill: 'var(--chart-4)' },
  { category: 'Other', value: 50000, fill: 'var(--chart-5)' },
];

function calculateROI(gain: number, cost: number): number {
  if (cost === 0) return 0;
  return ((gain - cost) / cost) * 100;
}

export function ChartPieLabelList() {
  const investmentCost = 10000;
  const gainFromInvestment = 12500;
  const roi = calculateROI(gainFromInvestment, investmentCost);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Procurement Pie Chart</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>

      <CardContent className="mx-auto w-[280px] h-[280px]">
        <ChartContainer config={{}} className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="value" hideLabel />}
              />
              <Pie
                data={procurementData}
                dataKey="value"
                nameKey="category"
                innerRadius={30}
                outerRadius={60}
                fill="var(--chart-1)"
              >
                <LabelList
                  dataKey="category"
                  position="inside"
                  fontSize={8}
                  fill="#fff"
                  fontWeight="normal"
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col text-sm">
        <div className="flex items-center leading-none gap-1">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>

        {/* عرض ROI */}
        <div className="text-foreground font-medium mt-1">
          ROI: {roi.toFixed(2)}%
        </div>
      </CardFooter>
    </Card>
  );
}
