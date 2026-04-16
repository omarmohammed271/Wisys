import React from 'react';
import { Box, Typography, useTheme, CardContent, useMediaQuery, CircularProgress } from '@mui/material';
import { ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';
import Iconify from 'components/iconify';
import GradientCard from 'pages/extra-pages/MHC-Emergency-New/components/GradientCard';
import InnerGradientBox from 'pages/extra-pages/MHC-Emergency-New/components/InnerGradientBox';

interface ProgressChartCardProps {
  data?: any[];
  title?: string;
  icon?: string;
  width?: string;
  height?: string;
}

const ProgressChartCard: React.FC<ProgressChartCardProps> = ({ 
  data = [
    { label: 'مكتملة', value: 75, color: '#10B981' },
    { label: 'قيد التنفيذ', value: 60, color: '#F59E0B' },
    { label: 'متأخرة', value: 25, color: '#EF4444' }
  ],
  title = 'نسبة الإنجاز',
  icon = 'mdi:chart-arc',
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
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          {/* Progress Circles */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 1.5,
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }}>
            {data.map((item, index) => (
              <Box key={index} sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2,
                width: '100%',
                justifyContent: 'space-between'
              }}>
                <Typography sx={{ 
                  fontSize: '0.7rem', 
                  fontWeight: 'bold',
                  color: isDark ? '#fff' : '#000',
                  minWidth: '60px'
                }}>
                  {item.label}
                </Typography>
                
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                  <CircularProgress
                    variant="determinate"
                    value={100}
                    size={40}
                    thickness={4}
                    sx={{
                      color: isDark ? '#333' : '#e0e0e0',
                    }}
                  />
                  <CircularProgress
                    variant="determinate"
                    value={item.value}
                    size={40}
                    thickness={4}
                    sx={{
                      color: item.color,
                      position: 'absolute',
                      left: 0,
                    }}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant="caption"
                      component="div"
                      sx={{ 
                        color: isDark ? '#fff' : '#000',
                        fontSize: '0.6rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {`${item.value}%`}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </InnerGradientBox>
      </CardContent>
    </GradientCard>
  );
};

export default ProgressChartCard;