import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { makeStyles, useTheme } from '@rneui/themed';

interface OTPInputProps {
  value: string;
  onChange: (otp: string) => void;
  errorMessage?: string;
  numberOfDigits?: number;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  onChange,
  errorMessage,
  numberOfDigits = 6,
}) => {
  const styles = useStyles();
  const { theme } = useTheme();

  const pinCodeContainerStyle = useMemo(() => {
    return errorMessage
      ? StyleSheet.flatten([
          styles.pinCodeContainer,
          styles.pinCodeContainerError,
        ])
      : styles.pinCodeContainer;
  }, [errorMessage, styles.pinCodeContainer, styles.pinCodeContainerError]);

  return (
    <View style={styles.container}>
      <OtpInput
        numberOfDigits={numberOfDigits}
        focusColor={theme.colors.primary}
        focusStickBlinkingDuration={500}
        onTextChange={onChange}
        textInputProps={{
          accessibilityLabel: 'One-Time Password',
        }}
        theme={{
          pinCodeContainerStyle,
          pinCodeTextStyle: styles.pinCodeText,
          focusStickStyle: styles.focusStick,
        }}
      />
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
  },
  pinCodeContainer: {
    borderWidth: 0.2,
    borderColor: theme.colors.grey4,
    backgroundColor: 'transparent',
    borderRadius: moderateScale(6),
    width: moderateScale(50),
    height: verticalScale(50),
  },
  pinCodeContainerError: {
    borderColor: theme.colors.error,
    borderWidth: 1,
  },
  pinCodeText: {
    fontSize: moderateScale(22),
    color: theme.colors.primary,
    fontWeight: '600',
  },
  focusStick: {
    backgroundColor: theme.colors.primary,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: moderateScale(12),
    marginTop: verticalScale(8),
    marginLeft: moderateScale(4),
  },
}));

export default OTPInput;
