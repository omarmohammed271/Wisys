"use client"

import * as React from "react"
import { Pie, PieChart, Label, Legend } from "recharts"

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

export const description = "A donut chart with meeting survivability rates"

const chartData = [
  { status: "Productive", meetings: 120, fill: "var(--chart-1)" },
  { status: "Partially Useful", meetings: 60, fill: "var(--chart-2)" },
  { status: "Unnecessary", meetings: 40, fill: "var(--chart-3)" },
  { status: "Canceled", meetings: 30, fill: "var(--chart-4)" },
]

const chartConfig = {
  meetings: { label: "Meetings" },
  productive: { label: "Productive", color: "var(--chart-1)" },
  partially: { label: "Partially Useful", color: "var(--chart-2)" },
  unnecessary: { label: "Unnecessary", color: "var(--chart-3)" },
  canceled: { label: "Canceled", color: "var(--chart-4)" },
}

export function MeetingsSurvivabilityChart() {
  const totalMeetings = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.meetings, 0),
    []
  )

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-sm sm:text-lg">Meetings Survivability</CardTitle>
        <CardDescription className="text-[0.6rem] sm:text-xs">Distribution of meeting outcomes</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 h-full pb-0 mx-auto w-full pt-0">
        <ChartContainer config={chartConfig} className="mx-auto h-full w-full">
          <PieChart margin={{ }}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel className="text-xs" />}
            />
            <Pie
              data={chartData}
              dataKey="meetings"
              nameKey="status"
              innerRadius={30}
              strokeWidth={1}
              
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-xl font-bold"
                        >
                          {totalMeetings.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 16}
                          className="fill-muted-foreground text-xs"
                        >
                          Meetings
                        </tspan>
                      </text>
                    )
                  }
                }}
                
              />
         
            </Pie>
                 <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: '10px' ,display:'flex',flexDirection:'row',justifyContent:'space-between' ,width:'fit' }}
              />
          </PieChart>
          
        </ChartContainer>
        
      </CardContent>
    </Card>
  )
}