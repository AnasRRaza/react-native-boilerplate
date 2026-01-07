import React, { useCallback, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { makeStyles, Text } from '@rneui/themed';
import { useInfiniteQuery } from '@tanstack/react-query';

import { LoadingSpinner } from '@/components';
import { useReadNotifications } from '@/hooks/notifications';
import { Notification, NotificationCategory } from '@/models';
import { useNotificationStore } from '@/store/notificationStore';

import FriendRequest from './components/FriendRequest';
import NotificationCard from './components/NotificationCard';

const Notifications = () => {
  const {
    fetchNotifications,
    notifications,
    setNotifications,
    fetchUnreadNotifications,
    unreadCount,
  } = useNotificationStore();

  const {
    data,
    refetch: refetchNotifications,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['notifications'],
    queryFn: ({ pageParam }) => fetchNotifications(pageParam),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }

      return undefined;
    },
  });

  useEffect(() => {
    if (data) {
      setNotifications(data.pages.flatMap(page => page.notifications));
    }
  }, [data, setNotifications]);

  const handleRefetchNotifications = useCallback(async () => {
    const result = await refetchNotifications();
    if (result.data) {
      setNotifications(result.data.pages.flatMap(page => page.notifications));
      fetchUnreadNotifications();
    }
  }, [refetchNotifications, setNotifications, fetchUnreadNotifications]);

  const styles = useStyles();

  const { mutate: readNotifications, isPending: isReadNotificationsPending } =
    useReadNotifications();

  const handleReadNotifications = useCallback(() => {
    if (unreadCount > 0) {
      readNotifications(undefined, {
        onSuccess: () => {
          handleRefetchNotifications();
        },
      });
    }
  }, [readNotifications, handleRefetchNotifications, unreadCount]);

  const renderNotification = useCallback(
    ({ item }: { item: Notification }) => {
      const notification = item;

      return notification.category === NotificationCategory.FRIEND_REQUEST ? (
        <FriendRequest
          key={notification.id || notification._id}
          notification={notification}
          refetchNotifications={handleRefetchNotifications}
        />
      ) : (
        <NotificationCard
          key={notification.id || notification._id}
          notification={notification}
          refetchNotifications={handleRefetchNotifications}
        />
      );
    },
    [handleRefetchNotifications],
  );

  const renderListHeader = useCallback(() => {
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Notifications</Text>
        {notifications?.length && notifications?.length > 0 ? (
          <Text
            style={
              isReadNotificationsPending
                ? styles.markAllAsReadDisabled
                : styles.markAllAsRead
            }
            onPress={handleReadNotifications}
            disabled={isReadNotificationsPending}>
            Mark all as read
          </Text>
        ) : null}
      </View>
    );
  }, [
    styles,
    notifications?.length,
    isReadNotificationsPending,
    handleReadNotifications,
  ]);

  const renderListEmpty = useCallback(() => {
    return <Text style={styles.noNotifications}>No notifications</Text>;
  }, [styles]);

  const renderListFooter = useCallback(() => {
    return <View style={styles.spacer} />;
  }, [styles]);

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const keyExtractor = useCallback(
    (item: Notification, index: number) => `${item._id}-${index}`,
    [],
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={keyExtractor}
        renderItem={renderNotification}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderListEmpty}
        ListFooterComponent={renderListFooter}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Notifications;

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: verticalScale(10),
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: '500',
    color: theme.colors.foreground,
  },
  markAllAsRead: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: theme.colors.primary,
  },
  markAllAsReadDisabled: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: theme.colors.grey3,
  },
  spacer: {
    height: verticalScale(30),
  },
  noNotifications: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: theme.colors.grey3,
    textAlign: 'center',
    marginTop: verticalScale(12),
  },
}));
