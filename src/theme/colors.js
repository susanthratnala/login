export const colors = {
  // Primary
  primary: '#319D9B',
  primaryDark: '#2A8584',
  primaryLight: '#4DB3B1',
  primarySoft: '#E8F6F6',

  // Secondary
  secondary: '#495A8D',
  secondaryLight: '#7D8CC3',
  accent: '#95B1AF',

  // Neutrals
  surface: '#FAF4E8',
  surfaceDark: '#FDF1DD',
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',

  // Semantic
  success: '#10B981',
  successLight: '#D1FAE5',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  error: '#EF4444',
  errorLight: '#FEE2E2',
  info: '#3B82F6',
  infoLight: '#DBEAFE',

  // Healthcare specific - using semantic references
  get vital() { return this.primary; }, // Reference to primary for consistency
  heartRate: '#DC2626', // Distinct red for heart rate
  bloodPressure: '#6366F1', // Distinct indigo for blood pressure
  temperature: '#EA580C', // Distinct orange for temperature
  medication: '#8B5CF6',
  appointment: '#06B6D4',
};