import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, LabelList, ResponsiveContainer, YAxis, Cell, CartesianGrid } from 'recharts';
import { useTheme } from '@/components/theme-provider';

type Facility = {
  group: string;
  color: string;   // يمكن تكون linear-gradient(...) أو لون عادي
  count: number;
  id: number;
};

const APPLY_ALPHA = true; // خليها false لو مش عايز تطبق الشفافية من rgba()

type Stop = { color: string; opacity: number; offset?: number };

const isLinear = (c: string) => typeof c === 'string' && c.startsWith('linear-gradient');

/** يقرأ rgba/hex + offsets (إن وُجدت) من CSS linear-gradient(...) */
const parseGradientStops = (css: string): Stop[] => {
  const content = css.replace(/^linear-gradient\(/i, '').replace(/\)$/, '');
  // نلتقط color ثم نسبة اختيارية بعده (0.03%، 50%، ...)
  const re = /(rgba?\([^)]+\)|#(?:[0-9a-fA-F]{3,8}))\s*(\d+(?:\.\d+)?)?%?/g;
  const out: Stop[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(content))) {
    let color = m[1];
    let opacity = 1;
    if (color.startsWith('rgba')) {
      const [r, g, b, a] = color.slice(5, -1).split(',').map((s) => s.trim());
      color = `rgb(${r},${g},${b})`;
      opacity = a ? parseFloat(a) : 1;
    }
    const offset = m[2] ? parseFloat(m[2]) : undefined;
    out.push({ color, opacity, offset });
  }
  // لو لون واحد فقط، نكرر للأخر
  if (out.length === 1) out.push({ ...out[0], offset: 100 });
  return out.slice(0, 3); // نكتفي بـ 2-3 ستوبس
};

const gradIdFor = (prefix: string) =>
  `grad-${prefix.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-_]/g, '')}`;

const CustomTopLabel: React.FC<any> = ({ x, y, width, value }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const centerX = x! + width! / 2;
  const labelY = 20; // Fixed position at very top of chart area

  return (
    <text
      x={centerX}
      y={labelY}
      fill={isDarkMode ? '#fff' : '#000'}
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize={12}
      fontWeight="bold"
    >
      {value || ' '}
    </text>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (!active || !payload?.length) return null;

  return (
    <div
      style={{
        background: isDarkMode ? '#1D2630' : '#fff',
        padding: '10px',
        border: isDarkMode ? '1px solid #000' : '1px solid #ccc',
        fontSize: 'clamp(0.8rem, 0.8vw , 20rem)',
      }}
    >
      <strong>{label}</strong>
      {payload.map((entry: any, index: number) => (
        <div key={index} style={{ color: entry.color }}>
          Count: {entry.value}
        </div>
      ))}
    </div>
  );
};

const SingleChart: React.FC<{ 
  data: Facility[]; 
  rotateLabel?: boolean;
  marginLeft?: number;
  marginRight?: number;
  chartOffset?: number;
}> = ({ 
  data, 
  rotateLabel = false,
  marginLeft = 0,
  marginRight = 0,
  chartOffset = 0
}) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const max = Math.max(...data.map((item) => item.count), 0);

  // اتجاه تدرّج رأسي (Top→Bottom) لأن الأعمدة رأسية في BarChart العادي
  const x2 = '0%';
  const y2 = '100%';

  return (
    <div className="w-full h-full" style={{ transform: `translateX(${chartOffset}px)` }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ bottom: -10, top: 25, left: marginLeft, right: marginRight}} barCategoryGap={10}>
          <CartesianGrid 
            horizontal={true} 
            vertical={false} 
            stroke="white" 
            strokeWidth={1}
            strokeOpacity={0.3}
          />
          <XAxis
            dataKey="group"
            angle={0}
            textAnchor="middle"
            interval={0}
            tickFormatter={(label: string) => (label.length > 15 ? label.slice(0, 10) + '…' : label)}
            axisLine={{ stroke: isDarkMode ? 'gray' : '#000' }}
            tick={{ fill: isDarkMode ? '#E7EAEE' : '#000', fontSize: 11 }}
            height={30}
          />
          <YAxis hide domain={[0, max + Math.round(max / 4)]} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} content={CustomTooltip} />

          {/* تعريفات التدرّجات لكل عنصر لونُه linear-gradient */}
          <defs>
            {data
              .filter((d) => isLinear(d.color))
              .map((d) => {
                const stops = parseGradientStops(d.color);
                const id = gradIdFor(`${d.group}-${d.id}`);
                const fallback = (i: number, n: number) =>
                  n === 3 ? (i === 0 ? '0%' : i === 1 ? '50%' : '100%') : i === 0 ? '0%' : '100%';
                return (
                  <linearGradient id={id} key={id} x1="0%" y1="0%" x2={x2} y2={y2}>
                    {stops.map((s, i) => (
                      <stop
                        key={i}
                        offset={s.offset !== undefined ? `${s.offset}%` : fallback(i, stops.length)}
                        stopColor={s.color}
                        stopOpacity={APPLY_ALPHA ? s.opacity : 1}
                      />
                    ))}
                  </linearGradient>
                );
              })}
          </defs>

          <Bar
            dataKey="count"
            barSize={25}
            background={{ fill: isDarkMode ? '#424242' : '#E7EAEE' }}
            isAnimationActive={false}
          >
            {data.map((entry, index) => {
              const id = gradIdFor(`${entry.group}-${entry.id}`);
              const fill = isLinear(entry.color) ? `url(#${id})` : entry.color;
              return <Cell key={`cell-${index}`} fill={fill} />;
            })}
            <LabelList content={<CustomTopLabel />} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SingleChart;
