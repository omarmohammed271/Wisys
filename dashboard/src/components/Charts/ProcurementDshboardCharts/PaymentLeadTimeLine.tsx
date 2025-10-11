"use client";
import React, { useEffect, useRef } from "react";
import ReactECharts from "echarts-for-react";
import { useTheme } from "@/components/theme-provider";
import { useResponsiveScalars } from "@/hooks/useResponsiveScalars";
import { ChartDetailsDialog } from "@/components/DetailsOverlay/ChartDetailsDialog";
import { Button } from "@/components/ui/button";

interface PaymentLeadTimeLineProps {
  months: string[];
  leadTimes: number[];
}

export default function PaymentLeadTimeLine({ months, leadTimes }: PaymentLeadTimeLineProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { textScalar, barScalar } = useResponsiveScalars();

  const textColor = isDark ? "#e5e7eb" : "#111827";
  const subTextColor = isDark ? "#9ca3af" : "#6b7280";
  const borderColor = isDark ? "#1f2937" : "#ffffff";

  const option = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "axis",
      backgroundColor: isDark ? "#111827" : "#000000",
      textStyle: { color: "#FFFFFF", fontSize: 10 * textScalar },
      formatter: (params: any) => {
        const p = params[0];
        return `${p.axisValue}<br/>Avg Lead Time: <b>${p.value} days</b>`;
      },
    },
    grid: { left: "5%", right: "5%", bottom: "8%", top: "18%", containLabel: true },
    xAxis: {
      type: "category",
      data: months,
      axisLabel: { color: textColor, fontSize: 9 * textScalar },
      axisLine: { lineStyle: { color: subTextColor } },
    },
    yAxis: {
      type: "value",
      name: "Days",
      nameTextStyle: { fontSize: 9 * textScalar },
      axisLabel: { color: textColor, fontSize: 9 * textScalar },
      axisLine: { lineStyle: { color: subTextColor } },
      splitLine: { lineStyle: { color: isDark ? "#374151" : "#e5e7eb" } },
    },
    series: [
      {
        name: "Avg Lead Time",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 6 * barScalar,
        itemStyle: { color: "var(--chart-1)", borderColor, borderWidth: 1.5 * barScalar },
        lineStyle: { color: "var(--chart-1)", width: 2 * barScalar },
        label: {
          show: true,
          position: "top",
          color: textColor,
          fontSize: 9 * textScalar,
          formatter: "{c}d",
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "var(--chart-1)" },
              { offset: 1, color: isDark ? "rgba(31,41,55,0.4)" : "rgba(255,255,255,0.4)" },
            ],
          },
        },
        emphasis: {
          itemStyle: { color: "var(--chart-1)", borderColor, borderWidth: 2 * barScalar },
          lineStyle: { color: "var(--chart-1)", width: 2.5 * barScalar },
        },
        data: leadTimes,
      },
    ],
  };
  
  const chartRef = useRef<any>(null);

  useEffect(() => {
    const chart = chartRef.current?.getEchartsInstance();
    chart?.resize();
  }, []);

  return (
    <div className="w-full p-5 card-style relative">
      <ChartDetailsDialog
        title="Payment Lead Time"
        trigger={
          <Button
            variant="text"
            className="absolute top-[5%] inset-x-0 active:ring-0 z-30"
          >
            <h1
              className="absolute mx-auto font-bold"
              style={{ fontSize: `${13 * textScalar}px` }}
            >
              Payment Lead Time
            </h1>
          </Button>
        }
        summary={
          <div
            style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.6 }}
            className="space-y-3"
          >
            <p>
              The <strong>Payment Lead Time</strong> chart tracks the average number of days
              between invoice creation and final payment completion. It serves as a key
              indicator of how efficiently the organization processes financial obligations
              to suppliers over time.
            </p>

            <p>
              Shorter lead times indicate streamlined approval and payment workflows,
              while longer lead times may suggest bottlenecks in invoice validation,
              authorization, or fund allocation processes.
            </p>

            <ul className="list-disc pl-4">
              <li>
                <strong>Invoice Date → Payment Date:</strong> Time elapsed between receiving an
                invoice and issuing payment.
              </li>
              <li>
                <strong>Monthly Average:</strong> Lead time averaged across all settled
                payments for each reporting month.
              </li>
            </ul>

            <p className="text-muted-foreground">
              This visualization helps finance and procurement teams monitor payment discipline,
              assess liquidity efficiency, and ensure compliance with supplier terms.
            </p>
          </div>
        }
        dataAndFilters={
          <div
            style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.6 }}
            className="space-y-4"
          >
            <p>
              The dataset summarizes average <strong>payment lead times</strong> for each
              month within the selected reporting period. Data includes only <strong>approved
              and completed</strong> payments derived from supplier invoices.
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
                  <th className="border p-2 text-right">Avg Lead Time (Days)</th>
                </tr>
              </thead>
              <tbody>
                {months.map((month, idx) => (
                  <tr key={month}>
                    <td className="border p-2">{month}</td>
                    <td className="border p-2 text-right">{leadTimes[idx]}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pt-2 text-muted-foreground">
              <p className="font-medium mb-1">Active Filters:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Date Range: <strong>Current Fiscal Year (2025)</strong></li>
                <li>Company: <strong>Global Procurement Division</strong></li>
                <li>Document Status: <strong>Paid Invoices Only</strong></li>
                <li>Currency: <strong>Standardized to USD</strong></li>
              </ul>
            </div>

            <p className="text-muted-foreground">
              <em>
                Data Source: SAP Business One — aggregated from invoice and payment
                transactions (OPCH → OVPM) based on payment completion date.
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
                <strong>Trend Analysis:</strong> Monthly fluctuations in lead time
                highlight how external factors (e.g., vendor volume, fiscal period closings)
                influence payment speed.
              </li>

              <li>
                <strong>Process Efficiency:</strong> A declining trend indicates stronger
                workflow integration between procurement and finance teams.
              </li>

              <li>
                <strong>Delays:</strong> Months with spikes in lead time often coincide
                with late approvals, budget holds, or incomplete documentation.
              </li>

              <li>
                <strong>Cash Flow Management:</strong> Monitoring lead time helps anticipate
                upcoming payment loads and manage liquidity across reporting cycles.
              </li>
            </ul>

            <p className="text-muted-foreground">
              Sustained reduction in payment lead time improves supplier relationships and
              reflects positively on organizational financial discipline.
            </p>

            <p className="italic text-muted-foreground pt-1">
              Tip: Compare this chart with invoice processing metrics to pinpoint where
              payment delays originate.
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
