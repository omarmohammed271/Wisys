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

export const description = "Downtime hours by machine"

const chartData = [
  { machine: "Machine A", downtimeHours: 12 },
  { machine: "Machine B", downtimeHours: 18 },
  { machine: "Machine C", downtimeHours: 9 },
  { machine: "Machine D", downtimeHours: 15 },
  { machine: "Machine E", downtimeHours: 7 },
]

const chartConfig = {
  downtimeHours: {
    label: "Downtime (hrs)",
    color: "var(--chart-2)",
  },
}

export function DowntimeByMachineChart() {
  return (
    <Card className="bg-gradient-to-bl from-secondary/10 to-background">
      <CardHeader>
        <CardTitle>Downtime by Machine</CardTitle>
        <CardDescription>Recorded hours (Jan – Jun 2024)</CardDescription>
      </CardHeader>
      <CardContent className="w-[80%] mx-auto">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="horizontal"
            margin={{ top: 20, left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false}/>
            <YAxis
              dataKey="downtimeHours"
              type="number"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <XAxis
              dataKey="machine"
              type="category"
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="downtimeHours"
              fill="var(--color-primary)"
              radius={4}
            >
              <LabelList
                dataKey="downtimeHours"
                position="top"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
