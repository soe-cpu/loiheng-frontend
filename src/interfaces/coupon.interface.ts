export interface Coupon {
  id: number;
  code: string;
  count: number;
  expired_date: string;
  value: number;
  type: string;
  is_customer: number;
  note: string;
  created_by: number;
  is_active: number;
  created_at: Date;
  updated_at: Date;
}
