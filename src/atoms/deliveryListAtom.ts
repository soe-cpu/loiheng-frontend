import { Delivery } from "@interfaces/delivery.interface";
import { Pagination } from "@interfaces/pagination.interface";

export interface Data {
  deliveries: Delivery[];
  pagination: Pagination;
}

export interface GetDeliveryResponse {
  success: boolean;
  data: Data;
  message: string;
  status: number;
}
