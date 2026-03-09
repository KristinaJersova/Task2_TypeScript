import { Product } from "../src/models/Product";
import { Category } from "../src/models/Category";
import { products as initialProducts, reviews, discountRules } from "../src/data/storeData";
import { storageService } from "../src/services/storageService";
import { getStockStatus } from "../src/services/stockService.js";
import { getAverageRating } from "../src/services/reviewService.js";
import { getDiscountPrice } from "../src/services/discountService.js";
import { parseSpecs } from "../src/helpers/spec.js";

// 1. Инициализация данных
let allProducts: Product[] = storageService.loadProducts();
if (allProducts.length === 0) {
    allProducts = initialProducts;
    storageService.saveProducts(allProducts);
}

const form = document.getElementById('add-product-form') as HTMLFormElement;
const productList = document.getElementById('product-list') as HTMLDivElement;
const searchInput = document.getElementById('search-input') as HTMLInputElement;
const sortSelect = document.getElementById('sort-select') as HTMLSelectElement;

function deleteProduct(id: number): void {
    if (confirm("Delete?")) {
        allProducts = allProducts.filter(p => p.id !== id);
        storageService.saveProducts(allProducts);
        render(); 
    }
}

function render(): void {
    if (!productList) return;
    productList.innerHTML = '';

    // Фильтрация
    let filtered = allProducts.filter(p => 
        p.name.toLowerCase().includes(searchInput.value.toLowerCase())
    );

    // СОРТИРОВКА (работает с актуальным значением из select)
    const sortCriterion = sortSelect.value;
    filtered.sort((a, b) => {
        if (sortCriterion === 'price') {
            return Number(a.price) - Number(b.price);
        }
        if (sortCriterion === 'quantity') {
            return Number(a.quantity) - Number(b.quantity);
        }
        return a.name.localeCompare(b.name);
    });

    filtered.forEach(product => {
        const rating = getAverageRating(product.id, reviews);
        const status = getStockStatus(product.quantity);
        const discountPrice = getDiscountPrice(product.price, product.category, rating, discountRules);
        
        const card = document.createElement('div');
        card.className = 'product-card';
        
        const statusClass = `status-${status.toLowerCase().replace(/\s+/g, '-')}`;

        card.innerHTML = `
            <button class="delete-btn" style="float:right; cursor:pointer; background:#ff4d4d; border:none; color:white; border-radius:3px; padding:2px 6px;">✕</button>
            <h3>${product.name}</h3>
            <p>Category: <strong>${Category[product.category]}</strong></p>
            <div class="price-box">
                ${discountPrice 
                    ? `<span style="text-decoration: line-through; color: #999;">${Number(product.price).toFixed(2)}€</span> 
                       <span style="color: #e74c3c; font-weight: bold; margin-left: 10px;">${discountPrice.toFixed(2)}€</span>`
                    : `<span>${Number(product.price).toFixed(2)}€</span>`
                }
            </div>
            <p>Stock: <span class="status ${statusClass}">${status}</span> (${product.quantity} units)</p>
            ${product.specifications ? `
                <div class="specs-list" style="margin-top: 10px; border-top: 1px solid #eee; padding-top: 5px; font-size: 0.85em;">
                    ${Object.entries(product.specifications).map(([k, v]) => `<div><b>${k}:</b> ${v}</div>`).join('')}
                </div>
            ` : ''}
        `;

        const btn = card.querySelector('.delete-btn');
        btn?.addEventListener('click', () => deleteProduct(product.id));

        productList.appendChild(card);
    });
}

// 4. Обработка формы
form.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    const formData = new FormData(form);

    const qtyInput = formData.get('quantities') as string;
    const totalQty = qtyInput.split(',')
        .map(n => parseInt(n.trim()) || 0)
        .reduce((sum, val) => sum + val, 0);

    const categoryName = formData.get('category') as keyof typeof Category;
    const categoryValue = Category[categoryName] as unknown as Category;

    const newProduct: Product = {
        id: Date.now(),
        name: formData.get('name') as string,
        category: categoryValue,
        price: parseFloat(formData.get('price') as string) || 0,
        quantity: totalQty,
        Supplier: { id: 0, name: "Manual Entry" },
        specifications: parseSpecs(formData.get('specs') as string)
    };

    allProducts.push(newProduct);
    storageService.saveProducts(allProducts);
    render();
    form.reset();
});

// Слушатели
searchInput.addEventListener('input', render);
sortSelect.addEventListener('change', render);

render();