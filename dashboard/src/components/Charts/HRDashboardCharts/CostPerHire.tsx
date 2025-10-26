"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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

export const description = "Cost Per Hire Stacked Area Chart"

const chartData = [
  { month: "January", internal: 1200, external: 1800 },
  { month: "February", internal: 1000, external: 2200 },
  { month: "March", internal: 1500, external: 1700 },
  { month: "April", internal: 900, external: 2000 },
  { month: "May", internal: 1300, external: 1900 },
  { month: "June", internal: 1100, external: 2100 },
]

const chartConfig = {
  internal: {
    label: "Internal Hiring",
    color: "var(--chart-1)",
  },
  external: {
    label: "External Hiring",
    color: "var(--chart-2)",
  },
}

export function CostPerHireChart() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm sm:text-lg">Cost per Hire</CardTitle>
        <CardDescription className="text-[0.6rem] sm:text-xs">Internal vs External sources (Jan – Jun 2024)</CardDescription>
      </CardHeader>
      <CardContent className="h-full pt-2">
        <ChartContainer className="h-full max-w-full" config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 10,
              left: 10,
              right: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              tickFormatter={(value) => value.slice(0, 3)}
              fontSize={10}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" className="text-xs" />}
            />
            <Area
              dataKey="internal"
              type="natural"
              fill="var(--color-internal)"
              fillOpacity={0.4}
              stroke="var(--color-internal)"
              stackId="a"
            />
            <Area
              dataKey="external"
              type="natural"
              fill="var(--color-external)"
              fillOpacity={0.4}
              stroke="var(--color-external)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}