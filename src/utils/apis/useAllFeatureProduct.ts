import { GetProductListResponse } from "@atoms/productListAtom";
import useSWR from "swr";
import fetcher from "../fetcher";

const useAllFeatureProduct = () => {
  const url = process.env.API_URL;
  const res = useSWR<GetProductListResponse>(
    [`${url}products/featured`],
    fetcher
  );
  return res;
};

export default useAllFeatureProduct;
