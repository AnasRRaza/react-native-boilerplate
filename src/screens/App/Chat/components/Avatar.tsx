import React, { useMemo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

interface AvatarProps {
  name: string;
  imageUrl?: string | null;
  size?: 'small' | 'medium' | 'large';
}

const SIZES = {
  small: moderateScale(32),
  medium: moderateScale(48),
  large: moderateScale(64),
};

const ChatAvatar: React.FC<AvatarProps> = ({
  name,
  imageUrl,
  size = 'medium',
}) => {
  const initials = useMemo(() => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }, [name]);

  const avatarSize = SIZES[size];
  const fontSize = avatarSize * 0.4;

  if (imageUrl) {
    return (
      <Image
        source={{ uri: imageUrl }}
        style={[
          styles.image,
          {
            width: avatarSize,
            height: avatarSize,
            borderRadius: avatarSize / 2,
          },
        ]}
      />
    );
  }

  return (
    <View
      style={[
        styles.initialsContainer,
        { width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 },
      ]}>
      <Text style={[styles.initials, { fontSize }]}>{initials}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    backgroundColor: '#333333',
  },
  initialsContainer: {
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default ChatAvatar;
