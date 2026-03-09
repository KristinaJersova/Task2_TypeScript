"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = require("./models/Category");
const storeData_1 = require("./data/storeData");
const storageService_1 = require("./services/storageService");
const stockService_1 = require("./services/stockService");
const reviewService_1 = require("./services/reviewService");
const discountService_1 = require("./services/discountService");
const spec_1 = require("./helpers/spec");
// 1. Инициализация данных
let allProducts = storageService_1.storageService.loadProducts();
if (allProducts.length === 0) {
    allProducts = storeData_1.products;
    storageService_1.storageService.saveProducts(allProducts);
}
const form = document.getElementById('add-product-form');
const productList = document.getElementById('product-list');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');
function deleteProduct(id) {
    if (confirm("Delete?")) {
        allProducts = allProducts.filter(p => p.id !== id);
        storageService_1.storageService.saveProducts(allProducts);
        render();
    }
}
function render() {
    if (!productList)
        return;
    productList.innerHTML = '';
    // Фильтрация
    let filtered = allProducts.filter(p => p.name.toLowerCase().includes(searchInput.value.toLowerCase()));
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
        const rating = (0, reviewService_1.getAverageRating)(product.id, storeData_1.reviews);
        const status = (0, stockService_1.getStockStatus)(product.quantity);
        const discountPrice = (0, discountService_1.getDiscountPrice)(product.price, product.category, rating, storeData_1.discountRules);
        const card = document.createElement('div');
        card.className = 'product-card';
        const statusClass = `status-${status.toLowerCase().replace(/\s+/g, '-')}`;
        card.innerHTML = `
            <button class="delete-btn" style="float:right; cursor:pointer; background:#ff4d4d; border:none; color:white; border-radius:3px; padding:2px 6px;">✕</button>
            <h3>${product.name}</h3>
            <p>Category: <strong>${Category_1.Category[product.category]}</strong></p>
            <div class="price-box">
                ${discountPrice
            ? `<span style="text-decoration: line-through; color: #999;">${Number(product.price).toFixed(2)}€</span> 
                       <span style="color: #e74c3c; font-weight: bold; margin-left: 10px;">${discountPrice.toFixed(2)}€</span>`
            : `<span>${Number(product.price).toFixed(2)}€</span>`}
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
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const qtyInput = formData.get('quantities');
    const totalQty = qtyInput.split(',')
        .map(n => parseInt(n.trim()) || 0)
        .reduce((sum, val) => sum + val, 0);
    const categoryName = formData.get('category');
    const categoryValue = Category_1.Category[categoryName];
    const newProduct = {
        id: Date.now(),
        name: formData.get('name'),
        category: categoryValue,
        price: parseFloat(formData.get('price')) || 0,
        quantity: totalQty,
        Supplier: { id: 0, name: "Manual Entry" },
        specifications: (0, spec_1.parseSpecs)(formData.get('specs'))
    };
    allProducts.push(newProduct);
    storageService_1.storageService.saveProducts(allProducts);
    render();
    form.reset();
});
// Слушатели
searchInput.addEventListener('input', render);
sortSelect.addEventListener('change', render);
render();
