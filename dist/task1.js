import { products, reviews, discountRules } from "./data/storeData";
import { Category } from "./models/Category";
import { getStockStatus } from "./services/stockService";
import { getAverageRating } from "./services/reviewService";
import { getDiscountPrice } from "./services/discountService";
let report = "Product Report:\n\n";
products.forEach(product => {
    report += `Name: ${product.name}\n`;
    report += `Category: ${Category[product.category]}\n`;
    report += `Supplier: ${product.Supplier.name}\n`;
    report += `Available: ${product.quantity}\n`;
    const status = getStockStatus(product.quantity);
    report += `Stock status: ${status}\n`;
    const rating = getAverageRating(product.id, reviews);
    if (rating === null) {
        report += `Average rating: no reviews\n`;
    }
    else {
        report += `Average rating: ${rating.toFixed(2)}\n`;
    }
    const discount = getDiscountPrice(product.price, product.category, rating, discountRules);
    if (discount !== null) {
        report += `Price: ${product.price.toFixed(2)} -> ${discount.toFixed(2)}\n`;
    }
    else {
        report += `Price: ${product.price.toFixed(2)}\n`;
    }
    if (product.specifications) {
        const specs = Object.entries(product.specifications)
            .map(([k, v]) => `${k}=${v}`)
            .join(", ");
        report += `specs: ${specs}\n`;
    }
    report += "\n";
});
console.log(report);
