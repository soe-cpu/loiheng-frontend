import { GetProductListResponse } from "@atoms/productListAtom";
import useSWR from "swr";
import fetcher from "../fetcher";

const useAllProduct = () => {
  const url = process.env.API_URL;
  const res = useSWR<GetProductListResponse>([`${url}products`], fetcher);
  return res;
};

export default useAllProduct;
