import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import { metrics } from '../../styles/metrics';
import { Ionicons } from '@expo/vector-icons';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const AboutAppScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();

  function handleBack() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre o SysPlanner</Text>

      <Text style={styles.text}>
        O SysPlanner é um aplicativo de planejamento pessoal desenvolvido como
        parte da Global Solution 2025/2 da FIAP, com o tema “O Futuro do
        Trabalho”.
      </Text>

      <Text style={[styles.text, { marginTop: 12 }]}>
        A ideia é ajudar estudantes e profissionais a organizarem estudos,
        trabalho e cuidados pessoais em um único lugar, incentivando
        requalificação contínua, equilíbrio entre vida pessoal e profissional e
        bem-estar ao longo da jornada.
      </Text>

      <Text style={[styles.text, { marginTop: 12 }]}>
        Esta versão é focada em prototipagem e validação de conceito, sem uso
        de dados reais em produção.
      </Text>

      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Ionicons
          name="arrow-back-outline"
          size={18}
          color={colors.text}
          style={{ marginRight: 6 }}
        />
        <Text style={styles.backButtonText}>Voltar para Configurações</Text>
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
  text: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.sm,
    color: colors.textMuted,
  },
  backButton: {
    marginTop: 24,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: metrics.radiusMd,
    backgroundColor: colors.card,
  },
  backButtonText: {
    fontFamily: fonts.medium,
    fontSize: fonts.sizes.sm,
    color: colors.text,
  },
});

export default AboutAppScreen;
