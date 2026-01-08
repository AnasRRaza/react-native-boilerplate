import React, { useCallback, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { Theme } from '@rneui/base';
import { makeStyles, Text, useTheme } from '@rneui/themed';

import Button from '@/components/Button';
import { FONTS } from '@/constants/fonts';
import {
  DEFAULT_CURRENCY,
  MAX_PAYMENT_AMOUNT,
  MIN_PAYMENT_AMOUNT,
} from '@/constants/payment';
import { usePaymentSheet, useSubscriptionSetup } from '@/hooks/payment';
import { PaymentType, PlanInterval } from '@/types/payment';

import PaymentAmountInput from './PaymentAmountInput';
import PaymentTypeTabs from './PaymentTypeTabs';
import SubscriptionPlans from './SubscriptionPlans';

const DEFAULT_AMOUNT = 10;
const ERROR_BG_OPACITY = '15';
const SUCCESS_BG_OPACITY = '15';

const Payment = () => {
  const styles = useStyles();
  const { theme } = useTheme();

  // Payment type state
  const [paymentType, setPaymentType] = useState<PaymentType>('one-time');

  // One-time payment state
  const [amount, setAmount] = useState<string>(DEFAULT_AMOUNT.toString());
  const {
    initializePaymentSheet,
    openPaymentSheet,
    isLoading: isOneTimeLoading,
    isPaymentReady,
    paymentState,
    resetPaymentState,
  } = usePaymentSheet();

  // Subscription state
  const [selectedPlan, setSelectedPlan] = useState<PlanInterval>('monthly');
  const {
    initializeSetupSheet,
    openSetupSheet,
    createSubscription,
    isLoading: isSubscriptionLoading,
    isSetupReady,
    subscriptionState,
    resetSubscriptionState,
  } = useSubscriptionSetup();

  const isLoading = isOneTimeLoading || isSubscriptionLoading;
  const currentError =
    paymentType === 'one-time' ? paymentState.error : subscriptionState.error;
  const isSuccess =
    paymentType === 'one-time'
      ? paymentState.status === 'success'
      : subscriptionState.status === 'success';

  const iconName = useMemo(() => {
    return paymentType === 'one-time' ? 'card-outline' : 'repeat-outline';
  }, [paymentType]);

  // Handle payment type change
  const handlePaymentTypeChange = useCallback(
    (type: PaymentType) => {
      setPaymentType(type);
      resetPaymentState();
      resetSubscriptionState();
    },
    [resetPaymentState, resetSubscriptionState],
  );

  // One-time payment handlers
  const handleAmountChange = useCallback(
    (value: string) => {
      const numericValue = value.replace(/[^0-9.]/g, '');
      setAmount(numericValue);
      resetPaymentState();
    },
    [resetPaymentState],
  );

  const handleInitializeOneTimePayment = useCallback(async () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount < MIN_PAYMENT_AMOUNT) {
      return;
    }
    if (numericAmount > MAX_PAYMENT_AMOUNT) {
      return;
    }
    const amountInCents = Math.round(numericAmount * 100);
    await initializePaymentSheet({
      amount: amountInCents,
      currency: DEFAULT_CURRENCY,
    });
  }, [amount, initializePaymentSheet]);

  const handleProceedOneTimePayment = useCallback(async () => {
    await openPaymentSheet();
  }, [openPaymentSheet]);

  // Subscription handlers
  const handleSelectPlan = useCallback(
    (plan: PlanInterval) => {
      setSelectedPlan(plan);
      resetSubscriptionState();
    },
    [resetSubscriptionState],
  );

  const handleInitializeSubscription = useCallback(async () => {
    await initializeSetupSheet(selectedPlan);
  }, [selectedPlan, initializeSetupSheet]);

  const handleProceedSubscription = useCallback(async () => {
    const result = await openSetupSheet();
    if (result) {
      // SetupIntent completed, payment method saved to customer
      // Now create the subscription using the saved payment method
      await createSubscription(selectedPlan);
    }
  }, [openSetupSheet, createSubscription, selectedPlan]);

  // Validation
  const isValidOneTimeAmount = useCallback(() => {
    const numericAmount = parseFloat(amount);

    return (
      !isNaN(numericAmount) &&
      numericAmount >= MIN_PAYMENT_AMOUNT &&
      numericAmount <= MAX_PAYMENT_AMOUNT
    );
  }, [amount]);

  // Button handlers
  const getButtonTitle = useCallback(() => {
    if (isLoading) {
      return 'Processing...';
    }

    if (paymentType === 'one-time') {
      return isPaymentReady ? 'Pay Now' : 'Initialize Payment';
    }

    return isSetupReady ? 'Subscribe Now' : 'Continue';
  }, [isLoading, paymentType, isPaymentReady, isSetupReady]);

  const handleButtonPress = useCallback(() => {
    if (paymentType === 'one-time') {
      if (isPaymentReady) {
        handleProceedOneTimePayment();
      } else {
        handleInitializeOneTimePayment();
      }
    } else {
      if (isSetupReady) {
        handleProceedSubscription();
      } else {
        handleInitializeSubscription();
      }
    }
  }, [
    paymentType,
    isPaymentReady,
    isSetupReady,
    handleProceedOneTimePayment,
    handleInitializeOneTimePayment,
    handleProceedSubscription,
    handleInitializeSubscription,
  ]);

  const isButtonDisabled = useCallback(() => {
    if (isLoading) {
      return true;
    }
    if (paymentType === 'one-time' && !isValidOneTimeAmount()) {
      return true;
    }

    return false;
  }, [isLoading, paymentType, isValidOneTimeAmount]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled">
      {/* Payment Icon Header */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <IonicIcon name={iconName} size={48} color={theme.colors.primary} />
        </View>
        <Text style={styles.title}>
          {paymentType === 'one-time' ? 'Make a Payment' : 'Subscribe'}
        </Text>
        <Text style={styles.subtitle}>
          {paymentType === 'one-time'
            ? 'Enter the amount you want to pay'
            : 'Choose a plan that works for you'}
        </Text>
      </View>

      {/* Payment Type Tabs */}
      <PaymentTypeTabs
        selectedType={paymentType}
        onSelectType={handlePaymentTypeChange}
      />

      {/* One-time Payment Content */}
      {paymentType === 'one-time' ? (
        <PaymentAmountInput
          value={amount}
          onChangeText={handleAmountChange}
          minAmount={MIN_PAYMENT_AMOUNT}
          maxAmount={MAX_PAYMENT_AMOUNT}
        />
      ) : null}

      {/* Subscription Content */}
      {paymentType === 'subscription' ? (
        <SubscriptionPlans
          selectedPlan={selectedPlan}
          onSelectPlan={handleSelectPlan}
        />
      ) : null}

      {/* Error Message */}
      {currentError ? (
        <View style={styles.errorContainer}>
          <IonicIcon
            name="alert-circle-outline"
            size={20}
            color={theme.colors.error}
          />
          <Text style={styles.errorText}>{currentError}</Text>
        </View>
      ) : null}

      {/* Success Message */}
      {isSuccess ? (
        <View style={styles.successContainer}>
          <IonicIcon
            name="checkmark-circle-outline"
            size={20}
            color={theme.colors.success}
          />
          <Text style={styles.successText}>
            {paymentType === 'one-time'
              ? 'Payment completed successfully!'
              : 'Subscription activated successfully!'}
          </Text>
        </View>
      ) : null}

      {/* Action Button */}
      <Button
        title={getButtonTitle()}
        onPress={handleButtonPress}
        loading={isLoading}
        disabled={isButtonDisabled()}
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
    paddingVertical: verticalScale(24),
  },
  iconContainer: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(40),
    backgroundColor: theme.colors.grey5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(12),
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: '600',
    fontFamily: FONTS.INTER,
    color: theme.colors.foreground,
    marginBottom: verticalScale(6),
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
    backgroundColor: `${theme.colors.error}${ERROR_BG_OPACITY}`,
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
    backgroundColor: `${theme.colors.success}${SUCCESS_BG_OPACITY}`,
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
