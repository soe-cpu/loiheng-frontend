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
