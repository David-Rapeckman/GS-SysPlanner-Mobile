// src/services/profileStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface LocalProfile {
  name: string;
  about: string;
  avatarColor: string;
}

const PROFILE_STORAGE_KEY = '@sysplanner:profile';

export async function getStoredProfile(): Promise<LocalProfile | null> {
  try {
    const data = await AsyncStorage.getItem(PROFILE_STORAGE_KEY);
    if (!data) return null;
    return JSON.parse(data) as LocalProfile;
  } catch {
    return null;
  }
}

export async function saveStoredProfile(
  partial: Partial<LocalProfile>,
  fallback?: { name?: string }
): Promise<LocalProfile> {
  const current: LocalProfile =
    (await getStoredProfile()) || {
      name: fallback?.name || '',
      about: '',
      avatarColor: '#2156A2',
    };

  const updated: LocalProfile = {
    ...current,
    ...partial,
  };

  await AsyncStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updated));
  return updated;
}
