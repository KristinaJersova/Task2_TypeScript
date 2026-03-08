import { Category } from "./Category";

export interface DiscountRule {
    category: Category;
    discountPercent: number;
    minRating?: number;
}