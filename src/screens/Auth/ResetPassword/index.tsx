import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Theme } from '@rneui/base';
import { makeStyles, Text } from '@rneui/themed';
import * as Yup from 'yup';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { RESET_PASSWORD_FORM_FIELDS } from '@/constants/auth';
import { COLORS } from '@/constants/colors';
import { resetPasswordValidationSchema } from '@/utils/validationSchema';

type TResetPasswordForm = Yup.InferType<typeof resetPasswordValidationSchema>;

const ResetPassword = () => {
  const styles = useStyles();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TResetPasswordForm>({
    mode: 'onSubmit',
    resolver: yupResolver(resetPasswordValidationSchema),
    defaultValues: {
      password: '',
      confirm_password: '',
    },
  });

  const onSubmit: SubmitHandler<TResetPasswordForm> = data => {
    console.log(data);
    // TODO: Forgot Password API call
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.description}>Please enter your new password.</Text>
      {RESET_PASSWORD_FORM_FIELDS.map(_field => (
        <Controller
          key={_field.name}
          control={control}
          name={_field.name as keyof TResetPasswordForm}
          render={({ field }) => (
            <Input
              key={field.name}
              label={_field.label}
              placeholder={_field.placeholder}
              secureTextEntry={_field.secureTextEntry}
              onChangeText={field.onChange}
              errorMessage={errors?.[field.name]?.message}
              autoCapitalize="none"
              leftIcon={
                <Icon name={_field.leftIcon} size={22} color={COLORS.primary} />
              }
              {...field}
            />
          )}
        />
      ))}
      <View style={styles.buttonContainer}>
        <Button title="Confirm" isShadow onPress={handleSubmit(onSubmit)} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ResetPassword;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: verticalScale(30),
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: '500',
    color: theme.colors.foreground,
  },
  description: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: theme.colors.grey2,
    marginTop: verticalScale(10),
    marginBottom: verticalScale(24),
  },
  buttonContainer: {
    marginTop: verticalScale(10),
  },
}));
