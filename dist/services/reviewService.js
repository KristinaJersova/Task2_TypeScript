"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAverageRating = getAverageRating;
function getAverageRating(productId, reviews) {
    const productReviews = reviews.filter(r => r.productId === productId);
    if (productReviews.length === 0) {
        return null;
    }
    const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / productReviews.length;
}
