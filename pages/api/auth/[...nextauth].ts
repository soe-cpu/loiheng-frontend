import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import axios from "axios";
import { use } from "react";

export interface UserLoginSuccessInterface {
	success: boolean;
	token: string;
	message: string;
	data: Data;
}

export interface Data {
	id: number;
	fullname: string;
	email: string;
	email_verified_at: any;
	phone_no: any;
	is_admin: any;
	is_active: any;
	last_login: any;
	role: any;
	status: any;
	dob: any;
	gender: any;
	profile_img: any;
	provider: any;
	provider_id: any;
	provider_token: any;
	created_at: string;
	updated_at: string;
}

export interface UserLoginFailedInterface {
	success: boolean;
	message: string;
}

export interface Me {
	success: boolean;
	data: CurrentUser;
}

export interface CurrentUser {
	id: number;
	fullname: string;
	email: string;
	email_verified_at: any;
	phone_no: any;
	is_admin: any;
	is_active: any;
	last_login: any;
	role: any;
	status: any;
	dob: any;
	gender: any;
	profile_img: any;
	provider: any;
	provider_id: any;
	provider_token: any;
	created_at: string;
	updated_at: string;
}

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password" },
			},

			authorize: async (credentials) => {
				const data = (await fetch(`${process.env.API_URL}auth/login`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(credentials),
				}).then((res) => res.json())) as
					| UserLoginSuccessInterface
					| UserLoginFailedInterface;

				if ("token" in data) {
					return {
						id: data.data.id.toString(),
						token: data.token,
						user: {
							id: data.data.id,
							name: data.data.fullname,
							email: data.data.email,
						},
					};
				}

				// if (data. === "Yes") {
				// 	return {
				// 		token: data.token,
				// 		user: {
				// 			id: data.data.user.id,
				// 			user_type: data.data.user_type,
				// 			name: data.data.user.employee.name,
				// 			email: data.data.user.employee.email,
				// 			image: data.data.user.employee.img,
				// 			role: {
				// 				department: data.data.departmentInfo[0].name,
				// 				position: data.data.positionInfo[0].name,
				// 			},
				// 		},
				// 	};
				// }
				return null;
			},
		}),
	],

	callbacks: {
		jwt: async ({ token, user }) => {
			if (user) {
				token.token = user.token;
				token.user = user.user;
			}
			const data = (await axios
				.get(`${process.env.API_URL}auth/me`, {
					headers: {
						Authorization: `${token.token}`,
					},
				})
				.then((res) => res.data)) as Me;

			token.user = {
				id: data.data.id,
				name: data.data.fullname,
				email: data.data.email,
				image: data.data.profile_img,
			};

			return token;
		},
		session: async ({ session, token, user }) => {
			if (token) {
				session.token = token.token;
				session.user = token.user;
			}

			return session;
		},
		async redirect({ url, baseUrl }) {
			// Allows relative callback URLs
			if (url.startsWith("/")) return `${baseUrl}${url}`;
			// Allows callback URLs on the same origin
			else if (new URL(url).origin === baseUrl) return url;
			return baseUrl;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
	jwt: {
		secret: process.env.NEXTAUTH_SECRET,
		maxAge: 60 * 60 * 24 * 30,
	},

	session: {
		strategy: "jwt",
		maxAge: 60 * 60 * 24 * 30,
	},

	pages: {
		signIn: "/auth/login",
	},
};

export default NextAuth(authOptions);
