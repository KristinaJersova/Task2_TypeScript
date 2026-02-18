import { Category } from "../models/Category.js";
export const products = [
    {
        id: 1,
        name: "Smartphone",
        price: 699.99,
        quantity: 50,
        category: Category.Electronics,
        Supplier: {
            id: 1,
            name: "Tech Supplies Inc.",
        },
        specifications: {
            brand: "TechBrand",
            model: "X1000",
            color: "Black",
            weigh: "150g",
        }
    }
];
export const reviews = [
    {
        id: 1,
        productId: 1,
        rating: 4.5,
        comment: "1 Tb malu",
        reviewerName: "John Doe",
    }
];
