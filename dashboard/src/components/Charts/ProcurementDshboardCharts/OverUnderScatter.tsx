"use client";
import React, { useEffect, useRef } from "react";
import ReactECharts from "echarts-for-react";
import { useTheme } from "@/components/theme-provider";
import { useResponsiveScalars } from "@/hooks/useResponsiveScalars";

interface OverUnderScatterProps {
  vendors: string[];
  ordered: number[];
  received: number[];
}

export default function OverUnderScatter({
  vendors,
  ordered,
  received,
}: OverUnderScatterProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { textScalar, barScalar, iScalar } = useResponsiveScalars();

  const textColor = isDark ? "#FFFFFFFF" : "#111827";
  const subTextColor = isDark ? "#9ca3af" : "#6b7280";
  const borderColor = isDark ? "#1f2937" : "#ffffff";

  // scale-aware bar data
  const receivedSeries = received.map((value, idx) => {
    const color = `var(--chart-1)`;
    return {
      value,
      itemStyle: { color, borderColor, borderWidth: 0.5 * barScalar },
      emphasis: { itemStyle: { color, borderColor, borderWidth: 0.5 * barScalar } },
    };
  });

  // scale-aware bar data
  const orderedSeries = ordered.map((value, idx) => {
    const color = `var(--chart-2)`;
    return {
      value,
      itemStyle: { color, borderColor, borderWidth: 0.5 * barScalar },
      emphasis: { itemStyle: { color, borderColor, borderWidth: 0.5 * barScalar } },
    };
  });

  const option = {
    backgroundColor: "transparent",
    title: {
      text: "Over/Under Deliveries",
      left: "center",
      textStyle: { fontSize: 13 * textScalar, fontWeight: "bold", color: textColor },
      subtextStyle: { fontSize: 13 * textScalar, color: subTextColor },
    },
    tooltip: {
      trigger: "item",
      backgroundColor: isDark ? "#111827" : "#000000",
      textStyle: { color: "#FFFFFF", fontSize: 13 * textScalar },
      formatter: (p: any) => {
        const idx = p.dataIndex;
        return `
          ${vendors[idx]}<br/>
          Ordered: <b>${ordered[idx]}</b><br/>
          Received: <b>${received[idx]}</b>
        `;
      },
    },
    grid: { left: "6%", right: "4%", bottom: "0%", top: "18%", containLabel: true },
    xAxis: {
      type: "category",
      data: vendors,
      axisLabel: { color: textColor, rotate: 25, fontSize: 9 * textScalar },
      axisLine: { lineStyle: { color: subTextColor, width: 1 * iScalar } },
    },
    yAxis: {
      type: "value",
      name: "Qty",
      nameTextStyle: { fontSize: 9 * textScalar },
      axisLabel: { color: textColor, fontSize: 8 * textScalar },
      axisLine: { lineStyle: { color: subTextColor, width: 1 * iScalar } },
      splitLine: { lineStyle: { color: isDark ? "#374151" : "#e5e7eb", width: 1 * iScalar } },
    },
    series: [
      {
        name: "Received (bar)",
        type: "bar",
        barWidth: 6 * barScalar,
        data: receivedSeries,
        label: {
          show: true,
          position: "center",
          color: textColor,
          fontSize: 12 * textScalar,
          formatter: (p: any) => received[p.dataIndex],
        },
        z: 1,
      },
      {
        name: "Ordered (bar)",
        type: "bar",
        barWidth: 6 * barScalar,
        data: orderedSeries,
        label: {
          show: true,
          position: "top",
          color: textColor,
          fontSize: 12 * textScalar,
          formatter: (p: any) => ordered[p.dataIndex],
        },
        z: 1,
      },
    ],
  };

  
  const chartRef = useRef<any>(null);

  useEffect(() => {
    const chart = chartRef.current?.getEchartsInstance();
    chart?.resize();
  }, [textScalar, barScalar, iScalar]); // resize when scalars change

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
