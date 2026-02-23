# 🧭 Guide: Using `useResponsiveScalars` Hook

### For Consistent Responsive Scaling Across All Dashboards

---

## 🎯 **Purpose**

`useResponsiveScalars` is a shared custom hook that dynamically adjusts  **text** ,  **graphical elements (bars, shapes)** , and **icons** according to the user’s screen or container size.

It ensures that every visual component in the analytics dashboard looks balanced, readable, and consistent — whether on a 13” laptop or a 32” display.

---

## ⚙️ **What the Hook Returns**

| Scalar                   | Type       | Description                                   | Typical Use Cases                                       |
| :----------------------- | :--------- | :-------------------------------------------- | :------------------------------------------------------ |
| **`textScalar`** | `number` | Scales font sizes relative to viewport width. | Chart titles, labels, tooltips, table text, paragraphs. |
| **`barScalar`**  | `number` | Adjusts proportional visual elements.         | Bar width, funnel thickness, legend item size, gaps.    |
| **`iScalar`**    | `number` | Scales icon dimensions and small UI controls. | Lucide icons, buttons, dropdown triggers.               |

Each value is a  **multiplier** , typically around `0.8–1.3`, depending on screen width.

You multiply these with base values in your styles.

---

## 🪝 **Hook Definition**

```tsx
import { useState, useEffect } from "react";

interface Scalars {
  textScalar: number;
  barScalar: number;
  iScalar: number;
}

export function useResponsiveScalars(): Scalars {
  const [scalars, setScalars] = useState<Scalars>({
    textScalar: 1,
    barScalar: 1,
    iScalar: 1,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      let newTextScalar = 1;
      let newBarScalar = 1;
      let newIScalar = 1;

      // Small Screens (Mobile Portrait)
      if (width <= 600) {
        newTextScalar = 1;
        newBarScalar = 1;
        newIScalar = 1;
      }
      // Medium Screens (Tablets and Large Phones)
      else if (width <= 1024) {
        newTextScalar = 1;
        newBarScalar = 1;
        newIScalar = 1;
      }
      // Medium Screens (Tablets and Large Phones)
      else if (width <= 1224) {
        newTextScalar = 1;
        newBarScalar = 1;
        newIScalar = 1;
      }
      // Large Screens (Laptops and Small Desktops)
      else if (width <= 1366) {
        newTextScalar = 0.6;
        newBarScalar = 1;
        newIScalar = 1;
      }
      // Extra Large Screens (Desktops)
      else if (width <= 1520) {
        newTextScalar = 0.8;
        newBarScalar = 1.4;
        newIScalar = 1;
      }
      // Extra Large Screens (Desktops)
      else if (width <= 1920) {
        newTextScalar = 1;
        newBarScalar = 1.4;
        newIScalar = 1;
      }
      // WQHD Screens
      else if (width <= 3460) {
        newTextScalar = 1.5;
        newBarScalar = 2.3;
        newIScalar = 1.4;
      }
      // 4K Screens
      else if (width <= 3840) {
        newTextScalar = 2.35;
        newBarScalar = 2.3;
        newIScalar = 1.4;
      }
      // Ultra-Wide Screens
      else if (width <= 4850) {
        newTextScalar = 4.5;
        newBarScalar = 3;
        newIScalar = 2.6;
      }
      // Very Large Displays
      else {
        newTextScalar = 4.5;
        newBarScalar = 3;
        newIScalar = 2.6;
      }

      setScalars({
        textScalar: newTextScalar,
        barScalar: newBarScalar,
        iScalar: newIScalar,
      });
    };

    // 👉 Call immediately on mount
    handleResize();

    // 👉 Attach listener
    window.addEventListener("resize", handleResize);

    // 👉 Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // runs once on mount

  return scalars;
}
```

---

## 🧱 **Example Implementation**

```tsx
import { useResponsiveScalars } from "@/hooks/useResponsiveScalars";

export default function ExampleChart() {
  const { textScalar, barScalar, iScalar } = useResponsiveScalars();

  const option = {
    title: {
      text: "Sales by Region",
      textStyle: {
        fontSize: 14 * textScalar,
      },
    },
    legend: {
      itemWidth: 10 * barScalar,
      itemHeight: 6 * barScalar,
    },
  };

  return (
    <div className="relative">
      <h2 style={{ fontSize: 16 * textScalar }}>Sales Chart</h2>
      <ReactECharts option={option} />
      <Icon style={{ width: 18 * iScalar, height: 18 * iScalar }} />
    </div>
  );
}
```

