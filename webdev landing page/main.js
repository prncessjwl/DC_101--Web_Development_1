// Array to store cart items
let cart = [];

// Function to open the product modal and populate its details
function openModal(title, price, color, imageSrc) {
    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-price").textContent = price;
    document.getElementById("modal-color").textContent = color;
    document.getElementById("modal-image").src = imageSrc;

    document.getElementById("productModal").style.display = "flex";
}

// Function to close the modal
function closeModal() {
    document.getElementById("productModal").style.display = "none";
}

// Function to add the product to the cart
function addToCart() {
    const title = document.getElementById("modal-title").textContent;
    const price = document.getElementById("modal-price").textContent;
    const color = document.getElementById("modal-color").textContent;
    const imageSrc = document.getElementById("modal-image").src;

    // Check if the item is already in the cart
    const existingProduct = cart.find(item => item.title === title && item.color === color);

    if (existingProduct) {
        // If the product is already in the cart, increment its quantity
        existingProduct.quantity++;
    } else {
        // Create a new product object and add it to the cart
        const product = { title, price, color, imageSrc, quantity: 1 };
        cart.push(product);
    }

    // Update the cart modal with the added/updated product
    updateCartModal();

    alert("The item has been added to your cart!");
}

// Function to update the cart modal with current cart items
function updateCartModal() {
    const cartItemsList = document.getElementById("cartItems");
    cartItemsList.innerHTML = "";  // Clear current cart items

    let totalPrice = 0; // Initialize total price

    cart.forEach((item, index) => {
        // Create a new list item for each product in the cart
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <img src="${item.imageSrc}" alt="${item.title}" class="cart-item-image">
            <span>${item.title} (${item.color})</span> - <span>${item.price}</span>
            <div class="cart-item-quantity">
                <button onclick="changeQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${index}, 1)">+</button>
            </div>
            <button class="remove-item" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsList.appendChild(listItem);

        // Add the price to the total
        totalPrice += parseFloat(item.price.replace('₱', '').replace(',', '')) * item.quantity;
    });

    // Update the total price in the cart modal
    document.getElementById("totalPrice").textContent = "Total Price: ₱" + totalPrice.toFixed(2);
}

// Function to change the quantity of an item in the cart
function changeQuantity(index, delta) {
    const product = cart[index];

    // Adjust the quantity
    if (product.quantity + delta > 0) {
        product.quantity += delta;
    } else {
        product.quantity = 1; // Prevent going below 1
    }

    updateCartModal(); // Update the cart modal
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove the item from the cart array
    updateCartModal(); // Update the cart modal
}

// Function to redirect to the checkout page
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add products to the cart before proceeding.");
        return;
    }

    // Pass the cart data to the checkout page (you can store it in localStorage or pass it as query parameters)
    localStorage.setItem("cart", JSON.stringify(cart));

    // Redirect to the checkout page
    window.location.href = "checkout.html";
}

// Show/Hide Cart Modal
const cartIcon = document.getElementById("cartIcon");
const cartModal = document.getElementById("cartModal");
const closeCart = document.getElementById("closeCart");

cartIcon.addEventListener("click", () => {
    cartModal.style.display = "block";
});

closeCart.addEventListener("click", () => {
    cartModal.style.display = "none";
});


function redirectToCheckout() {
        window.location.href = 'checkout.html';
    }