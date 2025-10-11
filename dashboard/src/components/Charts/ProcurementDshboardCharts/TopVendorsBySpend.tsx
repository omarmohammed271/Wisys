'use client';

import React, { useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import { useTheme } from '@/components/theme-provider';
import { useResponsiveScalars } from '@/hooks/useResponsiveScalars';

interface VendorSpend {
  vendorName: string;
  totalSpend: number;
  paidAmount: number;
  unpaidAmount: number;
}

interface TopVendorsChartProps {
  vendors: VendorSpend[];
  topN?: number; // default 10
}

export default function TopVendorsBySpend({
  vendors,
  topN = 10,
}: TopVendorsChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const chartRef = useRef<any>(null);

  // ✅ responsive scalars
  const { textScalar, barScalar } = useResponsiveScalars();

  // Take top N vendors sorted by totalSpend (descending)
  const topVendors = [...vendors]
    .sort((a, b) => b.totalSpend - a.totalSpend)
    .slice(0, topN);

  const option = {
    backgroundColor: 'transparent',
    title: {
      text: 'Top Vendors by Spend',
      subtext: 'Paid vs Unpaid',
      left: 'center',
      textStyle: {
        fontSize: 13 * textScalar,
        fontWeight: 'bold',
        color: isDark ? '#e5e7eb' : '#111827',
      },
      subtextStyle: {
        fontSize: 9 * textScalar,
        color: isDark ? '#9ca3af' : '#6b7280',
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: isDark ? '#111827' : '#000000',
      textStyle: { color: '#FFFFFF', fontSize: 9 * textScalar },
      formatter: (params: any) => {
        const paid = params.find((p: any) => p.seriesName === 'Paid')?.value ?? 0;
        const unpaid = params.find((p: any) => p.seriesName === 'Unpaid')?.value ?? 0;
        return `${params[0].name}<br/>Paid: <b>$${paid}</b><br/>Unpaid: <b>$${unpaid}</b>`;
      },
    },
    grid: { left: '2%', right: '4%', bottom: '8%', containLabel: true },
    xAxis: {
      type: 'value',
      name: 'Amount ($)',
      axisLabel: {
        color: isDark ? '#e5e7eb' : '#111827',
        fontSize: 9 * textScalar,
        formatter: '${value}',
      },
      splitLine: { lineStyle: { color: isDark ? '#374151' : '#e5e7eb' } },
    },
    yAxis: {
      type: 'category',
      data: topVendors.map(v => v.vendorName),
      axisLabel: {
        color: isDark ? '#e5e7eb' : '#111827',
        fontSize: 9 * textScalar,
      },
      axisLine: { lineStyle: { color: isDark ? '#9ca3af' : '#6b7280' } },
    },
    series: [
      {
        name: 'Paid',
        type: 'bar',
        stack: 'total',
        barWidth: 20 * barScalar, // ✅ scaled bar thickness
        label: {
          show: true,
          position: 'insideRight',
          color: isDark ? '#e5e7eb' : '#111827',
          fontSize: 9 * textScalar,
        },
        itemStyle: { color: 'var(--chart-1)' },
        data: topVendors.map(v => v.paidAmount), // ✅ scaled data
        emphasis: { itemStyle: { color: 'var(--chart-1)' } },
      },
      {
        name: 'Unpaid',
        type: 'bar',
        stack: 'total',
        barWidth: 20 * barScalar, // ✅ scaled bar thickness
        label: {
          show: true,
          position: 'insideRight',
          color: isDark ? '#e5e7eb' : '#111827',
          fontSize: 9 * textScalar,
        },
        itemStyle: { color: 'var(--chart-2)' },
        data: topVendors.map(v => v.unpaidAmount), // ✅ scaled data
        emphasis: { itemStyle: { color: 'var(--chart-2)' } },
      },
    ],
  };

  // Resize chart after mount
  useEffect(() => {
    const chart = chartRef.current?.getEchartsInstance();
    chart?.resize();
  }, []);

  return (
    <div className="w-full h-full text-card-foreground flex flex-col gap-6 rounded-xl py-3 px-2">
      <ReactECharts
        ref={chartRef}
        option={option}
        style={{ width: '100%', height: '100%' }}
        opts={{ renderer: 'svg' }}
      />
    </div>
  );
}
