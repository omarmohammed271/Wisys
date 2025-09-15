"use client"

import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { month: "January", previousCost: 120000, currentCost: 110000 },
  { month: "February", previousCost: 115000, currentCost: 107000 },
  { month: "March", previousCost: 130000, currentCost: 125000 },
  { month: "April", previousCost: 125000, currentCost: 118000 },
  { month: "May", previousCost: 140000, currentCost: 130000 },
  { month: "June", previousCost: 135000, currentCost: 128000 },
]

function calculateCostReduction(previousCost: number, currentCost: number): number {
  if (previousCost === 0) return 0
  return ((previousCost - currentCost) / previousCost) * 100
}

const chartDataWithReduction = chartData.map((item) => ({
  month: item.month,
  costReduction: calculateCostReduction(item.previousCost, item.currentCost),
}))

export function CostReductionTrendChart() {
  return (
    <Card  >
      <CardHeader>
        <CardTitle>Cost Reduction Trend</CardTitle>
        <CardDescription>Jan – Jun 2024</CardDescription>
      </CardHeader>

      <CardContent className="w-full mt-7">
        <ChartContainer className="w-full" config={{}}>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={chartDataWithReduction}
              margin={{ top: 30, left:-10, right: 12,bottom:-20 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                tickFormatter={(value) => `${value.toFixed(1)}%`}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={<ChartTooltipContent indicator="line" />}
                formatter={(value: number) => `${value.toFixed(1)}%`}
              />
              <Line
                dataKey="costReduction"
                type="natural"
                stroke="var(--chart-1)"  
                strokeWidth={2}
                dot={{ fill: "var(--chart-1)" }}  
                activeDot={{ r: 6 }}
              >
                <LabelList
                  dataKey="costReduction"
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                  formatter={(value: number) => `${value.toFixed(1)}%`}
                />
              </Line>
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
