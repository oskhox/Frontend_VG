function getItems() {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            saveItemsToLocalStorage(data);
            renderItems(data);
    })
    function saveItemsToLocalStorage(items) {
        localStorage.setItem('items', JSON.stringify(items));
    }

    function renderItems(items) {
        let output = "";

        items.forEach(item => {
            output += `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
        <div class="card shadow-sm">
        <img src="${item.image}" class="card-img-top p-4" alt="${item.title}">
        <div class="card-body p-3 p-md-4">
              <div class="title-container">
               <h5 class="card-title">${item.title}</h5></div>
                <div class="collapse" id="description-${item.id}">
                <p>${item.description}</p>
              </div>
        </div>
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <h6 class="price">${Math.ceil(item.price * 10)} kr</h6> 
            <!--Beskrivnings-knapp-->
            <button class="btn btn-light mb-2 w-100" data-bs-toggle="collapse" data-bs-target="#description-${item.id}">
                Mer info </button>
            <!--Beställnings-knapp-->
            <a href="orderform.html?id=${item.id}" class="btn btn-light w-100 " id="btn2">Beställ</a>
        </div>
        </div>
        </div>
            `;
        })
        document.getElementById("items").innerHTML = output;
    }
}

getItems();


function getFourItemsByCategory(category, containerId) {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then(response => response.json())
        .then(data => renderItemsImages(data, containerId))
        .catch(error => console.error("Fel vid hämtning av data:", error));
}

function renderItemsImages(items, containerId) {
    let output = "";

    items.slice(0, 4).forEach(item => {
        output += `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div class="card shadow-sm">
                    <img src="${item.image}" class="card-img-top p-4" alt="${item.title}">
                </div>
            </div>
        `;
    });

    document.getElementById(containerId).innerHTML = output;
}

const categories = [
    { name: "women's clothing", containerId: "items-women-s-clothing" },
    { name: "men's clothing", containerId: "items-men-s-clothing" },
    { name: "jewelery", containerId: "items-jewelery" },
    { name: "electronics", containerId: "items-electronics" }
];

categories.forEach(category => {
    getFourItemsByCategory(category.name, category.containerId);
});
