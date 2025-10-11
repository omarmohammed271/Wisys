"use client";
import React, { useEffect, useRef } from "react";
import ReactECharts from "echarts-for-react";
import { useTheme } from "@/components/theme-provider";
import { useResponsiveScalars } from "@/hooks/useResponsiveScalars";
import { ChartDetailsDialog } from "@/components/DetailsOverlay/ChartDetailsDialog";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

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
      itemWidth: 10 * barScalar,
      itemHeight: 6 * barScalar,
      itemGap: 3,
    },
    series: [
      {
        name: "Procurement Funnel",
        type: "funnel",
        left: "10%",
        top: 35 * textScalar,
        bottom: 35 * textScalar,
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
    <div className="w-full p-5 card-style relative">
      {/* Details Dialog */}
      <ChartDetailsDialog
        title="Procurement Funnel"
        trigger={
          <Button
            variant="text"
            className="absolute top-[5%] inset-x-0 active:ring-0 z-30"
          >
            <h1
              className="absolute mx-auto font-bold"
              style={{ fontSize: `${13 * textScalar}px` }}
            >
              Procurement Funnel
            </h1>
          </Button>
        }
        summary={
          <div
            style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.6 }}
            className="space-y-3"
          >
            <p>
              The <strong>Procurement Funnel</strong> provides a visual breakdown of how
              purchase requests move through the organization’s procurement lifecycle —
              from <strong>initial requests</strong> to <strong>final payments</strong>.
              It highlights the overall efficiency of the procurement process and
              identifies where potential slowdowns or rejections occur.
            </p>

            <p>
              This funnel typically narrows at each stage as requests are reviewed,
              approved, or filtered out due to validation, budget, or vendor-related
              issues. Understanding these drop-offs helps procurement managers identify
              performance gaps and improve approval turnaround times.
            </p>

            <ul className="list-disc pl-4">
              <li>
                <strong>Requests (OPRQ):</strong> Initial purchase demands created by
                internal departments.
              </li>
              <li>
                <strong>Purchase Orders (OPOR):</strong> Approved requests converted into
                formal supplier orders.
              </li>
              <li>
                <strong>Goods Receipts (OPDN):</strong> Goods received and verified against
                purchase orders.
              </li>
              <li>
                <strong>Invoices (OPCH):</strong> Supplier bills generated for received goods
                or services.
              </li>
              <li>
                <strong>Payments (OVPM):</strong> Settled invoices reflecting completed
                payments to suppliers.
              </li>
            </ul>

            <p className="text-muted-foreground">
              Overall, this visualization serves as a quick indicator of procurement
              throughput — showing how efficiently your organization moves from request
              creation to supplier payment.
            </p>
          </div>
        }

        dataAndFilters={
          <div style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.6 }} className="space-y-4">
            <p>
              The data displayed below summarizes document counts across key procurement
              stages for the selected reporting period. Filters applied ensure that
              results reflect only <strong>approved and completed</strong> transactions
              within the organization’s active procurement pipeline.
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
                  <th className="border p-2 text-left">Stage</th>
                  <th className="border p-2 text-left">Document Type</th>
                  <th className="border p-2 text-right">Count</th>
                </tr>
              </thead>
              <tbody>
                {stages.map((stage) => (
                  <tr key={stage.key}>
                    <td className="border p-2">{stage.label}</td>
                    <td className="border p-2">{stage.key}</td>
                    <td className="border p-2 text-right">{data[stage.key]}</td>
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
                Data Source: SAP Business One Procurement Module — aggregated at the
                document header level.
              </em>
            </p>
          </div>
        }

        insights={
          <div style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.6 }} className="space-y-3">
            <p className="font-semibold text-foreground">
              <strong>Key Observations & Insights</strong>
            </p>

            <ul className="list-disc pl-4 space-y-2" >
              <li>
                <strong>Conversion from Requests → Purchase Orders:</strong> Out of{" "}
                <strong>{data.OPRQ}</strong> requests, only{" "}
                <strong>{data.OPOR}</strong> converted to purchase orders — indicating a{" "}
                <strong>
                  {((1 - data.OPOR / data.OPRQ) * 100).toFixed(1)}% attrition rate
                </strong>. Possible causes include unapproved budgets or vendor delays.
              </li>

              <li>
                <strong>Goods Receipts Efficiency:</strong> The GRPO stage at{" "}
                <strong>{data.OPDN}</strong> indicates{" "}
                <strong>
                  {((data.OPDN / data.OPOR) * 100).toFixed(1)}%
                </strong>{" "}
                fulfillment of issued purchase orders, reflecting steady supply-chain
                performance.
              </li>

              <li>
                <strong>Invoice Processing:</strong> With{" "}
                <strong>{data.OPCH}</strong> invoices generated against{" "}
                <strong>{data.OPDN}</strong> goods receipts,{" "}
                <strong>
                  {((data.OPCH / data.OPDN) * 100).toFixed(1)}%
                </strong>{" "}
                of deliveries have been invoiced — indicating solid accounting
                compliance.
              </li>

              <li>
                <strong>Payment Completion Rate:</strong> Payments ({data.OVPM}) cover{" "}
                <strong>
                  {((data.OVPM / data.OPCH) * 100).toFixed(1)}%
                </strong>{" "}
                of issued invoices, leaving{" "}
                <strong>
                  {(100 - (data.OVPM / data.OPCH) * 100).toFixed(1)}%
                </strong>{" "}
                pending or under review.
              </li>
            </ul>

            <p className="text-muted-foreground">
              Continuous tracking of conversion and completion percentages helps identify
              where procurement slows down — enabling better vendor coordination and
              financial planning. Over time, teams should aim for smoother progression
              from purchase orders to payments, minimizing delays and unapproved requests.
            </p>

            <p className="italic text-muted-foreground pt-1">
              Tip: Combine this chart with lead-time metrics for deeper efficiency
              diagnostics.
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
