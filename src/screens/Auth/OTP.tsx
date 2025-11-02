import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Theme } from '@rneui/base';
import { makeStyles, Text } from '@rneui/themed';

import Button from '@/components/Button';
import { COLORS } from '@/constants/colors';
import { useResendOTP, useVerifyOTP } from '@/hooks/auth';
import { useCounter } from '@/hooks/useCounter';
import { OTP_TYPE } from '@/types/common';
import { AUTH_ROUTES, AuthStackNavigatorParamList } from '@/types/routes';
import { useToastNotification } from '@/utils';

interface Props
  extends NativeStackScreenProps<
    AuthStackNavigatorParamList,
    AUTH_ROUTES.OTP
  > {}

const OTP: React.FC<Props> = ({ route }) => {
  const { email, otpType } = route.params;
  const [otp, setOtp] = useState('');

  const styles = useStyles();
  const navigation =
    useNavigation<NavigationProp<AuthStackNavigatorParamList>>();
  const { mutate: verifyOTP, isPending } = useVerifyOTP();
  const { mutate: resendOTP, isPending: isResendOTPPending } = useResendOTP();
  const { counter, resetCounter } = useCounter(0.5);
  const toast = useToastNotification();

  const onSubmit = () => {
    verifyOTP(
      { email, otp, otpType },
      {
        onSuccess: _data => {
          toast(_data.message, 'success');
          if (otpType === OTP_TYPE.FORGOT_PASSWORD) {
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: AUTH_ROUTES.RESET_PASSWORD,
                  params: { email, token: _data.data },
                },
              ],
            });
          } else {
            navigation.reset({
              index: 0,
              routes: [{ name: AUTH_ROUTES.SIGNIN }],
            });
          }
        },
        onError: error => {
          toast(error.message, 'error');
        },
      },
    );
  };

  const onResendOTP = () => {
    resendOTP(
      { email, otpType },
      {
        onSuccess: _data => {
          toast(_data.message, 'success');
          resetCounter();
        },
        onError: error => {
          toast(error.message, 'error');
        },
      },
    );
  };

  return (
    <View style={styles.container}>
      <Icon
        name="chevron-back-outline"
        size={32}
        color={COLORS.black}
        style={styles.backIcon}
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.description}>
        Enter the 6-digit OTP that we have sent on your email address to reset
        password.
      </Text>
      <Text style={styles.label}>6-digit OTP</Text>
      <OtpInput
        numberOfDigits={6}
        focusColor={COLORS.primary}
        focusStickBlinkingDuration={500}
        onTextChange={setOtp}
        textInputProps={{
          accessibilityLabel: 'One-Time Password',
        }}
        theme={{
          pinCodeContainerStyle: styles.pinCodeContainer,
          pinCodeTextStyle: styles.pinCodeText,
          focusStickStyle: styles.focusStick,
        }}
      />
      <View style={styles.buttonContainer}>
        <Button
          disabled={otp.length !== 6}
          title="Verify"
          onPress={onSubmit}
          loading={isPending}
        />
      </View>
      <Text style={styles.resendOtp}>
        Didn’t receive an OTP yet?{' '}
        <TouchableOpacity
          onPress={onResendOTP}
          disabled={counter > 0 || isResendOTPPending}>
          <Text style={styles.counter}>
            {counter > 0 ? `00:${counter}` : 'Resend OTP'}
          </Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

export default OTP;

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
  pinCodeContainer: {
    borderWidth: 0.2,
    borderColor: theme.colors.grey4,
    backgroundColor: theme.colors.background,
    borderRadius: moderateScale(6),
    height: moderateScale(50),
    width: moderateScale(50),
  },
  pinCodeText: {
    fontSize: moderateScale(22),
    color: theme.colors.primary,
  },
  focusStick: {
    backgroundColor: theme.colors.primary,
  },
  buttonContainer: {
    marginTop: verticalScale(30),
  },
  label: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: theme.colors.grey3,
    marginVertical: verticalScale(16),
  },
  backIcon: {
    marginBottom: verticalScale(10),
    marginLeft: moderateScale(-8),
  },
  resendOtp: {
    marginTop: verticalScale(24),
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: theme.colors.grey3,
    textAlign: 'center',
  },
  counter: {
    color: theme.colors.primary,
    fontSize: moderateScale(16),
    marginBottom: verticalScale(-4),
  },
}));