✅ **Result:** The entire chart — text, icons, and graphical proportions — scales fluidly with the display.

---

## 📏 **Using the Scalars in Practice**

### 🧩 1. **Typography**

Use `textScalar` for any text element where font size matters:

```tsx
<h1 style={{ fontSize: `${18 * textScalar}px` }}>Procurement Funnel</h1>
<p style={{ fontSize: `${13 * textScalar}px` }}>
  Tracks document flow from requests to payments.
</p>
```

---

### 📊 2. **Chart Elements**

Use `barScalar` for shapes, bars, gaps, and other visual proportions:

```ts
legend: {
  itemWidth: 10 * barScalar,
  itemHeight: 6 * barScalar,
},
series: [
  {
    type: "bar",
    barWidth: 25 * barScalar,
  },
],
```

---

### 🧠 3. **Icons & Micro Controls**

Use `iScalar` for icons or tight UI elements:

```tsx
<Info
  className="text-muted-foreground"
  style={{ width: 14 * iScalar, height: 14 * iScalar }}
/>
<Button
  style={{ padding: `${6 * iScalar}px ${10 * iScalar}px` }}
>
  Details
</Button>
```

This ensures that icons and buttons remain proportional to the surrounding text, regardless of screen scaling.

---

## 💡 **In Context: `ProcurementFunnel` Example**

```tsx
const { textScalar, barScalar, iScalar } = useResponsiveScalars();

<Button
  variant="text"
  className="absolute top-[5%] inset-x-0 active:ring-0 z-30"
>
  <h1
    className="absolute mx-auto font-bold"
    style={{ fontSize: `${13 * textScalar}px` }}
  >
    Procurement Funnel
  </h1>
</Button>

<Info
  style={{ width: 16 * iScalar, height: 16 * iScalar }}
  className="absolute right-3 top-3 text-muted-foreground"
/>
```

* **`textScalar`** adjusts the title dynamically.
* **`iScalar`** keeps the `Info` icon balanced with text.
* **`barScalar`** (used inside chart options) keeps legend and bar geometry proportionate.

---

## 🧭 **Implementation Philosophy**

| Element Type               | Scaling Source | Why                                                              |
| :------------------------- | :------------- | :--------------------------------------------------------------- |
| Typography                 | `textScalar` | Ensures text readability across resolutions                      |
| Visual Data (bars, shapes) | `barScalar`  | Maintains consistent geometry and visual density                 |
| UI Controls / Icons        | `iScalar`    | Prevents small elements from appearing too tiny on large screens |

---

## ✅ **Team Best Practices**

1. **Always destructure all three scalars** in components that have mixed UI (charts + icons + text):

   ```tsx
   const { textScalar, barScalar, iScalar } = useResponsiveScalars();
   ```
2. **Never hardcode pixel values** for text, icons, or chart geometry.

   Always multiply by the corresponding scalar.
3. **Avoid using Tailwind responsive classes (`sm:`, `md:`)** for elements already managed by the scalars.
4. **Use consistent base values** — don’t vary base sizes drastically; rely on the scalar to handle differences.

---

## 🧾 **Summary**

| Type                      | Scalar         | Example Usage                                       |
| :------------------------ | :------------- | :-------------------------------------------------- |
| **Text**            | `textScalar` | Font sizes, titles, paragraphs                      |
| **Visual Elements** | `barScalar`  | Bar width, chart spacing, legends                   |
| **Icons / Buttons** | `iScalar`    | Icons, control paddings, small interactive elements |

---

## **Full Example**

