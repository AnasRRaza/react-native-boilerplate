import React, { useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { Theme } from '@rneui/base';
import { makeStyles, Text, useTheme } from '@rneui/themed';

import Button from '@/components/Button';
import { FONTS } from '@/constants/fonts';
import { usePaymentSheet } from '@/hooks/payment';

import PaymentAmountInput from './PaymentAmountInput';

const DEFAULT_AMOUNT = 10;
const MIN_AMOUNT = 1;
const MAX_AMOUNT = 10000;

const Payment = () => {
  const styles = useStyles();
  const { theme } = useTheme();
  const [amount, setAmount] = useState<string>(DEFAULT_AMOUNT.toString());
  const {
    initializePaymentSheet,
    openPaymentSheet,
    isLoading,
    isPaymentReady,
    paymentState,
    resetPaymentState,
  } = usePaymentSheet();

  const handleAmountChange = useCallback(
    (value: string) => {
      const numericValue = value.replace(/[^0-9.]/g, '');
      setAmount(numericValue);
      resetPaymentState();
    },
    [resetPaymentState],
  );

  const handleInitializePayment = useCallback(async () => {
    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount) || numericAmount < MIN_AMOUNT) {
      return;
    }

    if (numericAmount > MAX_AMOUNT) {
      return;
    }

    // Convert to cents for Stripe
    const amountInCents = Math.round(numericAmount * 100);
    await initializePaymentSheet({ amount: amountInCents, currency: 'usd' });
  }, [amount, initializePaymentSheet]);

  const handleProceedToPayment = useCallback(async () => {
    await openPaymentSheet();
  }, [openPaymentSheet]);

  const getButtonTitle = useCallback(() => {
    if (isLoading) {
      return 'Processing...';
    }
    if (isPaymentReady) {
      return 'Proceed to Pay';
    }

    return 'Initialize Payment';
  }, [isLoading, isPaymentReady]);

  const handleButtonPress = useCallback(() => {
    if (isPaymentReady) {
      handleProceedToPayment();
    } else {
      handleInitializePayment();
    }
  }, [isPaymentReady, handleProceedToPayment, handleInitializePayment]);

  const isValidAmount = useCallback(() => {
    const numericAmount = parseFloat(amount);

    return (
      !isNaN(numericAmount) &&
      numericAmount >= MIN_AMOUNT &&
      numericAmount <= MAX_AMOUNT
    );
  }, [amount]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled">
      {/* Payment Icon Header */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <IonicIcon
            name="card-outline"
            size={48}
            color={theme.colors.primary}
          />
        </View>
        <Text style={styles.title}>Make a Payment</Text>
        <Text style={styles.subtitle}>
          Enter the amount you want to pay and proceed to checkout
        </Text>
      </View>

      {/* Amount Input Section */}
      <PaymentAmountInput
        value={amount}
        onChangeText={handleAmountChange}
        minAmount={MIN_AMOUNT}
        maxAmount={MAX_AMOUNT}
      />

      {/* Payment Status */}
      {paymentState.error ? (
        <View style={styles.errorContainer}>
          <IonicIcon
            name="alert-circle-outline"
            size={20}
            color={theme.colors.error}
          />
          <Text style={styles.errorText}>{paymentState.error}</Text>
        </View>
      ) : null}

      {paymentState.status === 'success' ? (
        <View style={styles.successContainer}>
          <IonicIcon
            name="checkmark-circle-outline"
            size={20}
            color={theme.colors.success}
          />
          <Text style={styles.successText}>
            Payment completed successfully!
          </Text>
        </View>
      ) : null}

      {/* Payment Button */}
      <Button
        title={getButtonTitle()}
        onPress={handleButtonPress}
        loading={isLoading}
        disabled={isLoading || !isValidAmount()}
        buttonStyle={styles.payButton}
        containerStyle={styles.buttonContainer}
      />

      {/* Security Info */}
      <View style={styles.securityInfo}>
        <IonicIcon
          name="shield-checkmark-outline"
          size={16}
          color={theme.colors.grey2}
        />
        <Text style={styles.securityText}>
          Secured by Stripe. Your payment information is encrypted.
        </Text>
      </View>
    </ScrollView>
  );
};

export default Payment;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: verticalScale(40),
  },
  header: {
    alignItems: 'center',
    paddingVertical: verticalScale(30),
  },
  iconContainer: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(40),
    backgroundColor: theme.colors.grey5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(16),
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: '600',
    fontFamily: FONTS.INTER,
    color: theme.colors.foreground,
    marginBottom: verticalScale(8),
  },
  subtitle: {
    fontSize: moderateScale(14),
    fontFamily: FONTS.INTER,
    color: theme.colors.grey2,
    textAlign: 'center',
    paddingHorizontal: moderateScale(20),
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${theme.colors.error}15`,
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(16),
  },
  errorText: {
    fontSize: moderateScale(14),
    fontFamily: FONTS.INTER,
    color: theme.colors.error,
    marginLeft: moderateScale(8),
    flex: 1,
  },
  successContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${theme.colors.success}15`,
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(16),
  },
  successText: {
    fontSize: moderateScale(14),
    fontFamily: FONTS.INTER,
    color: theme.colors.success,
    marginLeft: moderateScale(8),
    flex: 1,
  },
  payButton: {
    height: verticalScale(50),
    borderRadius: moderateScale(12),
  },
  buttonContainer: {
    marginTop: verticalScale(8),
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(24),
    paddingHorizontal: moderateScale(20),
  },
  securityText: {
    fontSize: moderateScale(12),
    fontFamily: FONTS.INTER,
    color: theme.colors.grey2,
    marginLeft: moderateScale(6),
    textAlign: 'center',
  },
}));
