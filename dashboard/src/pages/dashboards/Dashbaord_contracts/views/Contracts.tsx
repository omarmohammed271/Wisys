import React from 'react';
import { useTheme } from '@/components/theme-provider';
import { mockContractsData } from '../api/mockdata';
import { iconMap } from '../components/Icons';
import RegionChart from '../components/RegionChart';
import PieChartCard from '../components/PieChartCard';
import RegionalProgressChart from '../components/RegionalProgressChart';
import LineChartCard from '../components/LineChartCard';
import ContractsTable from '../components/ContractsTable';
import DashboardLayout from '../components/dashboardLayout';
import { Summary } from '../components/summary';
import GradientCard from '../components/GradientCard';
import InnerGradientBox from '../components/InnerGradientBox';

export default function ContractsDashboard() {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const RadiusResposive = 'clamp(0.5rem , 0.4vw ,5rem)';
  const BgLiner = isDark 
    ? `linear-gradient(90deg, #00000066 80%, rgba(147, 1, 145, 0.3) 100%)` 
    : `linear-gradient(90deg, rgba(147, 1, 145, 0.3) 20%, #ffffff 100%)`;

  return (
    <DashboardLayout>
      <div style={{ gridArea: 'header' }} className={`p-1 flex flex-row-reverse items-center justify-between gap-1 w-full h-full ${isDark ? 'bg-[#070707ff]' : 'bg-white'}`}>
        {mockContractsData.summary.map((item, index) => (
          <Summary 
            key={index}
            Titlelable={item.Titlelable}
            SecondTitle={item.SecondTitle}
            color={item.color}
            Value={item.Value}
            icon={iconMap[item.iconName]} iconName={''}            
          />
        ))}
      </div>
      
      <GradientCard variant="first" style={{ gridArea: 'SingleChartCard', padding: 0, borderRadius: RadiusResposive }}>
        <InnerGradientBox variant="first" style={{ borderRadius: RadiusResposive }}>
          <RegionChart 
            data={mockContractsData.contractTypeDistribution} 
            icon="mdi:chart-bar"
            title="توزيع العقود حسب النوع"
            width="100%"
            height="100%"
          />
        </InnerGradientBox>
      </GradientCard>

      <GradientCard variant="second" style={{ gridArea: 'statusChart', padding: 0, borderRadius: RadiusResposive }}>
        <InnerGradientBox variant="second" style={{ borderRadius: RadiusResposive }}>
          <PieChartCard 
            data={mockContractsData.contractStatusDistribution} 
            icon="mdi:chart-pie"
            title="توزيع العقود حسب الحالة"
            width="100%"
            height="100%"
          />
        </InnerGradientBox>
      </GradientCard>

      <GradientCard variant="first" style={{ gridArea: 'ProgressChartCard', padding: 0, borderRadius: RadiusResposive }}>
        <InnerGradientBox variant="first" style={{ borderRadius: RadiusResposive }}>
          <RegionalProgressChart 
            data={mockContractsData.regionalContractData}
            icon="mdi:map-marker"
            title="توزيع العقود حسب المناطق"
            width="100%"
            height="100%"
          />
        </InnerGradientBox>
      </GradientCard>

      <GradientCard variant="second" style={{ gridArea: 'lineCharttime', padding: 0, borderRadius: RadiusResposive }}>
        <InnerGradientBox variant="second" style={{ borderRadius: RadiusResposive }}>
          <LineChartCard 
            data={mockContractsData.contractTimeSeriesData}
            icon="mdi:chart-line"
            title="قيم العقود عبر الزمن"
            width="100%"
            height="100%"
          />
        </InnerGradientBox>
      </GradientCard>  

      <GradientCard variant="first" style={{ gridArea: 'contractsList', padding: 0, borderRadius: RadiusResposive }}>
        <InnerGradientBox variant="first" style={{ borderRadius: RadiusResposive }}>
          <ContractsTable 
            data={mockContractsData.contracts}
            icon="mdi:table"
            title="قائمة العقود"
            width="100%"
            height="100%"
          />
        </InnerGradientBox>
      </GradientCard>  
    </DashboardLayout>
  );
}
