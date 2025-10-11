"use client";
import React, { useEffect, useRef } from "react";
import ReactECharts from "echarts-for-react";
import { useTheme } from "@/components/theme-provider";
import { useResponsiveScalars } from "@/hooks/useResponsiveScalars";

interface InvoicePaymentStatusBarProps {
  months: string[];
  fullyPaid: number[];
  partiallyPaid: number[];
  unpaid: number[];
}

export default function InvoicePaymentStatusBar({
  months,
  fullyPaid,
  partiallyPaid,
  unpaid,
}: InvoicePaymentStatusBarProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { textScalar, barScalar, iScalar } = useResponsiveScalars();

  const textColor = isDark ? "#e5e7eb" : "#111827";
  const subTextColor = isDark ? "#9ca3af" : "#6b7280";
  const borderColor = isDark ? "#1f2937" : "#ffffff";

  const option = {
    backgroundColor: "transparent",
    title: {
      text: "Invoice Payment Status",
      left: "center",
      textStyle: { fontSize: 13 * textScalar, fontWeight: "bold", color: textColor },
      subtextStyle: { fontSize: 9 * textScalar, color: subTextColor },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      backgroundColor: isDark ? "#111827" : "#000000",
      textStyle: { color: "#FFFFFF", fontSize: 9 * textScalar },
      formatter: (params: any) => {
        let total = 0;
        let breakdown = params
          .map((p: any) => {
            total += p.value;
            return `<span style="display:inline-block;margin-right:5px;
                     border-radius:50%;width:10px;height:10px;
                     background-color:${p.color}"></span>${p.seriesName}: <b>${p.value}</b>`;
          })
          .join("<br/>");
        return `${params[0].axisValue}<br/>${breakdown}<br/><b>Total: ${total}</b>`;
      },
    },
    legend: {
      top: "91.5%",
      left: "center",
      textStyle: { color: textColor, fontSize: 9 * textScalar },
      itemWidth: 8 * barScalar,   // width of the legend marker
      itemHeight: 6 * barScalar,
      itemGap: 4,
    },
    grid: { left: "3%", right: "4%", bottom: "12%", top: `${18}%`, containLabel: true },
    xAxis: {
      type: "category",
      data: months,
      axisLabel: { color: textColor, fontSize: 9 * textScalar },
      axisLine: { lineStyle: { color: subTextColor, width: 1 * iScalar } },
    },
    yAxis: {
      type: "value",
      name: "Invoices",
      nameTextStyle: { fontSize: 9 * textScalar },
      axisLabel: { color: textColor, fontSize: 9 * textScalar },
      axisLine: { lineStyle: { color: subTextColor, width: 1 * iScalar } },
      splitLine: { lineStyle: { color: isDark ? "#374151" : "#e5e7eb", width: 1 * iScalar } },
    },
    series: [
      {
        name: "Fully Paid",
        type: "bar",
        stack: "total",
        barWidth: 20 * barScalar,
        itemStyle: { color: "var(--chart-1)", borderColor, borderWidth: 1 * iScalar },
        emphasis: { itemStyle: { color: "var(--chart-1)", borderColor, borderWidth: 1 * iScalar } },
        data: fullyPaid,
        label: {
          show: true,
          position: "inside",
          color: textColor,
          fontSize: 9 * textScalar,
        },
      },
      {
        name: "Partially Paid",
        type: "bar",
        stack: "total",
        barWidth: 20 * barScalar,
        itemStyle: { color: "var(--chart-2)", borderColor, borderWidth: 1 * iScalar },
        emphasis: { itemStyle: { color: "var(--chart-2)", borderColor, borderWidth: 1 * iScalar } },
        data: partiallyPaid,
        label: {
          show: true,
          position: "inside",
          color: textColor,
          fontSize: 9 * textScalar,
        },
      },
      {
        name: "Unpaid",
        type: "bar",
        stack: "total",
        barWidth: 20 * barScalar,
        itemStyle: { color: "var(--chart-3)", borderColor, borderWidth: 1 * iScalar },
        emphasis: { itemStyle: { color: "var(--chart-3)", borderColor, borderWidth: 1 * iScalar } },
        data: unpaid,
        label: {
          show: true,
          position: "inside",
          color: textColor,
          fontSize: 9 * textScalar,
        },
      },
    ],
  };

  const chartRef = useRef<any>(null);

  useEffect(() => {
    const chart = chartRef.current?.getEchartsInstance();
    chart?.resize();
  }, [textScalar, barScalar, iScalar]); // re-resize on scalar change

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
