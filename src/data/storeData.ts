import { Product } from "../models/Product";
import { Review } from "../models/Review";
import { Category } from "../models/Category";
import { Supplier } from "../models/Supplier";

export const products: Product[] = [
    {
        id: 1,
        name:"Smartphone",
        price:699.99,
        quantity:50,
        category: Category.Electronics,
        Supplier: {
            id: 1,
            name: "Tech Supplies Inc.",          
        },
        specifications:{
            brand: "TechBrand",
            model: "X1000",
            color: "Black",
            weigh: "150g",
        }
    }
]
export const reviews: Review[] = [
    {
        id: 1,
        productId: 1,
        rating: 4.5,
        comment: "1 Tb malu",
        reviewerName: "John Doe",
    }  
]
