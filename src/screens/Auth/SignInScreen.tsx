import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import { metrics } from '../../styles/metrics';

type Props = NativeStackScreenProps<RootStackParamList, 'Signin'>;

const SignInScreen: React.FC<Props> = ({ navigation }) => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function validate(): boolean {
    if (!email.trim() || !password.trim()) {
      setError('Preencha e-mail e senha para entrar.');
      return false;
    }

    // validação simples de e-mail
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email.trim())) {
      setError('Informe um e-mail válido.');
      return false;
    }

    return true;
  }

  async function handleLogin() {
    if (!validate()) {
      return;
    }

    try {
      setError(null);
      setLoading(true);
      // AuthContext já cuida de salvar o usuário em AsyncStorage
      await signIn(email.trim(), password);
    } catch (e: any) {
      setError(e?.message ?? 'Não foi possível entrar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>SysPlanner</Text>
        <Text style={styles.subtitle}>
          Organize estudos, trabalho e vida pessoal em um único lugar.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Entrar</Text>
        <Text style={styles.cardSubtitle}>
          Acesse sua rotina e acompanhe suas tarefas do dia.
        </Text>

        {error && <Text style={styles.error}>{error}</Text>}

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
          placeholder="Digite sua senha"
          placeholderTextColor={colors.textMuted}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkContainer}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.linkText}>
            Não tem uma conta?{' '}
            <Text style={styles.linkTextHighlight}>Criar cadastro</Text>
          </Text>
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
  linkTextHighlight: {
    color: colors.primaryMedium,
    fontFamily: fonts.medium,
  },
});

export default SignInScreen;
