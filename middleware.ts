import { withAuth } from "next-auth/middleware";

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
	callbacks: {
		authorized: ({ req, token }) => {
			if (token?.user) {
				return true;
			} else {
				return req.nextUrl.pathname === "/auth/login";
			}
		},
		// /admin requires admin role, but /me only requires the user to be logged in.
		// req.nextUrl.pathname !== "/dashboard" || token?.userType === "admin",
	},
});

export const config = {
	matcher: [
		"/profile/:path*",
		"/wishlists/:path*",
		"/addtocart/:path*",
		"/checkout/:path*",
	],
};
