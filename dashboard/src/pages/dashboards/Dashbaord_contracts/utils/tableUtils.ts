import type { ContractData } from '../api/mockdata';
import { STATUS_COLORS, STATUS_LABELS, TABLE_STYLES } from '../constants/tableConstants';

// Type definitions for better type safety
export type StatusType = keyof typeof STATUS_COLORS;

// Helper function to get status color with type safety
export const getStatusColor = (status: StatusType): string => {
  return STATUS_COLORS[status] || '#666';
};

// Helper function to get status label with type safety  
export const getStatusLabel = (status: StatusType): string => {
  return STATUS_LABELS[status] || status;
};

// Format currency value consistently
export const formatCurrencyValue = (value: number): string => {
  return `${value.toLocaleString()} ر.س`;
};

// Get the raw value for a cell (without JSX)
export const getRawCellValue = (contract: ContractData, key: string): any => {
  switch (key) {
    case 'totalValue':
      return formatCurrencyValue(contract.totalValue);
    case 'status':
      return contract.status;
    default:
      return contract[key as keyof ContractData];
  }
};

export const generateCellStyles = (isDark: boolean, isHeader = false): string => {
  const baseClasses = `text-center align-middle p-2 ${isHeader ? TABLE_STYLES.headerFontSize : TABLE_STYLES.bodyFontSize} ${isHeader ? 'font-bold' : 'font-normal'} ${isDark ? 'text-white' : 'text-black'}`;

  if (isHeader) {
    return `${baseClasses} rounded-t-lg bg-gradient-to-r ${isDark ? 'from-white/10 to-white/20' : 'from-[#6f009433] to-[#93019166]'}`;
  }
  return baseClasses;
};

export const getTotalValueCellStyles = (isDark: boolean): string => {
  return generateCellStyles(isDark, false);
};

export const getDaysRemainingCellStyles = (isDark: boolean, status: StatusType): string => {
  const baseStyles = generateCellStyles(isDark, false);

  if (status === 'active') {
    return `${baseStyles} !text-[#4CAF50] font-bold`;
  }

  if (status === 'completed') {
    return `${baseStyles} !text-[#F44336] font-bold`;
  }

  return `${baseStyles} !text-[#FF9800] font-bold`; // Map to orange
};

export const getCustomBackgroundCellStyles = (isDark: boolean, backgroundColor: string) => {
  return { className: generateCellStyles(isDark, false), style: { backgroundColor } };
};

export const getContractNumberCellStyles = (isDark: boolean): string => {
  const base = generateCellStyles(isDark, false);
  return `${base} rounded-xl p-1 bg-gradient-to-r ${isDark ? 'from-white/10 to-white/20' : 'from-[#6f009433] to-[#93019166]'}`;
};

export const getTableStyles = (): string => {
  return "w-full border-separate border-spacing-[0.3rem_0.3rem]";
};

// Generate responsive icon and container sizes - ALL RESPONSIVE
export const getResponsiveSizes = (isSmallScreen: boolean) => ({
  iconWidth: isSmallScreen ? TABLE_STYLES.iconSize.small : TABLE_STYLES.iconSize.large,
  containerWidth: isSmallScreen ? TABLE_STYLES.containerSize.small : TABLE_STYLES.containerSize.large,
  containerHeight: isSmallScreen ? TABLE_STYLES.containerHeight.small : TABLE_STYLES.containerHeight.large
});