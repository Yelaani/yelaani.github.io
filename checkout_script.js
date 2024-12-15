// Load cart data
const cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartTable = document.getElementById('checkout-cart');
const totalPriceEl = document.getElementById('checkout-total');
let totalPrice = 0;

cart.forEach(item => {
    const total = item.price * item.quantity;
    totalPrice += total;

    cartTable.innerHTML += `
        <tr>
            <td>${item.name}</td>
            <td>$${item.price}</td>
            <td>${item.quantity}</td>
            <td>$${total}</td>
        </tr>
    `;
});

totalPriceEl.textContent = `Total: $${totalPrice}`;

// Form submission
document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate form fields
    const name = document.getElementById('name').value.trim();
    const address = document.getElementById('address').value.trim();
    const email = document.getElementById('email').value.trim();

    if (name && address && email) {
        // Calculate delivery date (7 days from today)
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 7);
        const formattedDate = deliveryDate.toDateString();

        alert(`Order placed successfully! Thank you for shopping with us. Your items will be delivered by ${formattedDate}.`);

        localStorage.removeItem('cart'); // Clear the cart
        window.location.href = 'index.html'; // Redirect back to main page
    } else {
        alert('Please fill in all the required fields.');
    }
});
