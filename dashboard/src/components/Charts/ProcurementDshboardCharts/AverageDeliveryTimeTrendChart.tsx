"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "Average delivery time trend (days per month)"

const chartData = [
  { month: "January", avgDeliveryDays: 6.2 },
  { month: "February", avgDeliveryDays: 5.8 },
  { month: "March", avgDeliveryDays: 5.4 },
  { month: "April", avgDeliveryDays: 4.9 },
  { month: "May", avgDeliveryDays: 5.6 },
  { month: "June", avgDeliveryDays: 4.7 },
]

const chartConfig = {
  avgDeliveryDays: {
    label: "Avg Delivery Time (Days)",
    color: "var(--chart-1)",
  },
}

export function AverageDeliveryTimeTrendChart() {
  return (
    <Card className="h-[50%]">
      <CardHeader>
        <CardTitle>Average Delivery Time Trend</CardTitle>
        <CardDescription>Jan – Jun 2024</CardDescription>
      </CardHeader>
      <CardContent className="size-[65%] mx-auto">
        <ChartContainer config={chartConfig} className=" size-[110%]">
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
              dataKey="avgDeliveryDays"
              type="natural"
              stroke="var(--color-avgDeliveryDays)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-avgDeliveryDays)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                dataKey="avgDeliveryDays"
                position="top"
                offset={12}
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
