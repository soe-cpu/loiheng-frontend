import { GetProductListResponse } from "@atoms/productListAtom";
import useSWR from "swr";
import fetcher from "../fetcher";

const useAllNewArrivalProduct = (page = 1) => {
	const url = process.env.API_URL;
	const res = useSWR<GetProductListResponse>(
		[`${url}products/new-arrivals?page=${page}`],
		fetcher
	);
	return res;
};

export default useAllNewArrivalProduct;
