export function parseSpecs(input: string): Record<string, string | number> {
    const specs: Record<string, string | number> = {};
    if (!input.trim()) return specs;

    input.split(',').forEach(pair => {
        const [key, value] = pair.split('=').map(s => s.trim());
        if (key && value) {
            specs[key] = isNaN(Number(value)) ? value : Number(value);
        }
    });
    return specs;
}