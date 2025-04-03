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

document.getElementById("myForm").addEventListener('submit', saveData);

function saveData(e) {
    e.preventDefault();

    const nameInput = document.getElementById("name").value
    const emailInput = document.getElementById("email").value
    const phoneNumberInput = document.getElementById("phonenumber").value
    const addressInput = document.getElementById("address").value
    const zipCodeInput = document.getElementById("zipcode").value
    const cityInput = document.getElementById("city").value

    let confirmOrder = true;

    confirmOrder = validateName(nameInput)
        && validateEmail(emailInput)
        && validatePhoneNumber(phoneNumberInput)
        && validateAddress(addressInput)
        && validateZipCode(zipCodeInput)
        && validateCity(cityInput);

    if (!confirmOrder) {
        return;
    }

    window.location.href = "orderconfirmation.html";
}

    function render(product) {

        let output = `
              <div class="product-display" >
               <img src = "${product.image}" class="product-display-img-top" alt= "${product.title}">
                   <div class = "product-display-body">
                       <h5 class="product-display-title">${product.title}</h5>
                        <p class="product-display-text">${product.description}</p> 
                   </div>
           </div>
           `;
        document.getElementById("card").innerHTML = output;
    }

    function validateName(nameInput) {
        let validateNameInput = document.getElementById("inputValidationName")

        if (nameInput.length < 2 || nameInput.length > 50) {
            validateNameInput.style.display = "block";
            return false;
        } else {
            validateNameInput.style.display = "none";
            return true;
        }
    }

    function validateEmail(emailInput) {
        let validateEmailInput = document.getElementById("inputValidationEmail")

        if (!emailInput.includes('@') || emailInput.length > 50) {
            validateEmailInput.style.display = "block";
            return false;
        } else {
            validateEmailInput.style.display = "none";
            return true;

        }
    }

    function validatePhoneNumber(phoneNumberInput) {
        let validatePhoneNumberInput = document.getElementById("inputValidationPhoneNumber")
        if (!/^[\d\-()]{1,50}$/.test(phoneNumberInput)) {
            validatePhoneNumberInput.style.display = "block";
            return false;
        } else {
            validatePhoneNumberInput.style.display = "none";
            return true;
        }
    }

    function validateAddress(addressInput) {
        let validateAddressInput = document.getElementById("inputValidationAddress")

        if (addressInput.length < 2 || addressInput.length > 50) {
            validateAddressInput.style.display = "block";
            return false;
        } else {
            validateAddressInput.style.display = "none";
            return true;
        }
    }

    function validateZipCode(zipCodeInput) {
        let validateZipCodeInput = document.getElementById("inputValidationZipCode")

        if (zipCodeInput.length !== 5 || isNaN(zipCodeInput)) {
            validateZipCodeInput.style.display = "block";
            return false;
        } else {
            validateZipCodeInput.style.display = "none";
            return true;
        }
    }

    function validateCity(cityInput) {
        let validateCityInput = document.getElementById("inputValidationCity")
        if (cityInput.length < 2 || cityInput.length > 50) {
            validateCityInput.style.display = "block";
            return false;
        } else {
            validateCityInput.style.display = "none";
            return true;
        }
}
