import { Product } from "./product.interface";

export interface CartItem {
	id: number;
	product: Product[];
	qty: string;
	is_active: number;
	created_at: string;
	updated_at: string;
}
