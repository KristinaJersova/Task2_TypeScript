import { Product } from "../models/Product.js";

const STORAGE_KEY = "store_products";

export const storageService = {
    saveProducts(products: Product[]): void {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    },
    loadProducts(): Product[] {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }
};