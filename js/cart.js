//TODO:Funkar ej
//Uppdatera varukorgen när headern initialt laddas
document.addEventListener("DOMContentLoaded", function () {
    updateCart();
});

//Hjälpmetod som uppdaterar varukorgen utefter vad som finns i localStorage
function updateCart() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-container");

    //Rensa dubletter i offcanvas, localStorage är oförändrad
    cartContainer.innerHTML = '';

    //TODO:Funkar ej
    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Din varukorg är tom</p>';
        return;
    }

    //Skapa upp det som finns i localStorage och lägg till i DOM
    cartItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        const cartItem = document.createElement('div');
        cartItem.className = "cart-item d-flex align-items-center mb-3";
        cartItem.innerHTML = `
            <img src="${item.image}" class="card-img-top p-2" style="width: 50px; height: 50px" alt="${item.title}">
            <div class="flex-grow-1">
                <h6 class="mb-0">${item.title}</h6>
                <div class="d-flex align-items-center">
                    <div>${item.quantity} st</div>
                    <div class="ms-auto">${itemTotal} kr</div>
                </div>
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });
}

/*
Läser in nuvarande localStorage, läser in från API igen och ökar kvantitet eller lägger in ny produkt,sparar i
localStorage och uppdaterar DOM
 */
function addToCart(itemId) {
    let currentCart = JSON.parse(localStorage.getItem("cart")) || [];

    fetch(`https://fakestoreapi.com/products/${itemId}`)
        .then(res => res.json())
        .then(product => {
            const existingItem = currentCart.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                currentCart.push({
                    id: product.id,
                    title: product.title,
                    price: Math.ceil(product.price * 10), // Apply same conversion as in cards
                    image: product.image,
                    quantity: 1
                });
            }

            localStorage.setItem("cart", JSON.stringify(currentCart));
            updateCart();
        })
}