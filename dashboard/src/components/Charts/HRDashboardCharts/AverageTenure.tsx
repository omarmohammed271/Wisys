"use client"

import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "Average employee tenure line chart"

const chartData = [
  { month: "January", tenure: 3.2 },
  { month: "February", tenure: 3.5 },
  { month: "March", tenure: 3.8 },
  { month: "April", tenure: 4.1 },
  { month: "May", tenure: 4.3 },
  { month: "June", tenure: 4.5 },
]

const chartConfig = {
  tenure: {
    label: "Average Tenure (Years)",
    color: "var(--chart-1)",
  },
}

export function AverageTenureChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Average Employee Tenure</CardTitle>
        <CardDescription>Trend over the last 6 months</CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
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
              domain={[0, 6]} // reasonable scale for tenure in years
              tickFormatter={(value) => `${value}y`}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value) => `${value} years`}
                  indicator="line"
                />
              }
            />
            <Line
              dataKey="tenure"
              type="monotone"
              stroke={chartConfig.tenure.color}
              strokeWidth={2}
              dot={{
                fill: chartConfig.tenure.color,
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                dataKey="tenure"
                position="top"
                offset={12}
                formatter={(value: number) => `${value}y`}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
