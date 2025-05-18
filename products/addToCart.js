const cart = [];
const cartBtn = document.getElementById("cart-btn");
const cartDropdown = document.getElementById("cart-dropdown");
const cartItemsList = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const clearCartBtn = document.getElementById("clear-cart");

// Toggle Cart Dropdown
cartBtn.addEventListener("click", () => {
  cartDropdown.style.display =
    cartDropdown.style.display === "block" ? "none" : "block";
});

// Add to Cart Functionality
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", function () {
    const name = this.getAttribute("data-name");
    const price = parseFloat(this.getAttribute("data-price"));

    // Check if item already exists in cart
    const existingItem = cart.find((item) => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    updateCart();
  });
});

// Update Cart UI
function updateCart() {
  cartItemsList.innerHTML = "";
  let total = 0;
  let itemCount = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    itemCount += item.quantity;

    const li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );
    li.innerHTML = `
                    ${item.name} (x${item.quantity}) - $${(
      item.price * item.quantity
    ).toFixed(2)}
                    <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">X</button>
                `;
    cartItemsList.appendChild(li);
  });

  cartTotal.innerText = `$${total.toFixed(2)}`;
  cartCount.innerText = itemCount;
}

// Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Close cart dropdown when clicking outside
document.addEventListener("click", (event) => {
  if (!cartBtn.contains(event.target) && !cartDropdown.contains(event.target)) {
    cartDropdown.style.display = "none";
  }
});
