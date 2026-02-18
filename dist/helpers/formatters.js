export function formatRating(rating) {
    if (rating === null)
        return "No reviews";
    return `$rating.toFixed(2)`;
}
