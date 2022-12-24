import { CreatedBy } from "@interfaces/created-by.interface";

export interface GetSettingResponse {
  success: boolean;
  data: SettingData;
  message: string;
  status: number;
}

export interface SettingData {
  id: number;
  key: string;
  value: string;
  created_by: CreatedBy[];
  created_at: string;
}
