import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import { metrics } from '../../styles/metrics';

const ChangePhotoScreen: React.FC = () => {
  const navigation = useNavigation();

  function handleChangePhoto() {
    // futuro: integrar com image picker / upload
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change profile photo</Text>
      <Text style={styles.subtitle}>
        Feature placeholder. Later you can integrate this screen with an image
        picker and upload.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleChangePhoto}>
        <Text style={styles.buttonText}>Ok, got it</Text>
      </TouchableOpacity>
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
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.sm,
    color: colors.textMuted,
    marginBottom: 24,
  },
  button: {
    height: 48,
    borderRadius: metrics.radiusMd,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: fonts.medium,
  },
});

export default ChangePhotoScreen;
