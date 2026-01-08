import { useCallback, useState } from 'react';
import { useStripe } from '@stripe/stripe-react-native';

import apiClient from '@/api/client';
import { PAYMENT_ENDPOINTS } from '@/api/endpoints';
import {
  CreatePaymentIntentPayload,
  PaymentSheetResponse,
  PaymentState,
} from '@/types/payment';
import { useToastNotification } from '@/utils/toast';

const INITIAL_STATE: PaymentState = {
  status: 'idle',
  error: null,
  isPaymentSheetReady: false,
};

export const usePaymentSheet = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [paymentState, setPaymentState] = useState<PaymentState>(INITIAL_STATE);
  const showToast = useToastNotification();

  const fetchPaymentSheetParams = useCallback(
    async (
      payload: CreatePaymentIntentPayload,
    ): Promise<PaymentSheetResponse | null> => {
      try {
        const response = await apiClient.post<{ data: PaymentSheetResponse }>(
          PAYMENT_ENDPOINTS.PAYMENT_SHEET,
          payload,
        );

        return response.data.data;
      } catch (error) {
        const errorMessage =
          (error as { message?: string })?.message ||
          'Failed to fetch payment details';
        throw new Error(errorMessage);
      }
    },
    [],
  );

  const initializePaymentSheet = useCallback(
    async (payload: CreatePaymentIntentPayload): Promise<boolean> => {
      setPaymentState(prev => ({ ...prev, status: 'loading', error: null }));

      try {
        const params = await fetchPaymentSheetParams(payload);

        if (!params) {
          throw new Error('Failed to get payment parameters');
        }

        const { error } = await initPaymentSheet({
          merchantDisplayName: 'Your App Name',
          customerId: params.customer,
          customerEphemeralKeySecret: params.ephemeralKey,
          paymentIntentClientSecret: params.paymentIntent,
          allowsDelayedPaymentMethods: true,
          defaultBillingDetails: {
            name: '',
          },
        });

        if (error) {
          throw new Error(error.message);
        }

        setPaymentState({
          status: 'idle',
          error: null,
          isPaymentSheetReady: true,
        });

        return true;
      } catch (error) {
        const errorMessage =
          (error as Error)?.message || 'Failed to initialize payment';
        setPaymentState({
          status: 'error',
          error: errorMessage,
          isPaymentSheetReady: false,
        });

        return false;
      }
    },
    [fetchPaymentSheetParams, initPaymentSheet],
  );

  const openPaymentSheet = useCallback(async (): Promise<boolean> => {
    if (!paymentState.isPaymentSheetReady) {
      showToast('Payment sheet is not ready', 'error');

      return false;
    }

    setPaymentState(prev => ({ ...prev, status: 'loading' }));

    const { error } = await presentPaymentSheet();

    if (error) {
      setPaymentState(prev => ({
        ...prev,
        status: 'error',
        error: error.message,
      }));
      showToast(error.message, 'error');

      return false;
    }

    setPaymentState({
      status: 'success',
      error: null,
      isPaymentSheetReady: false,
    });
    showToast('Your payment was successful!', 'success');

    return true;
  }, [paymentState.isPaymentSheetReady, presentPaymentSheet, showToast]);

  const resetPaymentState = useCallback(() => {
    setPaymentState(INITIAL_STATE);
  }, []);

  return {
    paymentState,
    initializePaymentSheet,
    openPaymentSheet,
    resetPaymentState,
    isLoading: paymentState.status === 'loading',
    isPaymentReady: paymentState.isPaymentSheetReady,
  };
};

export default usePaymentSheet;
