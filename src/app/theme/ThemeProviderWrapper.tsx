'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import theme from '@/src/app/theme/theme';

export default function ThemeProviderWrapper({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
