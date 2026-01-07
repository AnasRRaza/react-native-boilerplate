import React from 'react';
import { StyleSheet, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

interface ChatListSkeletonProps {
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
      styles.skeletonBox,
      {
        width,
        height,
        borderRadius,
      },
      style,
    ]}
  />
);

const ChatListSkeletonItem: React.FC = () => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.row}>
        <SkeletonBox
          width={moderateScale(48)}
          height={moderateScale(48)}
          borderRadius={moderateScale(24)}
        />
        <View style={styles.content}>
          <View style={styles.header}>
            <SkeletonBox
              width={moderateScale(120)}
              height={moderateScale(16)}
              borderRadius={moderateScale(4)}
            />
            <SkeletonBox
              width={moderateScale(50)}
              height={moderateScale(12)}
              borderRadius={moderateScale(4)}
            />
          </View>
          <SkeletonBox
            width="80%"
            height={moderateScale(14)}
            borderRadius={moderateScale(4)}
            style={styles.messageSkeleton}
          />
        </View>
      </View>
    </View>
  );
};

const ChatListSkeleton: React.FC<ChatListSkeletonProps> = ({ count = 8 }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, index) => (
        <ChatListSkeletonItem key={`chat-skeleton-${index}`} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: moderateScale(16),
  },
  itemContainer: {
    paddingVertical: moderateScale(16),
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginLeft: moderateScale(12),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(8),
  },
  messageSkeleton: {
    marginTop: moderateScale(4),
  },
  skeletonBox: {
    backgroundColor: '#1a1a1a',
  },
});

export default ChatListSkeleton;
