const STORAGE_KEY = "store_products";
export const storageService = {
    saveProducts(products) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    },
    loadProducts() {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }
};
