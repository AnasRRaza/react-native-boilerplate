import React, { memo, useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Theme } from '@rneui/base';
import { makeStyles, Text } from '@rneui/themed';

import { FONTS } from '@/constants/fonts';
import { PAYMENT_TYPES } from '@/constants/payment';
import { PaymentType } from '@/types/payment';

interface PaymentTypeTabsProps {
  selectedType: PaymentType;
  onSelectType: (type: PaymentType) => void;
}

const PaymentTypeTabs = ({
  selectedType,
  onSelectType,
}: PaymentTypeTabsProps) => {
  const styles = useStyles();

  const handlePress = useCallback(
    (type: PaymentType) => {
      onSelectType(type);
    },
    [onSelectType],
  );

  return (
    <View style={styles.container}>
      {PAYMENT_TYPES.map(type => {
        const isSelected = selectedType === type.id;

        return (
          <TouchableOpacity
            key={type.id}
            style={[styles.tab, isSelected ? styles.tabSelected : null]}
            onPress={() => handlePress(type.id)}
            activeOpacity={0.7}>
            <Text
              style={[
                styles.tabText,
                isSelected ? styles.tabTextSelected : null,
              ]}>
              {type.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default memo(PaymentTypeTabs);

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.grey5,
    borderRadius: moderateScale(12),
    padding: moderateScale(4),
    marginBottom: verticalScale(20),
  },
  tab: {
    flex: 1,
    paddingVertical: verticalScale(12),
    alignItems: 'center',
    borderRadius: moderateScale(10),
  },
  tabSelected: {
    backgroundColor: theme.colors.primary,
  },
  tabText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    fontFamily: FONTS.INTER,
    color: theme.colors.grey2,
  },
  tabTextSelected: {
    color: '#FFFFFF',
  },
}));
