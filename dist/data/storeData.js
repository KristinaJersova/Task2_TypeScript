"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.discountRules = exports.reviews = exports.products = void 0;
const Category_1 = require("../models/Category");
exports.products = [
    {
        id: 1,
        name: "Smartphone",
        price: 699.99,
        quantity: 50,
        category: Category_1.Category.Electronics,
        Supplier: {
            id: 1,
            name: "Tech Supplies Inc.",
        },
        specifications: {
            brand: "TechBrand",
            model: "X1000",
            color: "Black",
            weight: "150g",
        }
    },
    {
        id: 2,
        name: "Dell XPS 15",
        price: 1299.99,
        quantity: 4,
        category: Category_1.Category.Electronics,
        Supplier: {
            id: 2,
            name: "Nordic Devices"
        },
        specifications: {
            cpu: "Intel i7",
            ram: "16GB",
            storage: "512GB",
            weight: "1.8kg"
        }
    },
    {
        id: 3,
        name: "Logitech MX Master 3S",
        price: 99.50,
        quantity: 8,
        category: Category_1.Category.Accessories,
        Supplier: {
            id: 3,
            name: "Euro Accessories"
        },
        specifications: {
            connectivity: "Bluetooth",
            dpi: "8000",
            color: "Graphite"
        }
    },
    {
        id: 4,
        name: "USB-C Hub 8-in-1",
        price: 59.90,
        quantity: 0,
        category: Category_1.Category.Accessories,
        Supplier: {
            id: 3,
            name: "Euro Accessories"
        },
        specifications: {
            ports: "8",
            hdmi: "4K",
            usbVersion: "USB 3.2"
        }
    }
];
exports.reviews = [
    {
        id: 1,
        productId: 1,
        rating: 4.5,
        comment: "Very good phone",
        reviewerName: "John Doe",
    },
    {
        id: 2,
        productId: 2,
        rating: 4.8,
        reviewerName: "Alice"
    },
    {
        id: 3,
        productId: 2,
        rating: 4.6,
        reviewerName: "Bob"
    },
    {
        id: 4,
        productId: 3,
        rating: 4.7,
        reviewerName: "Martin"
    }
];
exports.discountRules = [
    {
        category: Category_1.Category.Electronics,
        discountPercent: 10,
        minRating: 4
    },
    {
        category: Category_1.Category.Accessories,
        discountPercent: 5
    }
];
