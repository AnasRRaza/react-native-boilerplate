import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps, View } from 'react-native';
import { makeStyles } from '@rneui/themed';

import { COLORS } from '@/constants/colors';

interface Props extends ActivityIndicatorProps {}

const LoadingSpinner: React.FC<Props> = ({ ...props }) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <ActivityIndicator color={COLORS.primary} {...props} />
    </View>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
}));

export default LoadingSpinner;
