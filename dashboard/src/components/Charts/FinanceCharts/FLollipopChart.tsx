"use client";
import React, { useRef, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { useTheme } from "@/components/theme-provider";
import { useResponsiveScalars } from "@/hooks/useResponsiveScalars";
import { ChartDetailsDialog } from "@/components/DetailsOverlay/ChartDetailsDialog";
import { Button } from "@/components/ui/button";

interface LollipopChartProps {
  kpis?: string[];
  scores?: number[];
}

export default function LollipopChart({
  kpis = ["ROI", "Liquidity", "Growth", "Efficiency", "Risk"],
  scores = [120, 98, 86, 99, 85],
}: LollipopChartProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { textScalar, barScalar } = useResponsiveScalars();
  const chartRef = useRef<any>(null);

  const textColor = isDark ? "#e5e7eb" : "#111827";
  const borderColor = isDark ? "#1f2937" : "#ffffff";

  const maxScore = Math.max(...scores);

  const option = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      backgroundColor: isDark ? "#111827" : "#000000",
      textStyle: { color: "#fff", fontSize: 10 * textScalar },
      formatter: (params: any) => {
        const p = params[0];
        return `${p.name}<br/>Score: <b>${p.value}</b>`;
      },
    },
    xAxis: {
      type: "category",
      data: kpis,
      axisLabel: { color: textColor, fontSize: 9 * textScalar },
      axisLine: { lineStyle: { color: textColor } },
    },
    yAxis: {
      type: "value",
      axisLabel: { color: textColor, fontSize: 9 * textScalar },
      axisLine: { lineStyle: { color: textColor } },
      splitLine: { lineStyle: { color: isDark ? "#374151" : "#e5e7eb" } },
    },
    grid: { left: "5%", right: "5%", bottom: "15%", top: "20%", containLabel: true },
    series: [
      {
        type: "bar",
        data: scores,
        barWidth: 6 * barScalar,
        itemStyle: {
          color: "var(--chart-2)",
          borderColor,
          borderWidth: 1.5 * barScalar,
        },
        z: 0,
        emphasis: { // disable hover effect
          focus: "none",
          itemStyle: { color: "var(--chart-2)", borderColor },
          label: { color: textColor },
        },
      },
      {
        type: "scatter",
        data: scores.map((v, idx) => ({
          value: [idx, v],
          itemStyle: { color: "var(--chart-2)", borderColor, borderWidth: 1.5 * barScalar },
        })),
        symbolSize: (data: any) => 10 * barScalar,
        label: {
          show: true,
          position: "top",
          formatter: (param: any) => `${param.value[1]}`,
          color: textColor,
          fontSize: 9 * textScalar,
        },
        emphasis: { // disable hover effect
          focus: "none",
          itemStyle: { color: "var(--chart-2)", borderColor },
          label: { color: textColor },
        },
        z: 1,
      },
    ],
  };

  useEffect(() => {
    chartRef.current?.getEchartsInstance()?.resize();
  }, []);

  return (
    <div className="w-full p-5 card-style relative">
      <ChartDetailsDialog
        title="KPIs Performance"
        trigger={
          <Button
            variant="text"
            className="absolute top-[5%] inset-x-0 active:ring-0 z-30"
          >
            <h1
              className="absolute mx-auto font-bold"
              style={{ fontSize: `${13 * textScalar}px` }}
            >
              KPIs Performance
            </h1>
          </Button>
        }
        summary={
          <div style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.6 }} className="space-y-3">
            <p>
              The <strong>KPIs Lollipop Chart</strong> visualizes key performance indicators,
              showing each KPI score with a lollipop (bar + circle) for clear comparison.
            </p>
          </div>
        }
        dataAndFilters={
          <div style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.6 }} className="space-y-4">
            <table className="w-full text-sm border-collapse border border-border">
              <thead className="bg-muted/50">
                <tr>
                  <th className="border p-2 text-left">KPI</th>
                  <th className="border p-2 text-right">Score</th>
                </tr>
              </thead>
              <tbody>
                {kpis.map((kpi, idx) => (
                  <tr key={kpi}>
                    <td className="border p-2">{kpi}</td>
                    <td className="border p-2 text-right">{scores[idx]}</td>
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
              <li>Quickly identify top-performing KPIs.</li>
              <li>Visual comparison between different KPI scores.</li>
              <li>Supports operational and strategic decision-making.</li>
            </ul>
          </div>
        }
      />
      <ReactECharts ref={chartRef} option={option} style={{ width: "100%", height: "100%" }} opts={{ renderer: "svg" }} />
    </div>
  );
}
