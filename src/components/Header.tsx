import React from 'react';
import { View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Feather';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { makeStyles, Text, useTheme } from '@rneui/themed';

import { FONTS } from '@/constants/fonts';

interface Props {
  title: string;
  isBack?: boolean;
}

const Header: React.FC<Props> = ({ title, isBack = false }) => {
  const { theme } = useTheme();
  const styles = useStyles();

  const renderHeader = () => {
    return <Text style={styles.title}>{title}</Text>;
  };

  const navigation = useNavigation();

  const openDrawer = () => navigation.dispatch(DrawerActions.openDrawer());

  const handleBack = () => navigation.goBack();

  return (
    <View style={styles.container}>
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
      {renderHeader()}
    </View>
  );
};

export default Header;

const useStyles = makeStyles(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
    backgroundColor: theme.colors.background,
    paddingHorizontal: moderateScale(12),
  },
  title: {
    color: theme.colors.foreground,
    fontSize: moderateScale(20),
    fontFamily: FONTS.INTER,
  },
}));
