# 📘 Team Guide: Chart Details Dialog (Standardized Overlay System)

**Component:** `ChartDetailsDropdown` (Dialog-based overlay)
**Used in:** Analytical dashboards (e.g. Procurement, Finance, Inventory, HR, etc.)
**Example context:** `ProcurementFunnel`

---

## 🎯 Purpose

The `ChartDetailsDropdown` provides a **standardized three-tab dialog** used to display contextual information about any chart across dashboards.
It ensures **consistency, clarity, and reusability** for both developers and end users.

Each chart (ECharts, Recharts, etc.) can use it to show:

* **Summary:** What this chart represents.
* **Data & Filters:** What dataset or filters it uses.
* **Insights:** Key analytical takeaways or observations.

---

## 🧱 Core Structure

```tsx
<ChartDetailsDropdown
  title="Chart Title"
  trigger={...}
  summary={...}
  dataAndFilters={...}
  insights={...}
/>
```

### Props Overview

| Prop             | Type              | Required | Description                                                             |
| ---------------- | ----------------- | -------- | ----------------------------------------------------------------------- |
| `title`          | `string`          | ✅        | The title displayed in the dialog header.                               |
| `trigger`        | `React.ReactNode` | ✅        | The element that opens the dialog — can be a button, icon, text, etc.   |
| `summary`        | `React.ReactNode` | Optional | Short textual description of what the chart represents and its purpose. |
| `dataAndFilters` | `React.ReactNode` | Optional | Displays dataset info, filters applied, or underlying table data.       |
| `insights`       | `React.ReactNode` | Optional | Analytical commentary, trends, or key findings based on the data.       |
| `className`      | `string`          | Optional | Extra styling for the dialog container.                                 |

---

## 🧩 Example: Procurement Funnel

Here’s how it’s implemented in the **Procurement Funnel** chart.

### 🔹 1. The Trigger

The chart title doubles as the trigger.
This creates a **clean, discoverable UX** — clicking the chart title opens its contextual details.

```tsx
trigger={
  <Button
    variant="text"
    className="absolute top-[5%] inset-x-0 active:ring-0 z-30"
  >
    <h1 className="absolute top-[5%] mx-auto">Procurement Funnel</h1>
  </Button>
}
```

✅ **Why this approach:**

* Keeps layout minimal
* Keeps chart area clean (no duplicated titles in ECharts config)
* Title remains functional and visible at all times

---

### 🔹 2. The Tabs

Each tab has a defined and consistent purpose across all dashboards:

| Tab                | Purpose                                                   | Typical Content                     |
| ------------------ | --------------------------------------------------------- | ----------------------------------- |
| **Summary**        | Explains what the chart measures and why it’s important   | Plain text, bullet points           |
| **Data & Filters** | Shows where data comes from and which filters are applied | Tables, key-value data lists        |
| **Insights**       | Highlights important findings or anomalies                | Bullet lists, contextual commentary |

---

### 🔹 3. Example Implementation (Full)

