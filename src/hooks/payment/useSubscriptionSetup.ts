import { useCallback, useState } from 'react';
import { useStripe } from '@stripe/stripe-react-native';

import apiClient from '@/api/client';
import { PAYMENT_ENDPOINTS } from '@/api/endpoints';
import {
  CreateSetupIntentPayload,
  CreateSubscriptionPayload,
  PlanInterval,
  SetupIntentResponse,
  SubscriptionResponse,
  SubscriptionState,
} from '@/types/payment';
import { useToastNotification } from '@/utils/toast';

const INITIAL_STATE: SubscriptionState = {
  status: 'idle',
  error: null,
  isSetupReady: false,
  paymentMethodId: null,
};

export const useSubscriptionSetup = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [subscriptionState, setSubscriptionState] =
    useState<SubscriptionState>(INITIAL_STATE);
  const showToast = useToastNotification();

  const fetchSetupIntentParams = useCallback(
    async (
      payload: CreateSetupIntentPayload,
    ): Promise<SetupIntentResponse | null> => {
      try {
        const response = await apiClient.post<{ data: SetupIntentResponse }>(
          PAYMENT_ENDPOINTS.SETUP_INTENT,
          payload,
        );

        return response.data.data;
      } catch (error) {
        const errorMessage =
          (error as { message?: string })?.message ||
          'Failed to fetch setup intent';
        throw new Error(errorMessage);
      }
    },
    [],
  );

  const initializeSetupSheet = useCallback(
    async (planInterval: PlanInterval): Promise<boolean> => {
      setSubscriptionState(prev => ({
        ...prev,
        status: 'loading',
        error: null,
      }));

      try {
        const params = await fetchSetupIntentParams({ planInterval });

        if (!params) {
          throw new Error('Failed to get setup parameters');
        }

        const { error } = await initPaymentSheet({
          merchantDisplayName: 'Your App Name',
          customerId: params.customer,
          customerEphemeralKeySecret: params.ephemeralKey,
          setupIntentClientSecret: params.setupIntent,
          allowsDelayedPaymentMethods: true,
          defaultBillingDetails: {
            name: '',
          },
        });

        if (error) {
          throw new Error(error.message);
        }

        setSubscriptionState({
          status: 'idle',
          error: null,
          isSetupReady: true,
          paymentMethodId: null,
        });

        return true;
      } catch (error) {
        const errorMessage =
          (error as Error)?.message || 'Failed to initialize setup';
        setSubscriptionState({
          status: 'error',
          error: errorMessage,
          isSetupReady: false,
          paymentMethodId: null,
        });

        return false;
      }
    },
    [fetchSetupIntentParams, initPaymentSheet],
  );

  const openSetupSheet = useCallback(async (): Promise<string | null> => {
    if (!subscriptionState.isSetupReady) {
      showToast('Setup sheet is not ready', 'error');

      return null;
    }

    setSubscriptionState(prev => ({ ...prev, status: 'loading' }));

    const { error, paymentOption } = await presentPaymentSheet();

    if (error) {
      setSubscriptionState(prev => ({
        ...prev,
        status: 'error',
        error: error.message,
      }));
      showToast(error.message, 'error');

      return null;
    }

    // Payment method saved successfully
    setSubscriptionState(prev => ({
      ...prev,
      status: 'success',
      isSetupReady: false,
    }));

    return paymentOption?.label || 'Card saved';
  }, [subscriptionState.isSetupReady, presentPaymentSheet, showToast]);

  const createSubscription = useCallback(
    async (
      planInterval: PlanInterval,
    ): Promise<SubscriptionResponse | null> => {
      setSubscriptionState(prev => ({ ...prev, status: 'loading' }));

      try {
        const payload: CreateSubscriptionPayload = {
          planInterval,
        };

        const response = await apiClient.post<{ data: SubscriptionResponse }>(
          PAYMENT_ENDPOINTS.SUBSCRIBE_MOBILE,
          payload,
        );

        setSubscriptionState({
          status: 'success',
          error: null,
          isSetupReady: false,
          paymentMethodId: null,
        });

        showToast('Your subscription is now active!', 'success');

        return response.data.data;
      } catch (error) {
        const errorMessage =
          (error as { message?: string })?.message ||
          'Failed to create subscription';
        setSubscriptionState(prev => ({
          ...prev,
          status: 'error',
          error: errorMessage,
        }));
        showToast(errorMessage, 'error');

        return null;
      }
    },
    [showToast],
  );

  const resetSubscriptionState = useCallback(() => {
    setSubscriptionState(INITIAL_STATE);
  }, []);

  return {
    subscriptionState,
    initializeSetupSheet,
    openSetupSheet,
    createSubscription,
    resetSubscriptionState,
    isLoading: subscriptionState.status === 'loading',
    isSetupReady: subscriptionState.isSetupReady,
  };
};

export default useSubscriptionSetup;
