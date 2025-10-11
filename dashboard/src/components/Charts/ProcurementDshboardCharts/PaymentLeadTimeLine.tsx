"use client";
import React, { useEffect, useRef } from "react";
import ReactECharts from "echarts-for-react";
import { useTheme } from "@/components/theme-provider";
import { useResponsiveScalars } from "@/hooks/useResponsiveScalars";

interface PaymentLeadTimeLineProps {
  months: string[];
  leadTimes: number[];
}

export default function PaymentLeadTimeLine({ months, leadTimes }: PaymentLeadTimeLineProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { textScalar, barScalar } = useResponsiveScalars();

  const textColor = isDark ? "#e5e7eb" : "#111827";
  const subTextColor = isDark ? "#9ca3af" : "#6b7280";
  const borderColor = isDark ? "#1f2937" : "#ffffff";

  const option = {
    backgroundColor: "transparent",
    title: {
      text: "Payment Lead Time",
      left: "center",
      textStyle: { fontSize: 14 * textScalar, fontWeight: "bold", color: textColor },
      subtextStyle: { fontSize: 10 * textScalar, color: subTextColor },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: isDark ? "#111827" : "#000000",
      textStyle: { color: "#FFFFFF", fontSize: 10 * textScalar },
      formatter: (params: any) => {
        const p = params[0];
        return `${p.axisValue}<br/>Avg Lead Time: <b>${p.value} days</b>`;
      },
    },
    grid: { left: "5%", right: "5%", bottom: "8%", top: "18%", containLabel: true },
    xAxis: {
      type: "category",
      data: months,
      axisLabel: { color: textColor, fontSize: 9 * textScalar },
      axisLine: { lineStyle: { color: subTextColor } },
    },
    yAxis: {
      type: "value",
      name: "Days",
      nameTextStyle: { fontSize: 9 * textScalar },
      axisLabel: { color: textColor, fontSize: 9 * textScalar },
      axisLine: { lineStyle: { color: subTextColor } },
      splitLine: { lineStyle: { color: isDark ? "#374151" : "#e5e7eb" } },
    },
    series: [
      {
        name: "Avg Lead Time",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 6 * barScalar,
        itemStyle: { color: "var(--chart-1)", borderColor, borderWidth: 1.5 * barScalar },
        lineStyle: { color: "var(--chart-1)", width: 2 * barScalar },
        label: {
          show: true,
          position: "top",
          color: textColor,
          fontSize: 9 * textScalar,
          formatter: "{c}d",
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "var(--chart-1)" },
              { offset: 1, color: isDark ? "rgba(31,41,55,0.4)" : "rgba(255,255,255,0.4)" },
            ],
          },
        },
        emphasis: {
          itemStyle: { color: "var(--chart-1)", borderColor, borderWidth: 2 * barScalar },
          lineStyle: { color: "var(--chart-1)", width: 2.5 * barScalar },
        },
        data: leadTimes,
      },
    ],
  };
  
  const chartRef = useRef<any>(null);

  useEffect(() => {
    const chart = chartRef.current?.getEchartsInstance();
    chart?.resize();
  }, []);

  return (
    <div className="w-full p-5 card-style">
      <ReactECharts
        ref={chartRef}
        option={option}
        style={{ width: "100%", height: "100%" }}
        opts={{ renderer: "svg" }}
      />
    </div>
  );
}
