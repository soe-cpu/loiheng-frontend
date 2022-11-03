import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
import { NextPage } from "next";
import { AppProps } from "next/app";
import React, { ReactElement, ReactNode } from "react";
import "../styles/globals.css";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
function MyApp({ Component, pageProps: { ...pageProps } }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return <ThemeWrapper>{getLayout(<Component {...pageProps} />)}</ThemeWrapper>;
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
export default MyApp;
