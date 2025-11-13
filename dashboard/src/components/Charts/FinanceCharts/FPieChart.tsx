"use client";
import React, { useEffect, useRef } from "react";
import ReactECharts from "echarts-for-react";
import { useTheme } from "@/components/theme-provider";
import { useResponsiveScalars } from "@/hooks/useResponsiveScalars";
import { ChartDetailsDialog } from "@/components/DetailsOverlay/ChartDetailsDialog";
import { Button } from "@/components/ui/button";

interface DepartmentExpenseLollipopChartProps {
  departments?: string[];
  expenses?: number[];
}

export default function DepartmentExpenseLollipopChart({
  departments = ["Salaries", "Operations", "Marketing", "R&D"],
  expenses = [4000, 3000, 2000, 2780],
}: DepartmentExpenseLollipopChartProps) {
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
      axisPointer: { type: "shadow" },
      backgroundColor: isDark ? "#111827" : "#000000",
      textStyle: { color: "#FFFFFF", fontSize: 10 * textScalar },
      formatter: (params: any) => {
        const p = params[0];
        return `${p.name}<br/>Expense: <b>$${p.value}</b>`;
      },
    },
    xAxis: {
      type: "category",
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
    grid: { left: "5%", right: "5%", bottom: "8%", top: "20%", containLabel: true },
    series: [
      {
        type: "line",
        data: expenses,
        symbol: "circle",
        symbolSize: 10 * barScalar,
        lineStyle: { width: 0 }, // hide connecting line
        itemStyle: { color: "var(--chart-1)", borderColor, borderWidth: 1.5 * barScalar },
        label: {
          show: true,
          position: "top",
          color: textColor,
          fontSize: 9 * textScalar,
          formatter: "${c}",
        },
        emphasis: { // disable hover effect
          focus: "none",
          itemStyle: { color: "var(--chart-1)", borderColor },
          label: { color: textColor },
        },
      },
      {
        type: "bar",
        data: expenses,
        barWidth: 3 * barScalar,
        itemStyle: { color: "var(--chart-1)" },
        emphasis: { // disable hover effect
          focus: "none",
          itemStyle: { color: "var(--chart-1)" },
        },
        z: 0,
      },
    ],
  };

  useEffect(() => {
    chartRef.current?.getEchartsInstance()?.resize();
  }, []);

  return (
    <div className="w-full p-5 card-style relative">
      <ChartDetailsDialog
        title="Department Expense Breakdown"
        trigger={
          <Button variant="text" className="absolute top-[5%] inset-x-0 active:ring-0 z-30">
            <h1
              className="absolute mx-auto font-bold"
              style={{ fontSize: `${13 * textScalar}px` }}
            >
              Department Expense Breakdown
            </h1>
          </Button>
        }
        summary={
          <div style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.6 }} className="space-y-3">
            <p>
              The <strong>Department Expense Lollipop</strong> chart visualizes departmental
              expenses, highlighting the cost distribution across organizational units.
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
                  <th className="border p-2 text-right">Expense ($)</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((d, i) => (
                  <tr key={d}>
                    <td className="border p-2">{d}</td>
                    <td className="border p-2 text-right">{expenses[i]}</td>
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
              <li>Quickly see the highest expense departments.</li>
              <li>Helps identify areas for cost optimization.</li>
              <li>Provides a clean visual for reporting and decision-making.</li>
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
