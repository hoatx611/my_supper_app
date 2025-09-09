export const COLORS = {
  // Primary Colors
  primary: '#007AFF',
  primaryDark: '#0056CC',
  primaryLight: '#4DA6FF',
  
  // Secondary Colors
  secondary: '#34C759',
  secondaryDark: '#248A3D',
  secondaryLight: '#5DD979',
  
  // Neutral Colors
  white: '#FFFFFF',
  black: '#000000',
  gray: '#8E8E93',
  grayLight: '#F2F2F7',
  grayDark: '#3A3A3C',
  
  // Status Colors
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  info: '#007AFF',
  
  // Background Colors
  background: '#F2F2F7',
  surface: '#FFFFFF',
  overlay: 'rgba(0, 0, 0, 0.5)',
  
  // Text Colors
  textPrimary: '#000000',
  textSecondary: '#8E8E93',
  textDisabled: '#C7C7CC',
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const TYPOGRAPHY = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    xxl: 36,
    xxxl: 44,
  },
} as const;

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 50,
} as const;

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
} as const;

export type Theme = {
  colors: typeof COLORS;
  spacing: typeof SPACING;
  typography: typeof TYPOGRAPHY;
  borderRadius: typeof BORDER_RADIUS;
  shadows: typeof SHADOWS;
};

export const theme: Theme = {
  colors: COLORS,
  spacing: SPACING,
  typography: TYPOGRAPHY,
  borderRadius: BORDER_RADIUS,
  shadows: SHADOWS,
};
