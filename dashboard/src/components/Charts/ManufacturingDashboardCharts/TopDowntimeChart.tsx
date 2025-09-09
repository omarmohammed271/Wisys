"use client"

import * as React from "react"
import { Pie, PieChart, Label } from "recharts"

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

export const description = "Top downtime contributors by machine"

const chartData = [
  { machine: "Press #1", downtime: 42, fill: "var(--chart-1)" },
  { machine: "Cutter #3", downtime: 35, fill: "var(--chart-2)" },
  { machine: "Oven #2", downtime: 28, fill: "var(--chart-3)" },
  { machine: "Packaging Line", downtime: 20, fill: "var(--chart-4)" },
  { machine: "Mixer #5", downtime: 15, fill: "var(--chart-5)" },
]

const chartConfig = {
  downtime: {
    label: "Downtime (hrs)",
  },
  press: {
    label: "Press #1",
    color: "var(--chart-1)",
  },
  cutter: {
    label: "Cutter #3",
    color: "var(--chart-2)",
  },
  oven: {
    label: "Oven #2",
    color: "var(--chart-3)",
  },
  packaging: {
    label: "Packaging Line",
    color: "var(--chart-4)",
  },
  mixer: {
    label: "Mixer #5",
    color: "var(--chart-5)",
  },
}

export function TopDowntimeChart() {
  const totalDowntime = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.downtime, 0)
  }, [])

  return (
    <Card className="">
      <CardHeader className="items-center pb-0">
        <CardTitle>Top Downtime by Machine</CardTitle>
        <CardDescription>January – June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 mx-auto pb-0 md:w-[80%]">
        <ChartContainer
          config={chartConfig}
          className="mx-auto max-md:aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="downtime"
              nameKey="machine"
              innerRadius={70}
              strokeWidth={2}
              label
            >
              {/* ✅ Center label */}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalDowntime}h
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 20}
                          className="fill-muted-foreground text-sm"
                        >
                          Total Downtime
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
