"use client";
import React, { useEffect, useRef } from "react";
import ReactECharts from "echarts-for-react";
import { useTheme } from "@/components/theme-provider";
import { useResponsiveScalars } from "@/hooks/useResponsiveScalars";
import { ChartDetailsDialog } from "@/components/DetailsOverlay/ChartDetailsDialog";
import { Button } from "@/components/ui/button";

interface DeliveryDelaysBarProps {
  vendors: string[];
  delays: number[];
}

export default function DeliveryDelaysBar({ vendors, delays }: DeliveryDelaysBarProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { textScalar, barScalar, iScalar } = useResponsiveScalars();

  const textColor = isDark ? "#e5e7eb" : "#111827"; // gray-200 vs gray-900
  const subTextColor = isDark ? "#9ca3af" : "#6b7280"; // gray-400 vs gray-500
  const borderColor = isDark ? "#1f2937" : "#ffffff"; // subtle border

  // Build bar data
  const barData = delays.map((value, idx) => {
    const color = `var(--chart-${(idx % 5) + 1})`;
    return {
      value,
      itemStyle: { color, borderColor, borderWidth: 1 },
      emphasis: { itemStyle: { color, borderColor, borderWidth: 1 } },
    };
  });

  // Build scatter data for lollipop tops
  const scatterData = delays.map((value, idx) => {
    const color = `var(--chart-${(idx % 5) + 1})`;
    return {
      value: [vendors[idx], value],
      itemStyle: { color, borderColor, borderWidth: 1 },
      emphasis: { itemStyle: { color, borderColor, borderWidth: 1 } },
    };
  });

  const option = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      backgroundColor: isDark ? "#111827" : "#000000",
      textStyle: { color: "#FFFFFF", fontSize: 10 * textScalar },
      formatter: (params: any) => {
        const p = params[0];
        return `${p.name}<br/>Delay: <b>${p.value} days</b>`;
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: `0%`,
      top: `15%`,
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: vendors,
      axisLabel: {
        color: textColor,
        fontSize: 9 * textScalar,
        rotate: 25,
      },
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
        name: "Avg Delay (days)",
        type: "bar",
        barWidth: 4 * barScalar, // thinner bar for "stick"
        data: barData,
        z: 1,
      },
      {
        name: "Delay Points",
        type: "scatter",
        symbolSize: 14 * iScalar, // size of "candy"
        data: scatterData,
        label: {
          show: true,
          position: "top",
          formatter: (p: any) => `${p.value[1]}d`,
          color: textColor,
          fontSize: 9 * textScalar,
        },
        z: 2,
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
        title="Delivery Delays (Avg Days)"
        trigger={
          <Button
            variant="text"
            className="absolute top-[5%] inset-x-0 active:ring-0 z-30"
          >
            <h1
              className="absolute mx-auto font-bold"
              style={{ fontSize: `${13 * textScalar}px` }}
            >
              Delivery Delays (Avg Days)
            </h1>
          </Button>
        }
        summary={
          <div
            style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.6 }}
            className="space-y-3"
          >
            <p>
              The <strong>Delivery Delays (Avg Days)</strong> chart visualizes average
              vendor delivery times, helping identify inefficiencies in supply chain
              performance. It highlights which suppliers are consistently late and
              which meet or exceed delivery expectations.
            </p>

            <p>
              Each bar represents the <strong>average delivery delay</strong> per
              vendor — measured as the number of days between the expected and actual
              delivery dates. Higher values indicate greater delays, which may impact
              production schedules and inventory turnover.
            </p>

            <ul className="list-disc pl-4">
              <li>
                <strong>Vendor:</strong> Supplier responsible for delivering goods or
                materials.
              </li>
              <li>
                <strong>Avg Delay:</strong> Mean number of delayed days across all
                purchase orders.
              </li>
              <li>
                <strong>Performance Grouping:</strong> Color-coded to quickly
                distinguish reliable vs. underperforming vendors.
              </li>
            </ul>

            <p className="text-muted-foreground">
              This visualization assists supply chain managers in evaluating vendor
              reliability and timing consistency, providing the foundation for
              data-backed performance reviews and corrective action.
            </p>
          </div>
        }
        dataAndFilters={
          <div
            style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.6 }}
            className="space-y-4"
          >
            <p>
              The underlying dataset includes all completed purchase orders with
              confirmed goods receipts during the selected period. Only finalized
              transactions are included to ensure accuracy in average delay
              calculations.
            </p>

            <table
              className="w-full border-collapse border border-border"
              style={{ fontSize: `${14 * textScalar}px`, lineHeight: 1.5 }}
            >
              <thead className="bg-muted/50">
                <tr>
                  <th className="border p-2 text-left">Vendor</th>
                  <th className="border p-2 text-right">Avg Delay (Days)</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((vendor, idx) => (
                  <tr key={vendor}>
                    <td className="border p-2">{vendor}</td>
                    <td className="border p-2 text-right">{delays[idx]}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pt-2 text-muted-foreground">
              <p className="font-medium mb-1">Active Filters:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Date Range: <strong>Current Quarter (Q4 2025)</strong></li>
                <li>Order Status: <strong>Completed Deliveries Only</strong></li>
                <li>Company: <strong>Global Supply Operations</strong></li>
                <li>Unit: <strong>Days (Standardized)</strong></li>
              </ul>
            </div>

            <p className="text-muted-foreground">
              <em>
                Data Source: SAP Business One — Purchase Order and Goods Receipt
                modules aggregated by vendor.
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
                <strong>High Delay Vendors:</strong> Suppliers with average delays
                above 5 days indicate fulfillment bottlenecks or logistics issues.
              </li>

              <li>
                <strong>Consistent Performers:</strong> Vendors averaging less than 2
                days delay demonstrate strong operational reliability.
              </li>

              <li>
                <strong>Seasonal Impacts:</strong> Periodic spikes in average delays
                may align with peak demand cycles or supply disruptions.
              </li>

              <li>
                <strong>Corrective Action:</strong> Procurement teams should review
                SLAs and consider delivery penalties or alternative sourcing for
                consistently underperforming vendors.
              </li>
            </ul>

            <p className="text-muted-foreground">
              Monitoring delay trends over time helps forecast potential supply
              interruptions and supports proactive procurement scheduling.
            </p>

            <p className="italic text-muted-foreground pt-1">
              Tip: Combine this metric with the procurement funnel and cost variance
              charts for a complete vendor performance overview.
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
