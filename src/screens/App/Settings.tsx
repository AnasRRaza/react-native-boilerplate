import React from 'react';
import { ScrollView } from 'react-native';
import { Theme } from '@rneui/base';
import { Icon, ListItem, makeStyles, Text } from '@rneui/themed';

const Settings = () => {
  const styles = useStyles();

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
        <ListItem key={index} bottomDivider onPress={() => {}}>
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

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: 20,
    color: theme.colors.foreground,
  },
}));

export default Settings;
