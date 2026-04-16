import { Card, CardContent, Skeleton, Typography, useTheme } from '@mui/material';
import Iconify from 'components/iconify';
import { Box, useMediaQuery } from '@mui/system';
import { TABLE_STYLES } from '../constants/tableConstants';
import SingleChart from './singleChart';
import GradientCard from 'pages/extra-pages/MHC-Emergency-New/components/GradientCard';
import InnerGradientBox from 'pages/extra-pages/MHC-Emergency-New/components/InnerGradientBox';

interface EmergencyChartsCardProps {
  label: string;
  chartData: any[];                // راجع التكوين تحت
  isLoading?: boolean;
  layout?: 'horizontal' | 'vertical';
  width?: string;
  minBarHeight?: number;
  height?: string;
  icon: string;
  showValue?: boolean;
  preserveOriginalValues?: boolean;
  rotateXAxisLabels?: boolean;
  hasbiglabel?: boolean;
}

// ✅ تدرّجات بالأسماء (لو عندك serial استخدم GRADIENT_BY_SERIAL بدلها)
const GRADIENT_BY_NAME: Record<string, string> = {
  NSH:        'linear-gradient(90deg, #0A532B 0%, #1a7a4a 50%, #2da06a 100%)',
  MCH:        'linear-gradient(90deg, #314F7C 0%, #4a6b9a 50%, #6387b8 100%)',
  KAMC:       'linear-gradient(90deg, #8C7127 0%, #a88a3a 50%, #c4a34d 100%)',
  KFGH:       'linear-gradient(90deg, #FF00B3 0%, #ff33c4 50%, #ff66d6 100%)',
  KAAH:       'linear-gradient(90deg, #FF9500 0%, #ffaa33 50%, #ffbf66 100%)',
  AJD:        'linear-gradient(90deg, #009CE2 0%, #33b0e8 50%, #66c4ee 100%)',
  Hera:       'linear-gradient(90deg, #55570D 0%, #6b6d1a 50%, #818327 100%)',
  'Ibn Sina': 'linear-gradient(90deg, #7D368B 0%, #8f4a9d 50%, #a15eaf 100%)',
  Khalais:    'linear-gradient(90deg, #06C08E 0%, #33cca4 50%, #60d8ba 100%)',
  Alkamil:    'linear-gradient(90deg, #4A0DD8 0%, #6b3de0 50%, #8c6de8 100%)',
  Haram:      'linear-gradient(90deg, #B91B84 0%, #c73a9d 50%, #d559b6 100%)',
};

// (اختياري) لو مع كل عنصر facility_serial تقدر تستخدمه:
const GRADIENT_BY_SERIAL: Record<number, string> = {
  11: GRADIENT_BY_NAME.NSH,
  10: GRADIENT_BY_NAME.MCH,
   9: GRADIENT_BY_NAME.KAMC,
   8: GRADIENT_BY_NAME.KFGH,
   7: GRADIENT_BY_NAME.KAAH,
   6: GRADIENT_BY_NAME.AJD,
   5: GRADIENT_BY_NAME.Hera,
   4: GRADIENT_BY_NAME['Ibn Sina'],
   3: GRADIENT_BY_NAME.Khalais,
   2: GRADIENT_BY_NAME.Alkamil,
   1: GRADIENT_BY_NAME.Haram,
};

const HajjCard: React.FC<EmergencyChartsCardProps> = ({
  chartData,
  isLoading,
  label,
  layout = 'horizontal',
  width = '33%',
  height = '24.9vh',
  icon,
  rotateXAxisLabels = true, // بنفعل الدوران افتراضيًا هنا
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = isMobile || isTablet;

  if (isLoading) return <Skeleton variant="rectangular" height={height} width={width} />;

  // 🔧 تحويل chartData إلى الشكل المطلوب لـ SingleChart: { group, count, color, id }
  // بنحاول نقرأ الاسم والقيمة من احتمالات مختلفة، وبنحدد اللون بالاسم أو بالـ serial لو موجود.
  const dataForSingle = (chartData ?? []).map((d: any, idx: number) => {
    // حاول تستخرج الاسم
    const name: string =
      d.group ??
      d.label ??
      d.facility_name ??
      d.hospital ??
      Object.keys(d).find((k) => k !== 'value' && k !== 'total' && k !== 'count' && k !== 'facility_serial') ??
      `H${idx + 1}`;

    // حاول تستخرج القيمة
    const count: number =
      d.count ??
      d.value ??
      d.total ??
      (typeof d[name] === 'number' ? d[name] : 0) ?? 0;

    // جرّب اللون القادم من الداتا، ثم بالـ serial، ثم بالاسم
    const serial: number | undefined = d.facility_serial ?? d.serial;
    const color: string =
      d.color ??
      (serial ? GRADIENT_BY_SERIAL[serial] : undefined) ??
      GRADIENT_BY_NAME[name] ??
      theme.palette.primary.main;

    return {
      group: name,
      count,
      color,
      id: serial ?? idx, // لازم id فريد لكل عمود
    };
  });

  return (
    <GradientCard
      variant="first"
      sx={{
        width,
        margin: 0.1,
        padding: 0,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' },
      }}
    >
      <CardContent sx={{ padding: 1, width: '100%', height }}>
        <Box sx={{ display: 'flex', justifyContent: 'start', gap: 0.5, alignContent: 'center', paddingBottom: 1 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: isSmallScreen ? TABLE_STYLES.containerSize.small : TABLE_STYLES.containerSize.large,
              height: isSmallScreen ? TABLE_STYLES.containerHeight.small : TABLE_STYLES.containerHeight.large,
              borderRadius: '50%',
              backgroundColor: '#F2F2F2',
            }}
          >
            <Iconify icon={icon} width={isSmallScreen ? TABLE_STYLES.iconSize.small : TABLE_STYLES.iconSize.large} sx={{ color: '#000' }} />
          </Box>
          <Typography
            variant="h6"
            align="center"
            sx={{ fontSize: TABLE_STYLES.chartTitleFontSize, p: 0, m: 0, marginTop: 0.1 }} // RESPONSIVE
            gutterBottom
          >
            {label}
          </Typography>
        </Box>

        <InnerGradientBox variant="first" sx={{ height: '100%', width: '100%', borderRadius: 1, padding: 0.5 }}>
          {/* ✅ دلوقتي SingleChart هيستقبل لون linear-gradient لكل عمود */}
          <SingleChart data={dataForSingle} rotateLabel={true} />
        </InnerGradientBox>
      </CardContent>
    </GradientCard>
  );
};

export default HajjCard;
