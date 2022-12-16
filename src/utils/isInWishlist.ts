import { Product } from "@stores/wishlist.store";

export interface ProductInterface {
	id: number;
	image: string;
	name: string;
	price: number;
	category: string;
	data: Product;
}

export const isInWishlist = (product: Product, products?: Product[]) => {
	const result = products ? products.find((p) => p?.id === product?.id) : [];

	if (result === undefined) {
		return false;
	} else {
		return true;
	}
};