```tsx
"use client";
import React, { useEffect, useRef } from "react";
import ReactECharts from "echarts-for-react";
import { useTheme } from "@/components/theme-provider";
import { useResponsiveScalars } from "@/hooks/useResponsiveScalars";
import { ChartDetailsDialog } from "@/components/DetailsOverlay/ChartDetailsDialog";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export default function ProcurementFunnel({ data }: any) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { textScalar, barScalar } = useResponsiveScalars();

  const textColor = isDark ? "#e5e7eb" : "#111827";
  const subTextColor = isDark ? "#9ca3af" : "#6b7280";
  const borderColor = isDark ? "#1f2937" : "#ffffff";

  const stages = [
    { key: "OPRQ", label: "Requests" },
    { key: "OPOR", label: "Purchase Orders" },
    { key: "OPDN", label: "GRPO" },
    { key: "OPCH", label: "Invoices" },
    { key: "OVPM", label: "Payments" },
  ];

  const chartData = stages.map((stage) => ({
    name: stage.label,
    value: data?.[stage.key] || 0,
  }));

  const chartRef = useRef<any>(null);

  const option = {
    backgroundColor: "transparent",
    color: [
      "var(--chart-1)",
      "var(--chart-2)",
      "var(--chart-3)",
      "var(--chart-4)",
      "var(--chart-5)",
    ],
    tooltip: {
      trigger: "item",
      formatter: "{b} : {c}",
      backgroundColor: isDark ? "#111827" : "#000000",
      textStyle: { color: "#FFFFFF", fontSize: 13 * textScalar },
    },
    legend: {
      orient: "horizontal",
      bottom: -3,
      textStyle: { color: textColor, fontSize: 9 * textScalar },
      data: stages.map((s) => s.label),
      itemWidth: 10 * barScalar,
      itemHeight: 6 * barScalar,
      itemGap: 3,
    },
    series: [
      {
        name: "Procurement Funnel",
        type: "funnel",
        left: "10%",
        top: 35 * textScalar,
        bottom: 35 * textScalar,
        width: "80%",
        min: 0,
        max: Math.max(...chartData.map((d) => d.value)) || 100,
        sort: "descending",
        gap: 2,
        label: {
          show: true,
          position: "inside",
          color: textColor,
          fontSize: 10 * textScalar,
          formatter: "{c} ({d}%)",
        },
        labelLine: {
          length: 10,
          lineStyle: { width: 1, type: "solid", color: subTextColor },
        },
        itemStyle: {
          borderColor,
        },
        emphasis: {
          itemStyle: {
            borderColor,
            color: (params: any) =>
              `color-mix(in srgb, ${params.color} 80%, black)`,
          },
          label: {
            fontSize: 10 * textScalar,
            fontWeight: "bold",
            color: textColor,
          },
        },
        data: chartData,
      },
    ],
  };

  useEffect(() => {
    const chart = chartRef.current?.getEchartsInstance();
    const handleResize = () => chart?.resize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full p-5 card-style relative">
      {/* Details Dialog */}
      <ChartDetailsDialog
        title="Procurement Funnel"
        trigger={
          <Button
            variant="text"
            className="absolute top-[5%] inset-x-0 active:ring-0 z-30"
          >
            <h1
              className="absolute mx-auto font-bold"
              style={{ fontSize: `${13 * textScalar}px` }}
            >
              Procurement Funnel
            </h1>
          </Button>
        }
        summary={
          <div
            style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.6 }}
            className="space-y-3"
          >
            <p>
              The <strong>Procurement Funnel</strong> provides a visual breakdown of how
              purchase requests move through the organization’s procurement lifecycle —
              from <strong>initial requests</strong> to <strong>final payments</strong>.
              It highlights the overall efficiency of the procurement process and
              identifies where potential slowdowns or rejections occur.
            </p>

            <p>
              This funnel typically narrows at each stage as requests are reviewed,
              approved, or filtered out due to validation, budget, or vendor-related
              issues. Understanding these drop-offs helps procurement managers identify
              performance gaps and improve approval turnaround times.
            </p>

            <ul className="list-disc pl-4">
              <li>
                <strong>Requests (OPRQ):</strong> Initial purchase demands created by
                internal departments.
              </li>
              <li>
                <strong>Purchase Orders (OPOR):</strong> Approved requests converted into
                formal supplier orders.
              </li>
              <li>
                <strong>Goods Receipts (OPDN):</strong> Goods received and verified against
                purchase orders.
              </li>
              <li>
                <strong>Invoices (OPCH):</strong> Supplier bills generated for received goods
                or services.
              </li>
              <li>
                <strong>Payments (OVPM):</strong> Settled invoices reflecting completed
                payments to suppliers.
              </li>
            </ul>

            <p className="text-muted-foreground">
              Overall, this visualization serves as a quick indicator of procurement
              throughput — showing how efficiently your organization moves from request
              creation to supplier payment.
            </p>
          </div>
        }

        dataAndFilters={
          <div style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.6 }} className="space-y-4">
            <p>
              The data displayed below summarizes document counts across key procurement
              stages for the selected reporting period. Filters applied ensure that
              results reflect only <strong>approved and completed</strong> transactions
              within the organization’s active procurement pipeline.
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
                  <th className="border p-2 text-left">Stage</th>
                  <th className="border p-2 text-left">Document Type</th>
                  <th className="border p-2 text-right">Count</th>
                </tr>
              </thead>
              <tbody>
                {stages.map((stage) => (
                  <tr key={stage.key}>
                    <td className="border p-2">{stage.label}</td>
                    <td className="border p-2">{stage.key}</td>
                    <td className="border p-2 text-right">{data[stage.key]}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pt-2 text-muted-foreground">
              <p className="font-medium mb-1">Active Filters:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Date Range: <strong>Current Quarter (Q4 2025)</strong></li>
                <li>Company: <strong>Global Procurement Division</strong></li>
                <li>Document Status: <strong>Approved Only</strong></li>
                <li>Currency: <strong>Standardized to USD</strong></li>
              </ul>
            </div>

            <p className="text-muted-foreground">
              <em>
                Data Source: SAP Business One Procurement Module — aggregated at the
                document header level.
              </em>
            </p>
          </div>
        }

        insights={
          <div style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.6 }} className="space-y-3">
            <p className="font-semibold text-foreground">
              <strong>Key Observations & Insights</strong>
            </p>

            <ul className="list-disc pl-4 space-y-2" >
              <li>
                <strong>Conversion from Requests → Purchase Orders:</strong> Out of{" "}
                <strong>{data.OPRQ}</strong> requests, only{" "}
                <strong>{data.OPOR}</strong> converted to purchase orders — indicating a{" "}
                <strong>
                  {((1 - data.OPOR / data.OPRQ) * 100).toFixed(1)}% attrition rate
                </strong>. Possible causes include unapproved budgets or vendor delays.
              </li>

              <li>
                <strong>Goods Receipts Efficiency:</strong> The GRPO stage at{" "}
                <strong>{data.OPDN}</strong> indicates{" "}
                <strong>
                  {((data.OPDN / data.OPOR) * 100).toFixed(1)}%
                </strong>{" "}
                fulfillment of issued purchase orders, reflecting steady supply-chain
                performance.
              </li>

              <li>
                <strong>Invoice Processing:</strong> With{" "}
                <strong>{data.OPCH}</strong> invoices generated against{" "}
                <strong>{data.OPDN}</strong> goods receipts,{" "}
                <strong>
                  {((data.OPCH / data.OPDN) * 100).toFixed(1)}%
                </strong>{" "}
                of deliveries have been invoiced — indicating solid accounting
                compliance.
              </li>

              <li>
                <strong>Payment Completion Rate:</strong> Payments ({data.OVPM}) cover{" "}
                <strong>
                  {((data.OVPM / data.OPCH) * 100).toFixed(1)}%
                </strong>{" "}
                of issued invoices, leaving{" "}
                <strong>
                  {(100 - (data.OVPM / data.OPCH) * 100).toFixed(1)}%
                </strong>{" "}
                pending or under review.
              </li>
            </ul>

            <p className="text-muted-foreground">
              Continuous tracking of conversion and completion percentages helps identify
              where procurement slows down — enabling better vendor coordination and
              financial planning. Over time, teams should aim for smoother progression
              from purchase orders to payments, minimizing delays and unapproved requests.
            </p>

            <p className="italic text-muted-foreground pt-1">
              Tip: Combine this chart with lead-time metrics for deeper efficiency
              diagnostics.
            </p>
          </div>
        }
      />

        

      {/* Chart */}
      <ReactECharts
        ref={chartRef}
        option={option}
        style={{ width: "100%", height: "100%" }}
        opts={{ renderer: "svg" }}
      />
    </div>
  );
}
```
