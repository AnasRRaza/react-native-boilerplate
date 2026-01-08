import React, { useCallback, useMemo } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Theme } from '@rneui/base';
import { Avatar, makeStyles, Switch, Text, useTheme } from '@rneui/themed';

import Button from '@/components/Button';
import Dropdown from '@/components/Dropdown';
import { FONTS } from '@/constants/fonts';
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
        icon: 'lock-closed-outline',
        navigateTo: APP_ROUTES.CHANGE_PASSWORD,
      },
      {
        title: 'Payment',
        icon: 'card-outline',
        navigateTo: APP_ROUTES.PAYMENT,
      },
    ],
    [],
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
        <TouchableOpacity
          key={item.navigateTo}
          style={styles.listItem}
          onPress={() => navigation.navigate(item.navigateTo as never)}
          activeOpacity={0.7}>
          <IonicIcon
            name={item.icon}
            size={22}
            color={theme.colors.primary}
            style={styles.listItemIcon}
          />
          <View style={styles.listItemContent}>
            <Text style={styles.listItemTitle}>{item.title}</Text>
          </View>
          <IonicIcon
            name="chevron-forward"
            size={20}
            color={theme.colors.grey3}
          />
        </TouchableOpacity>
      ))}

      {/* App Settings Section */}
      <Text style={styles.sectionTitle}>App Settings</Text>

      {/* Dark Mode Toggle */}
      <View style={styles.listItem}>
        <IonicIcon
          name={themeMode === 'dark' ? 'moon-outline' : 'sunny-outline'}
          size={22}
          color={theme.colors.primary}
          style={styles.listItemIcon}
        />
        <View style={styles.listItemContent}>
          <Text style={styles.listItemTitle}>Dark Mode</Text>
        </View>
        <Switch
          value={themeMode === 'dark'}
          onValueChange={toggleMode}
          color={theme.colors.primary}
        />
      </View>

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
      <Button
        title="Logout"
        onPress={handleLogout}
        type="outline"
        buttonStyle={styles.logoutButton}
      />

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
};

export default Profile;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.lg,
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
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(16),
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey4,
  },
  listItemIcon: {
    marginRight: moderateScale(16),
  },
  listItemContent: {
    flex: 1,
  },
  listItemTitle: {
    fontFamily: FONTS.INTER,
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: theme.colors.foreground,
  },
  dropdownContainer: {
    marginBottom: verticalScale(10),
  },
  leftIcon: {
    marginRight: moderateScale(10),
  },
  // logoutButtonContainer: {
  //   marginTop: verticalScale(30),
  // },
  logoutButton: {
    borderColor: theme.colors.error,
  },
  bottomSpacer: {
    height: verticalScale(40),
  },
}));
