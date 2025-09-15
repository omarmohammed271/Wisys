"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

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

export const description = "Average Time to Fill (days)"

const chartData = [
  { month: "January", timeToFill: 28 },
  { month: "February", timeToFill: 24 },
  { month: "March", timeToFill: 32 },
  { month: "April", timeToFill: 20 },
  { month: "May", timeToFill: 26 },
  { month: "June", timeToFill: 22 },
]

const chartConfig = {
  timeToFill: {
    label: "Time to Fill (days)",
    color: "var(--chart-2)",
  },
}

export function TimeToFillChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Time to Fill</CardTitle>
        <CardDescription>Average days per filled role (Jan – Jun 2024)</CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <ChartContainer
          config={chartConfig}
          className="flex flex-col justify-center h-full max-w-full"
        >
          <BarChart accessibilityLayer data={chartData} margin={{ top: 15 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar
              dataKey="timeToFill"
              fill="var(--color-timeToFill)"
              radius={8}
            >
              <LabelList
                dataKey="timeToFill"
                position="top"
                formatter={(val: number) => `${val}d`}
                className="text-xs sm:text-sm"
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
