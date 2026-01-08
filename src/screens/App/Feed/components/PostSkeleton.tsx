import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface PostSkeletonProps {
  count?: number;
}

const SkeletonBox: React.FC<{
  width: number | string;
  height: number;
  borderRadius?: number;
  style?: object;
}> = ({ width, height, borderRadius = 0, style }) => (
  <View
    style={[
      {
        width,
        height,
        borderRadius,
        backgroundColor: '#1a1a1a',
      },
      style,
    ]}
  />
);

const PostSkeletonItem: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Media */}
      <SkeletonBox width={SCREEN_WIDTH} height={SCREEN_WIDTH} />

      {/* User Info */}
      <View style={styles.userSection}>
        <View style={styles.userLeft}>
          <SkeletonBox
            width={moderateScale(40)}
            height={moderateScale(40)}
            borderRadius={moderateScale(20)}
          />
          <View style={styles.userInfo}>
            <SkeletonBox
              width={moderateScale(100)}
              height={moderateScale(14)}
              borderRadius={moderateScale(4)}
            />
            <SkeletonBox
              width={moderateScale(60)}
              height={moderateScale(12)}
              borderRadius={moderateScale(4)}
              style={styles.timestampSkeleton}
            />
          </View>
        </View>
        <View style={styles.actions}>
          <SkeletonBox
            width={moderateScale(24)}
            height={moderateScale(24)}
            borderRadius={moderateScale(12)}
          />
          <SkeletonBox
            width={moderateScale(24)}
            height={moderateScale(24)}
            borderRadius={moderateScale(12)}
            style={styles.actionMargin}
          />
          <SkeletonBox
            width={moderateScale(24)}
            height={moderateScale(24)}
            borderRadius={moderateScale(12)}
            style={styles.actionMargin}
          />
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsSection}>
        <SkeletonBox
          width={moderateScale(150)}
          height={moderateScale(14)}
          borderRadius={moderateScale(4)}
        />
      </View>

      {/* Description */}
      <View style={styles.descriptionSection}>
        <SkeletonBox
          width="100%"
          height={moderateScale(14)}
          borderRadius={moderateScale(4)}
        />
        <SkeletonBox
          width="70%"
          height={moderateScale(14)}
          borderRadius={moderateScale(4)}
          style={styles.descriptionLine}
        />
      </View>
    </View>
  );
};

const PostSkeleton: React.FC<PostSkeletonProps> = ({ count = 2 }) => {
  return (
    <View style={styles.listContainer}>
      {Array.from({ length: count }).map((_, index) => (
        <PostSkeletonItem key={`skeleton-${index}`} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    backgroundColor: '#000000',
    marginBottom: moderateScale(16),
  },
  userSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(12),
  },
  userLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    marginLeft: moderateScale(10),
  },
  timestampSkeleton: {
    marginTop: moderateScale(6),
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionMargin: {
    marginLeft: moderateScale(16),
  },
  statsSection: {
    paddingHorizontal: moderateScale(12),
    paddingBottom: moderateScale(8),
  },
  descriptionSection: {
    paddingHorizontal: moderateScale(12),
    paddingBottom: moderateScale(12),
  },
  descriptionLine: {
    marginTop: moderateScale(6),
  },
});

export default PostSkeleton;
