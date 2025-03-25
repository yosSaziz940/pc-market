let productsData = {};
let cart = JSON.parse(localStorage.getItem("cart")) || [];

async function loadProducts() {
    try {
        const response = await fetch("JS/data.json");
        if (!response.ok) throw new Error("Failed to load products");
        productsData = await response.json();
        console.log("Products Loaded:", productsData); // Debugging

        displayCategories();
        displayProducts(productsData);
    } catch (error) {
        console.error("Error loading products:", error);
    }
}

function displayCategories() {
    const categoriesDiv = document.getElementById("categories");
    categoriesDiv.innerHTML = ""; // Clear previous categories

    for (const brand in productsData) {
        const button = document.createElement("button");
        button.classList.add("category-btn");
        button.innerText = brand;
        button.onclick = () => filterProducts(brand);
        categoriesDiv.appendChild(button);
    }

    // "View All" button
    const allButton = document.createElement("button");
    allButton.classList.add("category-btn");
    allButton.innerText = "View All";
    allButton.onclick = () => displayProducts(productsData);
    categoriesDiv.appendChild(allButton);
}

function displayProducts(data) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    if (Object.keys(data).length === 0) {
        productList.innerHTML = "<p>No products available.</p>";
        return;
    }

    for (const brand in data) {
        data[brand].forEach(product => createProductCard(product));
    }
}

function filterProducts(brand) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    
    if (!productsData[brand]) {
        productList.innerHTML = "<p>No products found for this category.</p>";
        return;
    }

    productsData[brand].forEach(product => createProductCard(product));
}

function createProductCard(product) {
    const productList = document.getElementById("product-list");
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
        <h3>${product.name}</h3>
        <p><strong>CPU:</strong> ${product.cpu}</p>
        <p><strong>RAM:</strong> ${product.ram}</p>
        <p><strong>Storage:</strong> ${product.storage}</p>
        <p><strong>Screen:</strong> ${product.screen ? product.screen : "N/A"}</p>
        <p><strong>Price:</strong> ${product.price} LE</p>
        <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(productDiv);
}

function addToCart(productId) {
    let product = null;

    for (const brand in productsData) {
        let found = productsData[brand].find(p => p.id === productId);
        if (found) {
            product = found;
            break;
        }
    }

    if (!product) {
        console.error("Product not found");
        return;
    }

    let existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartContainer = document.getElementById("cart-container");
    const cartTotal = document.getElementById("cart-total");

    cartContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.innerText = "Total: 0 LE";
        return;
    }

    cart.forEach(product => {
        let item = document.createElement("div");
        item.className = "cart-item";
        item.innerHTML = `
            <p>${product.name} - ${product.price} LE x ${product.quantity}</p>
            <button onclick="removeFromCart(${product.id})">Remove</button>
        `;
        cartContainer.appendChild(item);
        total += product.price * product.quantity;
    });

    cartTotal.innerText = `Total: ${total.toLocaleString()} LE`;
}

function removeFromCart(productId) {
    let productIndex = cart.findIndex(product => product.id === productId);
    if (productIndex !== -1) {
        cart[productIndex].quantity -= 1;
        if (cart[productIndex].quantity <= 0) {
            cart.splice(productIndex, 1);
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Thank you for your purchase!");
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
}

document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    updateCartDisplay();
});
