"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import type { PieSectorDataItem } from "recharts/types/polar/Pie"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An interactive financial pie chart"

const financialData = [
  { category: "Revenue", value: 75000, fill: "var(--color-revenue)" },
  { category: "Expenses", value: 78000, fill: "var(--color-expenses)" },
  { category: "Profit", value: 47000, fill: "var(--color-profit)" },
  { category: "Investments", value: 30000, fill: "var(--color-investments)" },
  { category: "Taxes", value: 15000, fill: "var(--color-taxes)" },
]

const chartConfig = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
  expenses: { label: "Expenses", color: "var(--chart-2)" },
  profit: { label: "Profit", color: "var(--chart-3)" },
  investments: { label: "Investments", color: "var(--chart-4)" },
  taxes: { label: "Taxes", color: "var(--chart-5)" },
}

export default function FinancialPieChart() {
  const id = "financial-pie"
  const [activeCategory, setActiveCategory] = React.useState(financialData[0].category)

  const activeIndex = React.useMemo(
    () => financialData.findIndex((item) => item.category === activeCategory),
    [activeCategory]
  )

  return (
      <Card data-chart={id} className="w-80 chart-card scale-90 hover:scale-95 top-40 end-1 -rotate-30 opacity-60">
        <ChartStyle id={id} config={chartConfig} />
        <CardHeader className="flex-row items-start space-y-0 pb-0">
          <div className="grid gap-1">
            <CardTitle>Financial Overview</CardTitle>
            <CardDescription>Company Breakdown - 2024</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 justify-center size-full pb-0">
          <ChartContainer
            id={id}
            config={chartConfig}
            className="mx-auto w-130 h-72 overflow-visible"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={financialData}
                dataKey="value"
                nameKey="category"
                innerRadius={60}
                outerRadius={100}
                strokeWidth={0}
                activeIndex={activeIndex}
                labelLine={true}
                // 👇 Label always outside with category + value
                label={({ name, value }) => `${name}: $${value.toLocaleString()}`}
                activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                  <g>
                    <Sector {...props} outerRadius={outerRadius + 10} />
                    <Sector
                      {...props}
                      outerRadius={outerRadius + 25}
                      innerRadius={outerRadius + 12}
                    />
                  </g>
                )}
              >
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
                            $
                            {financialData[activeIndex].value.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            {financialData[activeIndex].category}
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
