import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Theme } from '@rneui/base';
import { makeStyles, Text } from '@rneui/themed';
import * as Yup from 'yup';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { RESET_PASSWORD_FORM_FIELDS } from '@/constants/auth';
import { COLORS } from '@/constants/colors';
import { useResetPassword } from '@/hooks/auth';
import { AUTH_ROUTES, AuthStackNavigatorParamList } from '@/types/routes';
import { useToastNotification } from '@/utils';
import { resetPasswordSchema } from '@/utils/validationSchemas';

type TResetPasswordForm = Yup.InferType<typeof resetPasswordSchema>;

interface Props
  extends NativeStackScreenProps<
    AuthStackNavigatorParamList,
    AUTH_ROUTES.RESET_PASSWORD
  > {}

const ResetPassword: React.FC<Props> = ({ route }) => {
  const { email, token } = route.params;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TResetPasswordForm>({
    mode: 'onSubmit',
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirm_password: '',
    },
  });

  const styles = useStyles();
  const toast = useToastNotification();
  const { mutate: resetPassword, isPending } = useResetPassword();
  const navigation =
    useNavigation<NavigationProp<AuthStackNavigatorParamList>>();

  const onSubmit: SubmitHandler<TResetPasswordForm> = data => {
    const payload = {
      email,
      token,
      password: data.password,
    };
    resetPassword(payload, {
      onSuccess: _data => {
        toast(_data.message, 'success');
        navigation.navigate(AUTH_ROUTES.SIGNIN);
      },
      onError: error => {
        toast(error.message, 'error');
      },
    });
  };

  return (
    <View style={styles.container}>
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
        <Button
          title="Confirm"
          onPress={handleSubmit(onSubmit)}
          loading={isPending}
        />
      </View>
    </View>
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
