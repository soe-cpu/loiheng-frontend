import create from "zustand";
import axios from "axios";

export interface ContactResponse {
  success: boolean;
  data: ContactData;
  message: string;
  status: number;
}

export interface ContactData {
  name: string;
  email: string;
  phone_no: string;
  subject: string;
  description: string;
  updated_at: string;
  created_at: string;
  id: number;
}

export interface ContactStoreInterface {
  isSaving: boolean;
  createContact: (
    name?: string,
    email?: string,
    phone_no?: string,
    subject?: string,
    region?: string,
    description?: string
  ) => Promise<boolean>;
  successMsg: {};
}

const contactStore = create<ContactStoreInterface>((set, get) => ({
  isSaving: false,
  createContact: async (
    name?: string,
    email?: string,
    phone_no?: string,
    subject?: string,
    description?: string
  ) => {
    const url = process.env.API_URL;
    const res = axios.post<ContactResponse>(url + `contact`, {
      name,
      email,
      phone_no,
      subject,
      description,
    });
    if ((await res).data.success) {
      const { data } = await res;
      set({ isSaving: false });
      set({ successMsg: data.message });
      return true;
    } else {
      return false;
    }
  },
  successMsg: {},
}));

export default contactStore;
