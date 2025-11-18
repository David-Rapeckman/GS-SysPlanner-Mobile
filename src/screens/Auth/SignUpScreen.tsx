import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import { metrics } from '../../styles/metrics';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  function validate(): boolean {
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Preencha todos os campos para continuar.');
      return false;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email.trim())) {
      setError('Informe um e-mail válido.');
      return false;
    }

    if (password.length < 4) {
      setError('A senha deve conter pelo menos 4 caracteres.');
      return false;
    }

    if (password !== confirmPassword) {
      setError('As senhas não conferem.');
      return false;
    }

    return true;
  }

  function handleCreateAccount() {
    if (!validate()) {
      return;
    }

    // Nesta versão acadêmica não há backend:
    // o cadastro é apenas ilustrativo.
    setError(null);
    navigation.navigate('Signin');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>SysPlanner</Text>
        <Text style={styles.subtitle}>
          Crie seu acesso para começar a planejar sua rotina.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Criar conta</Text>
        <Text style={styles.cardSubtitle}>
          Esta tela simula o fluxo de cadastro para fins acadêmicos.
        </Text>

        {error && <Text style={styles.error}>{error}</Text>}

        <Text style={styles.label}>Nome completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu nome"
          placeholderTextColor={colors.textMuted}
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="seuemail@exemplo.com"
          placeholderTextColor={colors.textMuted}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite uma senha"
          placeholderTextColor={colors.textMuted}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={styles.label}>Confirmar senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Repita a senha"
          placeholderTextColor={colors.textMuted}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleCreateAccount}
        >
          <Text style={styles.buttonText}>Concluir cadastro</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkContainer}
          onPress={() => navigation.navigate('Signin')}
        >
          <Text style={styles.linkText}>Já tem conta? Voltar para login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: metrics.paddingLg,
    backgroundColor: colors.background,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 24,
  },
  appName: {
    fontFamily: fonts.bold,
    fontSize: fonts.sizes.xxl,
    color: colors.primaryMedium,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.sm,
    color: colors.textMuted,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: metrics.radiusLg,
    padding: metrics.paddingLg,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  cardTitle: {
    fontFamily: fonts.bold,
    fontSize: fonts.sizes.lg,
    color: colors.text,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.xs,
    color: colors.textMuted,
    marginBottom: 16,
  },
  error: {
    color: colors.danger,
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.xs,
    marginBottom: 8,
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
    marginBottom: 12,
    backgroundColor: colors.surface,
    color: colors.text,
  },
  button: {
    height: 48,
    borderRadius: metrics.radiusMd,
    backgroundColor: colors.primaryMedium,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontFamily: fonts.medium,
    fontSize: fonts.sizes.md,
  },
  linkContainer: {
    marginTop: 16,
  },
  linkText: {
    textAlign: 'center',
    color: colors.textMuted,
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.sm,
  },
});

export default SignUpScreen;
