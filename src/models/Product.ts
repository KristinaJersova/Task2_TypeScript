import { Category } from "./Category.js";
import { Supplier } from "./Supplier.js";
export interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    category: Category;
    Supplier: Supplier;
    specifications?: Record<string, string | number>;
}