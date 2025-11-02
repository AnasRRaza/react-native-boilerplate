import { NavigationProp, useNavigation } from '@react-navigation/native';

import { AppStackNavigatorParamList } from '@/types/routes';

export const useAppNavigation = () => {
  const navigation =
    useNavigation<NavigationProp<AppStackNavigatorParamList>>();

  return navigation;
};
