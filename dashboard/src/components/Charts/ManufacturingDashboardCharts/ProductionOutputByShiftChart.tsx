"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

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

export const description = "Production output by shift (units produced)"

const chartData = [
  { day: "Mon", morning: 120, afternoon: 95, night: 80 },
  { day: "Tue", morning: 140, afternoon: 110, night: 90 },
  { day: "Wed", morning: 135, afternoon: 100, night: 85 },
  { day: "Thu", morning: 150, afternoon: 120, night: 95 },
  { day: "Fri", morning: 160, afternoon: 130, night: 100 },
]

const chartConfig = {
  morning: {
    label: "Morning Shift",
    color: "var(--chart-1)",
  },
  afternoon: {
    label: "Afternoon Shift",
    color: "var(--chart-2)",
  },
  night: {
    label: "Night Shift",
    color: "var(--chart-3)",
  },
}

export function ProductionOutputByShiftChart() {
  return (
    <Card className="bg-gradient-to-tr from-primary/10 to-background">
      <CardHeader>
        <CardTitle>Production Output by Shift</CardTitle>
        <CardDescription>Units produced per shift (Mon – Fri)</CardDescription>
      </CardHeader>
      <CardContent className="w-[80%] mx-auto">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 16, left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />

            <Bar
              dataKey="morning"
              fill="var(--color-morning)"
              radius={[4, 4, 0, 0]}
            >
              <LabelList
                dataKey="morning"
                position="top"
                offset={4}
                className="fill-foreground"
                fontSize={11}
              />
            </Bar>
            <Bar
              dataKey="afternoon"
              fill="var(--color-afternoon)"
              radius={[4, 4, 0, 0]}
            >
              <LabelList
                dataKey="afternoon"
                position="top"
                offset={4}
                className="fill-foreground"
                fontSize={11}
              />
            </Bar>
            <Bar
              dataKey="night"
              fill="var(--color-night)"
              radius={[4, 4, 0, 0]}
            >
              <LabelList
                dataKey="night"
                position="top"
                offset={4}
                className="fill-foreground"
                fontSize={11}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
