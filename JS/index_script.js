document.addEventListener("DOMContentLoaded", function () {
    const categoriesContainer = document.getElementById("categories");
    const categories = [
        { name: "Laptops", img: "imgs/laptop.jpg", link: "laptops.html" },
        { name: "Desktops", img: "imgs/desktop.jpg", link: "desktops.html" },
        { name: "Accessories", img: "imgs/acc.jpg", link: "accessories.html" },
        { name: "Monitors", img: "imgs/monitor.jpg", link: "monitors.html" }
    ];

    categories.forEach(category => {
        const categoryBox = document.createElement("div");
        categoryBox.classList.add("category-box");
        categoryBox.innerHTML = `
            <img src="${category.img}" alt="${category.name}">
            <h3>${category.name}</h3>
            <button class="category-btn">View</button>
        `;

        const button = categoryBox.querySelector(".category-btn");
        button.addEventListener("click", (event) => {
            event.stopPropagation(); 
            window.location.href = category.link; 
        });

        categoriesContainer.appendChild(categoryBox);
    });
});
