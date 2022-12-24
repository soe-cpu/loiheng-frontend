import { Product } from "@stores/wishlist.store";

export interface ProductInterface {
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
