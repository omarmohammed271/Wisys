"use client";
import React, { useEffect, useRef } from "react";
import ReactECharts from "echarts-for-react";
import { useTheme } from "@/components/theme-provider";
import { useResponsiveScalars } from "@/hooks/useResponsiveScalars";
import { ChartDetailsDialog } from "@/components/DetailsOverlay/ChartDetailsDialog";
import { Button } from "@/components/ui/button";

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

  const textColor = isDark ? "#FFFFFF" : "#111827";
  const gridLine = isDark ? "#374151" : "#e5e7eb";

  const rawData = [ordered, received];

  const totalData: number[] = [];
  for (let i = 0; i < rawData[0].length; ++i) {
    let sum = 0;
    for (let j = 0; j < rawData.length; ++j) sum += rawData[j][i];
    totalData.push(sum);
  }

  const seriesNames = ["Ordered Qty", "Received Qty"];
  const colors = ["var(--chart-1)", "var(--chart-2)"];

  const series = seriesNames.map((name, sid) => ({
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
      itemStyle: { color: colors[sid] },
    },
  }));

  const option = {
    backgroundColor: "transparent",
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
      itemWidth: 10 * barScalar,
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
      max: 1,
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
    chart?.resize();
  }, []);

  return (
    <div className="w-full p-5 card-style relative">
      {/* Chart Details Dialog */}
      <ChartDetailsDialog
        title="PO vs Receipts (%)"
        trigger={
          <Button
            variant="text"
            className="absolute top-[5%] inset-x-0 active:ring-0 z-30"
          >
            <h1
              className="absolute mx-auto font-bold"
              style={{ fontSize: `${13 * textScalar}px` }}
            >
              PO vs Receipts (%)
            </h1>
          </Button>
        }
        summary={
          <div
            className="space-y-3"
            style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.6 }}
          >
            <p>
              The <strong>PO vs Receipts</strong> chart visualizes the fulfillment ratio of
              purchase orders against goods received. It helps track procurement delivery
              efficiency and identify discrepancies between ordered and received quantities.
            </p>
            <p>
              This comparison ensures that supplier performance and warehouse intake
              align with procurement expectations, reducing bottlenecks in material
              availability and financial reconciliation.
            </p>
          </div>
        }
        dataAndFilters={
          <div
            className="space-y-4"
            style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.6 }}
          >
            <p>
              Data in this chart represents the proportion of received goods relative to
              the total ordered quantities for each product category.
            </p>
            <table
              className="w-full text-sm border-collapse border border-border"
              style={{
                fontSize: `${14 * textScalar}px`,
                lineHeight: 1.5,
              }}
            >
              <thead className="bg-muted/50">
                <tr>
                  <th className="border p-2 text-left">Category</th>
                  <th className="border p-2 text-right">Ordered Qty</th>
                  <th className="border p-2 text-right">Received Qty</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, i) => (
                  <tr key={cat}>
                    <td className="border p-2">{cat}</td>
                    <td className="border p-2 text-right">{ordered[i]}</td>
                    <td className="border p-2 text-right">{received[i]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-muted-foreground">
              <em>Data Source: SAP B1 – Warehouse & Procurement Modules</em>
            </p>
          </div>
        }
        insights={
          <div
            className="space-y-3"
            style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.6 }}
          >
            <p className="font-semibold text-foreground">
              <strong>Key Insights</strong>
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li>
                Categories with high fulfillment (close to 100%) indicate strong supplier
                reliability and good inventory flow.
              </li>
              <li>
                Gaps between ordered and received quantities may highlight supply chain
                delays or partially delivered POs.
              </li>
              <li>
                Tracking these differences helps forecast warehouse replenishment needs
                and prevent production halts.
              </li>
            </ul>
            <p className="italic text-muted-foreground pt-1">
              Tip: Monitor trends over time to detect supplier consistency and seasonal
              fluctuations.
            </p>
          </div>
        }
      />

      {/* Chart */}
      <ReactECharts
        ref={chartRef}
        option={option}
        style={{ width: "100%", height: "100%" }}
        opts={{ renderer: "svg" }}
      />
    </div>
  );
}
