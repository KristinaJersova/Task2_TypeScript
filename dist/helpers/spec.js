export function parseSpecs(input) {
    const specs = {};
    if (!input.trim())
        return specs;
    input.split(',').forEach(pair => {
        const [key, value] = pair.split('=').map(s => s.trim());
        if (key && value) {
            specs[key] = isNaN(Number(value)) ? value : Number(value);
        }
    });
    return specs;
}
