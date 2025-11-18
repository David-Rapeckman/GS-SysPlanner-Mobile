import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import { metrics } from '../../styles/metrics';

const AboutAppScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About SysPlanner</Text>
      <Text style={styles.text}>
        SysPlanner is a mobile planner focused on the future of work. The app
        helps users organize their study, work and personal activities in a
        single place, supporting continuous learning and well-being.
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

export default AboutAppScreen;
