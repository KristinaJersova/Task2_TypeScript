"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storeData_1 = require("./data/storeData");
const Category_1 = require("./models/Category");
const stockService_1 = require("./services/stockService");
const reviewService_1 = require("./services/reviewService");
const discountService_1 = require("./services/discountService");
let report = "Product Report:\n\n";
storeData_1.products.forEach(product => {
    report += `Name: ${product.name}\n`;
    report += `Category: ${Category_1.Category[product.category]}\n`;
    report += `Supplier: ${product.Supplier.name}\n`;
    report += `Available: ${product.quantity}\n`;
    const status = (0, stockService_1.getStockStatus)(product.quantity);
    report += `Stock status: ${status}\n`;
    const rating = (0, reviewService_1.getAverageRating)(product.id, storeData_1.reviews);
    if (rating === null) {
        report += `Average rating: no reviews\n`;
    }
    else {
        report += `Average rating: ${rating.toFixed(2)}\n`;
    }
    const discount = (0, discountService_1.getDiscountPrice)(product.price, product.category, rating, storeData_1.discountRules);
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
