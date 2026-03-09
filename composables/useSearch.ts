export const useSearch = () => {
	const isSearchOpen = ref(false);
	const searchQuery = ref("");
	const searchResults = ref<unknown[]>([]);
	const isSearching = ref(false);

	const openSearch = () => {
		isSearchOpen.value = true;
	};

	const closeSearch = () => {
		isSearchOpen.value = false;
		searchQuery.value = "";
		searchResults.value = [];
	};

	return {
		isSearchOpen,
		searchQuery,
		searchResults,
		isSearching,
		openSearch,
		closeSearch,
	};
};
