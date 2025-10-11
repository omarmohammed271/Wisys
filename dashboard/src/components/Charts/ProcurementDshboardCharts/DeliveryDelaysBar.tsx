"use client";
import React, { useEffect, useRef } from "react";
import ReactECharts from "echarts-for-react";
import { useTheme } from "@/components/theme-provider";
import { useResponsiveScalars } from "@/hooks/useResponsiveScalars";

interface DeliveryDelaysBarProps {
  vendors: string[];
  delays: number[];
}

export default function DeliveryDelaysBar({ vendors, delays }: DeliveryDelaysBarProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { textScalar, barScalar, iScalar } = useResponsiveScalars();

  const textColor = isDark ? "#e5e7eb" : "#111827"; // gray-200 vs gray-900
  const subTextColor = isDark ? "#9ca3af" : "#6b7280"; // gray-400 vs gray-500
  const borderColor = isDark ? "#1f2937" : "#ffffff"; // subtle border

  // Build bar data
  const barData = delays.map((value, idx) => {
    const color = `var(--chart-${(idx % 5) + 1})`;
    return {
      value,
      itemStyle: { color, borderColor, borderWidth: 1 },
      emphasis: { itemStyle: { color, borderColor, borderWidth: 1 } },
    };
  });

  // Build scatter data for lollipop tops
  const scatterData = delays.map((value, idx) => {
    const color = `var(--chart-${(idx % 5) + 1})`;
    return {
      value: [vendors[idx], value],
      itemStyle: { color, borderColor, borderWidth: 1 },
      emphasis: { itemStyle: { color, borderColor, borderWidth: 1 } },
    };
  });

  const option = {
    backgroundColor: "transparent",
    title: {
      text: "Delivery Delays (Avg Days)",
      left: "center",
      textStyle: {
        fontSize: 11 * textScalar,
        fontWeight: "bold",
        color: textColor,
      },
      subtextStyle: {
        fontSize: 10 * textScalar,
        color: subTextColor,
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      backgroundColor: isDark ? "#111827" : "#000000",
      textStyle: { color: "#FFFFFF", fontSize: 10 * textScalar },
      formatter: (params: any) => {
        const p = params[0];
        return `${p.name}<br/>Delay: <b>${p.value} days</b>`;
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: `0%`,
      top: `15%`,
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: vendors,
      axisLabel: {
        color: textColor,
        fontSize: 9 * textScalar,
        rotate: 25,
      },
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
        name: "Avg Delay (days)",
        type: "bar",
        barWidth: 4 * barScalar, // thinner bar for "stick"
        data: barData,
        z: 1,
      },
      {
        name: "Delay Points",
        type: "scatter",
        symbolSize: 14 * iScalar, // size of "candy"
        data: scatterData,
        label: {
          show: true,
          position: "top",
          formatter: (p: any) => `${p.value[1]}d`,
          color: textColor,
          fontSize: 9 * textScalar,
        },
        z: 2,
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
