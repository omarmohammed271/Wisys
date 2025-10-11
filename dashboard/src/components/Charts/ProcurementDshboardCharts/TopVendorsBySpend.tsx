'use client';

import React, { useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import { useTheme } from '@/components/theme-provider';
import { useResponsiveScalars } from '@/hooks/useResponsiveScalars';
import { ChartDetailsDialog } from '@/components/DetailsOverlay/ChartDetailsDialog';
import { Button } from '@/components/ui/button';

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
    <div className="w-full h-full text-card-foreground flex flex-col gap-6 rounded-xl px-2 relative">
      <ChartDetailsDialog
        title="Top Vendors by Spend"
        trigger={
          <Button
            variant="text"
            className="absolute top-[3%] inset-x-0 active:ring-0 z-30"
          >
            <h1
              className="absolute mx-auto font-bold"
              style={{ fontSize: `${13 * textScalar}px` }}
            >
              Top Vendors by Spend
            </h1>
          </Button>
        }
        summary={
          <div
            style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.6 }}
            className="space-y-3"
          >
            <p>
              The <strong>Top Vendors by Spend</strong> chart ranks suppliers by their total
              financial outlay, dividing the amounts into <strong>Paid</strong> and{" "}
              <strong>Unpaid</strong> portions. This visualization highlights which vendors
              represent the largest expenditure footprint within the organization.
            </p>

            <p>
              By comparing the paid versus unpaid components, finance teams can assess
              outstanding obligations and evaluate payment discipline across strategic
              suppliers.
            </p>

            <ul className="list-disc pl-4">
              <li>
                <strong>Total Spend:</strong> Sum of all approved invoices for each vendor.
              </li>
              <li>
                <strong>Paid Amount:</strong> Portion of spend that has been fully settled.
              </li>
              <li>
                <strong>Unpaid Amount:</strong> Remaining balance pending payment or approval.
              </li>
            </ul>

            <p className="text-muted-foreground">
              This chart serves as a key performance indicator for supplier engagement and
              helps identify potential risk concentrations in procurement spending.
            </p>
          </div>
        }
        dataAndFilters={
          <div
            style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.6 }}
            className="space-y-4"
          >
            <p>
              The dataset aggregates vendor-level financial data based on{" "}
              <strong>approved purchase invoices</strong> and{" "}
              <strong>recorded payments</strong>. Vendors are ranked by{" "}
              <strong>total spend</strong> (sum of paid and unpaid amounts).
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
                  <th className="border p-2 text-right">Total Spend ($)</th>
                  <th className="border p-2 text-right">Paid ($)</th>
                  <th className="border p-2 text-right">Unpaid ($)</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((v) => (
                  <tr key={v.vendorName}>
                    <td className="border p-2">{v.vendorName}</td>
                    <td className="border p-2 text-right">{v.totalSpend}</td>
                    <td className="border p-2 text-right">{v.paidAmount}</td>
                    <td className="border p-2 text-right">{v.unpaidAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pt-2 text-muted-foreground">
              <p className="font-medium mb-1">Active Filters:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Date Range: <strong>Current Fiscal Year (2025)</strong></li>
                <li>Division: <strong>Global Procurement</strong></li>
                <li>Vendor Type: <strong>Active & Approved Suppliers</strong></li>
                <li>Currency: <strong>Standardized to USD</strong></li>
              </ul>
            </div>

            <p className="text-muted-foreground">
              <em>
                Data Source: SAP Business One — extracted from vendor invoices (OPCH) and
                payments (OVPM) as of the latest financial close period.
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
                <strong>Vendor Concentration:</strong> A small group of vendors may represent
                the majority of total spend — an indicator of dependency risk.
              </li>

              <li>
                <strong>Payment Distribution:</strong> High unpaid ratios can signal delayed
                processing, negotiation disputes, or liquidity constraints.
              </li>

              <li>
                <strong>Cash Flow Planning:</strong> Identifying high unpaid exposure helps
                forecast near-term cash requirements more accurately.
              </li>

              <li>
                <strong>Strategic Sourcing:</strong> Top-performing vendors with consistent
                spend and low unpaid balances are strong candidates for preferred supplier
                programs.
              </li>
            </ul>

            <p className="text-muted-foreground">
              Monitoring spend allocation across vendors supports cost optimization and
              strengthens supplier relationship management.
            </p>

            <p className="italic text-muted-foreground pt-1">
              Tip: Compare this chart with invoice payment status to correlate unpaid amounts
              with process efficiency trends.
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
