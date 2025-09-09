"use client"

import * as React from "react"
import { Label, Pie, PieChart, LabelList } from "recharts"

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

export const description = "Spend distribution by category"

const chartData = [
  { category: "Raw Materials", amount: 275, fill: "var(--chart-1)" },
  { category: "Logistics", amount: 200, fill: "var(--chart-2)" },
  { category: "Maintenance", amount: 287, fill: "var(--chart-3)" },
  { category: "IT & Software", amount: 173, fill: "var(--chart-4)" },
  { category: "Other", amount: 190, fill: "var(--chart-5)" },
]

const chartConfig = {
  amount: {
    label: "Spend",
  },
  raw: {
    label: "Raw Materials",
    color: "var(--chart-1)",
  },
  logistics: {
    label: "Logistics",
    color: "var(--chart-2)",
  },
  maintenance: {
    label: "Maintenance",
    color: "var(--chart-3)",
  },
  it: {
    label: "IT & Software",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
}

export function SpendDistributionChart() {
  const totalSpend = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.amount, 0)
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Spend Distribution</CardTitle>
        <CardDescription>January – June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 mx-auto pb-0 size-[49%]">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
              label
            >
              {/* Center label */}
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
                          {totalSpend.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Spend
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
