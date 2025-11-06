import React, { useCallback, useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Theme } from '@rneui/base';
import {
  Avatar,
  Icon,
  ListItem,
  makeStyles,
  Switch,
  Text,
  useTheme,
} from '@rneui/themed';

import Button from '@/components/Button';
import Dropdown from '@/components/Dropdown';
import { LANGUAGES } from '@/constants/onboarding';
import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';
import { Language } from '@/types/common';
import { APP_ROUTES } from '@/types/routes';

const Profile = () => {
  const { user, setUser, logout } = useAuthStore();
  const { mode: themeMode, toggleMode } = useThemeStore();
  const navigation = useNavigation();
  const styles = useStyles();
  const { theme } = useTheme();

  // Menu items for Account Settings
  const accountMenuItems = useMemo(
    () => [
      {
        title: 'Edit Profile',
        icon: 'person-outline',
        navigateTo: APP_ROUTES.EDIT_PROFILE,
      },
      {
        title: 'Change Password',
        icon: 'lock-outline',
        navigateTo: APP_ROUTES.CHANGE_PASSWORD,
      },
    ],
    [navigation],
  );

  // Handle language change
  const handleLanguageChange = useCallback(
    (value: string) => {
      if (!user) return;
      const updatedUser = {
        ...user,
        preferredLanguage: value as Language,
      };
      setUser(updatedUser);
    },
    [user, setUser],
  );

  // Handle logout
  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Avatar
          size={100}
          rounded
          source={
            user?.profilePicture?.path
              ? { uri: user.profilePicture.path }
              : undefined
          }
          title={
            user?.profilePicture?.path
              ? undefined
              : user?.fullName?.charAt(0)?.toUpperCase() || 'U'
          }
          containerStyle={styles.avatar}
          imageProps={{
            resizeMode: 'cover',
          }}
        />
        <Text style={styles.name}>{user?.fullName || 'User'}</Text>
        <Text style={styles.email}>{user?.email || 'email@example.com'}</Text>
      </View>

      {/* Account Settings Section */}
      <Text style={styles.sectionTitle}>Account Settings</Text>
      {accountMenuItems.map(item => (
        <ListItem
          key={item.navigateTo}
          bottomDivider
          onPress={() => navigation.navigate(item.navigateTo as never)}>
          <Icon name={item.icon} type="ionicons" color={theme.colors.primary} />
          <ListItem.Content>
            <ListItem.Title>{item.title}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))}

      {/* App Settings Section */}
      <Text style={styles.sectionTitle}>App Settings</Text>

      {/* Dark Mode Toggle */}
      <ListItem bottomDivider>
        <IonicIcon
          name={themeMode === 'dark' ? 'moon-outline' : 'sunny-outline'}
          size={22}
          color={theme.colors.primary}
        />
        <ListItem.Content>
          <ListItem.Title>Dark Mode</ListItem.Title>
        </ListItem.Content>
        <Switch
          value={themeMode === 'dark'}
          onValueChange={toggleMode}
          color={theme.colors.primary}
        />
      </ListItem>

      {/* Language Section */}
      <Text style={styles.sectionTitle}>Language</Text>
      <View style={styles.dropdownContainer}>
        <Dropdown
          label="Language"
          data={LANGUAGES}
          value={user?.preferredLanguage || ''}
          onChange={item => handleLanguageChange(item.value)}
          labelField="label"
          valueField="value"
          placeholder="Select language"
          renderLeftIcon={() => (
            <IonicIcon
              name="language-outline"
              size={22}
              color={theme.colors.primary}
              style={styles.leftIcon}
            />
          )}
        />
      </View>

      {/* Logout Button */}
      <View style={styles.logoutButtonContainer}>
        <Button
          title="Logout"
          onPress={handleLogout}
          type="outline"
          buttonStyle={styles.logoutButton}
          containerStyle={styles.logoutButtonWrapper}
        />
      </View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
};

export default Profile;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    paddingBottom: verticalScale(40),
  },
  header: {
    alignItems: 'center',
    paddingVertical: verticalScale(30),
    paddingHorizontal: moderateScale(20),
    backgroundColor: theme.colors.background,
  },
  avatar: {
    backgroundColor: theme.colors.primary,
    marginBottom: verticalScale(15),
  },
  name: {
    fontSize: moderateScale(24),
    fontWeight: '600',
    color: theme.colors.foreground,
    marginTop: verticalScale(10),
  },
  email: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: theme.colors.grey2,
    marginTop: verticalScale(5),
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: theme.colors.foreground,
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
    paddingHorizontal: moderateScale(20),
  },
  dropdownContainer: {
    paddingHorizontal: moderateScale(20),
    marginBottom: verticalScale(10),
  },
  leftIcon: {
    marginRight: moderateScale(10),
  },
  logoutButtonContainer: {
    paddingHorizontal: moderateScale(20),
    marginTop: verticalScale(30),
  },
  logoutButtonWrapper: {
    borderBottomWidth: 0,
  },
  logoutButton: {
    borderColor: theme.colors.error,
  },
  bottomSpacer: {
    height: verticalScale(40),
  },
}));
