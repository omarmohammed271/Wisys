import React from 'react';
import { Box, Typography, useTheme, CardContent, useMediaQuery } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';
import Iconify from 'components/iconify';
import GradientCard from 'pages/extra-pages/MHC-Emergency-New/components/GradientCard';
import InnerGradientBox from 'pages/extra-pages/MHC-Emergency-New/components/InnerGradientBox';

interface DonutChartCardProps {
  data?: any[];
  title?: string;
  icon?: string;
  width?: string;
  height?: string;
}

const DonutChartCard: React.FC<DonutChartCardProps> = ({ 
  data = [
    { name: 'الرياض', value: 45, color: '#8B5CF6' },
    { name: 'جدة', value: 25, color: '#06B6D4' },
    { name: 'الدمام', value: 20, color: '#10B981' },
    { name: 'مكة', value: 10, color: '#F59E0B' }
  ],
  title = 'توزيع العقود حسب المنطقة',
  icon = 'mdi:chart-donut',
  width = '100%',
  height = '100%'
}) => {
  const { mode } = useConfig();
  const isDark = mode === ThemeMode.DARK;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = isMobile || isTablet;

  // Custom label function that shows percentage
  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="10"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Custom legend with different styling
  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, justifyContent: 'center', mt: 1 }}>
        {payload.map((entry: any, index: number) => (
          <Box 
            key={index}
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 0.5,
              fontSize: '0.7rem',
              fontWeight: 'bold'
            }}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                backgroundColor: entry.color,
                borderRadius: '50%'
              }}
            />
            <Typography sx={{ fontSize: '0.7rem', color: isDark ? '#fff' : '#000' }}>
              {entry.value}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <GradientCard
      variant="first"
      sx={{
        width,
        height,
        margin: 0,
        padding: 0,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
        },
      }}
    >
      <CardContent sx={{ padding: 1, width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header Section - 20% of height */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'end',
          gap: 1,
          alignContent: 'center',
          height: '10%',
          minHeight: '40px',
          paddingBottom: 1
        }}>
          <Typography
            align="center"
            sx={{
              fontSize: 'clamp(0.65rem, 0.9vw, 15rem)',
              p: 0,
              m: 0,
              marginTop: 0.1,
              fontWeight: 900,
            }}
            gutterBottom
          >
            {title}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: isSmallScreen ? '1rem' : '1.5vw',
              height: isSmallScreen ? '1rem' : '3vh',
              borderRadius: '50%',
              backgroundColor: '#F2F2F2',
            }}
          >
            <Iconify 
              icon={icon} 
              width={isSmallScreen ? '0.6rem' : '1vw'} 
              sx={{ color: '#000' }} 
            />
          </Box>
        </Box>

        {/* Chart Section - 80% of height */}
        <InnerGradientBox 
          variant="first" 
          sx={{
            height: '90%',
            width: '100%',
            borderRadius: 1,
            padding: 0.5,
            flex: 1
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="45%"
                labelLine={false}
                label={renderLabel}
                outerRadius={60}
                innerRadius={30}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: any, name: any) => [`${value}%`, name]}
                labelStyle={{ color: '#000' }}
                contentStyle={{
                  backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
                  border: `1px solid ${isDark ? '#333' : '#ddd'}`,
                  borderRadius: 8,
                  color: isDark ? '#fff' : '#000'
                }}
              />
              <Legend 
                content={renderLegend}
                wrapperStyle={{ 
                  paddingTop: '10px',
                  fontSize: '10px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </InnerGradientBox>
      </CardContent>
    </GradientCard>
  );
};

export default DonutChartCard;