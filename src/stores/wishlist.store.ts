import axios from "axios";
import { Session } from "next-auth";
import create from "zustand";
import createVanilla from "zustand/vanilla";

export interface WishlistResponse {
	success: boolean;
	data: Data;
	message: string;
	status: number;
}

export interface Data {
	wishlists: Wishlist[];
	pagination: Pagination;
}

export interface Wishlist {
	id: number;
	user: User[];
	product: Product[];
	created_at: string;
	updated_at: string;
}

export interface User {
	id: number;
	fullname: string;
	email: string;
	email_verified_at: any;
	phone_no: any;
	is_admin: string;
	is_active: number;
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

export interface Product {
	id: number;
	product_code: string;
	name: string;
	price: string;
	cover_img: string;
	description?: string;
	short_description?: string;
	sku: string;
	stock?: string;
	desc_file: string;
	approved_by: any;
	approved_when: any;
	status: any;
	is_active: number;
	is_preorder: any;
	is_feature_product?: number;
	is_new_arrival: number;
	created_by: CreatedBy[];
	category: Category[];
	brand: Brand[];
	product_specs: ProductSpec[];
	product_warranties: ProductWarranty[];
	product_pictures: ProductPicture[];
	created_at: string;
	updated_at: string;
}

export interface CreatedBy {
	id: number;
	fullname: string;
	email: string;
	email_verified_at: any;
	phone_no: any;
	is_admin: string;
	is_active: number;
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

export interface Category {
	id: number;
	name: string;
	description?: string;
	level: any;
	picture: string;
	picture_blob: any;
	status: any;
	created_by: number;
	parent: number;
	created_at: string;
	updated_at: string;
}

export interface Brand {
	id: number;
	name: string;
	description: string;
	picture: string;
	is_active: number;
	created_by: number;
	created_at: string;
	updated_at: string;
}

export interface ProductSpec {
	id: number;
	product_id: number;
	spec_key: string;
	spec_value: string;
	created_at: string;
	updated_at: string;
}

export interface ProductWarranty {
	id: number;
	product_id: number;
	service_key?: string;
	service_value: string;
	created_at: string;
	updated_at: string;
}

export interface ProductPicture {
	id: number;
	image: string;
	product_id: number;
	display_order: number;
	is_active: number;
	created_at: string;
	updated_at: string;
}

export interface Pagination {
	current_page: number;
	first_page_url: string;
	last_page: number;
	last_page_url: string;
	next_page_url: any;
	path: string;
	per_page: number;
	prev_page_url: any;
	total: number;
}

export interface WishlistAddedResponse {
	success: boolean;
	message: string;
	status: number;
}

export interface WishlistStoreInterface {
	wishlists?: Product[];
	fetch: (session: Session) => void;
	addWishlist: (session: Session, product: Product) => void;
}

function removeDuplicateObjects(arr: Product[]) {
	// Create a new empty array
	let uniqueObjects = [];

	// Loop through the original array
	for (let i = 0; i < arr.length; i++) {
		// Check if the current object is already present in the new array
		let isDuplicate = uniqueObjects.some((obj) => obj.id === arr[i].id);

		// If it is not a duplicate, add it to the new array
		if (!isDuplicate) {
			uniqueObjects.push(arr[i]);
		}
	}

	// Return the new array of unique objects
	return uniqueObjects;
}

const store = createVanilla<WishlistStoreInterface>((set, get) => ({
	wishlists: [],
	fetch: async (session: Session) => {
		const url = process.env.API_URL;
		const res = await axios
			.get<WishlistResponse>(url + `wishlists`, {
				headers: {
					Authorization: session.token,
				},
			})
			.then((res) => {
				const { data } = res;

				if (data.success) {
					const wishlists = get().wishlists ?? [];
					let rr = [...wishlists];
					data.data.wishlists.map((wishlist) => {
						rr.push(wishlist.product[0]);
					});
					const list = removeDuplicateObjects(rr);
					set({ wishlists: list });
				}
			});
	},
	addWishlist: async (session, product) => {
		const url = process.env.API_URL;
		const res = await axios
			.post<WishlistAddedResponse>(
				url + "wishlist-create",
				{
					user_id: session.user?.id,
					product_id: product.id,
				},
				{
					headers: {
						Authorization: session.token,
					},
				}
			)
			.then((res) => {
				const { data } = res;

				if (data.success === true) {
					const wishlists = get().wishlists ?? [];
					const rr = [...wishlists, product];
					const list = removeDuplicateObjects(rr);
					set({ wishlists: list });
				}
			});
	},
}));

const wishlistStore = create(store);

export default wishlistStore;
