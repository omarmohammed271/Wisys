"use client"

import * as React from "react"
import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
} from "recharts"

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

// ---------- DATA ----------
const chartData = [
  { date: "2024-04-01", attendance: 220, absence: 30 },
  { date: "2024-04-02", attendance: 210, absence: 40 },
  { date: "2024-04-03", attendance: 230, absence: 20 },
  { date: "2024-04-04", attendance: 200, absence: 50 },
  { date: "2024-04-05", attendance: 225, absence: 25 },
]

// ---------- CONFIG ----------
const chartConfig = {
  attendance: {
    label: "Attendance",
    color: "var(--chart-1)",
  },
  absence: {
    label: "Absence",
    color: "var(--chart-2)",
  },
}

export function AttendanceChart() {
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
    <Card className="py-2 sm:py-0 border-border h-full max-md:h-[350px] flex flex-col overflow-hidden">
      {/* Header */}
      <CardHeader className="flex flex-col items-stretch border-b border-border !p-0">
        <div className="flex flex-1 flex-col justify-center gap-1 px-4 pb-2">
          <CardTitle className="py-2 text-sm sm:text-lg">Attendance / Absence</CardTitle>
        </div>
        <div className="flex">
          {(["attendance", "absence"] as (keyof typeof chartConfig)[]).map(
            (key) => (
              <button
                key={key}
                data-active={activeChart === key}
                className={`${
                  key === "attendance"
                    ? "bg-primary/10"
                    : "bg-secondary/10"
                } border-border flex flex-1 flex-col justify-center gap-1 px-4 py-2 text-left even:border-l`}
                onClick={() => setActiveChart(key)}
              >
                <span className="text-muted-foreground text-[0.6rem] sm:text-xs">
                  {chartConfig[key].label}
                </span>
                <span className="text-sm leading-none font-bold sm:text-lg">
                  {total[key].toLocaleString()}
                </span>
              </button>
            )
          )}
        </div>
      </CardHeader>

      {/* Chart */}
      <CardContent className="px-1 sm:p-4 flex-1">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-full w-full"
        >
          <LineChart
            data={chartData}
            margin={{ top: 15, left: 10, right: 10, bottom: 10 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              minTickGap={20}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
              fontSize={10}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[120px] text-xs"
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }
                />
              }
            />
            <Line
              dataKey="attendance"
              name="Attendance"
              type="monotone"
              stroke="var(--chart-1)"
              strokeWidth={1.5}
              dot={false}
            >
              <LabelList
                dataKey="attendance"
                position="top"
                formatter={(val: number) => `${val}`}
                className="text-[0.6rem] sm:text-xs"
              />
            </Line>
            <Line
              dataKey="absence"
              name="Absence"
              type="monotone"
              stroke="var(--chart-2)"
              strokeWidth={1.5}
              dot={false}
            >
              <LabelList
                dataKey="absence"
                position="top"
                formatter={(val: number) => `${val}`}
                className="text-[0.6rem] sm:text-xs"
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}