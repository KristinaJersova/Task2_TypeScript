import { DiscountRule } from "../models/DiscountRule";
import { Category } from "../models/Category";

export function getDiscountPrice(
    price: number,
    category: Category,
    rating: number | null,
    rules: DiscountRule[]
): number | null {
    const rule = rules.find(r => r.category === category);
    if (!rule) return null;

    if (rule.minRating && (rating === null || rating < rule.minRating)) {
        return null;
    }

    const discount = price * (rule.discountPercent / 100);
    return Number((price - discount).toFixed(2));
}