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

export const description = "Employee engagement lollipop chart"

const chartData = [
  { department: "HR", engagement: 86 },
  { department: "Engineering", engagement: 72 },
  { department: "Marketing", engagement: 95 },
  { department: "Finance", engagement: 68 },
  { department: "Sales", engagement: 80 },
  { department: "Support", engagement: 77 },
]

const chartConfig = {
  engagement: {
    label: "Engagement Score",
    color: "var(--chart-1)",
  },
}

export function EngagementScoreChart() {
  return (
    <Card className="h-full relative">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm sm:text-lg">Employee Engagement Score</CardTitle>
        <CardDescription className="text-[0.6rem] sm:text-xs">Engagement levels across departments</CardDescription>
      </CardHeader>
      <CardContent className="w-[100%] h-full  ">
        <ChartContainer config={chartConfig} className="w-[90%] h-[65%] absolute ">
          <ComposedChart data={chartData} margin={{ top: 10,  right: 10, bottom: 10 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="department"
              tickLine={false}
              tickMargin={5}
              axisLine={false}
              fontSize={10}
            />
            <YAxis domain={[0, 100]} fontSize={10} />

            {/* Stick (bars) */}

            <Bar
              dataKey="engagement"
              fill={chartConfig.engagement.color}
              barSize={3}
              radius={[2, 2, 0, 0]}
            >
              <LabelList
                dataKey="engagement"
                position="top"
                className="fill-foreground text-[0.6rem] sm:text-xs"
              />
            </Bar>

            {/* Lollipop head (points) */}
            <Scatter
              data={chartData}
              dataKey="engagement"
              fill="var(--color-primary)"
              shape="circle"
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className="text-xs" />}
            />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}