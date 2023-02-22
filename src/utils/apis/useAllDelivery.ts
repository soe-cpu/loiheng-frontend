import { GetDeliveryResponse } from "@atoms/deliveryListAtom";
import useSWR from "swr";
import fetcher from "../fetcher";

const useAllDelivery = () => {
  const url = process.env.API_URL;
  const res = useSWR<GetDeliveryResponse>(
    [`${url}deliveries?limit=1000`],
    fetcher
  );
  return res;
};

export default useAllDelivery;
