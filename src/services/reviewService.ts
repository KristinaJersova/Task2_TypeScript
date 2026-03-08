import { Review } from "../models/Review";

export function getAverageRating(productId: number, reviews: Review[]): number | null {

    const productReviews = reviews.filter(r => r.productId === productId);

    if (productReviews.length === 0) {
        return null;
    }

    const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);

    return sum / productReviews.length;
}