export interface Coupon {
  id: number;
  code: string;
  count: number;
  expired_date: string;
  value: number;
  type: string;
  is_customer: number;
  note?: any;
  created_by: number;
  is_active: number;
  created_at: Date;
  is_used: boolean;
}
