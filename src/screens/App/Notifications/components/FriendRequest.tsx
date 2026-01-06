import React, { useCallback, useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Avatar, makeStyles, Text, useTheme } from '@rneui/themed';
import { formatDistanceToNow } from 'date-fns';

import { Button } from '@/components';
import {
  useDeleteNotification,
  useReadNotification,
  useRespondFriendRequest,
} from '@/hooks/notifications';
import { Notification } from '@/models';
import { ConnectionStatus } from '@/types/common';
import { useToastNotification } from '@/utils/toast';

interface Props {
  notification: Notification;
  refetchNotifications: () => void;
}

const FriendRequest: React.FC<Props> = props => {
  const { notification, refetchNotifications } = props;
  const { theme } = useTheme();
  const [isAccepting, setIsAccepting] = useState(false);
  const [isDeclining, setIsDeclining] = useState(false);

  const notificationId = useMemo(() => {
    return notification.id || notification._id;
  }, [notification]);

  const styles = useStyles();
  const toast = useToastNotification();

  const { mutate: respondFriendRequest } = useRespondFriendRequest(
    notification.metadata.friendRequestId || '',
  );
  const { mutate: readNotification } = useReadNotification();
  const { mutate: deleteNotification } = useDeleteNotification();

  const handleFriendRequest = useCallback(
    (type: ConnectionStatus.REJECTED | ConnectionStatus.ACCEPTED) => {
      if (type === ConnectionStatus.ACCEPTED) {
        setIsAccepting(true);
      } else {
        setIsDeclining(true);
      }

      respondFriendRequest(
        {
          status: type,
        },
        {
          onSuccess: response => {
            toast(response.message, 'success');
            deleteNotification(notificationId || '', {
              onSuccess: () => {
                refetchNotifications();
                setIsAccepting(false);
                setIsDeclining(false);
              },
            });
          },
          onError: error => {
            toast(error.message, 'error');
            setIsAccepting(false);
            setIsDeclining(false);
          },
        },
      );
    },
    [
      respondFriendRequest,
      toast,
      refetchNotifications,
      deleteNotification,
      notificationId,
    ],
  );

  const handleReadNotification = useCallback(() => {
    readNotification(notificationId || '', {
      onSuccess: () => {
        refetchNotifications();
      },
    });
  }, [readNotification, refetchNotifications, notificationId]);

  const avatarTitle = useMemo(() => {
    const name = notification.metadata?.fullName || '';

    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }, [notification.metadata?.fullName]);

  const hasProfilePicture = Boolean(
    notification.metadata?.profilePicture?.path,
  );

  return (
    <TouchableOpacity
      onPress={handleReadNotification}
      key={notificationId}
      style={[
        styles.notificationsList,
        !notification.isRead ? styles.unreadNotificationsList : null,
      ]}>
      <View style={styles.notificationsItem}>
        <Avatar
          size={moderateScale(50)}
          rounded
          title={hasProfilePicture ? undefined : avatarTitle}
          source={
            hasProfilePicture
              ? { uri: notification.metadata.profilePicture.path }
              : undefined
          }
          containerStyle={styles.avatarContainer}
          titleStyle={styles.avatarTitle}
          overlayContainerStyle={{
            backgroundColor: hasProfilePicture
              ? 'transparent'
              : theme.colors.primary,
          }}
        />
        <View style={styles.notificationContent}>
          <Text style={styles.notificationTitle}>{notification.message}</Text>
          <View style={styles.responseButtonContainer}>
            <Button
              title="Accept"
              containerStyle={styles.buttonContainer}
              buttonStyle={styles.responseButton}
              onPress={() => handleFriendRequest(ConnectionStatus.ACCEPTED)}
              loading={isAccepting}
            />
            <Button
              title="Decline"
              type="outline"
              containerStyle={styles.buttonContainer}
              buttonStyle={styles.responseButton}
              onPress={() => handleFriendRequest(ConnectionStatus.REJECTED)}
              loading={isDeclining}
            />
          </View>
          <Text style={styles.timeAgo}>
            {formatDistanceToNow(new Date(notification.createdAt), {
              addSuffix: true,
            })}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FriendRequest;

const useStyles = makeStyles(theme => ({
  notificationsList: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: verticalScale(6),
    gap: verticalScale(10),
  },
  unreadNotificationsList: {
    backgroundColor: theme.colors.secondary,
  },
  notificationsItem: {
    flexDirection: 'row',
    gap: moderateScale(10),
  },
  avatarContainer: {
    backgroundColor: theme.colors.primary,
  },
  avatarTitle: {
    color: theme.colors.white,
    fontSize: moderateScale(18),
    fontWeight: '600',
  },
  notificationContent: {
    flex: 1,
    gap: verticalScale(4),
  },
  notificationTitle: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: theme.colors.foreground,
  },
  timeAgo: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: theme.colors.grey3,
  },
  responseButtonContainer: {
    flexDirection: 'row',
    gap: moderateScale(10),
    marginVertical: verticalScale(4),
  },
  buttonContainer: {
    minWidth: '30%',
  },
  responseButton: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(10),
  },
}));
