import React, { useCallback, useMemo, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  NativeSyntheticEvent,
  TextLayoutEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar, makeStyles, Text } from '@rneui/themed';
import { formatDistanceToNow } from 'date-fns';

import { Post as PostType } from '@/types/post';
import { formatCount } from '@/utils/formatters';

interface PostProps {
  post: PostType;
  onLikePress?: (postId: string) => void;
  onCommentPress?: (postId: string) => void;
  onUserPress?: (userId: string) => void;
  onSharePress?: (postId: string) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Post: React.FC<PostProps> = ({
  post,
  onLikePress,
  onCommentPress,
  onUserPress,
  onSharePress,
}) => {
  const styles = useStyles();
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const handleLikePress = useCallback(() => {
    setIsLiked(!isLiked);
    onLikePress?.(post.id);
  }, [isLiked, onLikePress, post.id]);

  const handleCommentPress = useCallback(() => {
    onCommentPress?.(post.id);
  }, [onCommentPress, post.id]);

  const handleUserPress = useCallback(() => {
    onUserPress?.(post.user.id);
  }, [onUserPress, post.user.id]);

  const handleSharePress = useCallback(() => {
    onSharePress?.(post.id);
  }, [onSharePress, post.id]);

  const handleTextLayout = useCallback(
    (e: NativeSyntheticEvent<TextLayoutEventData>) => {
      if (e.nativeEvent.lines.length > 2 && !isExpanded) {
        setShowMore(true);
      }
    },
    [isExpanded],
  );

  const avatarTitle = useMemo(() => {
    return post.user.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }, [post.user.name]);

  const renderMedia = useCallback(
    ({ item }: { item: { type: string; uri: string } }) => {
      return (
        <Image
          source={{ uri: item.uri }}
          style={styles.mediaImage}
          resizeMode="cover"
        />
      );
    },
    [styles.mediaImage],
  );

  const handleScroll = useCallback(
    (event: { nativeEvent: { contentOffset: { x: number } } }) => {
      const index = Math.round(
        event.nativeEvent.contentOffset.x / SCREEN_WIDTH,
      );
      setCurrentMediaIndex(index);
    },
    [],
  );

  const keyExtractor = useCallback(
    (_: { type: string; uri: string }, index: number) =>
      `${post.id}-media-${index}`,
    [post.id],
  );

  return (
    <View style={styles.container}>
      {/* Media Carousel */}
      <View style={styles.mediaSection}>
        <FlatList
          data={post.media}
          renderItem={renderMedia}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          keyExtractor={keyExtractor}
        />

        {/* Carousel Indicator */}
        {post.media.length > 1 ? (
          <View style={styles.carouselIndicator}>
            <Text style={styles.carouselText}>
              {currentMediaIndex + 1}/{post.media.length}
            </Text>
          </View>
        ) : null}
      </View>

      {/* Post Info */}
      <View style={styles.postInfo}>
        <TouchableOpacity
          style={styles.userSection}
          onPress={handleUserPress}
          activeOpacity={0.7}>
          <Avatar
            size={moderateScale(40)}
            rounded
            title={post.user.avatar ? undefined : avatarTitle}
            source={post.user.avatar ? { uri: post.user.avatar } : undefined}
            containerStyle={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.username}>@{post.user.username}</Text>
            <Text style={styles.timestamp}>
              {formatDistanceToNow(new Date(post.timestamp), {
                addSuffix: true,
              })}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={handleLikePress}
            style={styles.actionButton}
            activeOpacity={0.7}>
            <Icon
              name={isLiked ? 'heart' : 'heart-outline'}
              size={moderateScale(24)}
              color={isLiked ? '#FF3B30' : '#FFFFFF'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleCommentPress}
            style={styles.actionButton}
            activeOpacity={0.7}>
            <Icon
              name="chatbubble-outline"
              size={moderateScale(22)}
              color="#FFFFFF"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSharePress}
            style={styles.actionButton}
            activeOpacity={0.7}>
            <Icon
              name="share-outline"
              size={moderateScale(24)}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsSection}>
        <Text style={styles.statsText}>
          {formatCount(post.likesCount)} likes
        </Text>
        <Text style={styles.statsSeparator}>•</Text>
        <Text style={styles.statsText}>
          {formatCount(post.commentsCount)} comments
        </Text>
        <Text style={styles.statsSeparator}>•</Text>
        <Text style={styles.statsText}>
          {formatCount(post.viewsCount)} views
        </Text>
      </View>

      {/* Location */}
      {post.location ? (
        <View style={styles.locationSection}>
          <Icon
            name="location-outline"
            size={moderateScale(14)}
            color="#888888"
          />
          <Text style={styles.locationText}>{post.location}</Text>
        </View>
      ) : null}

      {/* Description */}
      <View style={styles.descriptionSection}>
        <Text
          style={styles.description}
          numberOfLines={isExpanded ? undefined : 2}
          onTextLayout={handleTextLayout}>
          <Text style={styles.usernameInline}>@{post.user.username} </Text>
          {post.description}
        </Text>
        {showMore && !isExpanded ? (
          <TouchableOpacity
            onPress={() => setIsExpanded(true)}
            activeOpacity={0.7}>
            <Text style={styles.moreText}>more</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default React.memo(Post, (prevProps, nextProps) => {
  return prevProps.post.id === nextProps.post.id;
});

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: '#000000',
    marginBottom: moderateScale(16),
  },
  mediaSection: {
    position: 'relative',
  },
  mediaImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
  },
  carouselIndicator: {
    position: 'absolute',
    top: moderateScale(12),
    right: moderateScale(12),
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(12),
  },
  carouselText: {
    color: '#FFFFFF',
    fontSize: moderateScale(12),
    fontWeight: '600',
  },
  postInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(12),
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: theme.colors.primary,
  },
  userInfo: {
    marginLeft: moderateScale(10),
  },
  username: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#FFFFFF',
  },
  timestamp: {
    fontSize: moderateScale(12),
    color: '#888888',
    marginTop: moderateScale(2),
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginLeft: moderateScale(16),
  },
  statsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(12),
    paddingBottom: moderateScale(8),
  },
  statsText: {
    fontSize: moderateScale(13),
    color: '#FFFFFF',
    fontWeight: '500',
  },
  statsSeparator: {
    fontSize: moderateScale(13),
    color: '#888888',
    marginHorizontal: moderateScale(8),
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(12),
    paddingBottom: moderateScale(8),
  },
  locationText: {
    fontSize: moderateScale(12),
    color: '#888888',
    marginLeft: moderateScale(4),
  },
  descriptionSection: {
    paddingHorizontal: moderateScale(12),
    paddingBottom: moderateScale(12),
  },
  description: {
    fontSize: moderateScale(14),
    color: '#FFFFFF',
    lineHeight: moderateScale(20),
  },
  usernameInline: {
    fontWeight: '600',
  },
  moreText: {
    fontSize: moderateScale(14),
    color: '#888888',
    marginTop: moderateScale(4),
  },
}));
