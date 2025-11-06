import { COUNTRIES, LANGUAGES } from './onboarding';

export const PROFILE_EDIT_FIELDS = [
  {
    name: 'fullName',
    label: 'Full Name',
    placeholder: 'Enter your full name',
    leftIcon: 'person-outline',
  },
  {
    name: 'email',
    label: 'Email Address',
    placeholder: 'Enter your email address',
    leftIcon: 'mail-outline',
    keyboardType: 'email-address',
    autoCapitalize: 'none',
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
    placeholder: 'Select your country',
    leftIcon: 'globe-outline',
    isDropdown: true,
    data: COUNTRIES,
  },
  {
    name: 'language',
    label: 'Language',
    placeholder: 'Select your language',
    leftIcon: 'language-outline',
    isDropdown: true,
    data: LANGUAGES,
  },
];
