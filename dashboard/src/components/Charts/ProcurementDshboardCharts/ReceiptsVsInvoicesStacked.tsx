"use client";
import React, { useEffect, useRef } from "react";
import ReactECharts from "echarts-for-react";
import { useTheme } from "@/components/theme-provider";
import { useResponsiveScalars } from "@/hooks/useResponsiveScalars";

interface Props {
  categories: string[];
  receipts: number[];
  invoices: number[];
}

export default function ReceiptsVsInvoicesStacked({ categories, receipts, invoices }: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { textScalar, barScalar } = useResponsiveScalars();

  const textColor = isDark ? "#e5e7eb" : "#111827"; // gray-200 vs gray-900
  const subTextColor = isDark ? "#9ca3af" : "#6b7280"; // gray-400 vs gray-500
  const gridLineColor = isDark ? "#374151" : "#e5e7eb"; // gray-700 vs gray-200

  const option = {
    backgroundColor: "transparent",
    title: {
      text: "Receipts vs Invoices",
      left: "center",
      textStyle: {
        fontSize: 14 * textScalar,
        fontWeight: "bold",
        color: textColor,
      },
      subtextStyle: { fontSize: 10 * textScalar, color: subTextColor },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      backgroundColor: isDark ? "#111827" : "#000000",
      textStyle: { color: "#FFFFFF", fontSize: 10 * textScalar },
    },
    legend: {
      top: "91%",
      left: "center",
      textStyle: { color: textColor, fontSize: 9 * textScalar },
      data: ["Receipts", "Invoices"],
      itemWidth: 10 * barScalar,   // width of the legend marker
      itemHeight: 8 * barScalar,
      itemGap: 6,
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "12%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: categories,
      axisLabel: {
        color: textColor,
        rotate: categories.length > 6 ? 30 : 0,
        fontSize: 9 * textScalar,
      },
      axisLine: {
        lineStyle: { color: subTextColor },
      },
    },
    yAxis: {
      type: "value",
      axisLabel: { color: textColor, fontSize: 9 * textScalar },
      splitLine: { lineStyle: { color: gridLineColor } },
    },
    series: [
      {
        name: "Receipts",
        type: "bar",
        stack: "total",
        data: receipts,
        barMaxWidth: 25 * barScalar,
        itemStyle: { color: "var(--chart-1)" },
        label: {
          show: true,
          formatter: (params: any) => (params.value).toFixed(1),
          color: textColor,
          fontSize: 9 * textScalar,
        },
        emphasis: {
          itemStyle: { color: "var(--chart-1)" },
        },
      },
      {
        name: "Invoices",
        type: "bar",
        stack: "total",
        data: invoices,
        barMaxWidth: 25 * barScalar,
        itemStyle: { color: "var(--chart-2)" },
        label: {
          show: true,
          formatter: (params: any) => (params.value).toFixed(1),
          color: textColor,
          fontSize: 9 * textScalar,
          position: "top",
        },
        emphasis: {
          itemStyle: { color: "var(--chart-2)" },
        },
      },
    ],
  };

  const chartRef = useRef<any>(null);

  useEffect(() => {
    const chart = chartRef.current?.getEchartsInstance();
    chart?.resize(); // recalc size after mount
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
