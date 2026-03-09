export const useNavigation = () => {
	const { menuLinks } = useAppConfig();
	const route = useRoute();
	const isMobileMenuOpen = ref(false);

	const toggleMobileMenu = () => {
		isMobileMenuOpen.value = !isMobileMenuOpen.value;
	};

	const closeMobileMenu = () => {
		isMobileMenuOpen.value = false;
	};

	const isActiveRoute = (path: string) => route.path === path;

	return {
		menuLinks,
		isMobileMenuOpen,
		toggleMobileMenu,
		closeMobileMenu,
		isActiveRoute,
	};
};
