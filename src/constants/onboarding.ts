import { PrivacyMode } from '@/models';
import { Country, Interest, Language } from '@/types/common';

export const COUNTRIES = Object.values(Country).map(country => ({
  label: country,
  value: country,
}));

export const LANGUAGES = Object.values(Language).map(language => ({
  label: language,
  value: language,
}));

export const PROFILE_FORM_FIELDS = [
  {
    name: 'fullName',
    label: 'Full Name',
    placeholder: 'Enter your full name',
    leftIcon: 'person-outline',
  },
  {
    name: 'age',
    label: 'Age',
    placeholder: 'Enter your age',
    leftIcon: 'time-outline',
    keyboardType: 'number-pad',
  },
  {
    name: 'country',
    label: 'Country',
    placeholder: 'Select your country name',
    leftIcon: 'globe-outline',
    isDropdown: true,
    data: COUNTRIES,
  },
  {
    name: 'language',
    label: 'Language',
    placeholder: 'Select language',
    leftIcon: 'language-outline',
    isDropdown: true,
    data: LANGUAGES,
  },
];

export const INTERESTS = [
  {
    label: 'Love',
    value: Interest.LOVE,
  },
  {
    label: 'Grief',
    value: Interest.GRIEF,
  },
  {
    label: 'Belief',
    value: Interest.BELIEF,
  },
  {
    label: 'Joy',
    value: Interest.JOY,
  },
  {
    label: 'Struggle',
    value: Interest.STRUGGLE,
  },
];

export const PRIVACY_SETTINGS = [
  {
    label: 'Public',
    value: PrivacyMode.PUBLIC,
    description: 'Everyone can see your responses',
  },
  {
    label: 'Private',
    value: PrivacyMode.PRIVATE,
    description: 'Only friends can see your responses',
  },
];
