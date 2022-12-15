export interface GetCategoryResponse {
    success: boolean
    data: CategoryResponse
    message: string
    status: number
  }
  
  export interface CategoryResponse {
    categories: Category[]
    pagination: Pagination
  }
  
  export interface Category {
    id: number
    name: string
    picture: string
    description?: string
    sub_category: SubCategory[]
    created_by: CreatedBy[]
    created_at: string
    updated_at: string
  }
  
  export interface SubCategory {
    id: number
    name: string
    description: any
    level: any
    picture: string
    picture_blob: any
    status: any
    created_by: number
    parent: number
    created_at: string
    updated_at: string
  }
  
  export interface CreatedBy {
    id: number
    fullname: string
    email: string
    email_verified_at: any
    phone_no: any
    is_admin: string
    is_active: number
    last_login: any
    role: any
    status: any
    dob: any
    gender: any
    profile_img: any
    provider: any
    provider_id: any
    provider_token: any
    created_at: string
    updated_at: string
  }
  
  export interface Pagination {
    current_page: number
    first_page_url: string
    last_page: number
    last_page_url: string
    next_page_url: string
    path: string
    per_page: number
    prev_page_url: any
    total: number
  }
  