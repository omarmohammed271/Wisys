"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

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

export const description = "A manufacturing radar chart with performance metrics"

const chartData = [
  { metric: "Production", value: 85 },
  { metric: "Efficiency", value: 72 },
  { metric: "Quality", value: 90 },
  { metric: "Downtime", value: 60 },
  { metric: "Safety", value: 95 },
]

const chartConfig = {
  value: {
    label: "Manufacturing KPI",
    color: "var(--chart-4)", // pick a consistent theme color
  },
}

export default function ManufacturingRadarChart() {
  return (
    <Card className="chart-card bg-none border-0 scale-80 hover:scale-85 top-[60%] -start-10 -rotate-30 opacity-60">
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] w-100"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="metric" />
            <PolarGrid />
            <Radar
              dataKey="value"
              fill="var(--color-value)"
              fillOpacity={0.6}
              stroke="var(--color-value)"
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
