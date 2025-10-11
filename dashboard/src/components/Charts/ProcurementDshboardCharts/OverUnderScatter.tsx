"use client";
import React, { useEffect, useRef } from "react";
import ReactECharts from "echarts-for-react";
import { useTheme } from "@/components/theme-provider";
import { useResponsiveScalars } from "@/hooks/useResponsiveScalars";
import { ChartDetailsDialog } from "@/components/DetailsOverlay/ChartDetailsDialog";
import { Button } from "@/components/ui/button";

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
    <div className="w-full p-5 card-style relative">
      <ChartDetailsDialog
        title="Over/Under Deliveries"
        trigger={
          <Button
            variant="text"
            className="absolute top-[5%] inset-x-0 active:ring-0 z-30"
          >
            <h1
              className="absolute mx-auto font-bold"
              style={{ fontSize: `${13 * textScalar}px` }}
            >
              Over/Under Deliveries
            </h1>
          </Button>
        }
        summary={
          <div
            style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.6 }}
            className="space-y-3"
          >
            <p>
              The <strong>Over/Under Deliveries</strong> chart compares the number of items{" "}
              <strong>ordered</strong> from vendors against the number of items{" "}
              <strong>received</strong>. This helps evaluate supplier reliability,
              fulfillment accuracy, and potential inventory discrepancies.
            </p>

            <p>
              Each vendor is represented by two bars: one for ordered quantities and another for
              received quantities. When received values are lower, it indicates{" "}
              <strong>underdelivery</strong>; when higher, it signals{" "}
              <strong>overdelivery</strong> or shipment mismatches.
            </p>

            <ul className="list-disc pl-4">
              <li>
                <strong>Ordered:</strong> Quantities initially requested or invoiced by the buyer.
              </li>
              <li>
                <strong>Received:</strong> Quantities actually delivered and logged upon arrival.
              </li>
            </ul>

            <p className="text-muted-foreground">
              This visualization helps procurement teams identify fulfillment issues and
              assess which vendors consistently meet, exceed, or fall short of delivery
              expectations.
            </p>
          </div>
        }
        dataAndFilters={
          <div
            style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.6 }}
            className="space-y-4"
          >
            <p>
              The dataset summarizes <strong>ordered vs. received quantities</strong> for all
              active vendors during the reporting period. Only completed purchase orders and
              confirmed goods receipts are included.
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
                  <th className="border p-2 text-left">Vendor</th>
                  <th className="border p-2 text-right">Ordered</th>
                  <th className="border p-2 text-right">Received</th>
                  <th className="border p-2 text-right">Variance</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((vendor, idx) => {
                  const variance = received[idx] - ordered[idx];
                  const varianceLabel =
                    variance === 0
                      ? "On Target"
                      : variance > 0
                      ? `+${variance}`
                      : `${variance}`;
                  return (
                    <tr key={vendor}>
                      <td className="border p-2">{vendor}</td>
                      <td className="border p-2 text-right">{ordered[idx]}</td>
                      <td className="border p-2 text-right">{received[idx]}</td>
                      <td
                        className={`border p-2 text-right ${
                          variance > 0
                            ? "text-green-600 dark:text-green-400"
                            : variance < 0
                            ? "text-red-600 dark:text-red-400"
                            : "text-muted-foreground"
                        }`}
                      >
                        {varianceLabel}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="pt-2 text-muted-foreground">
              <p className="font-medium mb-1">Active Filters:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Date Range: <strong>Current Quarter</strong></li>
                <li>PO Status: <strong>Delivered or Closed</strong></li>
                <li>Warehouse: <strong>All Regional Warehouses</strong></li>
                <li>Measurement Unit: <strong>Standardized to Units</strong></li>
              </ul>
            </div>

            <p className="text-muted-foreground">
              <em>
                Data Source: SAP Business One — derived from purchase order (OPOR) and goods receipt (OPDN)
                records, aggregated by vendor and reporting period.
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
                <strong>Performance Variability:</strong> Vendors with consistent underdelivery
                patterns may require capacity review or better forecasting coordination.
              </li>

              <li>
                <strong>Operational Impact:</strong> Underdeliveries can delay production or
                customer fulfillment, while overdeliveries increase storage costs and skew
                inventory valuation.
              </li>

              <li>
                <strong>Quality Control:</strong> Overdeliveries may indicate shipment errors
                or uncontrolled quantity rounding from suppliers.
              </li>

              <li>
                <strong>Supplier Ranking:</strong> The chart supports vendor scorecard analysis
                by highlighting accuracy in meeting purchase order commitments.
              </li>
            </ul>

            <p className="text-muted-foreground">
              Maintaining balanced delivery ratios improves procurement reliability, supplier trust,
              and inventory accuracy across the supply chain.
            </p>

            <p className="italic text-muted-foreground pt-1">
              Tip: Compare this chart with Goods Receipt Lead Time to evaluate whether delivery
              timing correlates with quantity accuracy.
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
