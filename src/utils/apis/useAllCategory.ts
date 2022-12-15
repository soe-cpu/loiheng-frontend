import { GetCategoryResponse } from "@atoms/categoryListAtom";
import useSWR from "swr";
import fetcher from "../fetcher";

const useAllCategory = () => {
  const url = process.env.API_URL;
  const res = useSWR<GetCategoryResponse>([`${url}categories`], fetcher);
  return res;
};

export default useAllCategory;
