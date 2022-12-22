import { Brand } from "./brand.interface";
import { Category } from "./category.interface";
import { CreatedBy } from "./created-by.interface";
import { Discount } from "./discount.interface";
import { ProductPicture } from "./product-picture.interface";
import { ProductSpec } from "./product-spec.interface";
import { ProductWarranty } from "./product-warranty.interface";

export interface Product {
	id: number;
	product_code: string;
	name: string;
	price: number;
	cover_img: string;
	description?: string;
	short_description?: string;
	sku: string;
	stock?: any;
	desc_file: string;
	approved_by: any;
	approved_when: any;
	status: any;
	is_active: number;
	is_preorder: any;
	is_feature_product?: number;
	is_new_arrival: number;
	created_by: CreatedBy[];
	category: Category[];
	brand: Brand[];
	product_specs: ProductSpec[];
	product_warranties: ProductWarranty[];
	product_pictures: ProductPicture[];
	discount: Discount[];
	created_at: string;
	updated_at: string;
}
