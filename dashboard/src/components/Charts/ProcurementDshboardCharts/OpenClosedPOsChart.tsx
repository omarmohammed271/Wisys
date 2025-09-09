"use client"

import * as React from "react"
import { Pie, PieChart, Label, LabelList } from "recharts"

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

export const description = "Open vs Closed Purchase Orders (POs)"

const chartData = [
  { status: "Open", value: 126, fill: "var(--chart-1)" },
  { status: "Closed", value: 342, fill: "var(--chart-2)" },
  { status: "Pending Approval", value: 58, fill: "var(--chart-3)" },
]

const chartConfig = {
  value: {
    label: "Purchase Orders",
  },
  open: {
    label: "Open",
    color: "var(--chart-1)",
  },
  closed: {
    label: "Closed",
    color: "var(--chart-2)",
  },
  pending: {
    label: "Pending Approval",
    color: "var(--chart-3)",
  },
}

export function OpenClosedPOsChart() {
  const totalPOs = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0)
  }, [])

  return (
    <Card className="flex flex-col bg-gradient-to-tl from-primary/10 to-background">
      <CardHeader className="items-center pb-0">
        <CardTitle>Open vs Closed POs</CardTitle>
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
              dataKey="value"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
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
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalPOs.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total POs
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
