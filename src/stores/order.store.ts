import axios from "axios";
import { Session } from "next-auth";
import create from "zustand";

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
  description: string;
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
  is_active: any;
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
  service_key: string;
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

export interface Address {
  id: number;
  user_id: number;
  city: string;
  township: string;
  region: string;
  phone: string;
  full_name: string;
  is_default: number;
  address_type: string;
  is_active: number;
  street_address: string;
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

export interface OrderStoreInterface {
  orders?: Order[];
  fetch: (session: Session) => void;
}

const orderStore = create<OrderStoreInterface>((set, get) => ({
  orders: [],
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
}));

export default orderStore;
