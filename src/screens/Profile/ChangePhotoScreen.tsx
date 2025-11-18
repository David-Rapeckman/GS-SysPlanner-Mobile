// src/screens/Profile/ChangePhotoScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import { metrics } from '../../styles/metrics';
import { useAuth } from '../../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const PALETTE = [
  '#0084FF',
  '#1B6DD0',
  '#2156A2',
  '#214177',
  '#1C2D4F',
  '#141A29',
];

const ChangePhotoScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user, updateProfile } = useAuth();
  const [selectedColor, setSelectedColor] = useState(
    user?.avatarColor || PALETTE[0],
  );

  const initials =
    user?.name
      ?.split(' ')
      .filter(Boolean)
      .map(part => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'SP';

  async function handleSaveAvatar() {
    await updateProfile({ avatarColor: selectedColor });
    navigation.goBack();
  }

  function handleCancel() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personalizar avatar</Text>
      <Text style={styles.subtitle}>
        Escolha uma cor para o fundo do seu avatar. Essa configuração é salva
        apenas neste dispositivo.
      </Text>

      <View style={styles.previewWrapper}>
        <View style={[styles.avatarPreview, { backgroundColor: selectedColor }]}>
          <Text style={styles.avatarInitials}>{initials}</Text>
        </View>
        <Text style={styles.previewLabel}>Prévia do seu avatar</Text>
      </View>

      <Text style={styles.paletteLabel}>Escolha uma cor</Text>
      <View style={styles.paletteRow}>
        {PALETTE.map(color => {
          const isActive = color === selectedColor;
          return (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorItem,
                { backgroundColor: color },
                isActive && styles.colorItemActive,
              ]}
              onPress={() => setSelectedColor(color)}
            >
              {isActive && (
                <Ionicons name="checkmark" size={18} color="#FFFFFF" />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
          onPress={handleCancel}
        >
          <Text style={styles.buttonOutlineText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonPrimary]}
          onPress={handleSaveAvatar}
        >
          <Text style={styles.buttonPrimaryText}>Salvar avatar</Text>
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
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: fonts.sizes.xl,
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.sm,
    color: colors.textMuted,
    marginBottom: 24,
  },
  previewWrapper: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarPreview: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.primaryMedium,
    marginBottom: 8,
  },
  avatarInitials: {
    fontFamily: fonts.bold,
    fontSize: fonts.sizes.xl,
    color: '#FFFFFF',
  },
  previewLabel: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.xs,
    color: colors.textMuted,
  },
  paletteLabel: {
    fontFamily: fonts.medium,
    fontSize: fonts.sizes.sm,
    color: colors.text,
    marginBottom: 8,
  },
  paletteRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  colorItem: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorItemActive: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  button: {
    height: 44,
    borderRadius: metrics.radiusMd,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'transparent',
  },
  buttonOutlineText: {
    fontFamily: fonts.medium,
    fontSize: fonts.sizes.sm,
    color: colors.text,
  },
  buttonPrimary: {
    backgroundColor: colors.primaryMedium,
  },
  buttonPrimaryText: {
    fontFamily: fonts.medium,
    fontSize: fonts.sizes.sm,
    color: '#FFFFFF',
  },
});

export default ChangePhotoScreen;
