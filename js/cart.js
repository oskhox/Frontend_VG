//Varje gång varukorgen öppnas
document.addEventListener("shown.bs.offcanvas", function (event) {
    updateCart();
    totalSum();
});

//Ritar upp varukorg utifrån localStorage
function updateCart() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-container");

    //Rensa dubletter i offcanvas, localStorage är oförändrad
    cartContainer.innerHTML = "";

    if (cartItems.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "Varukorgen är tom";
        cartContainer.appendChild(emptyMessage);
        return;
    }

    //Skapar upp det som finns i localStorage-arrayen
    cartItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        const cartItem = document.createElement('div');
        cartItem.className = "cart-item d-flex align-items-center mb-3";
        cartItem.innerHTML = `
            <img src="${item.image}" class="card-img-top p-2" style="width: 50px; height: 50px" alt="${item.title}">
            <div class="flex-grow-1">
                <h6 class="mb-0">${item.title}</h6>
                <div class="d-flex align-items-center">
                    
                    <!--Dropdown för att ändra kvantitet-->                
                    <div class="dropdown mt-3">
                    <button class="btn btn-sm btn-light btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
                    ${item.quantity} st </button>
                    <ul class="dropdown-menu">
                    <li><a class="dropdown-item" onclick="changeQuantity(${item.id}, 1);">1</a></li>
                    <li><a class="dropdown-item" onclick="changeQuantity(${item.id}, 2);">2</a></li>
                    <li><a class="dropdown-item" onclick="changeQuantity(${item.id}, 3);">3</a></li>
                    <li><a class="dropdown-item" onclick="changeQuantity(${item.id}, 4);">4</a></li>
                    <li><a class="dropdown-item" onclick="changeQuantity(${item.id}, 5);">5</a></li>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" onclick="changeQuantity(${item.id}, -1)">Ta bort produkt</a>
                    </ul>
                    </div>
                    
                    <div class="ms-auto">${itemTotal} kr</div>
                </div>
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });
}

/*
Läser in nuvarande localStorage till en array, läser in från API, ökar kvantitet eller lägger in ny produkt,
sparar i localStorage och uppdaterar varukorgen
 */
function addToCart(itemId) {
    let currentCart = JSON.parse(localStorage.getItem("cart")) || [];

    fetch(`https://fakestoreapi.com/products/${itemId}`)
        .then(response => response.json())
        .then(product => {
            const existingItem = currentCart.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                currentCart.push({
                    id: product.id,
                    title: product.title,
                    price: Math.ceil(product.price * 10),
                    image: product.image,
                    quantity: 1
                });
            }

            localStorage.setItem("cart", JSON.stringify(currentCart));
            updateCart();
        })
}

//Filtrerar bort helt eller ändrar kvantitet, sparar i localStorage och uppdaterar varukorgen
function changeQuantity(itemId, quantity) {
    let cartItems = JSON.parse(localStorage.getItem("cart"));

    if (quantity === -1) {
        cartItems = cartItems.filter(item => item.id !== itemId);
    } else {
        const item = cartItems.find(item => item.id === itemId);
        item.quantity = quantity;
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    totalSum();
    updateCart();
}

function emptyCart() {
    let cartItems = [];
    localStorage.setItem("cart", JSON.stringify(cartItems));
    totalSum();
    updateCart();
}

function totalSum() {
    let sum = 0;
    let cartItems = JSON.parse(localStorage.getItem("cart"));
    cartItems.forEach(item => sum += item.price * item.quantity);
    document.getElementById("total-sum").textContent = `Total summa: ${sum} kr`;
}