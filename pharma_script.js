const messageDiv = document.getElementById('message');
const saveFavouritesBtn = document.getElementById('save-favourites');
const applyFavouritesBtn = document.getElementById('apply-favourites');


// Event listener for quantity changes

const cart = [];


const addCartButtons = document.querySelectorAll(".cart");

addCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const healthPackage = event.target.closest('.health-packages');
        
        const quantityInput = healthPackage.querySelector('.number-input');
        
        const name = event.target.dataset.name;
        const price = parseFloat(event.target.dataset.price);
        const quantity = parseInt(quantityInput.value, 10);

        const existingItem = cart.find(item => item.name === name);

        if (quantity > 0) {
            if (existingItem) {
                existingItem.quantity = quantity;
            } else {
                cart.push({ name, price, quantity });
            }
        } else {
            const index = cart.findIndex(item => item.name === name);
            if (index > -1) cart.splice(index, 1);
        }
        updateCart();
    });
});


function updateCart() {
    const cartContents = document.getElementById('cart-contents');
    const totalPriceEl = document.getElementById('total-price');
    cartContents.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const total = item.price * item.quantity;
        totalPrice += total;

        cartContents.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price}</td>
                <td>${item.quantity}</td>
                <td>$${total}</td>
            </tr>
        `;
    });

    totalPriceEl.textContent = `Total: $${totalPrice}`;
}


// Updated Pay button logic
document.getElementById('buy-now').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items first.');
        return;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'checkout.html';
});


// Save to favourites
saveFavouritesBtn.onclick = () => {
    if (cart.length === 0) {
        messageDiv.textContent = 'Your cart is empty. Add items before saving as favourites.';
        messageDiv.style.color = 'red';
        return;
    }

    localStorage.setItem('favouriteOrder', JSON.stringify(cart));
    messageDiv.textContent = 'Your order has been saved as favourites!';
    messageDiv.style.color = 'green';
};

// Apply favourites
applyFavouritesBtn.addEventListener('click', () => {
    const favouriteOrder = JSON.parse(localStorage.getItem('favouriteOrder'));

    if (!favouriteOrder || favouriteOrder.length === 0) {
        messageDiv.textContent = 'No favourites saved yet.';
        messageDiv.style.color = 'red';
        return;
    }

    // Clear current cart and apply favourites
    cart.length = 0;
    favouriteOrder.forEach(item => {
        cart.push(item);

        // Update input fields
        const input = document.querySelector(`input[data-name="${item.name}"]`);
        if (input) {
            input.value = item.quantity;
        }
    });

    updateCart();
    messageDiv.textContent = 'Favourites applied successfully!';
    messageDiv.style.color = 'green';
});