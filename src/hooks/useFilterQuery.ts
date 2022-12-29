import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useFilterQuery() {
	// States
	const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
	const [selectedBrands, setSelectedBrands] = useState<number[]>([]);

	const router = useRouter();

	useEffect(() => {
		const brands = router.query.brands as string;
		const categories = router.query.categories as string;

		if (brands) {
			setSelectedBrands(brands.split(",").map((b) => parseInt(b)));
		} else {
			setSelectedBrands([]);
		}
		if (categories) {
			setSelectedCategories(categories.split(",").map((b) => parseInt(b)));
		} else {
			setSelectedCategories([]);
		}
	}, [router]);

	return {
		brands: selectedBrands,
		categories: selectedCategories,
	};
}
