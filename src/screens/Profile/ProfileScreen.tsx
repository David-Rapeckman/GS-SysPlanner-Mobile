// src/screens/Profile/ProfileScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import { metrics } from '../../styles/metrics';
import { Ionicons } from '@expo/vector-icons';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const ProfileScreen: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigation = useNavigation<Nav>();

  const initials =
    user?.name
      ?.split(' ')
      .filter(Boolean)
      .map(part => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'SP';

  const avatarBg = user?.avatarColor || colors.surface;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      <View style={styles.headerCard}>
        <View style={[styles.avatar, { backgroundColor: avatarBg }]}>
          <Text style={styles.avatarInitials}>{initials}</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{user?.name ?? 'Usuário SysPlanner'}</Text>
          <Text style={styles.email}>
            {user?.email ?? 'sem e-mail cadastrado'}
          </Text>
          <Text style={styles.helperText}>
            Estas informações são usadas pelo SysPlanner para personalizar sua
            experiência e exibir seus dados nas telas de planejamento.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sobre você</Text>

        <View style={styles.aboutCard}>
          <Text style={styles.aboutText}>
            {user?.about && user.about.trim().length > 0
              ? user.about
              : 'Adicione uma breve descrição sobre você em "Editar dados do perfil".'}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configurações de conta</Text>

        <TouchableOpacity
          style={styles.listItem}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <View style={styles.listItemLeft}>
            <Ionicons name="person-outline" size={20} color={colors.text} />
            <Text style={styles.listItemText}>Editar dados do perfil</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.listItem}
          onPress={() => navigation.navigate('ChangePhoto')}
        >
          <View style={styles.listItemLeft}>
            <Ionicons name="color-palette-outline" size={20} color={colors.text} />
            <Text style={styles.listItemText}>Personalizar avatar</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sessão</Text>

        <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
          <Ionicons
            name="log-out-outline"
            size={20}
            color="#FFFFFF"
            style={{ marginRight: 6 }}
          />
          <Text style={styles.logoutText}>Sair do SysPlanner</Text>
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
  headerCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: metrics.radiusLg,
    padding: metrics.paddingMd,
    marginBottom: 24,
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.primaryMedium,
    marginRight: 12,
  },
  avatarInitials: {
    fontFamily: fonts.bold,
    fontSize: fonts.sizes.lg,
    color: colors.text,
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontFamily: fonts.medium,
    fontSize: fonts.sizes.lg,
    color: colors.text,
  },
  email: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.sm,
    color: colors.textMuted,
    marginTop: 2,
  },
  helperText: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.xs,
    color: colors.textMuted,
    marginTop: 6,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: fonts.medium,
    fontSize: fonts.sizes.sm,
    color: colors.textMuted,
    marginBottom: 8,
  },
  aboutCard: {
    backgroundColor: colors.card,
    borderRadius: metrics.radiusMd,
    padding: metrics.paddingMd,
  },
  aboutText: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.sm,
    color: colors.text,
  },
  listItem: {
    backgroundColor: colors.card,
    borderRadius: metrics.radiusMd,
    paddingHorizontal: metrics.paddingMd,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  listItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemText: {
    fontFamily: fonts.medium,
    fontSize: fonts.sizes.sm,
    color: colors.text,
    marginLeft: 8,
  },
  logoutButton: {
    height: 48,
    borderRadius: metrics.radiusMd,
    backgroundColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  logoutText: {
    color: '#fff',
    fontFamily: fonts.medium,
    fontSize: fonts.sizes.sm,
  },
});

export default ProfileScreen;
