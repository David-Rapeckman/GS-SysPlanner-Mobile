import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
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

const TermsScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();

  function handleBack() {
    navigation.goBack();
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Termos e condições</Text>

        <Text style={styles.text}>
          Esta é uma versão demonstrativa do SysPlanner, criada para fins
          acadêmicos na Global Solution 2025/2 da FIAP. O aplicativo não deve
          ser utilizado para armazenamento de dados sensíveis ou informações de
          produção.
        </Text>

        <Text style={[styles.text, { marginTop: 12 }]}>
          Todo o conteúdo inserido pelos usuários é considerado fictício e
          serve apenas para simular cenários de estudo relacionados ao tema “O
          Futuro do Trabalho”.
        </Text>

        <Text style={[styles.text, { marginTop: 12 }]}>
          Ao utilizar o aplicativo, você concorda que:
        </Text>

        <Text style={styles.text}>
          {'\n'}• O app será utilizado exclusivamente para atividades acadêmicas;
          {'\n'}• Não há qualquer garantia de disponibilidade, suporte ou
          continuidade do serviço;
          {'\n'}• Nenhum dado será utilizado para fins comerciais.
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  inner: {
    padding: metrics.paddingLg,
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

export default TermsScreen;
