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

export const description = "Top suppliers by spend"

const chartData = [
  { supplier: "Supplier A", spend: 120000 },
  { supplier: "Supplier B", spend: 95000 },
  { supplier: "Supplier C", spend: 87000 },
  { supplier: "Supplier D", spend: 65000 },
  { supplier: "Supplier E", spend: 54000 },
  { supplier: "Supplier F", spend: 43000 },
]

const chartConfig = {
  spend: {
    label: "Spend (USD)",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
}

export function TopSuppliersChart() {
  return (
    <Card className="border-border bg-gradient-to-br from-primary/10 to-background">
      <CardHeader>
        <CardTitle>Top Suppliers by Spend</CardTitle>
        <CardDescription>January – June 2024</CardDescription>
      </CardHeader>
      <CardContent className="max-[2000px]:w-[80%]">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ right: 16 }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="supplier"
              type="category"
              axisLine={false}
            />
            <XAxis dataKey="spend" type="number" />
            <ChartTooltip
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="spend"
              layout="vertical"
              fill="var(--chart-2)"
              radius={4}
            >
              {/* Supplier names on left */}
              <LabelList
                dataKey="supplier"
                position="insideLeft"
                offset={8}
                className="fill-(--color-label)"
                fontSize={12}
              />
              {/* Spend values on right */}
              <LabelList
                dataKey="spend"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
                formatter={(value: number) =>
                  `$${(value / 1000).toFixed(1)}k`
                }
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
