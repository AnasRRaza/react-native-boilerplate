import React, { memo, useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { Theme } from '@rneui/base';
import { makeStyles, Text, useTheme } from '@rneui/themed';

import { FONTS } from '@/constants/fonts';
import { SUBSCRIPTION_PLANS } from '@/constants/payment';
import { PlanInterval, SubscriptionPlan } from '@/types/payment';

interface SubscriptionPlansProps {
  selectedPlan: PlanInterval;
  onSelectPlan: (plan: PlanInterval) => void;
}

const SubscriptionPlans = ({
  selectedPlan,
  onSelectPlan,
}: SubscriptionPlansProps) => {
  const styles = useStyles();
  const { theme } = useTheme();

  const renderPlanCard = useCallback(
    (plan: SubscriptionPlan) => {
      const isSelected = selectedPlan === plan.id;
      const isYearly = plan.id === 'yearly';

      return (
        <TouchableOpacity
          key={plan.id}
          style={[styles.planCard, isSelected ? styles.planCardSelected : null]}
          onPress={() => onSelectPlan(plan.id)}
          activeOpacity={0.7}>
          {isYearly ? (
            <View style={styles.saveBadge}>
              <Text style={styles.saveBadgeText}>BEST VALUE</Text>
            </View>
          ) : null}

          <View style={styles.planHeader}>
            <View
              style={[
                styles.radioOuter,
                isSelected ? styles.radioOuterSelected : null,
              ]}>
              {isSelected ? <View style={styles.radioInner} /> : null}
            </View>
            <View style={styles.planInfo}>
              <Text
                style={[
                  styles.planName,
                  isSelected ? styles.planNameSelected : null,
                ]}>
                {plan.name}
              </Text>
              <Text style={styles.planDescription}>{plan.description}</Text>
            </View>
          </View>

          <View style={styles.priceContainer}>
            <Text
              style={[
                styles.priceAmount,
                isSelected ? styles.priceAmountSelected : null,
              ]}>
              ${plan.price}
            </Text>
            <Text style={styles.priceInterval}>/{plan.interval}</Text>
          </View>

          {isSelected ? (
            <IonicIcon
              name="checkmark-circle"
              size={24}
              color={theme.colors.primary}
              style={styles.checkIcon}
            />
          ) : null}
        </TouchableOpacity>
      );
    },
    [selectedPlan, onSelectPlan, styles, theme.colors.primary],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Plan</Text>
      <View style={styles.plansContainer}>
        {SUBSCRIPTION_PLANS.map(renderPlanCard)}
      </View>
    </View>
  );
};

export default memo(SubscriptionPlans);

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginBottom: verticalScale(16),
  },
  title: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    fontFamily: FONTS.INTER,
    color: theme.colors.foreground,
    marginBottom: verticalScale(12),
  },
  plansContainer: {
    gap: verticalScale(12),
  },
  planCard: {
    position: 'relative',
    backgroundColor: theme.colors.grey5,
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    borderWidth: 2,
    borderColor: theme.colors.grey4,
  },
  planCardSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: `${theme.colors.primary}10`,
  },
  saveBadge: {
    position: 'absolute',
    top: -verticalScale(10),
    right: moderateScale(12),
    backgroundColor: theme.colors.success,
    paddingHorizontal: moderateScale(8),
    paddingVertical: verticalScale(2),
    borderRadius: moderateScale(4),
  },
  saveBadgeText: {
    fontSize: moderateScale(10),
    fontWeight: '700',
    fontFamily: FONTS.INTER,
    color: '#FFFFFF',
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  radioOuter: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(10),
    borderWidth: 2,
    borderColor: theme.colors.grey3,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(12),
    marginTop: verticalScale(2),
  },
  radioOuterSelected: {
    borderColor: theme.colors.primary,
  },
  radioInner: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: moderateScale(5),
    backgroundColor: theme.colors.primary,
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    fontFamily: FONTS.INTER,
    color: theme.colors.foreground,
  },
  planNameSelected: {
    color: theme.colors.primary,
  },
  planDescription: {
    fontSize: moderateScale(12),
    fontFamily: FONTS.INTER,
    color: theme.colors.grey2,
    marginTop: verticalScale(2),
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: verticalScale(8),
    marginLeft: moderateScale(32),
  },
  priceAmount: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    fontFamily: FONTS.INTER,
    color: theme.colors.foreground,
  },
  priceAmountSelected: {
    color: theme.colors.primary,
  },
  priceInterval: {
    fontSize: moderateScale(14),
    fontFamily: FONTS.INTER,
    color: theme.colors.grey2,
    marginLeft: moderateScale(2),
  },
  checkIcon: {
    position: 'absolute',
    top: moderateScale(16),
    right: moderateScale(16),
  },
}));
