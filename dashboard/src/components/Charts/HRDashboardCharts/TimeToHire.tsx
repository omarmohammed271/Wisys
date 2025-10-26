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
      <CardHeader className="pb-2">
        <CardTitle className="text-sm sm:text-lg">Time to Hire</CardTitle>
        <CardDescription className="text-[0.6rem] sm:text-xs">Average days per hire (Jan – Jun 2024)</CardDescription>
      </CardHeader>
      <CardContent className="h-full pt-2">
        <ChartContainer
          config={chartConfig}
          className="flex flex-col justify-center h-full max-w-full"
        >
          <BarChart accessibilityLayer data={chartData} margin={{ top: 10, left: 10, right: 10, bottom: 10 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={5}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              fontSize={10}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className="text-xs" />}
            />
            <Bar
              dataKey="timeToHire"
              fill="var(--color-timeToHire)"
              radius={4}
            >
              <LabelList
                dataKey="timeToHire"
                position="top"
                formatter={(val: number) => `${val}d`}
                className="text-[0.6rem] sm:text-xs"
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}