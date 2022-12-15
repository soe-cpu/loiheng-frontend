import { Product } from "@stores/wishlist.store";

export interface ProductInterface {
	id: number;
	image: string;
	name: string;
	price: string;
	category: string;
	data?: Product;
}

export const isInWishlist = (
	product: ProductInterface["data"],
	products?: Product[]
) => {
	const result = products ? products.find((p) => p?.id === product?.id) : [];

	if (result === undefined) {
		return false;
	} else {
		return true;
	}
};
