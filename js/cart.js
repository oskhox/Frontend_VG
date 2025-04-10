
//random garbage concerning localStorage from items.js
    document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const productId = Number(params.get('id'));

    const storedProducts = JSON.parse(localStorage.getItem("items"))
    const selectedProduct = storedProducts.find(product=> product.id === productId);

    if (selectedProduct) {
        render(selectedProduct);
    } else {
        console.error("Product not found!");
    }
});

function saveItemsToLocalStorage(items) {
    localStorage.setItem('items', JSON.stringify(items));
}
