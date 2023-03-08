import { Coupon } from "@interfaces/coupon.interface";
import axios from "axios";
import { Session } from "next-auth";
import create from "zustand";

const url = process.env.API_URL;

export interface CouponResponse {
  success: boolean;
  data: Coupon;
  message: string;
  status: number;
}
export interface CouponListResponse {
  success: boolean;
  data: Coupon[];
  message: string;
  status: number;
}

export interface CustomerCoupon {
  coupon_codes: Coupon;
  is_active: number;
}

export interface CustomerCouponResponse {
  success: boolean;
  data: CustomerCoupon[];
  message: string;
  status: number;
}

export interface CouponStoreInterface {
  coupons?: Coupon[];
  customer_coupons?: CustomerCoupon[];
  fetch: (session: Session) => void;
  fetchCustomerCoupon: (session: Session) => void;
  checkCoupon: (
    session: Session,
    coupon_code?: string
  ) => Promise<CouponResponse>;
}

const couponStore = create<CouponStoreInterface>((set, get) => ({
  fetch: async (session: Session) => {
    const url = process.env.API_URL;
    const res = await axios
      .get<CouponListResponse>(url + `coupon-codes`, {
        headers: {
          Authorization: session.token,
        },
      })
      .then((res) => {
        const { data } = res;

        if (data.success) {
          set({ coupons: data.data });
        }
      });
  },
  fetchCustomerCoupon: async (session: Session) => {
    const url = process.env.API_URL;
    const res = await axios
      .get<CustomerCouponResponse>(url + `coupon-codes?is_customer=1`, {
        headers: {
          Authorization: session.token,
        },
      })
      .then((res) => {
        const { data } = res;

        if (data.success) {
          set({ customer_coupons: data.data });
        }
      });
  },
  checkCoupon: async (session, coupon_code) => {
    const res = await axios
      .post<CouponResponse>(
        url + "apply-coupon-code/" + coupon_code,
        {},
        {
          headers: {
            Authorization: session.token,
          },
        }
      )
      .then((res) => {
        const { data } = res;
        return data;
      })
      .catch((e) => {
        return e.response.data as CouponResponse;
      });

    return res;
  },
}));

export default couponStore;
