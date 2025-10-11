"use client";
import React, { useEffect, useRef } from "react";
import ReactECharts from "echarts-for-react";
import { useTheme } from "@/components/theme-provider";
import { useResponsiveScalars } from "@/hooks/useResponsiveScalars";

export default function ProcurementFunnel({ data }: any) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { textScalar, barScalar } = useResponsiveScalars();

  const textColor = isDark ? "#e5e7eb" : "#111827";
  const subTextColor = isDark ? "#9ca3af" : "#6b7280";
  const borderColor = isDark ? "#1f2937" : "#ffffff";

  const stages = [
    { key: "OPRQ", label: "Requests" },
    { key: "OPOR", label: "Purchase Orders" },
    { key: "OPDN", label: "GRPO" },
    { key: "OPCH", label: "Invoices" },
    { key: "OVPM", label: "Payments" },
  ];

  const chartData = stages.map((stage) => ({
    name: stage.label,
    value: data?.[stage.key] || 0,
  }));

  const chartRef = useRef<any>(null);

  const option = {
    backgroundColor: "transparent",
    color: [
      "var(--chart-1)",
      "var(--chart-2)",
      "var(--chart-3)",
      "var(--chart-4)",
      "var(--chart-5)",
    ],
    title: {
      text: "Procurement Funnel",
      left: "center",
      textStyle: {
        fontSize: 13 * textScalar,
        fontWeight: "bold",
        color: textColor,
      },
      subtextStyle: {
        fontSize: 13 * textScalar,
        color: subTextColor,
      },
    },
    tooltip: {
      trigger: "item",
      formatter: "{b} : {c}",
      backgroundColor: isDark ? "#111827" : "#000000",
      textStyle: { color: "#FFFFFF", fontSize: 13 * textScalar },
    },
    legend: {
      orient: "horizontal",
      bottom: -3,
      textStyle: { color: textColor, fontSize: 9 * textScalar },
      data: stages.map((s) => s.label),
      itemWidth: 10 * barScalar,   // width of the legend marker
      itemHeight: 6 * barScalar,
      itemGap: 3,
    },
    series: [
      {
        name: "Procurement Funnel",
        type: "funnel",
        left: "10%",
        top: 35*textScalar,
        bottom: 35*textScalar,
        width: "80%",
        min: 0,
        max: Math.max(...chartData.map((d) => d.value)) || 100,
        sort: "descending",
        gap: 2,
        label: {
          show: true,
          position: "inside",
          color: textColor,
          fontSize: 10 * textScalar,
          formatter: "{c} ({d}%)",
        },
        labelLine: {
          length: 10,
          lineStyle: { width: 1, type: "solid", color: subTextColor },
        },
        itemStyle: {
          borderColor,
        },
        emphasis: {
          itemStyle: {
            borderColor,
            color: (params: any) =>
              `color-mix(in srgb, ${params.color} 80%, black)`,
          },
          label: {
            fontSize: 10 * textScalar,
            fontWeight: "bold",
            color: textColor,
          },
        },
        data: chartData,
      },
    ],
  };

  useEffect(() => {
    const chart = chartRef.current?.getEchartsInstance();
    const handleResize = () => chart?.resize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
