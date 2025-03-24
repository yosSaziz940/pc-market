document.addEventListener("DOMContentLoaded", function () {
    const categoriesDiv = document.getElementById("categories");
    const productList = document.getElementById("product-list");

   
    function displayCategories() {
        for (const brand in productsData) {
            const button = document.createElement("button");
            button.classList.add("category-btn");
            button.innerText = brand;
            button.onclick = () => {
                filterProducts(brand);
            };
            categoriesDiv.appendChild(button);
        }

      
        const allButton = document.createElement("button");
        allButton.classList.add("category-btn");
        allButton.innerText="view all";
        allButton.onclick = () => {
            displayProducts(productsData);
        };
        categoriesDiv.appendChild(allButton);
    }

 
    function displayProducts(data) {
        productList.innerHTML = ""; 
        for (const brand in data) {
            data[brand].forEach(product => {
                createProductCard(product);
            });
        }
    }

    
    function filterProducts(brand) {
        productList.innerHTML = "";
        productsData[brand].forEach(product => {
            createProductCard(product);
        });
    }


    function createProductCard(product) {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p><strong>CPU:</strong> ${product.cpu}</p>
            <p><strong>RAM:</strong> ${product.ram}</p>
            <p><strong>Storage:</strong> ${product.storage}</p>
            <p><strong>Screen:</strong> ${product.screen ? product.screen : "N/A"}</p>
            <p><strong>Price:</strong> ${product.price} LE</p>
        `;
        productList.appendChild(productDiv);
    }

    displayCategories();
    displayProducts(productsData); 
});
