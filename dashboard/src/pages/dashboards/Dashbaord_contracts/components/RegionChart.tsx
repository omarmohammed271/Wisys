import React from 'react';
import type { ContractTypeDistribution } from '../api/mockdata';
import SingleChart from './singleChart';
import GradientCard from './GradientCard';
import InnerGradientBox from './InnerGradientBox';
import CardHeader from './CardHeader';

interface RegionChartProps {
  data: ContractTypeDistribution[];
  title?: string;
  icon?: string;
  width?: string;
  height?: string;
}

const SingleChartCard: React.FC<RegionChartProps> = ({
  data,
  title,
  icon = 'mdi:chart-bar',
  width = '100%',
  height = '100%'
}) => {
  // Transform data to match SingleChart format (same as HajjCard pattern)
  const dataForSingle = data.map((item, index) => ({
    group: item.type,
    count: item.count,
    color: item.color,
    id: index
  }));

  return (
    <GradientCard className="m-0 p-0" variant="first">
      <div className="p-2 w-full h-full flex flex-col">
        {/* Header Section - 10% of height */}
        <CardHeader title={title} icon={icon} />

        {/* Chart Section - 90% of height */}
        <InnerGradientBox className="h-[90%] w-full rounded p-1 flex-1">
          <SingleChart
            data={dataForSingle}
            rotateLabel={true}
            marginLeft={10}
            marginRight={10}
            chartOffset={0}
          />
        </InnerGradientBox>
      </div>
    </GradientCard>
  );
};

export default SingleChartCard;