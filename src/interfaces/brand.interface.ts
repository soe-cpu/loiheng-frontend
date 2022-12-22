import { CreatedBy } from "./created-by.interface";

export interface Brand {
	id: number;
	name: string;
	picture: string;
	description: string;
	is_active: number;
	created_by: CreatedBy[];
	created_at: string;
	updated_at: string;
}
