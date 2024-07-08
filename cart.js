document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const shippingCost = 100;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let subtotal = 0;

        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <span>${item.name}</span>
                <div>
                    <button class="quantity-minus" data-index="${index}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-plus" data-index="${index}">+</button>
                </div>
                <span>£${item.price}</span>
                <span>£${(item.price * item.quantity).toFixed(2)}</span>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;

            cartItemsContainer.appendChild(itemElement);
            subtotal += item.price * item.quantity;
        });

        subtotalElement.textContent = `£${subtotal.toFixed(2)}`;
        totalElement.textContent = `£${(subtotal + shippingCost).toFixed(2)}`;

        localStorage.setItem('cart', JSON.stringify(cart));
    }

    cartItemsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('quantity-minus')) {
            const index = event.target.getAttribute('data-index');
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
                updateCart();
            }
        }

        if (event.target.classList.contains('quantity-plus')) {
            const index = event.target.getAttribute('data-index');
            cart[index].quantity++;
            updateCart();
        }

        if (event.target.classList.contains('remove-item')) {
            const index = event.target.getAttribute('data-index');
            cart.splice(index, 1);
            updateCart();
        }
    });

    updateCart();
});
document.addEventListener('DOMContentLoaded', function() {
    const orderItemsContainer = document.querySelector('.order-items');
    const orderSubtotalElement = document.getElementById('order-subtotal');
    const orderTotalElement = document.getElementById('order-total');
    const shippingCost = 100;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateOrderSummary() {
        orderItemsContainer.innerHTML = '';
        let subtotal = 0;

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'order-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;">
                <span>${item.name}</span>
                <span>Qty: ${item.quantity}</span>
                <span>£${(item.price * item.quantity).toFixed(2)}</span>
            `;

            orderItemsContainer.appendChild(itemElement);
            subtotal += item.price * item.quantity;
        });

        orderSubtotalElement.textContent = `£${subtotal.toFixed(2)}`;
        orderTotalElement.textContent = `£${(subtotal + shippingCost).toFixed(2)}`;
    }

    updateOrderSummary();
});
document.getElementById('checkout').addEventListener('click', function() {
    window.location.href = 'checkout.html'; // Adjust the path as needed
});
