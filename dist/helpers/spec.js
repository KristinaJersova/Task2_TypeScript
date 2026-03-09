"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatSpecs = formatSpecs;
function formatSpecs(specs) {
    if (!specs)
        return "";
    const pairs = Object.entries(specs)
        .map(([key, value]) => `${key}=${value}`)
        .join(", ");
    return ` | specs: ${pairs}`;
}
