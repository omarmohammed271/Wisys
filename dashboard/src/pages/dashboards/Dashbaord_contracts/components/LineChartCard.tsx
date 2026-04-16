import React from 'react';
import { useTheme } from '@/components/theme-provider';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine } from 'recharts';
import type { ContractTimeSeriesData } from '../api/mockdata';
import GradientCard from './GradientCard';
import InnerGradientBox from './InnerGradientBox';
import CardHeader from './CardHeader';

interface LineChartCardProps {
  data: ContractTimeSeriesData[];
  title?: string;
  icon?: string;
  width?: string;
  height?: string;
}

const LineChartCard: React.FC<LineChartCardProps> = ({
  data,
  title = 'قيم العقود عبر الزمن',
  icon = 'mdi:chart-line',
  width = '100%',
  height = '100%'
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  // Find the peak value for highlighting
  const peakData = data.reduce((prev, current) => (prev.value > current.value) ? prev : current);

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          className={`p-3 rounded-lg shadow-lg border ${isDark ? 'bg-[#2d2d2d] border-[#555] text-white' : 'bg-white border-[#ddd] text-black'}`}
        >
          <div className="text-[clamp(0.65rem,0.9vw,15rem)] font-bold mb-1">
            {data.year}
          </div>
          <div className="text-[clamp(0.5rem,0.8vw,15rem)] text-blue-500">
            القيمة: {data.value.toFixed(1)} مليون ر.س
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom dot for the peak value
  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (payload.year === peakData.year) {
      return (
        <g>
          <circle
            cx={cx}
            cy={cy}
            r={6}
            fill="#2196F3"
            stroke="#fff"
            strokeWidth={3}
          />
          {/* Tooltip box for peak value */}
          <foreignObject x={cx - 50} y={cy - 50} width={100} height={40}>
            <div className="bg-[#2d2d2d] text-white px-2 py-1 rounded text-center shadow-lg text-[0.7rem] flex flex-col justify-center items-center">
              <span className="font-bold text-[clamp(0.65rem,0.9vw,15rem)]">
                {payload.year}
              </span>
              <span className="text-[clamp(0.5rem,0.8vw,15rem)]">
                القيمة: {payload.value.toFixed(1)} مليون ر.س
              </span>
            </div>
          </foreignObject>
        </g>
      );
    }
    return <circle cx={cx} cy={cy} r={3} fill="#2196F3" stroke="#fff" strokeWidth={2} />;
  };

  return (
    <GradientCard className="m-0 p-0" variant="first">
      <div className="p-2 w-full h-full flex flex-col">
        {/* Header Section - 10% of height */}
        <CardHeader title={title} icon={icon} />

        {/* Chart Section - 90% of height */}
        <InnerGradientBox className="h-[90%] w-full rounded p-1 flex-1 relative">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 40,
                left: 25,
                right: -30
              }}
            >
              <XAxis
                dataKey="year"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 'clamp(0.5rem, 0.8vw, 15rem)',
                  fill: isDark ? '#ccc' : '#666',
                  fontWeight: 'bold'
                }}
                interval={0}
                dy={10}
              />
              <YAxis
                orientation="right"
                domain={[0, 3.9]}
                ticks={[0, 0.8, 1.6, 2.4, 3.2]}
                tick={{
                  fontSize: 'clamp(0.5rem, 0.8vw, 15rem)',
                  fill: isDark ? '#ccc' : '#666'
                }}
                tickFormatter={(value) => `${value}م`}
              />

              {/* Vertical grid lines */}
              {data.map((entry, index) => (
                <ReferenceLine
                  key={index}
                  x={entry.year}
                  stroke={isDark ? '#324B55' : '#e0e0e0'}
                  strokeWidth={1}
                  strokeDasharray="none"
                />
              ))}

              <Tooltip content={<CustomTooltip />} />

              <Line
                type="monotone"
                dataKey="value"
                stroke="#2196F3"
                strokeWidth={4}
                dot={<CustomDot />}
                activeDot={{ r: 6, stroke: '#2196F3', strokeWidth: 2, fill: '#fff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </InnerGradientBox>
      </div>
    </GradientCard>
  );
};

export default LineChartCard;