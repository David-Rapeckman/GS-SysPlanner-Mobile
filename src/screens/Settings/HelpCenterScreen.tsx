import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import { metrics } from '../../styles/metrics';

const HelpCenterScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help center</Text>
      <Text style={styles.text}>
        If you have any questions about SysPlanner, you can contact the team or
        your professor. In the future this screen can be integrated with a FAQ
        or chatbot.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: metrics.paddingLg,
    backgroundColor: colors.background,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: fonts.sizes.xl,
    color: colors.text,
    marginBottom: 16,
  },
  text: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.sm,
    color: colors.textMuted,
  },
});

export default HelpCenterScreen;
