import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';

const SplashScreen: React.FC = () => {
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 700,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(subtitleOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [logoScale, logoOpacity, subtitleOpacity]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoWrapper,
          {
            transform: [{ scale: logoScale }],
            opacity: logoOpacity,
          },
        ]}
      >
        <View style={styles.logoCircle}>
          <Text style={styles.logoLetter}>S</Text>
        </View>
        <Text style={styles.appName}>SysPlanner</Text>
      </Animated.View>

      <ActivityIndicator size="large" color={colors.primaryMedium} />

      <Animated.Text
        style={[styles.subtitle, { opacity: subtitleOpacity }]}
      >
        Carregando sua rotina...
      </Animated.Text>
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
  logoWrapper: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryMedium,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  logoLetter: {
    fontFamily: fonts.bold,
    fontSize: fonts.sizes.xxl,
    color: '#FFFFFF',
  },
  appName: {
    fontFamily: fonts.bold,
    fontSize: fonts.sizes.xxl,
    color: '#FFFFFF',
  },
  subtitle: {
    marginTop: 16,
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.sm,
    color: colors.textMuted,
  },
});

export default SplashScreen;
