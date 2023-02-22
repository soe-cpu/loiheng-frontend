import { Address } from "@stores/addressStore";
import { User } from "@stores/wishlist.store";
import { Product } from "./product.interface";

export interface Order {
  id: number;
  user: User;
  cart: Cart;
  address: Address;
  delivery: any;
  payment_method: string;
  coupon_code: any;
  coupon_price: any;
  total_price?: string;
  discount_price: any;
  status: string;
  order_no: string;
  delivery_fee?: string;
  is_active: number;
  is_preorder: number;
  created_at: string;
  updated_at: string;
}

export interface Cart {
  id: number;
  user: User[];
  cart_item: CartItem[];
  subtotal: number;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: number;
  product: Product[];
  qty: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}
