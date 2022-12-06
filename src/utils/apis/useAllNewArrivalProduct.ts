import { GetHomePageBannerListResponse } from "@atoms/homePageBannerListAtom";
import { GetNewArrivalProductListResponse } from "@atoms/newArrivalProductListAtom";
import useSWR from "swr";
import fetcher from "../fetcher";

const useAllNewArrivalProduct = () => {
  const url = process.env.API_URL;
  const res = useSWR<GetNewArrivalProductListResponse>(
    [`${url}products/new-arrivals`],
    fetcher
  );
  return res;
};

export default useAllNewArrivalProduct;
