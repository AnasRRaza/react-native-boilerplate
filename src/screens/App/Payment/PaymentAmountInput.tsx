import React, { memo, useCallback, useMemo } from 'react';
import { TextInput, View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Theme } from '@rneui/base';
import { makeStyles, Text, useTheme } from '@rneui/themed';

import { FONTS } from '@/constants/fonts';

interface PaymentAmountInputProps {
  value: string;
  onChangeText: (value: string) => void;
  minAmount: number;
  maxAmount: number;
}

const PaymentAmountInput = ({
  value,
  onChangeText,
  minAmount,
  maxAmount,
}: PaymentAmountInputProps) => {
  const styles = useStyles();
  const { theme } = useTheme();

  const isValidAmount = useMemo(() => {
    const numericValue = parseFloat(value);

    return (
      !isNaN(numericValue) &&
      numericValue >= minAmount &&
      numericValue <= maxAmount
    );
  }, [value, minAmount, maxAmount]);

  const errorMessage = useMemo(() => {
    const numericValue = parseFloat(value);
    if (value === '') {
      return null;
    }
    if (isNaN(numericValue)) {
      return 'Please enter a valid amount';
    }
    if (numericValue < minAmount) {
      return `Minimum amount is $${minAmount}`;
    }
    if (numericValue > maxAmount) {
      return `Maximum amount is $${maxAmount.toLocaleString()}`;
    }

    return null;
  }, [value, minAmount, maxAmount]);

  const handleChangeText = useCallback(
    (text: string) => {
      onChangeText(text);
    },
    [onChangeText],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Payment Amount</Text>
      <View
        style={[
          styles.inputContainer,
          !isValidAmount && value !== '' ? styles.inputContainerError : null,
        ]}>
        <Text style={styles.currencySymbol}>$</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={handleChangeText}
          keyboardType="decimal-pad"
          placeholder="0.00"
          placeholderTextColor={theme.colors.grey3}
          maxLength={10}
        />
        <Text style={styles.currencyCode}>USD</Text>
      </View>
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <Text style={styles.hint}>
        Enter amount between ${minAmount} - ${maxAmount.toLocaleString()}
      </Text>
    </View>
  );
};

export default memo(PaymentAmountInput);

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginBottom: verticalScale(16),
  },
  label: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    fontFamily: FONTS.INTER,
    color: theme.colors.foreground,
    marginBottom: verticalScale(8),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.grey5,
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(16),
    height: verticalScale(56),
    borderWidth: 1,
    borderColor: theme.colors.grey4,
  },
  inputContainerError: {
    borderColor: theme.colors.error,
  },
  currencySymbol: {
    fontSize: moderateScale(24),
    fontWeight: '600',
    fontFamily: FONTS.INTER,
    color: theme.colors.foreground,
    marginRight: moderateScale(4),
  },
  input: {
    flex: 1,
    fontSize: moderateScale(24),
    fontWeight: '500',
    fontFamily: FONTS.INTER,
    color: theme.colors.foreground,
    padding: 0,
  },
  currencyCode: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    fontFamily: FONTS.INTER,
    color: theme.colors.grey2,
    marginLeft: moderateScale(8),
  },
  errorMessage: {
    fontSize: moderateScale(12),
    fontFamily: FONTS.INTER,
    color: theme.colors.error,
    marginTop: verticalScale(4),
  },
  hint: {
    fontSize: moderateScale(12),
    fontFamily: FONTS.INTER,
    color: theme.colors.grey2,
    marginTop: verticalScale(8),
  },
}));
