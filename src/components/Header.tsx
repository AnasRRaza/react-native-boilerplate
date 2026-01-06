import React, { useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Feather';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { makeStyles, Text, useTheme } from '@rneui/themed';

import { FONTS } from '@/constants/fonts';

interface Props {
  title: string;
  isBack?: boolean;
  rightIcon?: string;
  onRightIconPress?: () => void;
}

const Header: React.FC<Props> = ({
  title,
  isBack = false,
  rightIcon,
  onRightIconPress,
}) => {
  const { theme } = useTheme();
  const styles = useStyles();
  const navigation = useNavigation();

  const openDrawer = useCallback(
    () => navigation.dispatch(DrawerActions.openDrawer()),
    [navigation],
  );

  const handleBack = useCallback(() => navigation.goBack(), [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {isBack ? (
          <Icon
            name="arrow-left"
            size={28}
            color={theme.colors.foreground}
            onPress={handleBack}
          />
        ) : (
          <Icon
            name="menu"
            size={28}
            color={theme.colors.foreground}
            onPress={openDrawer}
          />
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
      {rightIcon ? (
        <TouchableOpacity onPress={onRightIconPress} style={styles.rightIcon}>
          <Icon name={rightIcon} size={24} color={theme.colors.foreground} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Header;

const useStyles = makeStyles(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background,
    paddingHorizontal: moderateScale(12),
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
  },
  title: {
    color: theme.colors.foreground,
    fontSize: moderateScale(20),
    fontFamily: FONTS.INTER,
  },
  rightIcon: {
    padding: moderateScale(4),
  },
}));
