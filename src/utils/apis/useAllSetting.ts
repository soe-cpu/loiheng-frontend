import { GetSettingResponse } from "@atoms/settingListAtom";
import useSWR from "swr";
import fetcher from "../fetcher";

const useAllSetting = (key?: string) => {
  const url = process.env.API_URL;
  const res = useSWR<GetSettingResponse>([`${url}settings/${key}`], fetcher);
  return res;
};

export default useAllSetting;
