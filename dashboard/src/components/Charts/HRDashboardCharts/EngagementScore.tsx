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
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Employee Engagement Score</CardTitle>
        <CardDescription>Engagement levels across departments</CardDescription>
      </CardHeader>
      <CardContent className="w-[80%] h-full mx-auto">
        <ChartContainer config={chartConfig} className="w-full h-[88%]">
          <ComposedChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="department"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis domain={[0, 100]} />

            {/* Stick (bars) */}
            <Bar
              dataKey="engagement"
              fill={chartConfig.engagement.color}
              barSize={4}
              radius={[4, 4, 0, 0]}
            >
              <LabelList
                dataKey="engagement"
                position="top"
                className="fill-foreground text-xs"
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
              content={<ChartTooltipContent />}
            />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
