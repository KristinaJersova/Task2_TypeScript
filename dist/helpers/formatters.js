"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatRating = formatRating;
function formatRating(rating) {
    if (rating === null)
        return "No reviews";
    return `$rating.toFixed(2)`;
}
