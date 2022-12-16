import axios from "axios";
import { Session } from "next-auth";
import { removeDuplicateObjects } from "src/utils/removeDuplicateObjects";
import create from "zustand";
import { Pagination, Product, User } from "./wishlist.store";

export interface CartResponse {
	success: boolean;
	data: CartData;
	message: string;
	status: number;
}

export interface CartData {
	carts: Cart[];
	pagination: Pagination;
}

export interface Cart {
	id: number;
	user: User[];
	product: Product[];
	status: string;
	qty: string;
	is_active: number;
	is_preorder: number;
	created_at: string;
	updated_at: string;
}

// export interface User {
// 	id: number;
// 	fullname: string;
// 	email: string;
// 	email_verified_at: any;
// 	phone_no: any;
// 	is_admin: string;
// 	is_active: number;
// 	last_login: any;
// 	role: any;
// 	status: any;
// 	dob: any;
// 	gender: any;
// 	profile_img: any;
// 	provider: any;
// 	provider_id: any;
// 	provider_token: any;
// 	created_at: string;
// 	updated_at: string;
// }

// export interface Product {
// 	id: number;
// 	product_code: string;
// 	name: string;
// 	price: string;
// 	cover_img: string;
// 	description?: string;
// 	short_description?: string;
// 	sku: string;
// 	stock?: any;
// 	desc_file: string;
// 	approved_by: any;
// 	approved_when: any;
// 	status: any;
// 	is_active: number;
// 	is_preorder: any;
// 	is_feature_product?: any;
// 	is_new_arrival: number;
// 	created_by: CreatedBy[];
// 	category: Category[];
// 	brand: Brand[];
// 	product_specs: ProductSpec[];
// 	product_warranties: ProductWarranty[];
// 	product_pictures: ProductPicture[];
// 	created_at: string;
// 	updated_at: string;
// }

// export interface CreatedBy {
// 	id: number;
// 	fullname: string;
// 	email: string;
// 	email_verified_at: any;
// 	phone_no: any;
// 	is_admin: string;
// 	is_active: number;
// 	last_login: any;
// 	role: any;
// 	status: any;
// 	dob: any;
// 	gender: any;
// 	profile_img: any;
// 	provider: any;
// 	provider_id: any;
// 	provider_token: any;
// 	created_at: string;
// 	updated_at: string;
// }

// export interface Category {
// 	id: number;
// 	name: string;
// 	description: any;
// 	level: any;
// 	picture: string;
// 	picture_blob: any;
// 	status: any;
// 	created_by: number;
// 	parent: number;
// 	created_at: string;
// 	updated_at: string;
// }

// export interface Brand {
// 	id: number;
// 	name: string;
// 	description: string;
// 	picture: string;
// 	is_active: number;
// 	created_by: number;
// 	created_at: string;
// 	updated_at: string;
// }

// export interface ProductSpec {
// 	id: number;
// 	product_id: number;
// 	spec_key: string;
// 	spec_value: string;
// 	created_at: string;
// 	updated_at: string;
// }

// export interface ProductWarranty {
// 	id: number;
// 	product_id: number;
// 	service_key: string;
// 	service_value: string;
// 	created_at: string;
// 	updated_at: string;
// }

// export interface ProductPicture {
// 	id: number;
// 	image: string;
// 	product_id: number;
// 	display_order: number;
// 	is_active: number;
// 	created_at: string;
// 	updated_at: string;
// }

// export interface Pagination {
// 	current_page: number;
// 	first_page_url: string;
// 	last_page: number;
// 	last_page_url: string;
// 	next_page_url: any;
// 	path: string;
// 	per_page: number;
// 	prev_page_url: any;
// 	total: number;
// }

export interface AddToCartResponse {
	success: boolean;
	message: string;
	status: number;
}

export interface RemoveFromResponse {
	success: boolean;
	message: string;
	status: number;
}

export interface CartStoreInterface {
	carts?: Cart[];
	fetch: (session: Session) => void;
	addToCart: (session: Session, product_id: number) => void;
	removeFromCart: (
		session: Session,
		product_id: number
	) => Promise<RemoveFromResponse>;
}

const url = process.env.API_URL;

const cartStore = create<CartStoreInterface>((set, get) => ({
	carts: [],
	isSaving: false,
	fetch: async (session: Session) => {
		const res = await axios
			.get<CartResponse>(url + `carts`, {
				headers: {
					Authorization: session.token,
				},
			})
			.then((res) => {
				const { data } = res;

				if (data.success) {
					set({ carts: data.data.carts });
				}
			});
	},
	addToCart: async (session: Session, product_id: number) => {
		const res = await axios
			.post<AddToCartResponse>(
				url + "cart-create",
				{
					user_id: session.user?.id,
					product_id: product_id,
				},
				{
					headers: {
						Authorization: session.token,
					},
				}
			)
			.then((res) => {
				const { data } = res;
				const refresh = get().fetch;

				if (data.success) {
					refresh(session);
				}
			});
	},
	removeFromCart: async (session, product_id) => {
		const res = await axios
			.delete<RemoveFromResponse>(url + "remove-cart-item/" + product_id, {
				headers: {
					Authorization: session.token,
				},
			})
			.then((res) => {
				const { data } = res;
				const refresh = get().fetch;
				refresh(session);

				return data;
			})
			.catch((e) => {
				return e.response.data as RemoveFromResponse;
			});

		return res;
	},
}));

export default cartStore;
