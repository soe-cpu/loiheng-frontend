import { GetProductListResponse } from "@atoms/productListAtom";
import useSWR from "swr";
import fetcher from "../fetcher";

const useAllProduct = (
	categories?: number[],
	brands?: number[],
	page = 1,
	limit = 15
) => {
	const url = process.env.API_URL;
	const res = useSWR<GetProductListResponse>(
		[
			`${url}products?category_id=${categories}&brand_id=${brands}&limit=${limit}&page=${page}`,
		],
		fetcher
	);
	return res;
};

export default useAllProduct;
