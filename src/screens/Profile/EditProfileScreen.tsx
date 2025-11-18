// src/screens/Profile/EditProfileScreen.tsx
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
  const { user, updateProfile } = useAuth();
  const navigation = useNavigation();
  const [name, setName] = useState(user?.name ?? '');
  const [about, setAbout] = useState(user?.about ?? '');
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    if (!name.trim()) {
      setError('Informe pelo menos um nome para o perfil.');
      return;
    }

    setError(null);
    await updateProfile({
      name: name.trim(),
      about: about.trim(),
    });

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar perfil</Text>
      <Text style={styles.subtitle}>
        Atualize como seu nome e descrição aparecem no SysPlanner.
      </Text>

      <Text style={styles.label}>Nome completo</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Seu nome"
        placeholderTextColor={colors.textMuted}
      />

      <Text style={styles.label}>E-mail</Text>
      <View style={styles.readonlyField}>
        <Text style={styles.readonlyValue}>{user?.email ?? '-'}</Text>
      </View>

      <Text style={styles.label}>Sobre você</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={about}
        onChangeText={setAbout}
        multiline
        placeholder="Ex.: estudante de ADS focado em DevOps e Mobile."
        placeholderTextColor={colors.textMuted}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar alterações</Text>
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
    marginBottom: 6,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.xs,
    color: colors.textMuted,
    marginBottom: 20,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: fonts.sizes.sm,
    color: colors.text,
    marginBottom: 4,
  },
  input: {
    height: 48,
    borderRadius: metrics.radiusMd,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: metrics.paddingMd,
    marginBottom: 14,
    backgroundColor: colors.surface,
    color: colors.text,
  },
  textArea: {
    height: 88,
    textAlignVertical: 'top',
  },
  readonlyField: {
    height: 48,
    borderRadius: metrics.radiusMd,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: metrics.paddingMd,
    marginBottom: 14,
    backgroundColor: colors.card,
    justifyContent: 'center',
  },
  readonlyValue: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.sm,
    color: colors.textMuted,
  },
  errorText: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.xs,
    color: colors.danger,
    marginBottom: 8,
  },
  button: {
    height: 48,
    borderRadius: metrics.radiusMd,
    backgroundColor: colors.primaryMedium,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  buttonText: {
    color: '#fff',
    fontFamily: fonts.medium,
    fontSize: fonts.sizes.sm,
  },
});

export default EditProfileScreen;
