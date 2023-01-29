import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import React, { ReactElement, ReactNode } from "react";
import { SWRConfig } from "swr";
import "../styles/globals.css";
import { StyledEngineProvider } from "@mui/material";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import Zendesk from "react-zendesk";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
const ZENDESK_KEY = "d3d22b75-f615-4441-887e-948e823a63df";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const setting = {
  color: {
    theme: "#000",
  },
  launcher: {
    chatLabel: {
      "en-US": "Need Help",
    },
  },
  contactForm: {
    fields: [
      { id: "description", prefill: { "*": "My pre-filled description" } },
    ],
  },
};

function MyApp({
  Component,
  pageProps: { session, fallback, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <SWRConfig value={fallback}>
      <SessionProvider
        session={session}
        refetchInterval={5 * 60}
        refetchOnWindowFocus={true}
      >
        {/* <ToastContainer /> */}
        <StyledEngineProvider injectFirst>
          <Toaster position="top-center" reverseOrder={false} />
          <Zendesk defer zendeskKey={ZENDESK_KEY} {...setting} />
          <ThemeWrapper>{getLayout(<Component {...pageProps} />)}</ThemeWrapper>
        </StyledEngineProvider>
      </SessionProvider>
    </SWRConfig>
  );
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
