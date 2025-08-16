import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';

export const theme = {
  colors,
  typography,
  spacing,
  // Shortcuts for common combinations
  button: {
    primary: {
      backgroundColor: colors.primary,
      color: colors.white,
    },
    secondary: {
      backgroundColor: colors.white,
      borderColor: colors.primary,
      color: colors.primary,
    },
    success: {
      backgroundColor: colors.success,
      color: colors.white,
    },
    error: {
      backgroundColor: colors.error,
      color: colors.white,
    },
  },
  text: {
    primary: colors.gray800,
    secondary: colors.gray600,
    tertiary: colors.gray500,
    inverse: colors.white,
  },
  background: {
    primary: colors.white,
    secondary: colors.gray50,
    tertiary: colors.gray100,
  },
};

export { colors, typography, spacing };