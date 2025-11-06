import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Theme } from '@rneui/base';
import { makeStyles, Text, useTheme } from '@rneui/themed';

interface DrawerItemProps {
  title: string;
  icon: string;
  onPress: () => void;
  isActive?: boolean;
}

const DrawerItem: React.FC<DrawerItemProps> = ({
  title,
  icon,
  onPress,
  isActive = false,
}) => {
  const { theme } = useTheme();
  const styles = useStyles();

  return (
    <TouchableOpacity
      style={[styles.container, isActive && styles.activeContainer]}
      onPress={onPress}>
      <Icon
        name={icon}
        size={24}
        color={isActive ? theme.colors.primary : theme.colors.grey2}
        style={styles.icon}
      />
      <Text style={[styles.title, isActive && styles.activeTitle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 10,
    marginVertical: 3,
  },
  activeContainer: {
    backgroundColor: `${theme.colors.primary}20`,
  },
  icon: {
    marginRight: 15,
  },
  title: {
    fontSize: 16,
    color: theme.colors.grey2,
  },
  activeTitle: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
}));

export default DrawerItem;
