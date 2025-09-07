"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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

export const description = "An interactive bar chart"


const chartData = [
  { date: "2024-04-01", attendance: 222, absence: 150 },
  { date: "2024-04-02", attendance: 97, absence: 180 },
  { date: "2024-04-03", attendance: 167, absence: 120 },
  { date: "2024-04-04", attendance: 242, absence: 260 },
  { date: "2024-04-05", attendance: 373, absence: 290 },
  { date: "2024-04-06", attendance: 301, absence: 340 },
  { date: "2024-04-07", attendance: 245, absence: 180 },
  { date: "2024-04-08", attendance: 409, absence: 320 },
  { date: "2024-04-09", attendance: 59, absence: 110 },
  { date: "2024-04-10", attendance: 261, absence: 190 },
  { date: "2024-04-11", attendance: 327, absence: 350 },
  { date: "2024-04-12", attendance: 292, absence: 210 },
  { date: "2024-04-13", attendance: 342, absence: 380 },
  { date: "2024-04-14", attendance: 137, absence: 220 },
  { date: "2024-04-15", attendance: 120, absence: 170 },
  { date: "2024-04-16", attendance: 138, absence: 190 },
  { date: "2024-04-17", attendance: 446, absence: 360 },
  { date: "2024-04-18", attendance: 364, absence: 410 },
  { date: "2024-04-19", attendance: 243, absence: 180 },
  { date: "2024-04-20", attendance: 89, absence: 150 },
  { date: "2024-04-21", attendance: 137, absence: 200 },
  { date: "2024-04-22", attendance: 224, absence: 170 },
  { date: "2024-04-23", attendance: 138, absence: 230 },
  { date: "2024-04-24", attendance: 387, absence: 290 },
  { date: "2024-04-25", attendance: 215, absence: 250 },
  { date: "2024-04-26", attendance: 75, absence: 130 },
  { date: "2024-04-27", attendance: 383, absence: 420 },
  { date: "2024-04-28", attendance: 122, absence: 180 },
  { date: "2024-04-29", attendance: 315, absence: 240 },
  { date: "2024-04-30", attendance: 454, absence: 380 },
  { date: "2024-05-01", attendance: 165, absence: 220 },
  { date: "2024-05-02", attendance: 293, absence: 310 },
  { date: "2024-05-03", attendance: 247, absence: 190 },
  { date: "2024-05-04", attendance: 385, absence: 420 },
  { date: "2024-05-05", attendance: 481, absence: 390 },
  { date: "2024-05-06", attendance: 498, absence: 520 },
  { date: "2024-05-07", attendance: 388, absence: 300 },
  { date: "2024-05-08", attendance: 149, absence: 210 },
  { date: "2024-05-09", attendance: 227, absence: 180 },
  { date: "2024-05-10", attendance: 293, absence: 330 },
  { date: "2024-05-11", attendance: 335, absence: 270 },
  { date: "2024-05-12", attendance: 197, absence: 240 },
  { date: "2024-05-13", attendance: 197, absence: 160 },
  { date: "2024-05-14", attendance: 448, absence: 490 },
  { date: "2024-05-15", attendance: 473, absence: 380 },
  { date: "2024-05-16", attendance: 338, absence: 400 },
  { date: "2024-05-17", attendance: 499, absence: 420 },
  { date: "2024-05-18", attendance: 315, absence: 350 },
  { date: "2024-05-19", attendance: 235, absence: 180 },
  { date: "2024-05-20", attendance: 177, absence: 230 },
]

const chartConfig = {
  views: {
    label: "Page Views",
  },
  attendance: {
    label: "Attendane",
    color: "var(--chart-1)",
  },
  absence: {
    label: "Absence",
    color: "var(--chart-2)",
  },
}

export function TurnoverChart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("attendance")

  const total = React.useMemo(
    () => ({
      attendance: chartData.reduce((acc, curr) => acc + curr.attendance, 0),
      absence: chartData.reduce((acc, curr) => acc + curr.absence, 0),
    }),
    []
  )

  return (
    <Card className="py-0 border-border h-full max-md:h-[350px] flex flex-col overflow-hidden">
      <CardHeader className="flex flex-col items-stretch border-b border-border !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
          <CardTitle>Employee Turnover</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["attendance", "absence"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                // className="data-[active=true]:bg-muted/50 border-border flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                className={`${chart == "attendance" ? "bg-primary/10" : "bg-secondary/10"} border-border flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6`}
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-muted-foreground text-xs">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
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
            margin={{
              left: 12,
              right: 12,
            }}
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
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={"attendance"} fill={`var(--color-${"attendance"})`} />
            <Bar dataKey={"absence"} fill={`var(--color-${"absence"})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
