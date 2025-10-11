'use client';

import React, { useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import { useTheme } from '@/components/theme-provider';
import { useResponsiveScalars } from '@/hooks/useResponsiveScalars';
import { ChartDetailsDialog } from '@/components/DetailsOverlay/ChartDetailsDialog';
import { Button } from '@/components/ui/button';

interface VendorPerformance {
  vendorName: string;
  fulfillmentAccuracy: number; // %
  avgDeliveryTime: number;     // days
  priceVariance: number;       // %
}

interface VendorPerformanceBubbleProps {
  vendors: VendorPerformance[];
}

export default function VendorPerformanceBubble({ vendors }: VendorPerformanceBubbleProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const chartRef = useRef<any>(null);

  // ✅ responsive scalars
  const { textScalar, barScalar, iScalar } = useResponsiveScalars();

  const series = [
    {
      name: 'Fulfillment Accuracy',
      type: 'scatter',
      symbolSize: (val: any) => val[2] * 0.45 * textScalar + 10, // scaled bubble size
      itemStyle: { color: 'var(--chart-1)' },
      data: vendors.map((v, idx) => [idx, v.fulfillmentAccuracy, v.fulfillmentAccuracy]),
      label: {
        show: true,
        position: "inside",
        fontSize: 9 * textScalar,
        color: isDark ? "#e5e7eb" : "#111827",
      },
      emphasis: { itemStyle: { color: 'var(--chart-1)' } }
    },
    {
      name: 'Avg Delivery Time',
      type: 'scatter',
      symbolSize: (val: any) => val[2] * textScalar + 10,
      itemStyle: { color: 'var(--chart-2)' },
      data: vendors.map((v, idx) => [idx, v.avgDeliveryTime, v.avgDeliveryTime]),
      label: {
        show: true,
        position: "inside",
        fontSize: 9 * textScalar,
        color: isDark ? "#e5e7eb" : "#111827",
      },
      emphasis: { itemStyle: { color: 'var(--chart-2)' } }
    },
    {
      name: 'Price Variance',
      type: 'scatter',
      symbolSize: (val: any) => Math.abs(val[2]) * textScalar + 10,
      itemStyle: { color: 'var(--chart-3)' },
      data: vendors.map((v, idx) => [idx, v.priceVariance, v.priceVariance]),
      label: {
        show: true,
        position: "inside",
        fontSize: 9 * textScalar,
        color: isDark ? "#e5e7eb" : "#111827",
      },
      emphasis: { itemStyle: { color: 'var(--chart-3)' } }
    },
  ];

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      formatter: (params: any) =>
        `${params.seriesName}<br/>Vendor: ${vendors[params.value[0]].vendorName}<br/>Value: ${params.value[1]}`,
      backgroundColor: isDark ? '#111827' : '#000000',
      textStyle: { color: '#FFFFFF', fontSize: 9 * textScalar },
    },
    legend: {
      data: series.map(s => s.name),
      top: '91%',
      textStyle: { color: isDark ? '#e5e7eb' : '#111827', fontSize: 9 * textScalar },
      formatter: (name: string) => {
        // Take initials of each word and capitalize
        return name
          .split(' ')
          .map(word => {
              if (word[0] == "("){
                  return ` ${word}`
              }
              word = word[0].toUpperCase()
              return word
          })
          .join('');
      },
      itemWidth: 5 * barScalar,   // width of the legend marker
      itemHeight: 5 * barScalar,
      itemGap: 3,
    },
    grid: {
      bottom: "15%",
      top: "20%",
    },
    xAxis: {
      type: 'category',
      data: vendors.map(v => v.vendorName),
      axisLabel: { color: isDark ? '#e5e7eb' : '#111827', fontSize: 9 * textScalar },
      axisLine: { lineStyle: { color: isDark ? '#9ca3af' : '#6b7280' } },
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: isDark ? '#e5e7eb' : '#111827', fontSize: 9 * textScalar },
      splitLine: { lineStyle: { color: isDark ? '#374151' : '#e5e7eb' } },
    },
    series,
  };

  useEffect(() => {
    const chart = chartRef.current?.getEchartsInstance();
    chart?.resize();
  }, []);

  return (
    <div className="w-full h-full text-card-foreground flex flex-col gap-6 rounded-xl py-6 shadow-sm bg-background/60 border border-border relative">
      <ChartDetailsDialog
        title="Vendor Performance Bubble"
        trigger={
          <Button
            variant="text"
            className="absolute top-[5%] inset-x-0 active:ring-0 z-30"
          >
            <h1
              className="absolute mx-auto font-bold"
              style={{ fontSize: `${13 * textScalar}px` }}
            >
              Vendor Performance Bubble
            </h1>
          </Button>
        }
        summary={
          <div
            style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.6 }}
            className="space-y-3"
          >
            <p>
              The <strong>Vendor Performance Bubble</strong> chart visualizes supplier
              performance metrics across three dimensions —{" "}
              <strong>Fulfillment Accuracy</strong>,{" "}
              <strong>Average Delivery Time</strong>, and{" "}
              <strong>Price Variance</strong>. Each bubble represents a vendor, with
              size and position reflecting overall performance balance.
            </p>

            <p>
              This visualization enables procurement and operations teams to quickly
              identify vendors excelling in reliability and cost consistency while
              highlighting those requiring attention for delays or pricing volatility.
            </p>

            <ul className="list-disc pl-4">
              <li>
                <strong>Fulfillment Accuracy:</strong> Measures how consistently a
                vendor delivers complete and correct orders.
              </li>
              <li>
                <strong>Avg Delivery Time:</strong> Represents the average lead time
                (in days) from order to delivery.
              </li>
              <li>
                <strong>Price Variance:</strong> Indicates deviation from agreed or
                average price — lower is better.
              </li>
            </ul>

            <p className="text-muted-foreground">
              By combining accuracy, timeliness, and pricing stability, this chart
              offers a comprehensive view of supplier reliability and performance
              trends.
            </p>
          </div>
        }
        dataAndFilters={
          <div
            style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.6 }}
            className="space-y-4"
          >
            <p>
              Data is compiled from <strong>vendor delivery logs</strong> and{" "}
              <strong>purchase order records</strong> to calculate average performance
              indicators. Each vendor’s bubble position reflects{" "}
              <strong>delivery accuracy</strong> and <strong>timeliness</strong>, while
              bubble size correlates with <strong>price variance</strong>.
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
                  <th className="border p-2 text-right">Fulfillment Accuracy (%)</th>
                  <th className="border p-2 text-right">Avg Delivery Time (days)</th>
                  <th className="border p-2 text-right">Price Variance (%)</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((v) => (
                  <tr key={v.vendorName}>
                    <td className="border p-2">{v.vendorName}</td>
                    <td className="border p-2 text-right">
                      {v.fulfillmentAccuracy.toFixed(1)}
                    </td>
                    <td className="border p-2 text-right">
                      {v.avgDeliveryTime.toFixed(1)}
                    </td>
                    <td className="border p-2 text-right">
                      {v.priceVariance.toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pt-2 text-muted-foreground">
              <p className="font-medium mb-1">Active Filters:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Date Range: <strong>Last 6 Months</strong></li>
                <li>Division: <strong>Procurement & Logistics</strong></li>
                <li>Data Source: <strong>PO & Delivery Reports</strong></li>
                <li>Vendor Type: <strong>Active Contracted Suppliers</strong></li>
              </ul>
            </div>

            <p className="text-muted-foreground">
              <em>
                Data Source: SAP Business One & internal delivery tracking reports.
                Calculations based on completed orders and delivery confirmations.
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
                <strong>Performance Clustering:</strong> Vendors with high fulfillment
                accuracy and low delivery times cluster near the top-left — indicating
                operational excellence.
              </li>

              <li>
                <strong>Outliers:</strong> Large bubbles with high price variance
                reveal unstable pricing or poor contract compliance.
              </li>

              <li>
                <strong>Improvement Opportunities:</strong> Suppliers with moderate
                accuracy but consistent delivery may benefit from better quality
                control processes.
              </li>

              <li>
                <strong>Strategic Decisions:</strong> High-performing vendors are
                prime candidates for long-term partnerships and volume consolidation.
              </li>
            </ul>

            <p className="text-muted-foreground">
              Cross-referencing vendor accuracy with pricing behavior helps balance
              reliability and cost efficiency in sourcing strategies.
            </p>

            <p className="italic text-muted-foreground pt-1">
              Tip: Compare this bubble chart against spend data to uncover whether top
              performers also capture the highest procurement value.
            </p>
          </div>
        }
      />

      <ReactECharts
        ref={chartRef}
        option={option}
        style={{ width: '100%', height: '100%' }}
        opts={{ renderer: 'svg' }}
      />
    </div>
  );
}
