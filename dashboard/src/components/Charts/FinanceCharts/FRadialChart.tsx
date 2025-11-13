"use client";
import React, { useRef, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { useTheme } from "@/components/theme-provider";
import { useResponsiveScalars } from "@/hooks/useResponsiveScalars";
import { ChartDetailsDialog } from "@/components/DetailsOverlay/ChartDetailsDialog";
import { Button } from "@/components/ui/button";

interface BudgetActualBubbleChartProps {
  categories?: string[];
  budgetValues?: number[];
  actualValues?: number[];
}

export default function BudgetActualBubbleChart({
  categories = ["Marketing", "R&D", "Operations", "Sales"],
  budgetValues = [100, 80, 120, 90],
  actualValues = [85, 70, 110, 95],
}: BudgetActualBubbleChartProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { textScalar, barScalar } = useResponsiveScalars();
  const chartRef = useRef<any>(null);

  const textColor = isDark ? "#e5e7eb" : "#111827";
  const subTextColor = isDark ? "#9ca3af" : "#6b7280";

  const bubbleColors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)"];

  const option = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "item",
      backgroundColor: isDark ? "#111827" : "#000000",
      textStyle: { color: "#FFFFFF", fontSize: 10 * textScalar },
      formatter: (params: any) =>
        `${params.name}<br/>Budget: <b>${params.value[1]}</b><br/>Actual: <b>${params.value[2]}</b>`,
    },
    xAxis: {
      type: "category",
      data: categories,
      axisLabel: { color: textColor, fontSize: 9 * textScalar },
      axisLine: { lineStyle: { color: subTextColor } },
    },
    yAxis: {
      type: "value",
      name: "Value",
      nameTextStyle: { fontSize: 9 * textScalar },
      axisLabel: { color: textColor, fontSize: 9 * textScalar },
      axisLine: { lineStyle: { color: subTextColor } },
      splitLine: { lineStyle: { color: isDark ? "#374151" : "#e5e7eb" } },
    },
    series: [
      {
        name: "Budget vs Actual",
        type: "scatter",
        symbolSize: function (data: any) {
          const [_, budget, actual] = data;
          const maxVal = Math.max(...budgetValues, ...actualValues);
          const sizeFactor = 20;
          const avgValue = (budget + actual) / 2;
          return (avgValue / maxVal) * sizeFactor + 5 * barScalar;
        },
        data: categories.map((cat, idx) => ({
          value: [idx, budgetValues[idx], actualValues[idx]],
          itemStyle: { color: bubbleColors[idx % bubbleColors.length] }, // assign color
        })),
        label: {
          show: true,
          position: "top",
          formatter: (param: any) => `$${param.value[2]}`,
          color: textColor,
          fontSize: 9 * textScalar,
        },
        emphasis: { // lock color and disable hover
          focus: "none",
          itemStyle: { color: "var(--chart-1)" },
          label: { color: textColor },
        },
      },
    ],
  };

  useEffect(() => {
    chartRef.current?.getEchartsInstance()?.resize();
  }, []);

  return (
    <div className="w-full p-5 card-style relative">
      <ChartDetailsDialog
        title="Budget vs Actual Bubble Chart"
        trigger={
          <Button
            variant="text"
            className="absolute top-[5%] inset-x-0 active:ring-0 z-30"
          >
            <h1
              className="absolute mx-auto font-bold"
              style={{ fontSize: `${13 * textScalar}px` }}
            >
              Budget vs Actual
            </h1>
          </Button>
        }
        summary={
          <div style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.6 }} className="space-y-3">
            <p>
              The <strong>Budget vs Actual Bubble Chart</strong> visualizes planned versus actual values
              for multiple categories using bubble size to highlight differences.
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
                  <th className="border p-2 text-left">Category</th>
                  <th className="border p-2 text-right">Budget</th>
                  <th className="border p-2 text-right">Actual</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, idx) => (
                  <tr key={cat}>
                    <td className="border p-2">{cat}</td>
                    <td className="border p-2 text-right">{budgetValues[idx]}</td>
                    <td className="border p-2 text-right">{actualValues[idx]}</td>
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
              <li>Quickly see categories where actuals lag behind budget.</li>
              <li>Bubble size highlights magnitude of differences.</li>
              <li>Supports decision-making for budget adjustments.</li>
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
