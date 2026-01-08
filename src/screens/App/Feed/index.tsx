import React, { useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
  ViewabilityConfig,
  ViewToken,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { makeStyles, Text } from '@rneui/themed';

import { useFetchPosts, useTogglePostLike } from '@/hooks/feed';
import { Post as PostType } from '@/types/post';

import { Post, PostSkeleton } from './components';

const Feed = () => {
  const styles = useStyles();
  const [_, setVisiblePostId] = useState<string | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useFetchPosts(10);

  const posts = data?.pages.flatMap(page => page.posts) ?? [];

  const { mutate: togglePostLike } = useTogglePostLike();

  const viewabilityConfig = useRef<ViewabilityConfig>({
    itemVisiblePercentThreshold: 50,
    minimumViewTime: 100,
  });

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        const visiblePost = viewableItems[0];
        setVisiblePostId(visiblePost.key);
      } else {
        setVisiblePostId(null);
      }
    },
  );

  const handleLikePress = useCallback(
    (postId: string) => {
      togglePostLike({ postId });
    },
    [togglePostLike],
  );

  const handleCommentPress = useCallback((postId: string) => {
    // TODO: Implement comments modal
    console.warn('Comment pressed:', postId);
  }, []);

  const handleUserPress = useCallback((userId: string) => {
    // TODO: Navigate to user profile
    console.warn('User pressed:', userId);
  }, []);

  const handleSharePress = useCallback((postId: string) => {
    // TODO: Implement share functionality
    console.warn('Share pressed:', postId);
  }, []);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const renderPost = useCallback(
    ({ item }: { item: PostType }) => (
      <Post
        post={item}
        onLikePress={handleLikePress}
        onCommentPress={handleCommentPress}
        onUserPress={handleUserPress}
        onSharePress={handleSharePress}
      />
    ),
    [handleLikePress, handleCommentPress, handleUserPress, handleSharePress],
  );

  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) {
      return null;
    }

    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#FFFFFF" />
      </View>
    );
  }, [isFetchingNextPage, styles.footerLoader]);

  const renderEmpty = useCallback(() => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No posts yet</Text>
        <Text style={styles.emptySubtext}>
          Follow people to see their posts here
        </Text>
      </View>
    );
  }, [styles]);

  const keyExtractor = useCallback((item: PostType) => item.id, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Feed</Text>
        </View>
        <PostSkeleton count={2} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Feed</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load posts</Text>
          <TouchableOpacity onPress={handleRefresh} style={styles.retryButton}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Feed</Text>
      </View>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={isFetching && !isFetchingNextPage}
            onRefresh={handleRefresh}
            tintColor="#FFFFFF"
          />
        }
        windowSize={10}
        maxToRenderPerBatch={3}
        removeClippedSubviews={true}
        initialNumToRender={2}
      />
    </View>
  );
};

export default Feed;

const useStyles = makeStyles(() => ({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  headerTitle: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateScale(60),
  },
  emptyText: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: moderateScale(8),
  },
  emptySubtext: {
    fontSize: moderateScale(14),
    color: '#888888',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: moderateScale(16),
    color: '#FFFFFF',
    marginBottom: moderateScale(16),
  },
  retryButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateScale(12),
    borderRadius: moderateScale(8),
  },
  retryText: {
    color: '#000000',
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
  footerLoader: {
    paddingVertical: moderateScale(20),
    alignItems: 'center',
  },
}));
