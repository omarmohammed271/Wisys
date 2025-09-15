"use client"

import React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

const chartData = [
  { supplier: "Supplier A", previousCost: 130000, spend: 120000 },
  { supplier: "Supplier B", previousCost: 100000, spend: 95000 },
  { supplier: "Supplier C", previousCost: 90000, spend: 87000 },
  { supplier: "Supplier D", previousCost: 70000, spend: 65000 },
  { supplier: "Supplier E", previousCost: 60000, spend: 54000 },
  { supplier: "Supplier F", previousCost: 45000, spend: 43000 },
]

function calculateCostSaving(previousCost: number, currentCost: number): number {
  if (previousCost === 0) return 0
  return ((previousCost - currentCost) / previousCost) * 100
}

export function TopSuppliersChart() {
  return (
    <Card className="border-border bg-gradient-to-br from-primary/10 to-background">
      <CardHeader>
        <CardTitle>Top Suppliers by Spend</CardTitle>
        <CardDescription>January – June 2024</CardDescription>
      </CardHeader>

      <CardContent className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
          >
            <CartesianGrid horizontal={false} />
            <XAxis type="number" />
            <YAxis
              dataKey="supplier"
              type="category"
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value, name, props) => {
                const payload = props?.payload
                if (!payload) return [value, name]
                const currentSpend = payload.spend ?? 0
                const previousCost = payload.previousCost ?? 0
                const saving = calculateCostSaving(previousCost, currentSpend)
                return [`$${currentSpend.toLocaleString()} (${saving.toFixed(1)}%)`, payload.supplier]
              }}
            />
            <Bar dataKey="spend" fill="var(--chart-2)" radius={4}>
              <LabelList
                dataKey="spend"
                position="right"
                fontSize={12}
                fill="#000"
                formatter={(props:any) => {
                  const payload = props?.payload
                  if (!payload) return ""
                  const saving = calculateCostSaving(payload.previousCost, payload.spend)
                  return `${saving.toFixed(1)}%`
                }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
