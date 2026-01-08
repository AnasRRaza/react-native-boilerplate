import React, { useCallback, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Avatar, makeStyles, Text, useTheme } from '@rneui/themed';
import { formatDistanceToNow } from 'date-fns';

import { useReadNotification } from '@/hooks/notifications';
import { Notification, NotificationCategory } from '@/models';

interface Props {
  notification: Notification;
  refetchNotifications: () => void;
}

const NotificationCard: React.FC<Props> = props => {
  const { notification, refetchNotifications } = props;
  const { theme } = useTheme();

  const notificationId = useMemo(() => {
    return notification.id || notification._id;
  }, [notification]);

  const styles = useStyles();

  const { mutate: readNotification } = useReadNotification();

  const handleReadNotification = useCallback(() => {
    readNotification(notificationId || '', {
      onSuccess: () => {
        refetchNotifications();
      },
    });
  }, [readNotification, refetchNotifications, notificationId]);

  const handlePress = useCallback(() => {
    handleReadNotification();
    switch (notification.category) {
      case NotificationCategory.CHAT_MESSAGE:
        // Navigate to chat - implement based on your navigation
        break;
      case NotificationCategory.RESPONSE_LIKE:
      case NotificationCategory.RESPONSE_UNLIKE:
        // Navigate to response - implement based on your navigation
        break;
      case NotificationCategory.NEW_RESPONSE:
        // Navigate to question - implement based on your navigation
        break;
      default:
        break;
    }
  }, [notification.category, handleReadNotification]);

  const avatarTitle = useMemo(() => {
    const name = notification.metadata?.senderName || '';

    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }, [notification.metadata?.senderName]);

  const hasProfilePicture = Boolean(
    notification.metadata?.profilePicture?.path,
  );

  return (
    <TouchableOpacity
      onPress={handlePress}
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
        {notification.category === NotificationCategory.CHAT_MESSAGE ? (
          <View style={styles.notificationContent}>
            <Text style={styles.notificationTitle}>{notification.title}</Text>
            <Text style={styles.description}>{notification.message}</Text>
            <Text style={styles.timeAgo}>
              {formatDistanceToNow(new Date(notification.createdAt), {
                addSuffix: true,
              })}
            </Text>
          </View>
        ) : (
          <View style={styles.notificationContent}>
            <Text style={styles.notificationTitle}>{notification.message}</Text>
            <Text style={styles.timeAgo}>
              {formatDistanceToNow(new Date(notification.createdAt), {
                addSuffix: true,
              })}
            </Text>
          </View>
        )}
        {!notification.isRead ? <View style={styles.unreadIndicator} /> : null}
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;

const useStyles = makeStyles(theme => ({
  notificationsList: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: verticalScale(12),
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
  description: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: theme.colors.grey2,
  },
  timeAgo: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: theme.colors.grey3,
  },
  unreadIndicator: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: moderateScale(100),
    backgroundColor: theme.colors.primary,
    marginRight: moderateScale(14),
    marginTop: moderateScale(10),
  },
}));
