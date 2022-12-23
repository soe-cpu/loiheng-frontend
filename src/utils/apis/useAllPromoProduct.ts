import { GetProductListResponse } from "@atoms/productListAtom";
import useSWR from "swr";
import fetcher from "../fetcher";

const useAllPromoProduct = (
	categories?: number[],
	brands?: number[],
	page = 1,
	limit = 15
) => {
	const url = process.env.API_URL;
	const res = useSWR<GetProductListResponse>(
		[
			`${url}promotions?category_id=${categories?.join(
				","
			)}&brand_id=${brands?.join(",")}&limit=${limit}&page=${page}`,
		],
		fetcher
	);
	return res;
};

export default useAllPromoProduct;
