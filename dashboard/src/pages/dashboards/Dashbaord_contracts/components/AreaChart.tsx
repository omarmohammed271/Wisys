import React from 'react';
import { Box, Typography, useTheme, CardContent, useMediaQuery } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';
import Iconify from 'components/iconify';
import GradientCard from 'pages/extra-pages/MHC-Emergency-New/components/GradientCard';
import InnerGradientBox from 'pages/extra-pages/MHC-Emergency-New/components/InnerGradientBox';

interface AreaChartCardProps {
  data?: any[];
  title?: string;
  icon?: string;
  width?: string;
  height?: string;
}

const AreaChartCard: React.FC<AreaChartCardProps> = ({ 
  data = [
    { year: '2020', value: 12.5 },
    { year: '2021', value: 18.3 },
    { year: '2022', value: 22.1 },
    { year: '2023', value: 28.7 },
    { year: '2024', value: 35.2 },
    { year: '2025', value: 42.8 }
  ],
  title = 'القيمة السنوية للعقود (مليون ريال)',
  icon = 'mdi:chart-line',
  width = '100%',
  height = '100%'
}) => {
  const { mode } = useConfig();
  const isDark = mode === ThemeMode.DARK;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = isMobile || isTablet;

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
            <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#930191" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#930191" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#333' : '#e0e0e0'} />
              <XAxis 
                dataKey="year" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: isDark ? '#fff' : '#666' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: isDark ? '#fff' : '#666' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
                  border: `1px solid ${isDark ? '#333' : '#ddd'}`,
                  borderRadius: 8,
                  color: isDark ? '#fff' : '#000'
                }}
                formatter={(value: any) => [`${value} مليون ريال`, 'القيمة']}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#930191" 
                fillOpacity={1} 
                fill="url(#colorValue)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </InnerGradientBox>
      </CardContent>
    </GradientCard>
  );
};

export default AreaChartCard;