// mockContractsData.ts


export interface RegionalContractData {
  region: string;
  total: number;
  underPreparation: number;
  active: number;
  completed: number;
}

export interface ContractTimeSeriesData {
  year: string;
  value: number; // in millions SAR
  label: string; // Arabic year label
}

export interface ContractStatusDistribution {
  id: string;
  label: string;
  value: number;
  color: string;
}

export interface ContractTypeDistribution {
  type: string;
  count: number;
  color: string;
}

export interface ContractData {
  contractId: string;
  name: string;
  contractor: string;
  type: string;
  status: 'active' | 'underPreparation' | 'completed';
  region: 'riyadh' | 'jeddah' | 'dammam' | 'makkah';
  totalValue: number; // بالريال السعودي
  endDate: string; // هجري
  remainingDays: number | string;
  phase: string;
  // Additional fields for table
  contractNumber: string;
  contractorName: string;
  arabicRegion: string;
  arabicStatus: string;
  arabicType: string;
  daysRemaining: string;
  completionDate: string;
  currentPhase: string;
}

export interface SummaryStats {
  Titlelable:string,
  SecondTitle:string,
  color:string,
  Value: number | string,
  iconName:string


}

export interface RegionDistribution {
  [region: string]: {
    underPreparation: number;
    active: number;
    completed: number;
  };
}

export interface AnnualTrend {
  [year: string]: number; // القيمة بالميون
}

const barcolor = '#930191'
// دالة لتحديد لون الحالة (مطابقة للصورة)
export const getColorByStatus = (status: string): string => {
  switch (status) {
    case 'active':
      return '#7B3FAB'; // بنفسجي
    case 'underPreparation':
      return '#2E8BFF'; // أزرق
    case 'completed':
      return '#D831FF'; // وردي-بنفسجي
    default:
      return '#CCCCCC';
  }
};

// دالة لتحديد لون الحالة حسب النسبة (مثلاً: 0% = أخضر، >70% = أحمر)
export const getCapacityColor = (rate: number): string => {
  if (rate >= 70) {
    return '#A423F9'; // High - بنفسجي داكن
  } else if (rate >= 50) {
    return '#0B6AD6'; // Medium - أزرق
  } else {
    return '#4F1392'; // Low - أرجواني داكن
  }
};

