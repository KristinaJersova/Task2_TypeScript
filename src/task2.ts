import { Product } from "./models/Product";
import { Category } from "./models/Category";
import { getStockStatus } from "./services/stockService";
import { storageService } from "./services/storageService";

class StoreApp {
    private products: Product[] = [];
    private container: HTMLElement;

    constructor() {
        this.container = document.getElementById("product-list") as HTMLElement;
        this.products = storageService.loadProducts();
        this.initForm();
        this.render();
    }

    private initForm() {
        const form = document.getElementById("add-product-form") as HTMLFormElement;
        if (form) {
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                this.addProduct(form);
            });
        }
    }

    private addProduct(form: HTMLFormElement) {
        const formData = new FormData(form);
        
        const qtyString = (formData.get("quantities") as string) || "0";
        const totalQty = qtyString.split(",").reduce((sum, q) => sum + parseInt(q.trim() || "0"), 0);

        const specsString = (formData.get("specs") as string) || "";
        const specifications: Record<string, string> = {};
        if (specsString) {
            specsString.split(",").forEach(pair => {
                const [key, value] = pair.split("=").map(s => s.trim());
                if (key && value) specifications[key] = value;
            });
        }

        const newProduct: Product = {
            id: Date.now(),
            name: (formData.get("name") as string) || "Unnamed Product",
            price: parseFloat((formData.get("price") as string) || "0"),

            category: (formData.get("category") as unknown) as Category,
            quantity: totalQty,
            specifications,
            Supplier: { id: 0, name: "Manual Entry" }
        };

        this.products.push(newProduct);
        storageService.saveProducts(this.products);
        this.render();
        form.reset();
    }

    private render() {
        if (!this.container) return;
        this.container.innerHTML = "";

        this.products.forEach(product => {
            const card = document.createElement("div");
            card.className = "product-card";

            const status = getStockStatus(product.quantity);
            
            const specsHtml = product.specifications && Object.keys(product.specifications).length > 0
                ? `<p class="specs">specs: ${Object.entries(product.specifications).map(([k,v]) => `${k}=${v}`).join(", ")}</p>` 
                : "";

            card.innerHTML = `
                <h3>${product.name}</h3>
                <p>Category: ${product.category}</p>
                <p class="price">Price: $${product.price.toFixed(2)}</p>
                <p>Available: ${product.quantity}</p>
                <span class="status status-${status.toLowerCase().replace(" ", "-")}">Status: ${status}</span>
                ${specsHtml}
            `;
            this.container.appendChild(card);
        });
    }
}

new StoreApp();