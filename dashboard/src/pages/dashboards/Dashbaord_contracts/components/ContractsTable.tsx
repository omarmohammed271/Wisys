import React from 'react';
import { useTheme } from '@/components/theme-provider';
import GradientCard from './GradientCard';
import InnerGradientBox from './InnerGradientBox';
import CardHeader from './CardHeader';

// Import separated modules
import { TABLE_COLUMNS, DEFAULT_TABLE_PROPS, TABLE_STYLES } from '../constants/tableConstants';
import {
  getRawCellValue,
  generateCellStyles,
  getResponsiveSizes,
  getStatusColor,
  getStatusLabel,
  getTableStyles,
  getTotalValueCellStyles,
  getDaysRemainingCellStyles,
  getCustomBackgroundCellStyles
} from '../utils/tableUtils';
import type { ContractsTableProps } from '../types/tableTypes';

const ContractsTable: React.FC<ContractsTableProps> = ({
  data,
  title = DEFAULT_TABLE_PROPS.title,
  icon = DEFAULT_TABLE_PROPS.icon,
  width = DEFAULT_TABLE_PROPS.width,
  height = DEFAULT_TABLE_PROPS.height
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  // Generate cell value with JSX handling
  const getCellValue = (contract: any, key: string) => {
    if (key === 'status') {
      return (
        <span
          className="inline-flex items-center justify-center rounded-full font-bold px-2 py-0.5 text-white"
          style={{
            backgroundColor: getStatusColor(contract.status),
            fontSize: TABLE_STYLES.chipFontSize,
            height: TABLE_STYLES.chipHeight,
          }}
        >
          {getStatusLabel(contract.status)}
        </span>
      );
    }
    return getRawCellValue(contract, key);
  };

  // Get cell styling based on column type
  const getCellClasses = (columnKey: string, contract?: any) => {
    switch (columnKey) {
      case 'totalValue':
        return getTotalValueCellStyles(isDark);
      case 'daysRemaining':
        return getDaysRemainingCellStyles(isDark, contract?.status || 'active');
      default:
        return generateCellStyles(isDark, false);
    }
  };

  return (
    <GradientCard className="m-0 p-0" variant="first">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: linear-gradient(45deg, rgba(147, 1, 145, 0.1), rgba(0, 0, 0, 0.05));
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, rgba(147, 1, 145, 0.8), rgba(164, 35, 249, 0.9));
          border-radius: 10px;
          border: 1px solid rgba(147, 1, 145, 0.2);
        }
      `}</style>
      <div className="p-2 w-full h-full flex flex-col">
        {/* Header Section */}
        <CardHeader title={title} icon={icon} />

        {/* Table Section */}
        <InnerGradientBox className="h-[90%] w-full rounded p-1 overflow-hidden">
          <div className="w-full h-full overflow-auto custom-scrollbar">
            <table className={`w-full text-right border-collapse ${getTableStyles()}`}>
              <thead className={`sticky top-0 z-10 ${isDark ? 'bg-[#111]' : 'bg-white'}`}>
                <tr>
                  {TABLE_COLUMNS.map((column) => (
                    <th
                      key={column.key}
                      className={generateCellStyles(isDark, true)}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((contract, index) => (
                  <tr
                    key={index}
                    className={`transition-colors duration-200 ${isDark ? 'hover:bg-[#2a2a2a]' : 'hover:bg-[#f9f9f9]'}`}
                  >
                    {TABLE_COLUMNS.map((column) => (
                      <td
                        key={column.key}
                        className={getCellClasses(column.key, contract)}
                      >
                        {getCellValue(contract, column.key)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </InnerGradientBox>
      </div>
    </GradientCard>
  );
};

export default ContractsTable;