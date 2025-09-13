"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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

export const description = "A health area chart with gradient fill"

const chartData = [
  { month: "January", inpatients: 120, outpatients: 340 },
  { month: "February", inpatients: 150, outpatients: 410 },
  { month: "March", inpatients: 180, outpatients: 390 },
  { month: "April", inpatients: 200, outpatients: 420 },
  { month: "May", inpatients: 170, outpatients: 450 },
  { month: "June", inpatients: 210, outpatients: 480 },
]

const chartConfig = {
  inpatients: {
    label: "Inpatients",
    color: "var(--chart-1)",
  },
  outpatients: {
    label: "Outpatients",
    color: "var(--chart-2)",
  },
}

export default function HealthAreaChart() {
  return (
    <Card className="chart-card scale-80 hover:scale-85 top-10 start-15 rotate-30 opacity-60">
      <CardHeader>
        <CardTitle>Patient Flow - Area Chart</CardTitle>
        <CardDescription>
          Tracking inpatient vs outpatient numbers over 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
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
              <linearGradient id="fillInpatients" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-inpatients)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-inpatients)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillOutpatients" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-outpatients)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-outpatients)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="outpatients"
              type="natural"
              fill="url(#fillOutpatients)"
              fillOpacity={0.4}
              stroke="var(--color-outpatients)"
              stackId="a"
            />
            <Area
              dataKey="inpatients"
              type="natural"
              fill="url(#fillInpatients)"
              fillOpacity={0.4}
              stroke="var(--color-inpatients)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Patient volume up by 7.8% this month
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
