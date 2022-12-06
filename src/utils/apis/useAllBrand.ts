import { GetBrandResponse } from "@atoms/brandListAtom";
import useSWR from "swr";
import fetcher from "../fetcher";

const useAllBrand = () => {
  const url = process.env.API_URL;
  const res = useSWR<GetBrandResponse>([`${url}brands`], fetcher);
  return res;
};

export default useAllBrand;
