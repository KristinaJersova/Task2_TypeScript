export function formatRating(rating: number | null): string {
    if (rating === null) {
        return "no reviews";
    }
    return rating.toFixed(2);
}