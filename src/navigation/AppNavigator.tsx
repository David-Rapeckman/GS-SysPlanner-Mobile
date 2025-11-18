import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useAuth } from '../contexts/AuthContext';

import SplashScreen from '../screens/Auth/SplashScreen';
import SignInScreen from '../screens/Auth/SignInScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import EditProfileScreen from '../screens/Profile/EditProfileScreen';
import ChangePhotoScreen from '../screens/Profile/ChangePhotoScreen';
import AboutAppScreen from '../screens/Settings/AboutAppScreen';
import HelpCenterScreen from '../screens/Settings/HelpCenterScreen';
import TermsScreen from '../screens/Settings/TermsScreen';
import { TabNavigator } from './TabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="ChangePhoto" component={ChangePhotoScreen} />
          <Stack.Screen name="AboutApp" component={AboutAppScreen} />
          <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
          <Stack.Screen name="Terms" component={TermsScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Signin" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
