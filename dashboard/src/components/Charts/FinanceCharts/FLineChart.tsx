"use client";
import React, { useRef, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { useTheme } from "@/components/theme-provider";
import { useResponsiveScalars } from "@/hooks/useResponsiveScalars";
import { ChartDetailsDialog } from "@/components/DetailsOverlay/ChartDetailsDialog";
import { Button } from "@/components/ui/button";

interface FLineChartProps {
  months?: string[];
  revenues?: number[];
  expenses?: number[];
}

export default function RevenueExpenseLineChart({
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  revenues = [4000, 3000, 2000, 2780, 1890, 2390, 3490],
  expenses = [2400, 1398, 980, 3908, 4800, 3800, 4300],
}: FLineChartProps) {
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
      confine: true,
      formatter: (params: any) => {
        const lines = [`<b>${params[0].axisValue}</b>`];
        params.forEach((p: any) => {
          lines.push(`${p.marker} ${p.seriesName}: <b>$${p.value}</b>`);
        });
        return lines.join("<br/>");
      },
    },
    emphasis: {
      focus: "series",
    },
    select: {
      disabled: false,
    },
    legend: {
      data: ["Revenue", "Expense"],
      top: "92%",
      textStyle: { color: textColor, fontSize: 10 * textScalar },
      icon: "circle",
      selectedMode: false,
    },
    grid: { left: "5%", right: "5%", bottom: "8%", top: "20%", containLabel: true },
    xAxis: {
      type: "category",
      data: months,
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
        name: "Revenue",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 6 * barScalar,
        itemStyle: { color: "var(--chart-1)", borderColor, borderWidth: 1.5 * barScalar },
        lineStyle: { color: "var(--chart-1)", width: 2 * barScalar },
        areaStyle: {
          color: {
            type: "linear",
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: "var(--chart-1)" },
              { offset: 1, color: isDark ? "rgba(31,41,55,0.4)" : "rgba(255,255,255,0.4)" },
            ],
          },
        },
        label: {
          show: true,
          position: "top",
          color: textColor,
          fontSize: 9 * textScalar,
          formatter: "${c}",
        },
        data: revenues,
      },
      {
        name: "Expense",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 6 * barScalar,
        itemStyle: { color: "var(--chart-2)", borderColor, borderWidth: 1.5 * barScalar },
        lineStyle: { color: "var(--chart-2)", width: 2 * barScalar },
        areaStyle: {
          color: {
            type: "linear",
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: "var(--chart-2)" },
              { offset: 1, color: isDark ? "rgba(31,41,55,0.4)" : "rgba(255,255,255,0.4)" },
            ],
          },
        },
        label: {
          show: true,
          position: "top",
          color: textColor,
          fontSize: 9 * textScalar,
          formatter: "${c}",
        },
        data: expenses,
      },
    ],
  };

  useEffect(() => {
    chartRef.current?.getEchartsInstance()?.resize();
  }, []);

  return (
    <div className="w-full p-5 card-style relative">
      <ChartDetailsDialog
        title="Revenue vs Expenses"
        trigger={
          <Button
            variant="text"
            className="absolute top-[5%] inset-x-0 active:ring-0 z-30"
          >
            <h1
              className="absolute mx-auto font-bold"
              style={{ fontSize: `${13 * textScalar}px` }}
            >
              Revenue vs Expenses
            </h1>
          </Button>
        }
        summary={
          <div style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.6 }} className="space-y-3">
            <p>
              The <strong>Revenue vs Expense</strong> chart compares monthly earnings
              against outgoing costs to evaluate profitability trends.
            </p>
            <ul className="list-disc pl-4">
              <li><strong>Revenue:</strong> Total income from operations per month.</li>
              <li><strong>Expense:</strong> Total operational costs per month.</li>
            </ul>
            <p className="text-muted-foreground">
              Use this chart to monitor financial efficiency and spending control.
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
                  <th className="border p-2 text-left">Month</th>
                  <th className="border p-2 text-right">Revenue ($)</th>
                  <th className="border p-2 text-right">Expense ($)</th>
                </tr>
              </thead>
              <tbody>
                {months.map((m, i) => (
                  <tr key={m}>
                    <td className="border p-2">{m}</td>
                    <td className="border p-2 text-right">{revenues[i]}</td>
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
              <li>
                <strong>Profitability:</strong> Months with larger gaps between revenue
                and expense show stronger performance.
              </li>
              <li>
                <strong>Expense Spikes:</strong> Identify cost surges that may require
                review or approval optimization.
              </li>
              <li>
                <strong>Seasonal Trends:</strong> Observe how financial performance aligns
                with cyclical business patterns.
              </li>
            </ul>
            <p className="text-muted-foreground italic pt-1">
              Tip: Cross-analyze with sales volume charts to pinpoint growth drivers.
            </p>
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
