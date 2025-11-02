import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Theme } from '@rneui/base';
import { makeStyles, Text } from '@rneui/themed';
import * as Yup from 'yup';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { COLORS } from '@/constants/colors';
import { useForgotPassword } from '@/hooks/auth';
import { OTP_TYPE } from '@/types/common';
import { AUTH_ROUTES, AuthStackNavigatorParamList } from '@/types/routes';
import { useToastNotification } from '@/utils';
import { forgotPasswordSchema } from '@/utils/validationSchemas';

type TForgotPasswordForm = Yup.InferType<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TForgotPasswordForm>({
    mode: 'onSubmit',
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const styles = useStyles();
  const toast = useToastNotification();
  const navigation =
    useNavigation<NavigationProp<AuthStackNavigatorParamList>>();
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const onSubmit: SubmitHandler<TForgotPasswordForm> = data => {
    forgotPassword(data, {
      onSuccess: _data => {
        toast(_data.message, 'success');
        navigation.navigate(AUTH_ROUTES.OTP, {
          email: data.email,
          otpType: OTP_TYPE.FORGOT_PASSWORD,
        });
      },
      onError: error => {
        toast(error.message, 'error');
      },
    });
  };

  const handleBackToLogin = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.description}>
        Please enter your email to recover your password.
      </Text>
      <Controller
        control={control}
        name={'email' as keyof TForgotPasswordForm}
        render={({ field }) => (
          <Input
            label={'Email Address'}
            placeholder={'Enter your email address'}
            onChangeText={field.onChange}
            errorMessage={errors?.[field.name]?.message}
            autoCapitalize="none"
            leftIcon={
              <Icon name={'mail-outline'} size={22} color={COLORS.primary} />
            }
            {...field}
          />
        )}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Get Verification Code"
          onPress={handleSubmit(onSubmit)}
          loading={isPending}
        />
      </View>
      <Text style={styles.backToLogin} onPress={handleBackToLogin}>
        Back to Login
      </Text>
    </View>
  );
};

export default ForgotPassword;

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
  backToLogin: {
    marginTop: verticalScale(24),
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: theme.colors.primary,
    textAlign: 'center',
  },
}));
