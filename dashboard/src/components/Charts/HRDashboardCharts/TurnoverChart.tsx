"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "Employee turnover bar chart"

// Example turnover data (hires vs exits per month)
const chartData = [
  { date: "2024-01-01", hires: 20, exits: 5 },
  { date: "2024-02-01", hires: 15, exits: 8 },
  { date: "2024-03-01", hires: 25, exits: 10 },
  { date: "2024-04-01", hires: 18, exits: 12 },
  { date: "2024-05-01", hires: 22, exits: 9 },
]

const chartConfig = {
  hires: {
    label: "New Hires",
    color: "var(--chart-1)",
  },
  exits: {
    label: "Exits",
    color: "var(--chart-2)",
  },
}

export function TurnoverChart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("hires")

  const total = React.useMemo(
    () => ({
      hires: chartData.reduce((acc, curr) => acc + curr.hires, 0),
      exits: chartData.reduce((acc, curr) => acc + curr.exits, 0),
    }),
    []
  )

  return (
    <Card className="py-0 border-border h-full max-md:h-[350px] flex flex-col overflow-hidden">
      <CardHeader className="flex flex-col items-stretch border-b border-border !p-0">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3">
          <CardTitle className="py-4 text-xl">Employee Turnover</CardTitle>
        </div>
        <div className="flex">
        {(["hires", "exits"] as (keyof typeof total)[]).map((key) => {
          const chart = key as keyof typeof chartConfig
          return (
            <button
              key={chart}
              data-active={activeChart === chart}
              className={`${
                chart === activeChart ? "bg-primary/10" : "bg-secondary/10"
              } border-border flex flex-1 flex-col justify-center gap-1 px-6 py-4 text-left even:border-l`}
              onClick={() => setActiveChart(chart)}
            >
              <span className="text-muted-foreground text-xs">
                {chartConfig[chart].label}
              </span>
              <span className="text-lg leading-none font-bold sm:text-xl">
                {total[key].toLocaleString()}
              </span>
            </button>
          )
        })}
        </div>
      </CardHeader>

      <CardContent className="px-2 sm:p-6 flex-1">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-full w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 15, left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  }
                />
              }
            />
            <Bar dataKey="hires" fill="var(--color-hires)">
              <LabelList
                dataKey="hires"
                position="top"
                formatter={(val: number) => `${val}`}
                className="text-xs sm:text-sm min-[2000px]:text-base"
              />
            </Bar>
            <Bar dataKey="exits" fill="var(--color-exits)">
              <LabelList
                dataKey="exits"
                position="top"
                formatter={(val: number) => `${val}`}
                className="text-xs sm:text-sm min-[2000px]:text-base"
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