// البيانات المحاكاة
export const mockContractsData = {
  // بيانات توزيع العقود حسب الحالة
  contractStatusDistribution: [
    {
      id: 'underPreparation',
      label: 'تحت التحضير',
      value: 1,
      color: '#2E8BFF'
    },
    {
      id: 'completed',
      label: 'منتهي',
      value: 1,
      color: '#D831FF'
    },
    {
      id: 'active',
      label: 'ساري',
      value: 6,
      color: '#7B3FAB'
    }
  ] as ContractStatusDistribution[],

  // بيانات توزيع العقود حسب النوع
  contractTypeDistribution: [
    {
      type: 'تدريب',
      count: 1,
      color: barcolor
    },
    {
      type: 'استشارات',
      count: 1,
      color: barcolor
    },
    {
      type: 'أمان وحماية',
      count: 1,
      color: barcolor
    },
    {
      type: 'خدمات عامة',
      count: 1,
      color: barcolor
    },
    {
      type: 'صيانة',
      count: 1,
      color: barcolor
    },
    {
      type: 'تقنية معلومات',
      count: 3,
      color: barcolor
    }
  ] as ContractTypeDistribution[],

  // بيانات العقود حسب المناطق
  regionalContractData: [
    {
      region: 'الرياض',
      total: 584,
      underPreparation: 1,
      active: 2,
      completed: 2
    },
    {
      region: 'جدة',
      total: 584,
      underPreparation: 1,
      active: 0,
      completed: 3
    },
    {
      region: 'الدمام',
      total: 584,
      underPreparation: 1,
      active: 2,
      completed: 0
    },
    {
      region: 'مكة',
      total: 584,
      underPreparation: 0,
      active: 0,
      completed: 2
    }
  ] as RegionalContractData[],

  // بيانات قيم العقود عبر الزمن (بالمليون ريال)
  contractTimeSeriesData: [
    {
      year: '2020',
      value: 0.8,
      label: '٢٠٢٠'
    },
    {
      year: '2021', 
      value: 1.2,
      label: '٢٠٢١'
    },
    {
      year: '2022',
      value: 1.8,
      label: '٢٠٢٢'
    },
    {
      year: '2023',
      value: 3.44, // Peak value as shown in image
      label: '٢٠٢٣'
    },
    {
      year: '2024',
      value: 2.8,
      label: '٢٠٢٤'
    },
    {
      year: '2025',
      value: 1.9,
      label: '٢٠٢٥'
    },
    {
      year: '2026',
      value: 1.1,
      label: '٢٠٢٦'
    }
  ] as ContractTimeSeriesData[],

  summary: [
          {
            Titlelable : 'إجمالي العقود',
            SecondTitle: 'جميع العقود المسجلة',
            color:'#FFFFFF33',
            Value: 8,
             iconName: 'contract'
          },
          {
            Titlelable : 'العقود السارية',
            SecondTitle: 'العقود النشطة حالياً',
            color:'#87FF4733',
            Value: 6,
            iconName: 'report'

          },
            {
            Titlelable : 'تنتهي قريباً',
            SecondTitle: 'خلال 90 يوم',
            color:'#FF474A33',
            Value: 8,
            iconName: 'users'
            
          },
            {
            Titlelable : 'إجمالي القيمة',
            SecondTitle: 'قيمة جميع العقود',
            color:'#F8B3244F',
            Value: '١٠,٠٠٠,٠٠٠ ريال سعودي',
            iconName: 'status'
            
          }

  ] as SummaryStats[],
    
  

  contracts: [
    {
      contractId: 'C001', name: 'مشروع البنية التحتية الرقمية', contractor: 'شركة التقنية المتقدمة',
      type: 'تقنية معلومات', status: 'active', region: 'riyadh', totalValue: 2000000,
      endDate: '١٤٤٩/٨/١٨ هـ', remainingDays: 1095, phase: 'التنفيذ',
      contractNumber: 'C001', contractorName: 'شركة التقنية المتقدمة', arabicRegion: 'الرياض',
      arabicStatus: 'ساري', arabicType: 'تقنية معلومات', daysRemaining: '١٠٩٥ يوم',
      completionDate: '١٤٤٩/٨/١٨ هـ', currentPhase: 'التنفيذ'
    },
    {
      contractId: 'C002', name: 'مشروع البنية التحتية الرقمية', contractor: 'شركة التقنية المتقدمة',
      type: 'تقنية معلومات', status: 'underPreparation', region: 'riyadh', totalValue: 2000000,
      endDate: '١٤٤٩/٨/١٨ هـ', remainingDays: 1095, phase: 'التشغيل',
      contractNumber: 'C002', contractorName: 'شركة التقنية المتقدمة', arabicRegion: 'الرياض',
      arabicStatus: 'تحت التحضير', arabicType: 'تقنية معلومات', daysRemaining: '١٠٩٥ يوم',
      completionDate: '١٤٤٩/٨/١٨ هـ', currentPhase: 'التشغيل'
    },
    {
      contractId: 'C003', name: 'مشروع البنية التحتية الرقمية', contractor: 'شركة التقنية المتقدمة',
      type: 'تقنية معلومات', status: 'completed', region: 'riyadh', totalValue: 2000000,
      endDate: '١٤٤٩/٨/١٨ هـ', remainingDays: 'منتهي منذ 30 يوم', phase: 'مكتمل',
      contractNumber: 'C003', contractorName: 'شركة التقنية المتقدمة', arabicRegion: 'الرياض',
      arabicStatus: 'منتهي', arabicType: 'تقنية معلومات', daysRemaining: 'منتهي منذ ٣٠ يوم',
      completionDate: '١٤٤٩/٨/١٨ هـ', currentPhase: 'مكتمل'
    },
    {
      contractId: 'C004', name: 'مشروع الأمن والحماية', contractor: 'شركة الأمن الشامل',
      type: 'أمان وحماية', status: 'completed', region: 'dammam', totalValue: 1800000,
      endDate: '١٤٤٨/١٢/٠١ هـ', remainingDays: 'منتهي منذ ٤٥ يوم', phase: 'مكتمل',
      contractNumber: 'C004', contractorName: 'شركة الأمن الشامل', arabicRegion: 'الدمام',
      arabicStatus: 'منتهي', arabicType: 'أمان وحماية', daysRemaining: 'منتهي منذ ٤٥ يوم',
      completionDate: '١٤٤٨/١٢/٠١ هـ', currentPhase: 'مكتمل'
    },
    {
      contractId: 'C005', name: 'مشروع العامة', contractor: 'شركة المتميزة',
      type: 'خدمات عامة', status: 'active', region: 'makkah', totalValue: 2200000,
      endDate: '١٤٥٠/٣/٢٠ هـ', remainingDays: 950, phase: 'التنفيذ',
      contractNumber: 'C005', contractorName: 'شركةالمتميزة', arabicRegion: 'مكة',
      arabicStatus: 'ساري', arabicType: 'خدمات عامة', daysRemaining: '٩٥٠ يوم',
      completionDate: '١٤٥٠/٣/٢٠ هـ', currentPhase: 'التنفيذ'
    },
    {
      contractId: 'C001', name: 'مشروع البنية التحتية الرقمية', contractor: 'شركة التقنية المتقدمة',
      type: 'تقنية معلومات', status: 'active', region: 'riyadh', totalValue: 2000000,
      endDate: '١٤٤٩/٨/١٨ هـ', remainingDays: 1095, phase: 'التنفيذ',
      contractNumber: 'C006', contractorName: 'شركة التقنية المتقدمة', arabicRegion: 'الرياض',
      arabicStatus: 'ساري', arabicType: 'تقنية معلومات', daysRemaining: '١٠٩٥ يوم',
      completionDate: '١٤٤٩/٨/١٨ هـ', currentPhase: 'التنفيذ'
    },
     {
      contractId: 'C001', name: 'مشروع البنية التحتية الرقمية', contractor: 'شركة التقنية المتقدمة',
      type: 'تقنية معلومات', status: 'active', region: 'riyadh', totalValue: 2000000,
      endDate: '١٤٤٩/٨/١٨ هـ', remainingDays: 1095, phase: 'التنفيذ',
      contractNumber: 'C006', contractorName: 'شركة التقنية المتقدمة', arabicRegion: 'الرياض',
      arabicStatus: 'ساري', arabicType: 'تقنية معلومات', daysRemaining: '١٠٩٥ يوم',
      completionDate: '١٤٤٩/٨/١٨ هـ', currentPhase: 'التنفيذ'
    },
   
   {
      contractId: 'C007', name: 'مشروع التعليم والتدريب', contractor: 'أكاديمية التطوير المهني',
      type: 'تعليم', status: 'underPreparation', region: 'jeddah', totalValue: 1200000,
      endDate: '١٤٤٩/١١/٢٥ هـ', remainingDays: 750, phase: 'التحضير',
      contractNumber: 'C007', contractorName: 'أكاديمية التطوير المهني', arabicRegion: 'جدة',
      arabicStatus: 'تحت التحضير', arabicType: 'تعليم', daysRemaining: '٧٥٠ يوم',
      completionDate: '١٤٤٩/١١/٢٥ هـ', currentPhase: 'التحضير'
    },
    {
      contractId: 'C008', name: 'مشروع الصيانة الشاملة', contractor: 'شركة الصيانة المتقدمة',
      type: 'صيانة', status: 'active', region: 'dammam', totalValue: 1650000,
      endDate: '١٤٤٩/١٢/١٥ هـ', remainingDays: 820, phase: 'التشغيل',
      contractNumber: 'C008', contractorName: 'شركة الصيانة المتقدمة', arabicRegion: 'الدمام',
      arabicStatus: 'ساري', arabicType: 'صيانة', daysRemaining: '٨٢٠ يوم',
      completionDate: '١٤٤٩/١٢/١٥ هـ', currentPhase: 'التشغيل'
    },
    {
      contractId: 'C009', name: 'مشروع التقنيات المتطورة', contractor: 'شركة التقنيات الحديثة',
      type: 'تقنية معلومات', status: 'completed', region: 'makkah', totalValue: 3200000,
      endDate: '١٤٤٨/٧/٢٨ هـ', remainingDays: 'منتهي منذ ١٥ يوم', phase: 'مكتمل',
      contractNumber: 'C009', contractorName: 'شركة التقنيات الحديثة', arabicRegion: 'مكة',
      arabicStatus: 'منتهي', arabicType: 'تقنية معلومات', daysRemaining: 'منتهي منذ ١٥ يوم',
      completionDate: '١٤٤٨/٧/٢٨ هـ', currentPhase: 'مكتمل'
    },
    {
      contractId: 'C010', name: 'مشروع البحث والتطوير', contractor: 'معهد البحوث التطبيقية',
      type: 'استشارات', status: 'underPreparation', region: 'riyadh', totalValue: 2800000,
      endDate: '١٤٥٠/٦/٣٠ هـ', remainingDays: 1200, phase: 'الدراسة',
      contractNumber: 'C010', contractorName: 'معهد البحوث التطبيقية', arabicRegion: 'الرياض',
      arabicStatus: 'تحت التحضير', arabicType: 'استشارات', daysRemaining: '١٢٠٠ يوم',
      completionDate: '١٤٥٠/٦/٣٠ هـ', currentPhase: 'الدراسة'
    }
  ] as ContractData[],
  
  regionDistribution: {
    riyadh: { underPreparation: 1, active: 2, completed: 2 },
    jeddah: { underPreparation: 1, active: 0, completed: 2 },
    dammam: { underPreparation: 1, active: 2, completed: 0 },
    makkah: { underPreparation: 0, active: 0, completed: 2 },
  } as RegionDistribution,

  typeDistribution: {
    technology: 3,
    maintenance: 1,
    generalServices: 1,
    security: 1,
    consulting: 1,
    teaching: 1,
  },

  annualTrend: {
    '2020': 0.6,
    '2021': 1.2,
    '2022': 1.8,
    '2023': 3.44,
    '2024': 2.2,
    '2025': 1.6,
    '2026': 1.0,
  } as AnnualTrend,

  statusDistribution: {
    active: 6,
    underPreparation: 1,
    completed: 1,
  },

  colorLegend: {
    active: '#7B3FAB',
    underPreparation: '#2E8BFF',
    completed: '#D831FF',
  },
};