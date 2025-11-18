import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../styles/colors';
import { fonts } from '../styles/fonts';
import { metrics } from '../styles/metrics';

interface PlannerCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  highlight?: boolean;
  variant?: 'default' | 'ghost';
  onPress?: () => void;
}

const PlannerCard: React.FC<PlannerCardProps> = ({
  label,
  value,
  subtitle,
  highlight,
  variant = 'default',
  onPress,
}) => {
  const isGhost = variant === 'ghost';

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{ flex: 1 }}
      onPress={onPress}
      disabled={!onPress}
    >
      <View
        style={[
          styles.card,
          highlight && styles.cardHighlight,
          isGhost && styles.cardGhost,
        ]}
      >
        <Text
          style={[
            styles.label,
            highlight && styles.labelHighlight,
            isGhost && styles.labelGhost,
          ]}
        >
          {label}
        </Text>
        <Text
          style={[
            styles.value,
            highlight && styles.valueHighlight,
            isGhost && styles.valueGhost,
          ]}
        >
          {value}
        </Text>
        {subtitle ? (
          <Text
            style={[
              styles.subtitle,
              highlight && styles.subtitleHighlight,
              isGhost && styles.subtitleGhost,
            ]}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: metrics.radiusLg,
    padding: metrics.paddingMd,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  cardHighlight: {
    backgroundColor: colors.primary,
  },
  cardGhost: {
    backgroundColor: '#F3F4FF',
  },
  label: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.sm,
    color: colors.textMuted,
  },
  labelHighlight: {
    color: '#E5E7FF',
  },
  labelGhost: {
    color: colors.primaryDark,
  },
  value: {
    marginTop: 6,
    fontFamily: fonts.bold,
    fontSize: fonts.sizes.xxl,
    color: colors.text,
  },
  valueHighlight: {
    color: '#FFFFFF',
  },
  valueGhost: {
    color: colors.primaryDark,
  },
  subtitle: {
    marginTop: 4,
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.xs,
    color: colors.textMuted,
  },
  subtitleHighlight: {
    color: '#E5E7FF',
  },
  subtitleGhost: {
    color: colors.primaryDark,
  },
});

export default PlannerCard;
