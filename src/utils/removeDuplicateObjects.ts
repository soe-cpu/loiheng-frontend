import { Product } from "@stores/wishlist.store";

export function removeDuplicateObjects(arr: any[]) {
	// Create a new empty array
	let uniqueObjects = [];

	// Loop through the original array
	for (let i = 0; i < arr.length; i++) {
		// Check if the current object is already present in the new array
		let isDuplicate = uniqueObjects.some((obj) => obj.id === arr[i].id);

		// If it is not a duplicate, add it to the new array
		if (!isDuplicate) {
			uniqueObjects.push(arr[i]);
		}
	}

	// Return the new array of unique objects
	return uniqueObjects;
}
