"use client";
import React, { useEffect, useRef } from "react";
import ReactECharts from "echarts-for-react";
import { useTheme } from "@/components/theme-provider";
import { useResponsiveScalars } from "@/hooks/useResponsiveScalars";
import { ChartDetailsDialog } from "@/components/DetailsOverlay/ChartDetailsDialog";
import { Button } from "@/components/ui/button";

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
    <div className="w-full p-5 card-style relative">
      <ChartDetailsDialog
        title="Invoice Payment Status"
        trigger={
          <Button
            variant="text"
            className="absolute top-[5%] inset-x-0 active:ring-0 z-30"
          >
            <h1
              className="absolute mx-auto font-bold"
              style={{ fontSize: `${13 * textScalar}px` }}
            >
              Invoice Payment Status
            </h1>
          </Button>
        }
        summary={
          <div
            style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.6 }}
            className="space-y-3"
          >
            <p>
              The <strong>Invoice Payment Status</strong> chart provides a monthly overview of
              invoices categorized as <strong>Fully Paid</strong>, <strong>Partially Paid</strong>,
              and <strong>Unpaid</strong>. It helps assess the organization's financial health and
              payment performance over time.
            </p>

            <p>
              Each bar represents the total volume of invoices for a given month, stacked by
              their payment completion level. The chart offers a clear view of cash flow patterns
              and pending liabilities.
            </p>

            <ul className="list-disc pl-4">
              <li>
                <strong>Fully Paid:</strong> Invoices that have been fully settled and closed.
              </li>
              <li>
                <strong>Partially Paid:</strong> Invoices with outstanding balances after
                partial settlements.
              </li>
              <li>
                <strong>Unpaid:</strong> Invoices still awaiting payment or approval.
              </li>
            </ul>

            <p className="text-muted-foreground">
              This visualization supports treasury and accounts payable teams in monitoring
              liquidity exposure, improving payment compliance, and managing vendor relationships.
            </p>
          </div>
        }
        dataAndFilters={
          <div
            style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.6 }}
            className="space-y-4"
          >
            <p>
              The dataset aggregates <strong>invoice payment statuses</strong> for each month in
              the reporting period. Data includes all supplier invoices recorded in the financial
              system, segmented by their payment progress.
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
                  <th className="border p-2 text-left">Month</th>
                  <th className="border p-2 text-right">Fully Paid</th>
                  <th className="border p-2 text-right">Partially Paid</th>
                  <th className="border p-2 text-right">Unpaid</th>
                  <th className="border p-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {months.map((month, idx) => {
                  const total = fullyPaid[idx] + partiallyPaid[idx] + unpaid[idx];
                  return (
                    <tr key={month}>
                      <td className="border p-2">{month}</td>
                      <td className="border p-2 text-right">{fullyPaid[idx]}</td>
                      <td className="border p-2 text-right">{partiallyPaid[idx]}</td>
                      <td className="border p-2 text-right">{unpaid[idx]}</td>
                      <td className="border p-2 text-right font-medium">{total}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="pt-2 text-muted-foreground">
              <p className="font-medium mb-1">Active Filters:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Date Range: <strong>Current Fiscal Year (2025)</strong></li>
                <li>Entity: <strong>Global Procurement Division</strong></li>
                <li>Invoice Type: <strong>Supplier Payables Only</strong></li>
                <li>Currency: <strong>Standardized to USD</strong></li>
              </ul>
            </div>

            <p className="text-muted-foreground">
              <em>
                Data Source: SAP Business One — aggregated from accounts payable (OPCH) and
                payment transactions (OVPM) based on document status.
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
                <strong>Cash Flow Management:</strong> A high share of unpaid invoices signals
                potential liquidity constraints or processing delays.
              </li>

              <li>
                <strong>Process Discipline:</strong> Increasing proportions of fully paid invoices
                reflect stronger coordination between procurement, finance, and treasury teams.
              </li>

              <li>
                <strong>Credit Exposure:</strong> Partially paid invoices indicate ongoing
                obligations — tracking their age helps mitigate late-payment penalties.
              </li>

              <li>
                <strong>Vendor Relations:</strong> Consistent unpaid trends may harm supplier trust
                and disrupt delivery schedules.
              </li>
            </ul>

            <p className="text-muted-foreground">
              Maintaining a balanced payment structure across periods enhances financial
              predictability, supplier confidence, and compliance with payment terms.
            </p>

            <p className="italic text-muted-foreground pt-1">
              Tip: Compare with Payment Lead Time to identify if delayed settlements align with
              increased unpaid invoice ratios.
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
