"use client"

import {
  CartesianGrid,
  XAxis,
  YAxis,
  ComposedChart,
  Bar,
  Scatter,
  LabelList,
} from "recharts"

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

export const description = "Supplier performance lollipop chart"

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
    <Card className="bg-gradient-to-bl from-secondary/10 to-background">
      <CardHeader>
        <CardTitle>Supplier Performance</CardTitle>
        <CardDescription>Performance scores across suppliers</CardDescription>
      </CardHeader>
      <CardContent className="size-[80%] mx-auto">
        <ChartContainer config={chartConfig}>
          <ComposedChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="supplier"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent hideLabel />}
            />

            {/* Stick (bars) */}
            <Bar
              dataKey="performance"
              fill="var(--color-performance)"
              barSize={4}
              radius={[4, 4, 0, 0]}
            >
              <LabelList
                dataKey="performance"
                position="right"
                className="fill-foreground text-xs"
              />
            </Bar>

            {/* Lollipop head (points) */}
            <Scatter
              data={chartData}
              dataKey="performance"
              fill="var(--color-primary)"
              shape="circle"
            />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
