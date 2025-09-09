"use client"

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

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

export const description = "Monthly scrap rate trend (%)"

const chartData = [
  { month: "January", scrapRate: 4.5 },
  { month: "February", scrapRate: 3.8 },
  { month: "March", scrapRate: 5.2 },
  { month: "April", scrapRate: 4.0 },
  { month: "May", scrapRate: 3.5 },
  { month: "June", scrapRate: 4.7 },
]

const chartConfig = {
  scrapRate: {
    label: "Scrap Rate (%)",
    color: "var(--chart-3)",
  },
}

export function ScrapRateChart() {
  return (
    <Card className="h-[50%]">
      <CardHeader>
        <CardTitle>Scrap Rate Trend</CardTitle>
        <CardDescription>Jan – Jun 2024</CardDescription>
      </CardHeader>
      <CardContent className="size-[65%] mx-auto">
        <ChartContainer config={chartConfig} className="size-[110%]">
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
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="scrapRate"
              type="natural"
              stroke="var(--color-scrapRate)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-scrapRate)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                dataKey="scrapRate"
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                formatter={(value: number) => `${value.toFixed(1)}%`}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
