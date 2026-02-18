import { products } from "./data/storeData.js";
let report = "Product Report:\n\n";
products.forEach(product => {
    report += `Name: ${product.name}\n`;
    report += `Price: ${product.price.toFixed(2)}\n`;
    report += `Quantity: ${product.quantity}\n`;
    report += `Category: ${product.category}\n`;
    report += `Supplier: ${product.Supplier.name}\n`;
    if (product.specifications) {
        report += "Specifications:\n";
        for (const [key, value] of Object.entries(product.specifications)) {
            report += `  -${key}: ${value}\n`;
        }
    }
    report += "\n";
});
console.log(report);
