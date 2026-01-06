import { getUniqueId } from 'react-native-device-info';
import { OneSignal } from 'react-native-onesignal';

export interface OneSignalSubscription {
  oneSignalSubscriptionId: string;
  deviceId: string;
  enable: boolean;
}

type UpdateProfileMutation = (data: {
  oneSignalSubscriptions: OneSignalSubscription[];
}) => void;

type DisableSubscriptionMutationAsync = (data: {
  oneSignalSubscriptions: OneSignalSubscription[];
}) => Promise<void>;

export const updateOneSignalSubscription = async (
  updateProfile: UpdateProfileMutation,
  oneSignalSubscriptions: OneSignalSubscription[],
): Promise<void> => {
  try {
    const onesignalId = await OneSignal.User.pushSubscription.getIdAsync();
    const uniqueDeviceId = await getUniqueId();

    if (onesignalId) {
      const existingIndex = oneSignalSubscriptions.findIndex(
        sub => sub.deviceId === uniqueDeviceId,
      );

      let updatedSubscriptions: OneSignalSubscription[];

      if (existingIndex !== -1) {
        updatedSubscriptions = oneSignalSubscriptions.map((sub, index) =>
          index === existingIndex
            ? { ...sub, oneSignalSubscriptionId: onesignalId, enable: true }
            : sub,
        );
      } else {
        updatedSubscriptions = [
          ...oneSignalSubscriptions,
          {
            oneSignalSubscriptionId: onesignalId,
            deviceId: uniqueDeviceId,
            enable: true,
          },
        ];
      }

      updateProfile({ oneSignalSubscriptions: updatedSubscriptions });
    }
  } catch (error) {
    console.error('Error updating OneSignal subscription:', error);
  }
};

export const disableOneSignalSubscription = async (
  updateProfile: DisableSubscriptionMutationAsync,
  oneSignalSubscriptions: OneSignalSubscription[],
): Promise<boolean> => {
  try {
    const uniqueDeviceId = await getUniqueId();

    const updatedSubscriptions = oneSignalSubscriptions.map(sub =>
      sub.deviceId === uniqueDeviceId ? { ...sub, enable: false } : sub,
    );

    await updateProfile({ oneSignalSubscriptions: updatedSubscriptions });

    return true;
  } catch (error) {
    console.error('Error disabling OneSignal subscription:', error);

    return false;
  }
};
