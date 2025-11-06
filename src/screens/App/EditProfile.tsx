import React, { useCallback, useEffect } from 'react';
import { Controller, Resolver, useForm } from 'react-hook-form';
import {
  KeyboardTypeOptions,
  ScrollView,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import { Asset } from 'react-native-image-picker';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { Theme } from '@rneui/base';
import { Image, makeStyles, Text, useTheme } from '@rneui/themed';

import Button from '@/components/Button';
import Dropdown from '@/components/Dropdown';
import Input from '@/components/Input';
import { PROFILE_EDIT_FIELDS } from '@/constants/profile';
import { useAuthStore } from '@/store/authStore';
import { Country, Language } from '@/types/common';
import { pickImage, useToastNotification } from '@/utils';
import { profileEditSchema } from '@/utils/validationSchemas';

interface TProfileEditForm {
  fullName: string;
  email: string;
  age: string;
  country: string;
  language: string;
  profileImage?: Asset;
}

const EditProfile = () => {
  const { user, setUser } = useAuthStore();
  const navigation = useNavigation();
  const toast = useToastNotification();
  const { theme } = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch,
    reset,
  } = useForm<TProfileEditForm>({
    mode: 'onSubmit',
    resolver: yupResolver(profileEditSchema) as Resolver<TProfileEditForm>,
    defaultValues: {
      fullName: user?.fullName || '',
      email: user?.email || '',
      age: user?.age?.toString() || '',
      country: user?.country || '',
      language: user?.preferredLanguage || '',
    },
  });

  const styles = useStyles();
  const profileImage = watch('profileImage');

  // Reset form when user data changes
  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName || '',
        email: user.email || '',
        age: user.age?.toString() || '',
        country: user.country || '',
        language: user.preferredLanguage || '',
      });
    }
  }, [user, reset]);

  const onSubmit = useCallback(
    (data: TProfileEditForm) => {
      if (!user) return;

      // Update user data in store
      const updatedUser = {
        ...user,
        fullName: data.fullName,
        email: data.email,
        age: parseInt(data.age, 10),
        country: data.country as Country,
        preferredLanguage: data.language as Language,
        // Store profile image URI locally if changed
        ...(profileImage && {
          profilePicture: {
            ...user.profilePicture,
            path: profileImage.uri || '',
          },
        }),
      };

      setUser(updatedUser);
      toast('Profile updated successfully!', 'success');
      navigation.goBack();
    },
    [user, profileImage, setUser, toast, navigation],
  );

  const handleImagePicker = useCallback(async () => {
    const result = await pickImage();
    if (result) {
      setValue('profileImage', result, { shouldValidate: true });
    }
  }, [setValue]);

  const handleAgeChange = useCallback((text: string) => {
    // Remove any non-numeric characters
    const numericText = text.replace(/[^0-9]/g, '');

    return numericText;
  }, []);

  const getProfileImageUri = useCallback(() => {
    if (profileImage?.uri) return profileImage.uri;
    if (user?.profilePicture?.path) return user.profilePicture.path;

    return null;
  }, [profileImage, user?.profilePicture?.path]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      <Text style={styles.description}>Update your profile information</Text>

      {/* Profile Image Picker */}
      <TouchableOpacity
        style={styles.imagePickerContainer}
        onPress={handleImagePicker}>
        {getProfileImageUri() ? (
          <Image
            source={{ uri: getProfileImageUri()! }}
            style={styles.imagePickerImage}
            containerStyle={styles.imagePickerImageContainer}
          />
        ) : (
          <Text style={styles.imagePlaceholderText}>
            {user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
          </Text>
        )}
        <Icon
          name="camera-outline"
          size={18}
          color={theme.colors.primary}
          style={styles.imagePickerIcon}
        />
      </TouchableOpacity>
      <Text style={styles.imagePickerText}>Tap to change profile image</Text>
      {errors.profileImage && (
        <Text style={styles.imageError}>{errors.profileImage.message}</Text>
      )}

      {/* Profile Form Fields */}
      {PROFILE_EDIT_FIELDS.map(_field => (
        <Controller
          key={_field.name}
          control={control}
          name={_field.name as keyof Omit<TProfileEditForm, 'profileImage'>}
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
                    color={theme.colors.primary}
                    style={styles.leftIcon}
                  />
                )}
                errorMessage={errors?.[field.name]?.message as string}
                {...field}
              />
            ) : (
              <Input
                label={_field.label}
                placeholder={_field.placeholder}
                onChangeText={
                  _field.name === 'age'
                    ? text => field.onChange(handleAgeChange(text))
                    : field.onChange
                }
                keyboardType={_field.keyboardType as KeyboardTypeOptions}
                autoCapitalize={
                  _field.autoCapitalize as TextInputProps['autoCapitalize']
                }
                errorMessage={errors?.[field.name]?.message as string}
                leftIcon={
                  <Icon
                    name={_field.leftIcon}
                    size={22}
                    color={theme.colors.primary}
                  />
                }
                {...field}
              />
            );
          }}
        />
      ))}

      {/* Save Button */}
      <View style={styles.buttonContainer}>
        <Button
          title="Save Changes"
          onPress={handleSubmit(onSubmit)}
          disabled={!isDirty && !profileImage}
        />
      </View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
};

export default EditProfile;

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
  description: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: theme.colors.grey2,
    marginTop: verticalScale(10),
    marginBottom: verticalScale(24),
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
    overflow: 'hidden',
  },
  imagePickerImageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(100),
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
    fontSize: moderateScale(14),
    fontWeight: '400',
    color: theme.colors.grey2,
    marginTop: verticalScale(10),
    marginBottom: verticalScale(20),
    textAlign: 'center',
  },
  imageError: {
    fontSize: moderateScale(14),
    fontWeight: '400',
    color: theme.colors.error,
    marginTop: verticalScale(5),
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: verticalScale(16),
  },
  leftIcon: {
    marginRight: moderateScale(10),
  },
  bottomSpacer: {
    height: verticalScale(40),
  },
}));
