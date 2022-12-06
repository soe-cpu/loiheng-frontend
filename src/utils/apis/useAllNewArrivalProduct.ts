import { GetProductListResponse } from "@atoms/productListAtom";
import useSWR from "swr";
import fetcher from "../fetcher";

const useAllNewArrivalProduct = () => {
  const url = process.env.API_URL;
  const res = useSWR<GetProductListResponse>(
    [`${url}products/new-arrivals`],
    fetcher
  );
  return res;
};

export default useAllNewArrivalProduct;
