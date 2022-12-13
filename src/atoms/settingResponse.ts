export interface SettingResponse {
	success: boolean;
	data: Daum[];
	message: string;
	status: number;
}

export interface Daum {
	id: number;
	key: string;
	value: string;
	created_by: CreatedBy[];
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
