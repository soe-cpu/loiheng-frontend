import { Brand } from "@interfaces/brand.interface";
import { Category } from "@interfaces/category.interface";
import { CreatedBy } from "@interfaces/created-by.interface";
import { ProductPicture } from "@interfaces/product-picture.interface";
import { ProductSpec } from "@interfaces/product-spec.interface";
import { ProductWarranty } from "@interfaces/product-warranty.interface";
import axios from "axios";
import { Session } from "next-auth";
import toast from "react-hot-toast";
import create from "zustand";
import { Address } from "./addressStore";

export interface OrderResponse {
  success: boolean;
  data: Order[];
  message: string;
  status: number;
}

export interface Order {
  id: number;
  user: User[];
  cart: Cart[];
  address: Address[];
  delivery: Delivery[];
  payment_method: string;
  coupon_code: string;
  coupon_price: string;
  total_price: string;
  discount_price: string;
  status: string;
  order_no: string;
  delivery_fee: string;
  is_active: number;
  is_preorder: number;
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

export interface Product {
  id: number;
  product_code: string;
  name: string;
  price: string;
  cover_img: string;
  description: string;
  short_description: string;
  sku: string;
  stock: any;
  desc_file: string;
  approved_by: any;
  approved_when: any;
  status: any;
  is_active: number;
  is_preorder: any;
  is_feature_product: any;
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

export interface Delivery {
  id: number;
  name: string;
  description: string;
  fee: string;
  rage: number;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface CreateOrderData {
  user_id: number;
  cart_id: string;
  address_id: number;
  delivery_id?: any;
  payment_method: string;
  coupon_code?: any;
  coupon_price?: any;
  total_price: string;
  order_no: string;
  updated_at: Date;
  created_at: Date;
  id: number;
}

export interface CreateOrderResponse {
  success: boolean;
  data: CreateOrderData;
  message: string;
  status: number;
}

export interface OrderStoreInterface {
  orders?: Order[];
  isSaving: false;
  fetch: (session: Session) => void;
  createOrder: (
    session: Session,
    address_id?: number,
    full_name?: string,
    phone?: string,
    city?: string,
    township?: string,
    region?: string,
    address_type?: number,
    street_address?: string,
    payment_method?: string,
    coupon_code?: string,
    coupon_price?: string,
    product_id?: number,
    qty?: number,
    delivery_id?: number
  ) => Promise<boolean>;
}

const orderStore = create<OrderStoreInterface>((set, get) => ({
  orders: [],
  isSaving: false,
  fetch: async (session: Session) => {
    const url = process.env.API_URL;
    const res = await axios
      .get<OrderResponse>(url + `orders`, {
        headers: {
          Authorization: session.token,
        },
      })
      .then((res) => {
        const { data } = res;

        if (data.success) {
          set({ orders: data.data });
        }
      });
  },
  createOrder: async (
    session: Session,
    address_id?: number,
    full_name?: string,
    phone?: string,
    city?: string,
    township?: string,
    region?: string,
    address_type?: number,
    street_address?: string,
    payment_method?: string,
    coupon_code?: string,
    coupon_price?: string,
    product_id?: number,
    qty?: number,
    delivery_id?: number
  ) => {
    const url = process.env.API_URL;
    const res = axios.post<CreateOrderResponse>(
      url + `order-create`,
      {
        address_id,
        full_name,
        phone,
        city,
        township,
        region,
        address_type,
        street_address,
        payment_method,
        coupon_code,
        coupon_price,
        product_id,
        qty,
        delivery_id,
      },
      {
        headers: {
          Authorization: session.token,
        },
      }
    );
    if ((await res).data.success) {
      const { data } = await res;
      set({ isSaving: false });
      return true;
    } else {
      return false;
    }
  },
}));

export default orderStore;
