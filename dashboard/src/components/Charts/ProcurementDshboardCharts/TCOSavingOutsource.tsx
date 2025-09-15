"use client"

import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis } from "recharts"

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

// TCO Saving (Outsource)
function tcoSavingOutsource(inhouseCost: number, outsourcedCost: number): number {
  return inhouseCost - outsourcedCost
}

const chartData = [
  { month: "January", saving: tcoSavingOutsource(50000, 42000) },
  { month: "February", saving: tcoSavingOutsource(52000, 51000) },
  { month: "March", saving: tcoSavingOutsource(48000, 49000) },
  { month: "April", saving: tcoSavingOutsource(51000, 47000) },
  { month: "May", saving: tcoSavingOutsource(49500, 50500) },
  { month: "June", saving: tcoSavingOutsource(48500, 46000) },
]

const chartConfig = {
  saving: {
    label: "TCO Saving (Outsource)",
  },
}

export function ChartTcoSavingOutsource() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>TCO Saving (Outsource)</CardTitle>
        <CardDescription>
          Comparison of Inhouse vs Outsourced (Jan - Jun)
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-8">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ top : 10,left: 10, right: 10, bottom: 10 }} 
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              interval={0}  
              tickFormatter={(value) => value.slice(0, 3)}  
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel hideIndicator />}
            />

            <Bar dataKey="saving">
              <LabelList
                dataKey="saving"
                position="top"
                className="fill-foreground text-xs"
                formatter={(value: number) => `$${(value / 1000).toFixed(1)}k`}
              />
              {chartData.map((item) => (
                <Cell
                  key={item.month}
                  fill={item.saving > 0 ? "var(--chart-1)" : "var(--chart-2)"}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
