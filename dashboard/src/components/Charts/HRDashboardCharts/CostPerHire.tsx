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
      <CardHeader>
        <CardTitle>Cost per Hire</CardTitle>
        <CardDescription>Internal vs External sources (Jan – Jun 2024)</CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <ChartContainer className="h-full max-w-full" config={chartConfig}>
          <AreaChart
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
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="internal"
              type="natural"
              fill="var(--color-internal)"
              fillOpacity={0.4}
              stroke="var(--color-internal)"
              stackId="a"
              label
            />
            <Area
              dataKey="external"
              type="natural"
              fill="var(--color-external)"
              fillOpacity={0.4}
              stroke="var(--color-external)"
              stackId="a"
              label
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
