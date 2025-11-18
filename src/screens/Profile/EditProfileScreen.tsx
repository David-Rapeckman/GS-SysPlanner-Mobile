import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import { metrics } from '../../styles/metrics';

const EditProfileScreen: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [name, setName] = useState(user?.name ?? '');

  function handleSave() {
    // futuro: integrar com backend / contexto
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit profile</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Your name"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save changes</Text>
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
    marginBottom: 16,
  },
  label: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.sm,
    color: colors.textMuted,
    marginBottom: 4,
  },
  input: {
    height: 48,
    borderRadius: metrics.radiusMd,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: metrics.paddingMd,
    marginBottom: 16,
    backgroundColor: '#fff',
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

export default EditProfileScreen;
