import '@rneui/themed';

declare module '@rneui/themed' {
  export interface Colors {
    tertiary: string;
    info: string;
    neutralGrey: string;
    foreground: string;
  }

  export interface ThemeSpacing {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  }
}
