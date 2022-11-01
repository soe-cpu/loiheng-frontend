import '../styles/globals.css'
import type { AppProps } from 'next/app'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';


export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: any) => page);
  return <ThemeWrapper>{getLayout(<Component {...pageProps} />)}</ThemeWrapper>
}


const ThemeWrapper = (props: {
  children:
      | boolean
      | React.ReactChild
      | React.ReactFragment
      | React.ReactPortal
      | null
      | undefined;
}) => {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};
