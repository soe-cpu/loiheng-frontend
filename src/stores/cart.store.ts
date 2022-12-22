import axios from "axios";
import { Session } from "next-auth";
import { removeDuplicateObjects } from "src/utils/removeDuplicateObjects";
import create from "zustand";
import { Pagination, Product, User } from "./wishlist.store";
import { CartItem } from "@interfaces/cart-item.interface";
import { toast } from "react-hot-toast";

export interface CartResponse {
	success: boolean;
	data: Cart[];
	message: string;
	status: number;
}

export interface Cart {
	id: number;
	user: User[];
	cart_item: CartItem[];
	is_active: number;
	created_at: string;
	updated_at: string;
}

export interface AddToCartResponse {
	success: boolean;
	data: Cart[];
	message: string;
	status: number;
}

export interface RemoveFromResponse {
	success: boolean;
	message: string;
	status: number;
}

export interface CartStoreInterface {
	cart?: Cart;
	fetch: (session: Session) => void;
	addToCart: (session: Session, product_id: number, qty: number | null) => void;
	removeFromCart: (
		session: Session,
		product_id: number
	) => Promise<RemoveFromResponse>;
	changeQuantity: (
		session: Session,
		product_id: number,
		qty: number | null
	) => void;
}

const url = process.env.API_URL;

const cartStore = create<CartStoreInterface>((set, get) => ({
	cart: undefined,
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
					set({ cart: data.data[0] });
				}
			});
	},
	addToCart: async (
		session: Session,
		product_id: number,
		qty: number | null
	) => {
		const res = await axios
			.post<AddToCartResponse>(
				url + "cart-create",
				{
					qty: qty,
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
					toast.success(data.message);
					refresh(session);
				} else {
					toast.error(data.message);
				}
			});
	},
	removeFromCart: async (session, cart_item_id) => {
		const res = await axios
			.delete<RemoveFromResponse>(url + "remove-cart-item/" + cart_item_id, {
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
	changeQuantity: async (session, product_id, qty) => {
		const res = await axios
			.post<AddToCartResponse>(
				url + "cart-create",
				{
					qty: qty,
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
					toast.success("Updated cart item quantity.");
					refresh(session);
				} else {
					toast.error("Failed to update cart item quantity.");
				}
			});
	},
}));

export default cartStore;
