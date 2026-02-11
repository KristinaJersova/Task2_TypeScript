import type {Supplier} from "./data/Supplier";

let categories: string[] = ["Electonics", "Clothing", "Books", "Accessories"]
type Category = "Electronics" | "Clothing" | "Books" | "Accessories"

const supplier: Supplier = {
    id: 1,
    name: "Tech Supplies Inc."
}