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

export const description = "Average Time to Hire (days)"

const chartData = [
  { month: "January", timeToHire: 22 },
  { month: "February", timeToHire: 18 },
  { month: "March", timeToHire: 25 },
  { month: "April", timeToHire: 30 },
  { month: "May", timeToHire: 19 },
  { month: "June", timeToHire: 16 },
]

const chartConfig = {
  timeToHire: {
    label: "Time to Hire (days)",
    color: "var(--chart-1)",
  },
}

export function TimeToHireChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Time to Hire</CardTitle>
        <CardDescription>Average days per hire (Jan – Jun 2024)</CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <ChartContainer
          config={chartConfig}
          className="flex flex-col justify-center h-full max-w-full"
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Bar
              dataKey="timeToHire"
              fill="var(--color-timeToHire)"
              radius={8}
            >
              <LabelList
                dataKey="timeToHire"
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
