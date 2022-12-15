import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import React, { ReactElement, ReactNode } from "react";
import { SWRConfig } from "swr";
import "../styles/globals.css";
import { StyledEngineProvider } from "@mui/material";
import { Toaster } from "react-hot-toast";

export type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
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
