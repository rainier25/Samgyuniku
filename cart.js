// cart.js

document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout-button");
  
    let cart = []; // Array to store cart items
  
    // Example item format: { id: 1, name: "Beef Bulgogi", price: 450, quantity: 1 }
  
    function updateCartUI() {
      cartItemsContainer.innerHTML = ""; // Clear current items
  
      if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty!</p>";
        totalPriceElement.textContent = "Total: ₱0";
        return;
      }
  
      let totalPrice = 0;
  
      cart.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
          <span>${item.name}</span>
          <span>₱${item.price} x ${item.quantity}</span>
          <span>₱${item.price * item.quantity}</span>
          <button class="remove-item" data-id="${item.id}">Remove</button>
        `;
        cartItemsContainer.appendChild(itemElement);
        totalPrice += item.price * item.quantity;
      });
  
      totalPriceElement.textContent = `Total: ₱${totalPrice}`;
    }
  
    function addItemToCart(id, name, price) {
      const existingItem = cart.find((item) => item.id === id);
  
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ id, name, price, quantity: 1 });
      }
  
      updateCartUI();
    }
  
    function removeItemFromCart(id) {
      cart = cart.filter((item) => item.id !== parseInt(id));
      updateCartUI();
    }
  
    cartItemsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-item")) {
        const itemId = e.target.getAttribute("data-id");
        removeItemFromCart(itemId);
      }
    });
  
    checkoutButton.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Your cart is empty! Add some items before checking out.");
      } else {
        alert("Thank you for your order! Proceeding to checkout...");
        cart = []; // Clear cart after checkout
        updateCartUI();
      }
    });
    
     // Example usage: Adding items to the cart dynamically
  // Uncomment the following lines to test adding items dynamically
  // addItemToCart(1, "Beef Bulgogi", 450);
  // addItemToCart(2, "Pork Samgyupsal", 400);
});
