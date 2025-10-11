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