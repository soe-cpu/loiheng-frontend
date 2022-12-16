import { Pagination, Product } from "@stores/wishlist.store";

export interface GetProductListResponse {
	success: boolean;
	data: AllProductList;
	message: string;
	status: number;
}

export interface AllProductList {
	products: Product[];
	pagination: Pagination;
}
