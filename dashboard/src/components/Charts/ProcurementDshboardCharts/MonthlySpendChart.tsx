"use client"

import { Area, AreaChart, CartesianGrid, LabelList, XAxis } from "recharts"

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

const chartData = [
  { month: "January", potentialCost: 120000, actualCost: 100000 },
  { month: "February", potentialCost: 135000, actualCost: 110000 },
  { month: "March", potentialCost: 142000, actualCost: 120000 },
  { month: "April", potentialCost: 128000, actualCost: 115000 },
  { month: "May", potentialCost: 150000, actualCost: 130000 },
  { month: "June", potentialCost: 160000, actualCost: 140000 },
]

function calculateCostAvoidance(potentialCost: number, actualCost: number) {
  const costAvoided = potentialCost - actualCost
  const avoidancePercentage = (costAvoided / potentialCost) * 100
  return { costAvoided, avoidancePercentage: Number(avoidancePercentage.toFixed(2)) }
}

const processedData = chartData.map((item) => {
  const { costAvoided, avoidancePercentage } = calculateCostAvoidance(
    item.potentialCost,
    item.actualCost
  )
  return {
    month: item.month,
    costAvoidance: costAvoided,
    avoidancePercentage, //  Tooltip  Labels
  }
})

const chartConfig = {
  costAvoidance: {
    label: "Cost Avoidance (USD)",
    color: "var(--chart-1)",
  },
}

export function MonthlyCostAvoidanceChart() {
  return (
    <Card className="bg-gradient-to-tl from-secondary/10 to-background">
      <CardHeader>
        <CardTitle>Monthly Cost Avoidance</CardTitle>
        <CardDescription>Jan – Jun 2024</CardDescription>
      </CardHeader>
      <CardContent className="size-[100%] mt-11 mx-auto">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={processedData}
            margin={{
              left: 12,
              right: 12,
              top:10
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillCostAvoidance" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor='var(--chart-1)'
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-spend)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="costAvoidance"
              type="natural"
              fill="url(#fillCostAvoidance)"
              fillOpacity={0.4}
              stroke="var(--color-spend)"
            >
              <LabelList
                dataKey="costAvoidance"
                position="top"
                offset={4}
                className="fill-foreground"
                fontSize={12}
                formatter={(value: number) => `$${(value / 1000).toFixed(0)}k`}
              />
            </Area>
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
