"use client";
import React, { useEffect, useRef } from "react";
import ReactECharts from "echarts-for-react";
import { useTheme } from "@/components/theme-provider";
import { useResponsiveScalars } from "@/hooks/useResponsiveScalars";

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

  // simple scale helper
  const scale = (base: number, scalar: number) =>
    Math.round(base * scalar);

  const option = {
    backgroundColor: "transparent",
    color: ["var(--chart-1)", "var(--chart-2)"],
    title: {
      text: "Request → Purchase",
      left: "center",
      textStyle: {
        fontSize: scale(13, (textScalar)),
        fontWeight: "bold",
        color: textColor,
      },
      subtext: `${conversion}% conversion`,
      subtextStyle: {
        fontSize: scale(13, (textScalar)),
        color: subTextColor,
      },
    },
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
      itemWidth: 10 * barScalar,   // width of the legend marker
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
    <div className="flex items-center justify-center w-full p-5 min-[2600px]: card-style">
      <ReactECharts
        ref={chartRef}
        option={option}
        style={{ width: "100%", height: "100%" }}
        opts={{ renderer: "svg" }}
      />
    </div>
  );
}
