"use client";
import React, { useRef, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { useTheme } from "@/components/theme-provider";
import { useResponsiveScalars } from "@/hooks/useResponsiveScalars";
import { ChartDetailsDialog } from "@/components/DetailsOverlay/ChartDetailsDialog";
import { Button } from "@/components/ui/button";

interface ProfitTrendChartProps {
  months?: string[];
  profits?: number[];
}

export default function ProfitTrendChart({
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  profits = [2400, 1398, 980, 3908, 4800, 3800],
}: ProfitTrendChartProps) {
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
        return `${p.axisValue}<br/>Profit: <b>$${p.value}</b>`;
      },
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
        name: "Profit",
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
        data: profits,
      },
    ],
  };

  useEffect(() => {
    chartRef.current?.getEchartsInstance()?.resize();
  }, []);

  return (
    <div className="w-full p-5 card-style relative">
      <ChartDetailsDialog
        title="Profit Trend"
        trigger={
          <Button
            variant="text"
            className="absolute top-[5%] inset-x-0 active:ring-0 z-30"
          >
            <h1
              className="absolute mx-auto font-bold"
              style={{ fontSize: `${13 * textScalar}px` }}
            >
              Profit Trend
            </h1>
          </Button>
        }
        summary={
          <div style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.6 }} className="space-y-3">
            <p>
              The <strong>Profit Trend</strong> chart shows monthly profits to monitor
              financial performance over time.
            </p>
            <p>
              Higher values indicate better profitability, while dips may highlight
              cost pressures or seasonal trends.
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
                  <th className="border p-2 text-right">Profit ($)</th>
                </tr>
              </thead>
              <tbody>
                {months.map((m, i) => (
                  <tr key={m}>
                    <td className="border p-2">{m}</td>
                    <td className="border p-2 text-right">{profits[i]}</td>
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
              <li>Identify peak profit months for strategic planning.</li>
              <li>Monitor dips to address operational or market inefficiencies.</li>
              <li>Use trends to forecast and budget future financial periods.</li>
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
