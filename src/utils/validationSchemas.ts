import { Asset } from 'react-native-image-picker';
import * as Yup from 'yup';

/**
 * Email Validation Schema
 */
export const emailSchema = Yup.string()
  .email('Invalid email address')
  .required('Email address is required')
  .matches(/^\S*$/, 'No white spaces are allowed')
  .trim();

/**
 * Password Validation Schema
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 */
export const passwordSchema = Yup.string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  .matches(/[0-9]/, 'Password must contain at least one number')
  .matches(
    /[!@#$%^&*(),.?":{}|<>]/,
    'Password must contain at least one special character',
  );

/**
 * Confirm Password Schema
 */
export const confirmPasswordSchema = Yup.string()
  .required('Please confirm your password')
  .oneOf([Yup.ref('password')], 'Passwords must match');

/**
 * Age Validation Schema
 * Minimum age: 16 years
 * Validates string input and ensures it's a valid number
 */
export const ageSchema = Yup.string()
  .required('Age is required')
  .matches(/^\d+$/, 'Age must be a valid number')
  .test('age-range', 'You must be at least 16 years old', value => {
    if (!value) return false;
    const age = parseInt(value, 10);

    return age >= 16 && age <= 120;
  });

/**
 * Full Name Validation Schema
 */
export const fullNameSchema = Yup.string()
  .required('Full name is required')
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must not exceed 50 characters')
  .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
  .trim();

/**
 * OTP Validation Schema
 */
export const otpSchema = Yup.string()
  .required('OTP is required')
  .length(6, 'OTP must be exactly 6 digits')
  .matches(/^\d{6}$/, 'OTP must contain only numbers');

/**
 * Login Form Validation Schema
 */
export const loginSchema = Yup.object().shape({
  email: emailSchema,
  password: Yup.string().required('Password is required'),
});

/**
 * Signup Form Validation Schema
 */
export const signupSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
  confirm_password: confirmPasswordSchema,
  agreeToTerms: Yup.boolean()
    .oneOf([true], 'You must agree to the terms and privacy policy')
    .required('You must agree to the terms and privacy policy'),
});

/**
 * Forgot Password Schema
 */
export const forgotPasswordSchema = Yup.object().shape({
  email: emailSchema,
});

/**
 * Reset Password Schema
 */
export const resetPasswordSchema = Yup.object().shape({
  password: passwordSchema,
  confirm_password: confirmPasswordSchema,
});

/**
 * OTP Verification Schema
 */
export const otpVerificationSchema = Yup.object().shape({
  otp: otpSchema,
});

/**
 * Profile Onboarding Schema
 */
export const profileOnboardingSchema = Yup.object().shape({
  fullName: Yup.string().required('Full name is required'),
  age: Yup.string()
    .required('Age is required')
    .test(
      'min-age',
      'You must be at least 16 years old to use this app',
      value => {
        const age = parseInt(value || '0', 10);

        return age >= 16;
      },
    ),
  country: Yup.string().required('Country is required'),
  language: Yup.string().required('Language is required'),
  profileImage: Yup.mixed<Asset>().required('Profile image is required'),
});

/**
 * Privacy Onboarding Schema
 */
export const privacyOnboardingSchema = Yup.object().shape({
  interests: Yup.array()
    .of(Yup.string())
    .min(1, 'Please select at least one interest')
    .required('Please select at least one interest'),
  privacyMode: Yup.string()
    .oneOf(['public', 'private'], 'Please select a privacy mode')
    .required('Privacy mode is required'),
});

/**
 * Password Requirements Helper
 */
export const passwordRequirements = [
  { label: 'At least 8 characters', test: (val: string) => val.length >= 8 },
  { label: 'One uppercase letter', test: (val: string) => /[A-Z]/.test(val) },
  { label: 'One lowercase letter', test: (val: string) => /[a-z]/.test(val) },
  { label: 'One number', test: (val: string) => /[0-9]/.test(val) },
  {
    label: 'One special character',
    test: (val: string) => /[!@#$%^&*(),.?":{}|<>]/.test(val),
  },
];
