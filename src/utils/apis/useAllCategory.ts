import { GetCategoryResponse } from "@atoms/categoryListAtom";
import useSWR from "swr";
import fetcher from "../fetcher";

const useAllCategory = () => {
	const url = process.env.API_URL;
	const res = useSWR<GetCategoryResponse>(
		[`${url}categories?limit=1000`],
		fetcher
	);
	return res;
};

export default useAllCategory;
