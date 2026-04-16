// Table configuration constants for ContractsTable component

// Status color constants following the design specification
export const STATUS_COLORS = {
  active: '#4F1392',        // Pink - ساري
  underPreparation: '#0B6AD6', // Blue - تحت التحضير  
  completed: '#A423F9'      // Purple - منتهي
} as const;

// Arabic status labels
export const STATUS_LABELS = {
  active: 'ساري',
  underPreparation: 'تحت التحضير',
  completed: 'منتهي'
} as const;

// Table column configuration (RTL order)
export const TABLE_COLUMNS = [
  { key: 'currentPhase', label: 'المرحلة' },
  { key: 'daysRemaining', label: 'الأيام المتبقية' },
  { key: 'completionDate', label: 'تاريخ الانتهاء' },
  { key: 'totalValue', label: 'القيمة الإجمالية' },
  { key: 'arabicRegion', label: 'المنطقة' },
  { key: 'status', label: 'الحالة' },
  { key: 'arabicType', label: 'النوع' },
  { key: 'contractorName', label: 'المقاول' },
  { key: 'name', label: 'اسم العقد' },
  { key: 'contractNumber', label: 'رقم العقد' }
] as const;

// Default component props
export const DEFAULT_TABLE_PROPS = {
  title: 'قائمة العقود',
  icon: 'mdi:table',
  width: '100%',
  height: '100%'
} as const;

// Font sizes and spacing constants - ALL RESPONSIVE
export const TABLE_STYLES = {
  // Table specific fonts
  headerFontSize: 'text-[clamp(0.6rem,0.7vw,15rem)]',      // Was 0.7rem
  bodyFontSize: 'text-[clamp(0.55rem,0.65vw,15rem)]',      // Was 0.65rem
  chipFontSize: 'text-[clamp(0.5rem,0.6vw,15rem)]',        // Was 0.6rem
  chipHeight: 'h-[20px]',
  titleFontSize: 'text-[clamp(0.65rem,0.9vw,15rem)]',      // Already responsive
  
  // Chart and component fonts
  chartTitleFontSize: 'text-[clamp(0.65rem,0.75vw,15rem)]', // For chart titles
  chartLabelFontSize: 'text-[clamp(0.5rem,0.55vw,15rem)]',  // For chart labels
  tooltipFontSize: 'text-[clamp(0.45rem,0.5vw,15rem)]',     // For tooltips
  legendFontSize: 'text-[clamp(0.5rem,0.6vw,15rem)]',       // For legends
  
  // Icon and container sizes
  iconSize: {
    small: 'w-[clamp(0.5rem,0.6vw,15rem)] h-[clamp(0.5rem,0.6vw,15rem)]',             // Was 0.6rem
    large: 'w-[1vw] h-[1vw]'                                        // Already responsive
  },
  containerSize: {
    small: 'w-[clamp(0.9rem,1vw,15rem)] h-[clamp(0.9rem,1vw,15rem)]',               // Was 1rem
    large: 'w-[1.5vw] h-[3vh]'                                      // Already responsive
  },
  containerHeight: {
    small: 'h-[clamp(0.9rem,1vw,15rem)]',               // Was 1rem
    large: 'h-[3vh]'                                        // Already responsive
  }
} as const;