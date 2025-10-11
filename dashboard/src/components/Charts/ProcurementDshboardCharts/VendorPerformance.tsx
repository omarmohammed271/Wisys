'use client';

import React, { useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import { useTheme } from '@/components/theme-provider';
import { useResponsiveScalars } from '@/hooks/useResponsiveScalars';

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
    title: {
      text: 'Vendor Performance Bubble',
      left: 'center',
      textStyle: {
        fontSize: 13 * textScalar,
        fontWeight: 'bold',
        color: isDark ? '#e5e7eb' : '#111827',
      },
    },
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
    <div className="w-full h-full text-card-foreground flex flex-col gap-6 rounded-xl py-6 shadow-sm bg-background/60 border border-border">
      <ReactECharts
        ref={chartRef}
        option={option}
        style={{ width: '100%', height: '100%' }}
        opts={{ renderer: 'svg' }}
      />
    </div>
  );
}
