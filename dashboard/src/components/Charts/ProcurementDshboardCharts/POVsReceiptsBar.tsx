"use client";
import React, { useEffect, useRef } from "react";
import ReactECharts from "echarts-for-react";
import { useTheme } from "@/components/theme-provider";
import { useResponsiveScalars } from "@/hooks/useResponsiveScalars";

export default function POVsReceiptsBar({
  categories,
  ordered,
  received,
}: {
  categories: string[];
  ordered: number[];
  received: number[];
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { textScalar, barScalar } = useResponsiveScalars();

  const textColor = isDark ? "#FFFFFFFF" : "#111827"; // gray-200 vs gray-900
  const gridLine = isDark ? "#374151" : "#e5e7eb"; // gray-700 vs gray-200

  // combine into rawData
  const rawData = [ordered, received];

  // totals per category
  const totalData: number[] = [];
  for (let i = 0; i < rawData[0].length; ++i) {
    let sum = 0;
    for (let j = 0; j < rawData.length; ++j) {
      sum += rawData[j][i];
    }
    totalData.push(sum);
  }

  // series generation
  const seriesNames = ["Ordered Qty", "Received Qty"];
  const colors = ["var(--chart-1)", "var(--chart-2)"];

  const series = seriesNames.map((name, sid) => {
    return {
      name,
      type: "bar",
      stack: "total",
      barWidth: `${50}%`,
      color: colors[sid],
      label: {
        show: true,
        formatter: (params: any) =>
          params.value > 0 ? (params.value * 100).toFixed(1) + "%" : "",
        color: textColor,
        fontSize: 10 * textScalar,
      },
      data: rawData[sid].map((d, did) =>
        totalData[did] <= 0 ? 0 : d / totalData[did]
      ),
      emphasis: {
        itemStyle: {
          color: colors[sid],
        },
      },
    };
  });

  const option = {
    backgroundColor: "transparent",
    title: {
      text: "PO vs Receipts (%)",
      left: "center",
      textStyle: {
        fontSize: 13 * textScalar,
        fontWeight: "bold",
        color: textColor,
      },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: isDark ? "#111827" : "#000000",
      textStyle: { color: "#FFFFFF", fontSize: 11 * textScalar },
      axisPointer: { type: "shadow" },
      formatter: (params: any) => {
        let idx = params[0].dataIndex;
        let content = params[0].axisValue + "<br/>";
        params.forEach((item: any, sid: number) => {
          const raw = rawData[sid][idx];
          content +=
            item.marker +
            " " +
            item.seriesName +
            ": " +
            (item.value * 100).toFixed(1) +
            "% (" +
            raw +
            ")<br/>";
        });
        return content;
      },
    },
    legend: {
      top: "91%",
      left: "center",
      textStyle: { color: textColor, fontSize: 9 * textScalar },
      data: seriesNames,
      itemWidth: 10 * barScalar,   // width of the legend marker
      itemHeight: 8 * barScalar,
      itemGap: 3,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: `${12}%`,
      top: `${15}%`,
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: categories,
      axisLabel: { color: textColor, fontSize: 9 * textScalar },
      axisLine: { lineStyle: { color: gridLine } },
    },
    yAxis: {
      type: "value",
      max: 1, // always 100% max
      axisLabel: {
        color: textColor,
        fontSize: 9 * textScalar,
        formatter: (val: number) => (val * 100).toFixed(0) + "%",
      },
      splitLine: { lineStyle: { color: gridLine } },
      axisLine: { lineStyle: { color: gridLine } },
    },
    series,
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
