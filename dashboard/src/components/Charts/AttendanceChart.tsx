"use client"

import * as React from "react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

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

export const description = "An interactive line chart"

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
    <Card className="py-4 sm:py-0 border-border h-full max-md:h-[350px] flex flex-col overflow-hidden bg-gradient-to-br from-primary/10 to-background">
      <CardHeader className="flex flex-col items-stretch border-b border-border !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle>Attendance/Absence</CardTitle>
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
          <LineChart
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
            <Line
              dataKey={"attendance"}
              type="monotone"
              stroke={`var(--color-${"attendance"})`}
              strokeWidth={2}
              dot={false}
            >
              <LabelList 
                dataKey={"attendance"} 
                position="top" 
                formatter={(val: number) => `${val}`} 
                className="text-xs sm:text-sm min-[2000px]:text-base"
              />
            </Line>
            <Line
              dataKey={"absence"}
              type="monotone"
              stroke={`var(--color-${"absence"})`}
              strokeWidth={2}
              dot={false}
            >
              <LabelList 
                dataKey={"absence"} 
                position="top" 
                formatter={(val: number) => `${val}`} 
                className="text-xs sm:text-sm min-[2000px]:text-base"
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
