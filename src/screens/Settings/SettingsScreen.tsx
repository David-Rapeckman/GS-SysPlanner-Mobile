import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import { metrics } from '../../styles/metrics';
import { Ionicons } from '@expo/vector-icons';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      {/* Descrição rápida do app */}
      <View style={styles.descriptionCard}>
        <Text style={styles.descriptionTitle}>SysPlanner</Text>
        <Text style={styles.descriptionText}>
          Um planner móvel pensado para o Futuro do Trabalho, ajudando você a
          organizar estudos, trabalho e vida pessoal em um só lugar.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Aplicativo</Text>

        <TouchableOpacity
          style={styles.row}
          onPress={() => navigation.navigate('AboutApp')}
        >
          <View style={styles.rowLeft}>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color={colors.text}
            />
            <Text style={styles.label}>Sobre o aplicativo</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.row}
          onPress={() => navigation.navigate('HelpCenter')}
        >
          <View style={styles.rowLeft}>
            <Ionicons name="help-circle-outline" size={20} color={colors.text} />
            <Text style={styles.label}>Central de ajuda</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.row, styles.lastRow]}
          onPress={() => navigation.navigate('Terms')}
        >
          <View style={styles.rowLeft}>
            <Ionicons name="document-text-outline" size={20} color={colors.text} />
            <Text style={styles.label}>Termos e condições</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: metrics.paddingMd,
    paddingTop: 24,
    backgroundColor: colors.background,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: fonts.sizes.xl,
    color: colors.text,
    marginBottom: 16,
  },
  descriptionCard: {
    backgroundColor: colors.card,
    borderRadius: metrics.radiusMd,
    padding: metrics.paddingMd,
    marginBottom: 20,
  },
  descriptionTitle: {
    fontFamily: fonts.medium,
    fontSize: fonts.sizes.md,
    color: colors.text,
    marginBottom: 4,
  },
  descriptionText: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.sm,
    color: colors.textMuted,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: metrics.radiusMd,
    paddingHorizontal: metrics.paddingMd,
    paddingTop: 8,
  },
  sectionTitle: {
    fontFamily: fonts.medium,
    fontSize: fonts.sizes.sm,
    color: colors.textMuted,
    marginBottom: 4,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    justifyContent: 'space-between',
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: fonts.sizes.md,
    color: colors.text,
    marginLeft: 8,
  },
});

export default SettingsScreen;
