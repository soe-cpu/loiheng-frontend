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

export interface AddressStoreInterface {
  checkCoupon: (
    session: Session,
    coupon_code?: string
  ) => Promise<CouponResponse>;
}

const couponStore = create<AddressStoreInterface>((set, get) => ({
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
