export interface GetNewArrivalProductListResponse {
  success: boolean;
  data: AllNewArrivalProductList;
  message: string;
  status: number;
}

export interface AllNewArrivalProductList {
  products: Product[];
  pagination: Pagination;
}

export interface Product {
  id: number;
  product_code: string;
  name: string;
  price: string;
  cover_img: string;
  description: string;
  short_description: any;
  sku: string;
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
  description: any;
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
  is_active: number;
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
