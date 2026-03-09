export function formatRating(rating) {
    if (rating === null) {
        return "no reviews";
    }
    return rating.toFixed(2);
}
