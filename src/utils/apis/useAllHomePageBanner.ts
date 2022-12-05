import { GetHomePageBannerListResponse } from "@atoms/homePageBannerListAtom";
import useSWR from "swr";
import fetcher from "../fetcher";

const useAllHomePageBanner = (token?: string) => {
  const url = process.env.API_URL;
  const res = useSWR<GetHomePageBannerListResponse>(
    [`${url}home-page-banner-image`, token],
    fetcher
  );
  return res;
};

export default useAllHomePageBanner;
