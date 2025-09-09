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

export const description = "Maintenance Compliance trend chart"

const chartData = [
  { month: "January", compliance: 88 },
  { month: "February", compliance: 91 },
  { month: "March", compliance: 85 },
  { month: "April", compliance: 92 },
  { month: "May", compliance: 95 },
  { month: "June", compliance: 90 },
]

const chartConfig = {
  compliance: {
    label: "Compliance (%)",
    color: "var(--chart-2)",
  },
}

export function MaintenanceComplianceTrendChart() {
  return (
    <Card className="bg-gradient-to-br from-primary/10 to-background">
      <CardHeader>
        <CardTitle>Maintenance Compliance Trend</CardTitle>
        <CardDescription>
          % of scheduled maintenance completed (Jan – Jun 2024)
        </CardDescription>
      </CardHeader>
      <CardContent className="size-[80%] mx-auto">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 20,left: 12, right: 12 }}
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
              <linearGradient id="fillCompliance" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-compliance)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-compliance)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="compliance"
              type="natural"
              fill="url(#fillCompliance)"
              fillOpacity={0.4}
              stroke="var(--color-compliance)"
            >
              <LabelList
                dataKey="compliance"
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
