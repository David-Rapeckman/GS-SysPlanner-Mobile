import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { fonts } from './fonts';
import { metrics } from './metrics';

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: metrics.paddingMd,
    paddingTop: 16,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: fonts.sizes.xl,
    color: colors.text,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.sm,
    color: colors.textMuted,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: metrics.radiusMd,
    padding: metrics.paddingMd,
  },
});
