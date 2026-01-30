import type { Metadata } from 'next';
import './globals.css';
import React, { ReactNode } from 'react';
import ThemeProviderWrapper from '@/src/app/theme/ThemeProviderWrapper';
import { poppins } from '@/src/app/theme/theme';
import StoreProvider from '@/src/store/StoreProvider';
import AppReactToastify from '@/src/shared/AppReactToastify';

export const metadata: Metadata = {
  title: 'Payments-tracker',
  description: 'Payments-tracker'
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en'>
      <body className={`${poppins.className} ${poppins.className} antialiased flex is-full min-bs-full flex-auto flex-col`}>
        <ThemeProviderWrapper>
          <StoreProvider>
            {children}
            <AppReactToastify />
          </StoreProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
