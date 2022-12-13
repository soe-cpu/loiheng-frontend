import axios from "axios";
import { Session } from "next-auth";
import create from "zustand";

export interface User {
  id: number;
  fullname: string;
  email: string;
  email_verified_at?: any;
  phone_no?: any;
  is_admin: string;
  is_active: number;
  last_login?: any;
  role?: any;
  status?: any;
  dob?: any;
  gender?: any;
  profile_img?: any;
  provider?: any;
  provider_id?: any;
  provider_token?: any;
  created_at: Date;
  updated_at: Date;
}

export interface Address {
  id: number;
  user: User[];
  city: string;
  township: string;
  region: string;
  phone: string;
  full_name: string;
  is_default: number;
  address_type: string;
  street_address: string;
  is_active: number;
  created_at: Date;
  updated_at: Date;
}

export interface Pagination {
  current_page: number;
  first_page_url: string;
  last_page: number;
  last_page_url: string;
  next_page_url?: any;
  path: string;
  per_page: number;
  prev_page_url?: any;
  total: number;
}

export interface AddressData {
  address: Address[];
  pagination: Pagination;
}

export interface AddressResponse {
  success: boolean;
  data: AddressData;
  message: string;
  status: number;
}

export interface AddAddressData {
  user_id: number;
  full_name: string;
  phone: string;
  city: string;
  township: string;
  region: string;
  address_type: string;
  street_address: string;
  is_default: string;
  updated_at: Date;
  created_at: Date;
  id: number;
}

export interface AddAddressResponse {
  success: boolean;
  data: AddAddressData;
  message: string;
  status: number;
}

export interface AddressStoreInterface {
  address?: Address[];
  fetch: (session: Session) => void;
  addAddress: (
    session: Session,
    full_name?: string,
    phone?: string,
    city?: string,
    township?: string,
    region?: string,
    address_type?: string,
    street_address?: string,
    is_default?: boolean
  ) => void;
  successMsg: {};
}

const addressStore = create<AddressStoreInterface>((set, get) => ({
  address: [],
  fetch: async (session: Session) => {
    const url = process.env.API_URL;
    const res = await axios
      .get<AddressResponse>(url + `address`, {
        headers: {
          Authorization: session.token,
        },
      })
      .then((res) => {
        const { data } = res;

        if (data.success) {
          set({ address: data.data.address });
        }
      });
  },
  addAddress: async (
    session: Session,
    full_name?: string,
    phone?: string,
    city?: string,
    township?: string,
    region?: string,
    address_type?: string,
    street_address?: string,
    is_default?: boolean
  ) => {
    console.log(session.token);
    console.log(full_name);
    const url = process.env.API_URL;
    const res = await axios
      .post<AddAddressResponse>(
        url +
          `address-create?full_name=${full_name}&phone=${phone}&city=${city}&township=${township}&region=${region}&address_type=${address_type}&street_address=${street_address}&is_default=${is_default}`,
        {
          headers: {
            Authorization: session.token,
          },
        }
      )
      .then((res) => {
        const { data } = res;
        set({ successMsg: data.message });
      });
  },
  successMsg: {},
}));

export default addressStore;
