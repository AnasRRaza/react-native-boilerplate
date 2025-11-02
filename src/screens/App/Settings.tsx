import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Icon, ListItem, Text } from '@rneui/themed';

const Settings = () => {
  const settingsOptions = [
    { title: 'Account', icon: 'person-outline', iconType: 'ionicons' },
    {
      title: 'Notifications',
      icon: 'notifications-outline',
      iconType: 'ionicons',
    },
    { title: 'Privacy', icon: 'lock-closed-outline', iconType: 'ionicons' },
    {
      title: 'Appearance',
      icon: 'color-palette-outline',
      iconType: 'ionicons',
    },
    { title: 'Language', icon: 'language-outline', iconType: 'ionicons' },
    {
      title: 'Help & Support',
      icon: 'help-circle-outline',
      iconType: 'ionicons',
    },
    {
      title: 'About',
      icon: 'information-circle-outline',
      iconType: 'ionicons',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text h2 style={styles.header}>
        Settings
      </Text>

      {settingsOptions.map((option, index) => (
        <ListItem
          key={index}
          bottomDivider
          onPress={() => console.log(option.title)}>
          <Icon name={option.icon} type={option.iconType} />
          <ListItem.Content>
            <ListItem.Title>{option.title}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
});

export default Settings;
