import React, { useCallback, useMemo } from 'react';
import { Controller, Resolver, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { Theme } from '@rneui/base';
import { makeStyles, Text, useTheme } from '@rneui/themed';
import * as Yup from 'yup';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { useToastNotification } from '@/utils/toast';
import { changePasswordSchema } from '@/utils/validationSchemas';

type TChangePasswordForm = Yup.InferType<typeof changePasswordSchema>;

const ChangePassword = () => {
  const navigation = useNavigation();
  const toast = useToastNotification();
  const { theme } = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TChangePasswordForm>({
    mode: 'onSubmit',
    resolver: yupResolver(
      changePasswordSchema,
    ) as Resolver<TChangePasswordForm>,
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const styles = useStyles();

  // Password field configurations
  const passwordFields = useMemo(
    () => [
      {
        name: 'currentPassword' as const,
        label: 'Current Password',
        placeholder: 'Enter your current password',
        icon: 'lock-closed-outline',
      },
      {
        name: 'newPassword' as const,
        label: 'New Password',
        placeholder: 'Enter your new password',
        icon: 'lock-closed-outline',
      },
      {
        name: 'confirmNewPassword' as const,
        label: 'Confirm New Password',
        placeholder: 'Confirm your new password',
        icon: 'lock-closed-outline',
      },
    ],
    [],
  );

  const onSubmit = useCallback(
    (data: TChangePasswordForm) => {
      // TODO: Implement API call when endpoint is available
      // For now, just show success message
      console.log('Change password data:', {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      toast('Password updated successfully!', 'success');
      navigation.goBack();
    },
    [toast, navigation],
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      <Text style={styles.description}>
        Enter your current password and choose a new password
      </Text>

      {/* Password Fields */}
      {passwordFields.map(_field => (
        <Controller
          key={_field.name}
          control={control}
          name={_field.name}
          render={({ field }) => (
            <Input
              label={_field.label}
              placeholder={_field.placeholder}
              secureTextEntry
              value={field.value}
              onChangeText={field.onChange}
              errorMessage={errors?.[_field.name]?.message as string}
              autoCapitalize="none"
              leftIcon={
                <Icon
                  name={_field.icon}
                  size={22}
                  color={theme.colors.primary}
                />
              }
            />
          )}
        />
      ))}

      {/* Update Button */}
      <View style={styles.buttonContainer}>
        <Button title="Update Password" onPress={handleSubmit(onSubmit)} />
      </View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
};

export default ChangePassword;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: verticalScale(10),
  },
  contentContainer: {
    paddingBottom: verticalScale(40),
  },
  description: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: theme.colors.grey2,
    marginTop: verticalScale(10),
    marginBottom: verticalScale(24),
  },
  requirementsContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: moderateScale(8),
    padding: moderateScale(16),
    marginBottom: verticalScale(16),
    borderWidth: 1,
    borderColor: theme.colors.grey5,
  },
  requirementsTitle: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: theme.colors.foreground,
    marginBottom: verticalScale(8),
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(6),
  },
  requirementIcon: {
    marginRight: moderateScale(8),
  },
  requirementText: {
    fontSize: moderateScale(14),
    fontWeight: '400',
    color: theme.colors.grey2,
  },
  requirementTextMet: {
    color: theme.colors.primary,
    fontWeight: '500',
  },
  buttonContainer: {
    marginTop: verticalScale(16),
  },
  bottomSpacer: {
    height: verticalScale(40),
  },
}));
