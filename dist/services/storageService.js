"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageService = void 0;
const STORAGE_KEY = "store_products";
exports.storageService = {
    saveProducts(products) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    },
    loadProducts() {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }
};
