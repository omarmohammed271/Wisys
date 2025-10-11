"use client";
import React, { useEffect, useRef } from "react";
import ReactECharts from "echarts-for-react";
import { useTheme } from "@/components/theme-provider";
import { useResponsiveScalars } from "@/hooks/useResponsiveScalars";
import { ChartDetailsDialog } from "@/components/DetailsOverlay/ChartDetailsDialog";
import { Button } from "@/components/ui/button";

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
    <div className="w-full p-5 card-style relative">
      <ChartDetailsDialog
        title="Receipts vs Invoices"
        trigger={
          <Button
            variant="text"
            className="absolute top-[5%] inset-x-0 active:ring-0 z-30"
          >
            <h1
              className="absolute mx-auto font-bold"
              style={{ fontSize: `${13 * textScalar}px` }}
            >
              Receipts vs Invoices
            </h1>
          </Button>
        }
        summary={
          <div
            style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.6 }}
            className="space-y-3"
          >
            <p>
              The <strong>Receipts vs Invoices</strong> chart compares the total goods or
              services received (<strong>Goods Receipts</strong>) against those that have
              been formally invoiced (<strong>Supplier Invoices</strong>).
              This visualization highlights the synchronization between operational
              receiving activities and financial documentation processes.
            </p>

            <p>
              Ideally, receipts and invoices should align closely. Any significant
              gap may indicate delays in supplier billing, missing goods receipt entries,
              or pending verification processes that can affect cash flow management and
              month-end closing accuracy.
            </p>

            <ul className="list-disc pl-4">
              <li>
                <strong>Goods Receipts (OPDN):</strong> Items or services confirmed as
                received and verified.
              </li>
              <li>
                <strong>Supplier Invoices (OPCH):</strong> Financial documents submitted
                for received goods or completed services.
              </li>
            </ul>

            <p className="text-muted-foreground">
              This comparison helps procurement and finance teams ensure that
              operational completions are properly followed by corresponding invoices,
              maintaining accurate liability tracking.
            </p>
          </div>
        }
        dataAndFilters={
          <div
            style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.6 }}
            className="space-y-4"
          >
            <p>
              The dataset summarizes <strong>goods receipts</strong> and
              <strong> supplier invoices</strong> across reporting categories for the
              selected time frame. It captures processed and approved transactions only,
              reflecting real progress in the procurement-to-pay lifecycle.
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
                  <th className="border p-2 text-right">Receipts</th>
                  <th className="border p-2 text-right">Invoices</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, idx) => (
                  <tr key={cat}>
                    <td className="border p-2">{cat}</td>
                    <td className="border p-2 text-right">{receipts[idx]}</td>
                    <td className="border p-2 text-right">{invoices[idx]}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pt-2 text-muted-foreground">
              <p className="font-medium mb-1">Active Filters:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Date Range: <strong>Current Quarter (Q4 2025)</strong></li>
                <li>Company: <strong>Global Procurement Division</strong></li>
                <li>Document Status: <strong>Approved Only</strong></li>
                <li>Currency: <strong>Standardized to USD</strong></li>
              </ul>
            </div>

            <p className="text-muted-foreground">
              <em>
                Data Source: SAP Business One Procurement Module — aggregated from
                OPDN (Goods Receipts) and OPCH (Supplier Invoices) documents.
              </em>
            </p>
          </div>
        }
        insights={
          <div
            style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.6 }}
            className="space-y-3"
          >
            <p className="font-semibold text-foreground">
              <strong>Key Observations & Insights</strong>
            </p>

            <ul className="list-disc pl-4 space-y-2">
              <li>
                <strong>Invoice Alignment:</strong> Across most categories, invoices
                closely follow goods receipts, suggesting healthy coordination between
                procurement and finance departments.
              </li>

              <li>
                <strong>Outstanding Invoices:</strong> In cases where receipts
                significantly exceed invoices, supplier billing or document posting
                delays may be present — potentially affecting accruals and cash flow.
              </li>

              <li>
                <strong>Over-Invoicing Instances:</strong> Categories where invoices
                surpass receipts could indicate early billing or mismatched goods receipts
                awaiting verification.
              </li>

              <li>
                <strong>Operational Efficiency:</strong> Monitoring the receipts-to-invoices
                ratio over time helps ensure the procurement cycle maintains consistent
                document synchronization, improving financial visibility.
              </li>
            </ul>

            <p className="text-muted-foreground">
              Maintaining balance between receipts and invoices ensures that financial
              postings accurately mirror operational progress, avoiding payment
              discrepancies and audit complications.
            </p>

            <p className="italic text-muted-foreground pt-1">
              Tip: Pair this analysis with payment completion metrics to identify
              downstream impacts on working capital.
            </p>
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
