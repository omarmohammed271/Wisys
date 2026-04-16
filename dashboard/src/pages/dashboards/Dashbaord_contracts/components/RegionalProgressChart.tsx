import React from 'react';
import { useTheme } from '@/components/theme-provider';
import type { RegionalContractData } from '../api/mockdata';
import GradientCard from './GradientCard';
import InnerGradientBox from './InnerGradientBox';
import CardHeader from './CardHeader';

interface RegionalProgressChartProps {
  data: RegionalContractData[];
  title?: string;
  icon?: string;
  width?: string;
  height?: string;
}

const RegionalProgressChart: React.FC<RegionalProgressChartProps> = ({
  data,
  title = 'توزيع العقود حسب المناطق',
  icon = 'mdi:map-marker',
  width = '100%',
  height = '100%'
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const statusColors: Record<string, string> = {
    underPreparation: '#2196F3', // Blue
    active: '#9C27B0', // Purple
    completed: '#E91E63' // Pink
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'underPreparation': return 'تحت التحضير';
      case 'active': return 'ساري';
      case 'completed': return 'منتهي';
      default: return status;
    }
  };

  return (
    <GradientCard className="m-0 p-0" variant="first">
      <div className="p-2 w-full h-full flex flex-col">
        {/* Header Section - 10% of height */}
        <CardHeader title={title} icon={icon} />

        {/* Chart Section - 90% of height */}
        <InnerGradientBox className="h-[90%] w-full rounded p-2 flex-1 flex flex-col justify-between">
          {data.map((region, index) => {
            const total = region.underPreparation + region.active + region.completed;
            const barHeightPercentage = Math.max(24, Math.min(50, 200 / data.length));

            return (
              <div key={index} className="mb-2 w-full h-full flex flex-col justify-around">
                {/* Region Header */}
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-[0.8rem] font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                    {region.region}
                  </span>
                  <span className={`text-[0.7rem] ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {region.total}
                  </span>
                </div>

                {/* Progress Bar Container */}
                <div
                  className={`w-full rounded-xl overflow-hidden flex relative`}
                  style={{
                    height: `${barHeightPercentage}%`,
                    minHeight: '20px',
                    backgroundColor: isDark ? '#333' : '#f0f0f0'
                  }}
                >
                  {/* Under Preparation Segment */}
                  {region.underPreparation > 0 && (
                    <div
                      className="flex items-center justify-center text-[0.65rem] font-bold relative text-white"
                      style={{
                        width: `${(region.underPreparation / total) * 100}%`,
                        backgroundColor: statusColors.underPreparation
                      }}
                    >
                      {`${getStatusLabel('underPreparation')}: ${region.underPreparation}`}
                    </div>
                  )}

                  {/* Active Segment */}
                  {region.active > 0 && (
                    <div
                      className="flex items-center justify-center text-[0.65rem] font-bold text-white"
                      style={{
                        width: `${(region.active / total) * 100}%`,
                        backgroundColor: statusColors.active
                      }}
                    >
                      {`${getStatusLabel('active')}: ${region.active}`}
                    </div>
                  )}

                  {/* Completed Segment */}
                  {region.completed > 0 && (
                    <div
                      className="flex items-center justify-center text-[0.65rem] font-bold text-white"
                      style={{
                        width: `${(region.completed / total) * 100}%`,
                        backgroundColor: statusColors.completed
                      }}
                    >
                      {`${getStatusLabel('completed')}: ${region.completed}`}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </InnerGradientBox>
      </div>
    </GradientCard>
  );
};

export default RegionalProgressChart;