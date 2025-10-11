"use client";
import React, { useEffect, useRef } from "react";
import ReactECharts from "echarts-for-react";
import { useTheme } from "@/components/theme-provider";
import { useResponsiveScalars } from "@/hooks/useResponsiveScalars";
import { ChartDetailsDialog } from "@/components/DetailsOverlay/ChartDetailsDialog";
import { Button } from "@/components/ui/button";

export default function RequestToPODonut({
  requests,
  purchaseOrders,
}: {
  requests: number;
  purchaseOrders: number;
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { textScalar, barScalar } = useResponsiveScalars();

  const textColor = isDark ? "#e5e7eb" : "#111827";
  const subTextColor = isDark ? "#9ca3af" : "#6b7280";
  const mutedColor = isDark ? "#6b7280" : "#9ca3af";
  const borderColor = isDark ? "#1f2937" : "#ffffff";

  const conversion =
    requests && requests > 0 ? ((purchaseOrders / requests) * 100).toFixed(1) : 0;

  const scale = (base: number, scalar: number) => Math.round(base * scalar);

  const option = {
    backgroundColor: "transparent",
    color: ["var(--chart-1)", "var(--chart-2)"],
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
      backgroundColor: isDark ? "#111827" : "#000000",
      textStyle: {
        color: "#FFFFFF",
        fontSize: scale(13, textScalar),
      },
    },
    legend: {
      top: "85%",
      left: "center",
      textStyle: {
        color: textColor,
        fontSize: scale(8, textScalar),
      },
      data: ["Purchase Orders", "Remaining Requests"],
      itemWidth: 10 * barScalar,
      itemHeight: 8 * barScalar,
      itemGap: 6,
    },
    series: [
      {
        name: "Request-to-PO",
        type: "pie",
        radius: ["30%", "50%"],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 10,
          borderColor,
          borderWidth: scale(1, barScalar),
        },
        label: {
          show: true,
          position: "outside",
          formatter: "{c} ({d}%)",
          color: textColor,
          fontSize: scale(9, textScalar),
        },
        labelLine: {
          show: true,
          length: scale(15, textScalar),
          length2: scale(10, textScalar),
          smooth: true,
          lineStyle: {
            color: mutedColor,
            width: scale(1.2, barScalar),
          },
        },
        emphasis: {
          label: {
            fontSize: scale(10, textScalar),
            fontWeight: "bold",
            color: textColor,
          },
          itemStyle: {
            borderColor,
            color: (params: any) =>
              `color-mix(in srgb, ${params.color} 80%, black)`,
          },
        },
        data: [
          { value: purchaseOrders, name: "Purchase Orders" },
          {
            value: Math.max(requests - purchaseOrders, 0),
            name: "Remaining Requests",
          },
        ],
      },
    ],
  };

  const chartRef = useRef<any>(null);

  useEffect(() => {
    const chart = chartRef.current?.getEchartsInstance();
    const handleResize = () => chart?.resize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex items-center justify-center w-full p-5 card-style relative">
      <ChartDetailsDialog
        title="Request → Purchase Orders"
        trigger={
          <Button
            variant="text"
            className="absolute top-[5%] inset-x-0 active:ring-0 z-30"
          >
            <h1
              className="absolute mx-auto font-bold"
              style={{ fontSize: `${13 * textScalar}px` }}
            >
              Request → Purchase Orders
            </h1>
          </Button>
        }
        summary={
          <div
            style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.6 }}
            className="space-y-3"
          >
            <p>
              The <strong>Request → Purchase Orders</strong> chart visualizes the
              conversion of internal purchase requests into finalized purchase
              orders. It reflects how efficiently the organization transitions
              from demand identification to supplier engagement.
            </p>

            <p>
              Out of <strong>{requests}</strong> total requests,{" "}
              <strong>{purchaseOrders}</strong> have been successfully converted
              into purchase orders — a{" "}
              <strong>{conversion}% conversion rate</strong>. This metric helps
              assess procurement responsiveness and approval efficiency.
            </p>

            <p className="text-muted-foreground">
              A lower conversion rate may indicate bottlenecks in validation,
              budget approval, or supplier selection processes.
            </p>
          </div>
        }
        dataAndFilters={
          <div
            style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.6 }}
            className="space-y-4"
          >
            <table
              className="w-full text-sm border-collapse border border-border"
              style={{
                fontSize: `${14 * textScalar}px`,
                lineHeight: 1.5,
              }}
            >
              <thead className="bg-muted/50">
                <tr>
                  <th className="border p-2 text-left">Metric</th>
                  <th className="border p-2 text-right">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">Total Requests</td>
                  <td className="border p-2 text-right">{requests}</td>
                </tr>
                <tr>
                  <td className="border p-2">Converted to POs</td>
                  <td className="border p-2 text-right">{purchaseOrders}</td>
                </tr>
                <tr>
                  <td className="border p-2">Remaining</td>
                  <td className="border p-2 text-right">
                    {Math.max(requests - purchaseOrders, 0)}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">Conversion Rate</td>
                  <td className="border p-2 text-right font-semibold">
                    {conversion}%
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="pt-2 text-muted-foreground">
              <p className="font-medium mb-1">Active Filters:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Document Status: <strong>Approved</strong></li>
                <li>Date Range: <strong>Current Quarter (Q4 2025)</strong></li>
                <li>Company: <strong>Procurement Division</strong></li>
              </ul>
            </div>
          </div>
        }
        insights={
          <div
            style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.6 }}
            className="space-y-3"
          >
            <p className="font-semibold text-foreground">
              <strong>Procurement Insights</strong>
            </p>

            <ul className="list-disc pl-4 space-y-2">
              <li>
                <strong>Conversion Efficiency:</strong> {conversion}% of requests
                progressed to purchase orders — reflecting current process
                effectiveness.
              </li>
              <li>
                <strong>Potential Bottleneck:</strong> Approximately{" "}
                {Math.max(requests - purchaseOrders, 0)} requests remain pending.
              </li>
              <li>
                <strong>Operational Focus:</strong> Improve approval speed and
                supplier selection to raise conversion rates.
              </li>
            </ul>

            <p className="italic text-muted-foreground pt-1" >
              Tip: Correlate this metric with average approval time and rejected
              request counts for deeper diagnostic insight.
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
