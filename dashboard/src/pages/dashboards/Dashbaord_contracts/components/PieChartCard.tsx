import React from 'react';
import { useTheme } from '@/components/theme-provider';
import type { ContractStatusDistribution } from '../api/mockdata';
import GradientCard from './GradientCard';
import InnerGradientBox from './InnerGradientBox';
import CardHeader from './CardHeader';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

interface PieChartCardProps {
  data: ContractStatusDistribution[];
  title?: string;
  icon?: string;
  width?: string;
  height?: string;
}

const CustomTooltip = ({ active, payload, isDark, data }: any) => {
  if (active && payload && payload.length) {
    const datum = payload[0].payload;
    const total = data.reduce((sum: number, item: any) => sum + item.value, 0);
    const percentage = ((datum.value / total) * 100).toFixed(1);

    return (
      <div
        style={{
          backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
          padding: '12px',
          borderRadius: '4px',
          border: `1px solid ${isDark ? '#333' : '#ddd'}`,
          boxShadow: '0px 2px 4px rgba(0,0,0,0.2)'
        }}
      >
        <p style={{ fontWeight: 'bold', color: datum.color, margin: 0, marginBottom: '4px' }}>
          {datum.label}
        </p>
        <p style={{ color: isDark ? '#fff' : '#000', margin: 0, fontSize: '0.875rem' }}>
          العدد: {datum.value}
        </p>
        <p style={{ color: isDark ? '#fff' : '#000', margin: 0, fontSize: '0.875rem' }}>
          النسبة: {percentage}%
        </p>
      </div>
    );
  }
  return null;
};

const PieChartCard: React.FC<PieChartCardProps> = ({
  data,
  title = 'توزيع العقود حسب الحالة',
  icon = 'mdi:chart-pie',
  width = '100%',
  height = '100%'
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <GradientCard className="m-0 p-0" variant="first">
      <div className="p-2 w-full h-full flex flex-col">
        {/* Header Section - 10% of height */}
        <CardHeader title={title} icon={icon} />

        {/* Chart Section - 90% of height */}
        <InnerGradientBox className="h-[90%] w-full rounded p-1 flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                innerRadius="50%"
                outerRadius="75%"
                paddingAngle={2}
                labelLine={true}
                label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = outerRadius * 1.25;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);
                  
                  return (
                    <text 
                      x={x} 
                      y={y} 
                      fill={isDark ? '#fff' : '#333'} 
                      textAnchor={x > cx ? 'start' : 'end'} 
                      dominantBaseline="central"
                      fontSize="clamp(9px, 0.55vw, 15px)"
                      fontWeight="bold"
                    >
                      {`${data[index].label}: ${value}`}
                    </text>
                  );
                }}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip content={<CustomTooltip isDark={isDark} data={data} />} />
            </PieChart>
          </ResponsiveContainer>
        </InnerGradientBox>
      </div>
    </GradientCard>
  );
};

export default PieChartCard;
