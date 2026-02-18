export function formatRating(rating:number | null): string{
    if (rating === null)
        return "No reviews";
    return `$rating.toFixed(2)`;
    }
