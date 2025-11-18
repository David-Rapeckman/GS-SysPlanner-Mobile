import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';

const SplashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SysPlanner</Text>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.subtitle}>Loading your routine...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: fonts.sizes.xxl,
    color: colors.primary,
    marginBottom: 16,
  },
  subtitle: {
    marginTop: 12,
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.sm,
    color: colors.textMuted,
  },
});

export default SplashScreen;
