import React, { useCallback } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  KeyboardTypeOptions,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Theme } from '@rneui/base';
import { Image, makeStyles, Text } from '@rneui/themed';
import * as Yup from 'yup';

import Button from '@/components/Button';
import Dropdown from '@/components/Dropdown';
import Input from '@/components/Input';
import { COLORS } from '@/constants/colors';
import { PROFILE_FORM_FIELDS } from '@/constants/onboarding';
import { Country, Language } from '@/types/common';
import {
  ONBOARDING_ROUTES,
  OnboardingStackNavigatorParamList,
} from '@/types/routes';
import { pickImage } from '@/utils';
import { profileOnboardingSchema } from '@/utils/validationSchemas';

type TProfileForm = Yup.InferType<typeof profileOnboardingSchema>;

const Profile = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TProfileForm>({
    mode: 'onSubmit',
    resolver: yupResolver(profileOnboardingSchema),
    defaultValues: {
      fullName: '',
      age: '',
      country: Country.UnitedStates,
      language: Language.English,
    },
  });

  const styles = useStyles();
  const navigation =
    useNavigation<NavigationProp<OnboardingStackNavigatorParamList>>();

  const profileImage = watch('profileImage');

  const onSubmit: SubmitHandler<TProfileForm> = data => {
    navigation.navigate(ONBOARDING_ROUTES.PRIVACY, {
      profileData: {
        fullName: data.fullName,
        age: data.age,
        country: data.country,
        preferredLanguage: data.language,
        profileImage: data.profileImage,
      },
    });
  };

  const handleImagePicker = async () => {
    const result = await pickImage();
    if (result) {
      setValue('profileImage', result, { shouldValidate: true });
    }
  };

  const handleAgeChange = useCallback((text: string) => {
    // Remove any non-numeric characters and decimal points
    const numericText = text.replace(/[^0-9]/g, '');

    return numericText;
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Icon
          name="chevron-back-outline"
          size={32}
          color={COLORS.black}
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.step}>Step 1</Text>
      </View>
      <Text style={styles.title}>Set up your profile</Text>
      <Text style={styles.description}>
        Tell us a bit about yourself to personalize your experience
      </Text>
      <TouchableOpacity
        style={styles.imagePickerContainer}
        onPress={handleImagePicker}>
        {profileImage ? (
          <Image
            source={{ uri: profileImage.uri }}
            style={styles.imagePickerImage}
            containerStyle={styles.imagePickerContainer}
          />
        ) : (
          <Text style={styles.imagePlaceholderText}>SJ</Text>
        )}
        <Icon
          name="camera-outline"
          size={18}
          color={COLORS.primary}
          style={styles.imagePickerIcon}
        />
      </TouchableOpacity>
      <Text style={styles.imagePickerText}>Upload Profile Image</Text>
      {errors.profileImage && (
        <Text style={styles.imageError}>{errors.profileImage.message}</Text>
      )}
      {PROFILE_FORM_FIELDS.map(_field => (
        <Controller
          key={_field.name}
          control={control}
          name={_field.name as keyof Omit<TProfileForm, 'profileImage'>}
          render={({ field }) => {
            return _field.isDropdown ? (
              <Dropdown
                data={_field.data}
                label={_field.label}
                placeholder={_field.placeholder}
                labelField="label"
                valueField="value"
                renderLeftIcon={() => (
                  <Icon
                    name={_field.leftIcon}
                    size={22}
                    color={COLORS.primary}
                    style={styles.leftIcon}
                  />
                )}
                errorMessage={errors?.[field.name]?.message}
                {...field}
              />
            ) : (
              <Input
                key={field.name}
                label={_field.label}
                placeholder={_field.placeholder}
                onChangeText={
                  _field.name === 'age'
                    ? text => field.onChange(handleAgeChange(text))
                    : field.onChange
                }
                keyboardType={_field.keyboardType as KeyboardTypeOptions}
                errorMessage={errors?.[field.name]?.message}
                autoCapitalize="none"
                leftIcon={
                  <Icon
                    name={_field.leftIcon}
                    size={22}
                    color={COLORS.primary}
                  />
                }
                {...field}
              />
            );
          }}
        />
      ))}
      <View style={styles.buttonContainer}>
        <Button title="Continue" onPress={handleSubmit(onSubmit)} />
      </View>
      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
};

export default Profile;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: verticalScale(10),
  },
  contentContainer: {
    paddingBottom: verticalScale(40),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(10),
  },
  step: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: theme.colors.grey2,
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: '500',
    color: theme.colors.foreground,
  },
  description: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: theme.colors.grey2,
    marginTop: verticalScale(10),
    marginBottom: verticalScale(24),
  },
  backIcon: {
    marginLeft: moderateScale(-8),
  },
  imagePickerContainer: {
    width: 110,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: moderateScale(100),
    backgroundColor: `${theme.colors.primary}40`,
    alignSelf: 'center',
    position: 'relative',
  },
  imagePickerImageContainer: {
    zIndex: 1,
  },
  imagePickerImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholderText: {
    fontSize: moderateScale(30),
    fontWeight: '600',
    color: theme.colors.primary,
  },
  imagePickerIcon: {
    position: 'absolute',
    bottom: moderateScale(4),
    right: moderateScale(4),
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: moderateScale(100),
    padding: moderateScale(4),
  },
  imagePickerText: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: theme.colors.primary,
    marginTop: verticalScale(10),
    textAlign: 'center',
  },
  imageError: {
    fontSize: moderateScale(14),
    fontWeight: '400',
    color: theme.colors.error,
    marginTop: verticalScale(10),
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: verticalScale(10),
  },
  leftIcon: {
    marginRight: moderateScale(10),
  },
  bottomSpacer: {
    height: verticalScale(40),
  },
}));
