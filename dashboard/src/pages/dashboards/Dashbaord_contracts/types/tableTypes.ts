import { ContractData } from '../api/mockdata';

// Main component props interface
export interface ContractsTableProps {
  data: ContractData[];
  title?: string;
  icon?: string;
  width?: string;
  height?: string;
}

// Column configuration interface
export interface TableColumn {
  key: string;
  label: string;
}

// Style configuration interface
export interface CellStyleConfig {
  isDark: boolean;
  isHeader?: boolean;
}

// Responsive size configuration interface
export interface ResponsiveSizes {
  iconWidth: string;
  containerWidth: string;  
  containerHeight: string;
}