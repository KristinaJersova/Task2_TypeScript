"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stockService_1 = require("./services/stockService");
const storageService_1 = require("./services/storageService");
class StoreApp {
    constructor() {
        this.products = [];
        this.container = document.getElementById("product-list");
        this.products = storageService_1.storageService.loadProducts();
        this.initForm();
        this.render();
    }
    initForm() {
        const form = document.getElementById("add-product-form");
        if (form) {
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                this.addProduct(form);
            });
        }
    }
    addProduct(form) {
        const formData = new FormData(form);
        const qtyString = formData.get("quantities") || "0";
        const totalQty = qtyString.split(",").reduce((sum, q) => sum + parseInt(q.trim() || "0"), 0);
        const specsString = formData.get("specs") || "";
        const specifications = {};
        if (specsString) {
            specsString.split(",").forEach(pair => {
                const [key, value] = pair.split("=").map(s => s.trim());
                if (key && value)
                    specifications[key] = value;
            });
        }
        const newProduct = {
            id: Date.now(),
            name: formData.get("name") || "Unnamed Product",
            price: parseFloat(formData.get("price") || "0"),
            category: formData.get("category"),
            quantity: totalQty,
            specifications,
            Supplier: { id: 0, name: "Manual Entry" }
        };
        this.products.push(newProduct);
        storageService_1.storageService.saveProducts(this.products);
        this.render();
        form.reset();
    }
    render() {
        if (!this.container)
            return;
        this.container.innerHTML = "";
        this.products.forEach(product => {
            const card = document.createElement("div");
            card.className = "product-card";
            const status = (0, stockService_1.getStockStatus)(product.quantity);
            const specsHtml = product.specifications && Object.keys(product.specifications).length > 0
                ? `<p class="specs">specs: ${Object.entries(product.specifications).map(([k, v]) => `${k}=${v}`).join(", ")}</p>`
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
