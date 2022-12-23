import { CreatedBy } from "./created-by.interface";
import { SubCategory } from "./sub-category.interface.";

export interface Category {
	id: number;
	name: string;
	picture: string;
	description: any;
	sub_category: SubCategory[];
	created_by: CreatedBy[];
	created_at: string;
	updated_at: string;
}
