import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text } from '@rneui/themed';

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
  return (
    <TouchableOpacity
      style={[styles.container, isActive && styles.activeContainer]}
      onPress={onPress}>
      <Icon
        name={icon}
        size={24}
        color={isActive ? '#A3B18A' : '#666'}
        style={styles.icon}
      />
      <Text style={[styles.title, isActive && styles.activeTitle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: '#A3B18A20',
  },
  icon: {
    marginRight: 15,
  },
  title: {
    fontSize: 16,
    color: '#666',
  },
  activeTitle: {
    color: '#A3B18A',
    fontWeight: '600',
  },
});

export default DrawerItem;
