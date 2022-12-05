import create from "zustand";

export interface GetHomePageBannerListResponse {
  success: boolean;
  data: AllHomePageBannerList;
  message: string;
  status: number;
}

export interface AllHomePageBannerList {
  banner_sliders: BannerSlider[];
  pagination: Pagination;
}

export interface BannerSlider {
  id: number;
  image: string;
  created_by: CreatedBy[];
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

export interface Pagination {
  current_page: number;
  first_page_url: string;
  last_page: number;
  last_page_url: string;
  next_page_url: any;
  path: string;
  per_page: number;
  prev_page_url: any;
  total: number;
}
