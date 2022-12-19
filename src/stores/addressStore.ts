import axios from "axios";
import { Session } from "next-auth";
import create from "zustand";
import { Pagination, User } from "./wishlist.store";

const url = process.env.API_URL;

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

export interface AddressActionResponse {
  success: boolean;
  message: string;
  status: number;
}

export interface AddressStoreInterface {
  address?: Address[];
  isSaving: boolean;
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
  ) => Promise<boolean>;
  removeAddress: (session: Session, id: number) => Promise<boolean>;
  successMsg: {};
}

const addressStore = create<AddressStoreInterface>((set, get) => ({
  address: [],
  isSaving: false,
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
    set({ isSaving: true });

    const res = axios.post<AddAddressResponse>(
      url + `address-create`,
      {
        full_name,
        phone,
        city,
        township,
        region,
        address_type,
        street_address,
        is_default,
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
      set({ successMsg: data.message });
      return true;
    } else {
      return false;
    }
  },
  removeAddress: async (session: Session, id: number) => {
    const res = axios.put<AddressActionResponse>(
      url + "address-remove/" + id,
      {},
      {
        headers: {
          Authorization: session.token,
        },
      }
    );

    if ((await res).data.success) {
      const address = get().address;
      const filtered = address?.filter((a) => a.id !== id);
      set({ address: filtered });
      return true;
    } else {
      return false;
    }
  },
  successMsg: {},
}));

export default addressStore;
