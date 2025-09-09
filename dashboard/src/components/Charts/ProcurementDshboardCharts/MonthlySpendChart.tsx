"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, LabelList, XAxis } from "recharts"

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

export const description = "Monthly spend trend with gradient fill"

const chartData = [
  { month: "January", spend: 120000 },
  { month: "February", spend: 135000 },
  { month: "March", spend: 142000 },
  { month: "April", spend: 128000 },
  { month: "May", spend: 150000 },
  { month: "June", spend: 160000 },
]

const chartConfig = {
  spend: {
    label: "Spend (USD)",
    color: "var(--chart-1)",
  },
}

export function MonthlySpendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Spend</CardTitle>
        <CardDescription>Jan – Jun 2024</CardDescription>
      </CardHeader>
      <CardContent className="size-[80%] mx-auto">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
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
              <linearGradient id="fillSpend" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-spend)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-spend)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="spend"
              type="natural"
              fill="url(#fillSpend)"
              fillOpacity={0.4}
              stroke="var(--color-spend)"
            >
              <LabelList
                dataKey="spend"
                position="top"
                offset={4}
                className="fill-foreground"
                fontSize={12}
                formatter={(value: number) => `$${(value / 1000).toFixed(0)}k`}
              />
            </Area>
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
