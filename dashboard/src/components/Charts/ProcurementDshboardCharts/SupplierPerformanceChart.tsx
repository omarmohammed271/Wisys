"use client"

import { PolarAngleAxis, PolarGrid, Radar, RadarChart, LabelList } from "recharts"

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

export const description = "Supplier performance radar chart"

const chartData = [
  { supplier: "Supplier A", performance: 86 },
  { supplier: "Supplier B", performance: 72 },
  { supplier: "Supplier C", performance: 95 },
  { supplier: "Supplier D", performance: 68 },
  { supplier: "Supplier E", performance: 80 },
  { supplier: "Supplier F", performance: 77 },
]

const chartConfig = {
  performance: {
    label: "Performance Score",
    color: "var(--chart-1)",
  },
}

export function SupplierPerformanceChart() {
  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle>Supplier Performance</CardTitle>
        <CardDescription>
          On-time delivery & quality scores (Jan – Jun 2024)
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0 size-[49%] mx-auto">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[320px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            {/* ✅ Supplier labels fixed */}
            <PolarAngleAxis
              dataKey="supplier"
              tick={{
                fontSize: 12,
                textAnchor: "middle",
              }}
              orientation="outer"
            />
            <PolarGrid />
            <Radar
              dataKey="performance"
              fill="var(--chart-1)"
              fillOpacity={0.6}
              stroke="var(--chart-1)"
              dot={{ r: 4, fillOpacity: 1 }}
            >
              {/* ✅ Keep performance labels upright */}
              <LabelList
                dataKey="performance"
                content={(props) => {
                  const { x, y, value } = props
                  return (
                    <text
                      x={x}
                      y={y}
                      dy={-6} // move label above the dot
                      textAnchor="middle"
                      fill="var(--foreground)"
                      fontSize={12}
                      fontWeight={500}
                    >
                      {value}
                    </text>
                  )
                }}
              />
            </Radar>
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
