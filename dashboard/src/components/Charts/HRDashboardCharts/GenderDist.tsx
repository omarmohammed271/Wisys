"use client"

import { TrendingUp } from "lucide-react"
import { Label, LabelList, PolarRadiusAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A radial chart with stacked sections"

const chartData = [{ month: "january", male: 1260, female: 570 }]

const chartConfig = {
  male: {
    label: "Male",
    color: "var(--chart-1)",
  },
  female: {
    label: "Female",
    color: "var(--chart-2)",
  },
}

export function GenderDist() {
  const totalVisitors = chartData[0].male + chartData[0].female

  return (
    <Card className="border-border bg-gradient-to-bl from-secondary/10 to-background m-0">
      <CardHeader className="items-center pb-0">
        <CardTitle>Gender Distribution</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0 pt-5 size-[45%] mx-auto">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
            className="scale-120 sm:scale-150"
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="male"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-male)"
              className="stroke-transparent stroke-2"
            >
              <LabelList
                position="outside"   // try "insideStart", "insideEnd", "outside"
                formatter={(value: string) => `${value}`}
                fontSize={12}
              />
            </RadialBar>

            <RadialBar
              dataKey="female"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-female)"
              className="stroke-transparent stroke-2"
            >
              <LabelList
                position="outside"
                formatter={(value: string) => `${value}`}
                fontSize={12}
              />
            </RadialBar>

          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
