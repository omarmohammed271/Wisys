"use client";
import React, { useEffect, useRef } from "react";
import ReactECharts from "echarts-for-react";
import { useTheme } from "@/components/theme-provider";
import { useResponsiveScalars } from "@/hooks/useResponsiveScalars";
import { ChartDetailsDialog } from "@/components/DetailsOverlay/ChartDetailsDialog";
import { Button } from "@/components/ui/button";

interface DepartmentMarginBarChartProps {
  departments?: string[];
  margins?: number[];
}

export default function DepartmentMarginBarChart({
  departments = ["Sales", "Marketing", "Finance", "HR", "IT"],
  margins = [4000, 3000, 2000, 2780, 1890],
}: DepartmentMarginBarChartProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { textScalar, barScalar } = useResponsiveScalars();
  const chartRef = useRef<any>(null);

  const textColor = isDark ? "#e5e7eb" : "#111827";
  const subTextColor = isDark ? "#9ca3af" : "#6b7280";
  const borderColor = isDark ? "#1f2937" : "#ffffff";

  const option = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "axis",
      backgroundColor: isDark ? "#111827" : "#000000",
      textStyle: { color: "#FFFFFF", fontSize: 10 * textScalar },
      formatter: (params: any) => {
        const p = params[0];
        return `${p.name}<br/>Margin: <b>$${p.value}</b>`;
      },
    },
    grid: { left: "5%", right: "5%", bottom: "8%", top: "20%", containLabel: true },
    xAxis: {
      type: "category",
      axisPointer: { type: "shadow" },
      data: departments,
      axisLabel: { color: textColor, fontSize: 9 * textScalar },
      axisLine: { lineStyle: { color: subTextColor } },
    },
    yAxis: {
      type: "value",
      name: "USD",
      nameTextStyle: { fontSize: 9 * textScalar },
      axisLabel: { color: textColor, fontSize: 9 * textScalar },
      axisLine: { lineStyle: { color: subTextColor } },
      splitLine: { lineStyle: { color: isDark ? "#374151" : "#e5e7eb" } },
    },
    series: [
      {
        name: "Margin",
        type: "bar",
        barWidth: 18 * barScalar,
        itemStyle: {
          color: "var(--chart-1)",
          borderColor,
          borderWidth: 1 * barScalar,
        },
        label: {
          show: true,
          position: "top",
          color: textColor,
          fontSize: 9 * textScalar,
          formatter: "${c}",
        },
        emphasis: { // lock color and disable hover
          focus: "none",
          itemStyle: { color: "var(--chart-1)", borderColor },
          label: { color: textColor },
        },
        data: margins,
      },
    ],
  };

  useEffect(() => {
    chartRef.current?.getEchartsInstance()?.resize();
  }, []);

  return (
    <div className="w-full p-5 card-style relative">
      <ChartDetailsDialog
        title="Profit Margin by Department"
        trigger={
          <Button variant="text" className="absolute top-[5%] inset-x-0 active:ring-0 z-30">
            <h1
              className="absolute mx-auto font-bold"
              style={{ fontSize: `${13 * textScalar}px` }}
            >
              Profit Margin by Department
            </h1>
          </Button>
        }
        summary={
          <div style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.6 }} className="space-y-3">
            <p>
              The <strong>Profit Margin by Department</strong> chart visualizes
              departmental profitability, helping identify high- and low-performing units.
            </p>
          </div>
        }
        dataAndFilters={
          <div style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.6 }} className="space-y-4">
            <table
              className="w-full text-sm border-collapse border border-border"
              style={{ fontSize: `${14 * textScalar}px`, lineHeight: 1.5 }}
            >
              <thead className="bg-muted/50">
                <tr>
                  <th className="border p-2 text-left">Department</th>
                  <th className="border p-2 text-right">Margin ($)</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((d, i) => (
                  <tr key={d}>
                    <td className="border p-2">{d}</td>
                    <td className="border p-2 text-right">{margins[i]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
        insights={
          <div style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.6 }} className="space-y-3">
            <p className="font-semibold text-foreground">
              <strong>Key Insights</strong>
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li>Identify departments with highest contribution margins.</li>
              <li>Spot underperforming departments to optimize cost control.</li>
              <li>Inform resource allocation and incentive strategies.</li>
            </ul>
          </div>
        }
      />
      <ReactECharts
        ref={chartRef}
        option={option}
        style={{ width: "100%", height: "100%" }}
        opts={{ renderer: "svg" }}
      />
    </div>
  );
}
