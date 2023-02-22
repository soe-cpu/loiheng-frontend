import { Brand } from "@interfaces/brand.interface";
import { Category } from "@interfaces/category.interface";
import { CreatedBy } from "@interfaces/created-by.interface";
import { Order } from "@interfaces/order.interface";
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
