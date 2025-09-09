"use client"

import { Area, AreaChart, CartesianGrid, LabelList, XAxis } from "recharts"

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

export const description = "OEE (Overall Equipment Effectiveness) trend chart"

const chartData = [
  { month: "January", oee: 72 },
  { month: "February", oee: 75 },
  { month: "March", oee: 70 },
  { month: "April", oee: 78 },
  { month: "May", oee: 82 },
  { month: "June", oee: 80 },
]

const chartConfig = {
  oee: {
    label: "OEE (%)",
    color: "var(--chart-1)",
  },
}

export function OEETrendChart() {
  return (
    <Card className="bg-gradient-to-tl from-secondary/10 to-background">
      <CardHeader>
        <CardTitle>OEE Trend</CardTitle>
        <CardDescription>Overall Equipment Effectiveness (Jan – Jun 2024)</CardDescription>
      </CardHeader>
      <CardContent className="size-[80%] mx-auto">
        <ChartContainer config={chartConfig}>
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
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillOEE" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-oee)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-oee)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="oee"
              type="natural"
              fill="url(#fillOEE)"
              fillOpacity={0.4}
              stroke="var(--color-oee)"
            >
              <LabelList
                dataKey="oee"
                position="top"
                offset={4}
                className="fill-foreground"
                fontSize={12}
                formatter={(value: number) => `${value}%`}
              />
            </Area>
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
