import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  LabelList,
} from "recharts";

export default function FBarChart() {
  const barData = [
    { dept: "Sales", margin: 4000 },
    { dept: "Marketing", margin: 3000 },
    { dept: "Finance", margin: 2000 },
    { dept: "HR", margin: 2780 },
    { dept: "IT", margin: 1890 },
  ];

  const barConfig = {
    margin: { label: "Margin", color: "var(--chart-2)" },
  };

  return (
    <Card className="border-border h-[270px]">
              <CardHeader>
                <CardTitle>Profit Margin by Department</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={barConfig} className="h-[170px] w-full">
                  <BarChart data={barData} margin={{ left: 12, right: 12 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="dept"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <Bar dataKey="margin" fill="var(--color-margin)">
                      <LabelList dataKey="margin" position="top" fontSize={10} />
                    </Bar>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
  );
}