```tsx
<ChartDetailsDropdown
    title="Procurement Funnel"
    trigger={
        <Button
        variant="text"
        className="absolute top-[5%] inset-x-0 active:ring-0 z-30"
        >
        {/* <Info className="w-4 h-4" /> */}
        <h1 className="absolute mx-auto font-bold" style={{ fontSize: `${13 * textScalar}px` }}>Procurement Funnel</h1>
        </Button>
    }
    summary={
        <div
        style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.5 }}
        className="space-y-2"
        >
        <p>
            The <strong>Procurement Funnel</strong> visualizes how purchase
            requests progress through the procurement lifecycle — from initial
            request creation to final payment.
        </p>
        <ul className="list-disc pl-4">
            <li>
            <strong>Requests (OPRQ):</strong> The number of initial purchase
            requests raised.
            </li>
            <li>
            <strong>Purchase Orders (OPOR):</strong> Approved requests
            converted into purchase orders.
            </li>
            <li>
            <strong>GRPO (OPDN):</strong> Goods received from suppliers.
            </li>
            <li>
            <strong>Invoices (OPCH):</strong> Supplier invoices issued for
            the received goods.
            </li>
            <li>
            <strong>Payments (OVPM):</strong> Completed payments made to
            suppliers.
            </li>
        </ul>
        <p>
            The funnel shape shows the natural attrition between stages —
            highlighting bottlenecks or inefficiencies in the purchasing
            process.
        </p>
        </div>
    }
    dataAndFilters={
        <div style={{ fontSize: `${15 * textScalar}px` }} className="space-y-3">
        <p>
            This chart uses summarized data from the company’s purchasing
            system. Each stage reflects document counts during the selected
            reporting period.
        </p>

        <table className="w-full text-sm border-collapse border border-border" style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.5 }}>
            <thead className="bg-muted">
            <tr>
                <th className="border p-2">Stage</th>
                <th className="border p-2">Document Type</th>
                <th className="border p-2">Count</th>
            </tr>
            </thead>
            <tbody>
            {stages.map((stage) => (
                <tr key={stage.key}>
                <td className="border p-2">{stage.label}</td>
                <td className="border p-2">{stage.key}</td>
                <td className="border p-2">{data[stage.key]}</td>
                </tr>
            ))}
            </tbody>
        </table>

        <div className="text-sm text-muted-foreground">
            <p className="font-medium" style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.5 }}>Active Filters:</p>
            <ul className="list-disc pl-4" style={{ fontSize: `${15 * textScalar}px`, lineHeight: 1.5 }}>
            <li>Date Range: Current Quarter</li>
            <li>Company: Global Procurement Division</li>
            <li>Status: Approved Documents Only</li>
            </ul>
        </div>
        </div>
    }
    insights={
        <div style={{ fontSize: `${15 * textScalar}px` }} className="space-y-2">
        <p className="font-medium">
            <strong>Key Observations:</strong>
        </p>
        <ul className="list-disc pl-4 space-y-1">
            <li>
            Conversion from <strong>Requests</strong> (120) to{" "}
            <strong>Purchase Orders</strong> (100) shows a{" "}
            <strong>16.7% drop</strong>, possibly due to rejected or delayed
            approvals.
            </li>
            <li>
            The transition between <strong>Invoices</strong> (65) and{" "}
            <strong>Payments</strong> (50) indicates{" "}
            <strong>77% payment completion</strong>, leaving 23% pending.
            </li>
            <li>
            <strong>Goods Receipt (GRPO)</strong> maintains a healthy flow,
            with 80 documents processed, aligning closely with issued
            purchase orders.
            </li>
        </ul>

        <p className="text-muted-foreground">
            This analysis helps identify operational bottlenecks in approval,
            receipt, or payment processing stages. Continuous monitoring of
            stage-wise drop-offs can improve overall procurement efficiency.
        </p>
        </div>
    }
/>
```

---

## 🧭 Design Principles

### 1. **Consistency**

* Always include **Summary**, **Data & Filters**, and **Insights**, even if some are minimal.
* Maintain similar tone and structure for every chart’s content.

### 2. **Responsiveness**

* Scale font sizes with `textScalar` from `useResponsiveScalars()`.
* Avoid fixed widths in tables — use `w-full` and `border-collapse`.

### 3. **Professional Language**

* Avoid abbreviations unless defined (e.g., “GRPO (Goods Receipt)”).
* Keep insight tone objective and analytical.

### 4. **Clean Trigger Integration**

* For charts with visible titles → use the title as trigger (like this example).
* For compact widgets → use a small icon trigger (e.g., `<Info />` button).

### 5. **Cross-Dashboard Reuse**

The component is **agnostic** — it doesn’t depend on chart type or dataset.
Every analytics view (finance, HR, logistics, etc.) can reuse this exact overlay system.

---

## 🧮 Scaling Rules

Use your responsive hook values inside content:

```tsx
style={{ fontSize: `${12 * textScalar}px`, lineHeight: 1.5 }}
```

| Variable     | Description                       | Recommended Use                             |
| ------------ | --------------------------------- | ------------------------------------------- |
| `textScalar` | Dynamic multiplier for font sizes | Paragraphs, tables, labels                  |
| `barScalar`  | Dynamic multiplier for dimensions | Chart elements (legend size, spacing, etc.) |

---

## 🧰 Developer Checklist (Before Merging)

✅ Chart title removed from ECharts config
✅ Trigger defined clearly (title or icon)
✅ Tabs filled with meaningful content
✅ Uses `textScalar` for all text
✅ Content scrolls gracefully within Dialog (max height 80vh)
✅ Tested in both light and dark mode

---

## 🧠 Summary

This overlay system standardizes how analytical context is presented:

* Every chart remains clean and minimal.
* Users can always access detailed explanations, filters, and takeaways.
* The design stays uniform across dashboards.