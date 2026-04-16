import React from 'react';
import { BarChart3, PieChart, MapPin, TrendingUp, Table2, Activity, Image as ImageIcon } from 'lucide-react';

interface IconWrapperProps {
  icon: string | React.ReactNode;
  width?: string | number;
  className?: string;
}

export default function IconWrapper({ icon, width, className }: IconWrapperProps) {
  if (typeof icon !== 'string') {
    return <>{icon}</>;
  }

  let IconCmp = ImageIcon;
  if (icon === 'mdi:chart-bar') IconCmp = BarChart3;
  else if (icon === 'mdi:chart-pie') IconCmp = PieChart;
  else if (icon === 'mdi:map-marker') IconCmp = MapPin;
  else if (icon === 'mdi:chart-line') IconCmp = TrendingUp;
  else if (icon === 'mdi:table') IconCmp = Table2;
  else if (icon === 'mdi:chart-donut') IconCmp = PieChart;
  else if (icon === 'mdi:chart-arc') IconCmp = Activity;

  return <IconCmp style={{ width, height: width }} className={className} />;
}
