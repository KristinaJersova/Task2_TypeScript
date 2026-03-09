export function formatSpecs(specs?: Record<string, string | number>): string {
    if (!specs) return "";
    const pairs = Object.entries(specs)
        .map(([key, value]) => `${key}=${value}`)
        .join(", ");
    return ` | specs: ${pairs}`;
}
