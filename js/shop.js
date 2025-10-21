// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
const products = [
    {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]

// => Reminder, it's extremely important that you debug your code. 
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster. 
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
const cart = [];

const total = 0;

// Update the number of products in the cart
const updateQtyTotal = () => {
    document.getElementById('count_product').innerHTML = cart.length;
}

// Exercise 1
const buy = (event) => {
    // 1. Loop for to the array products to get the item to add to cart
    const clickedButton = event.currentTarget;
    const selectedProduct = parseInt(clickedButton.dataset.productId);
    const productToBuy = products.find(object => object.id === selectedProduct); // Producto encontrado

    // 2. Add found product to the cart array
    const lookingCart = cart.find(object => object.id === productToBuy.id)
    if (!lookingCart) {  // El producto no está en el carrito
        const newCartItem = {...productToBuy, quantity: 1};
        if (newCartItem.offer) {
            newCartItem.offer = { ...newCartItem.offer }; 
        }
        cart.push(newCartItem)
    } else {  // Si está en el carrito
        lookingCart.quantity += 1;
    }
    updateQtyTotal();
    applyPromotionsCart();
    calculateTotal();
}

// Exercise 2
const cleanCart = () =>  {
    cart.length = 0;
    updateQtyTotal();
    printCart();
}

// Exercise 3
const calculateTotal = () =>  {
    // Calculate total price of the cart using the "cartList" array
    let priceToUse = 0;
    const totalAmount = cart.reduce((summary, actualProduct) => {
        if (actualProduct.hasOwnProperty('subtotalWithDiscount')) {
            priceToUse = actualProduct.subtotalWithDiscount;
        } else {
            priceToUse = actualProduct.price;
        }
        summary += actualProduct.quantity * priceToUse;
        return summary;
    }, 0)
    document.getElementById('total_price').innerHTML = totalAmount.toFixed(2);
    return totalAmount.toFixed(2);
}

// Exercise 4
const applyPromotionsCart = () =>  {
    // Apply promotions to each item in the array "cart"
    cart.forEach((cartProduct, index) => {
        if (cartProduct.hasOwnProperty('offer')) {
            if (cartProduct.quantity >= cartProduct.offer.number) {
                cart[index].subtotalWithDiscount = cartProduct.price * ((100 - cartProduct.offer.percent) / 100);
            }
        } 
    })
}

// Exercise 5
const printCart = () => {
    // Fill the shopping cart modal manipulating the shopping cart dom
    const parentElement = document.getElementById('cart_list');
    const blockToWrite = document.createDocumentFragment();
    parentElement.innerHTML = '';
    let priceProduct = 0;

    cart.forEach(cartProduct => {
        const newTr = document.createElement('tr');

        const thName = document.createElement('th');
        thName.setAttribute('scope', 'row'); 
        thName.textContent = cartProduct.name;
        newTr.appendChild(thName);

        const tdPrice = document.createElement('td');
        priceProduct = cartProduct.price;
        if (cartProduct.hasOwnProperty('offer')) {
            if (cartProduct.quantity >= cartProduct.offer.number) {
                tdPrice.style.color = "red";
                priceProduct = cartProduct.subtotalWithDiscount;
            }
        }
        tdPrice.textContent = priceProduct;
        newTr.appendChild(tdPrice);

        const tdQuantity = document.createElement('td');
        tdQuantity.textContent = cartProduct.quantity;
        newTr.appendChild(tdQuantity);

        const tdsubTotal = document.createElement('td');
        tdsubTotal.textContent = (cartProduct.quantity * priceProduct).toFixed(2);
        newTr.appendChild(tdsubTotal);

        blockToWrite.appendChild(newTr);
    }) 
    parentElement.appendChild(blockToWrite);
    calculateTotal();
}


// ** Nivell II **

// Exercise 7
const removeFromCart = (id) => {
    
}

const open_modal = () =>  {
    printCart();
}


let buttonPressed = document.querySelectorAll('.add-to-cart');

for (const buttonClick of buttonPressed) {
    buttonClick.addEventListener('click', buy);
}

document.addEventListener('DOMContentLoaded', () => {
    const cleanCartButton = document.getElementById('clean-cart');
    if (cleanCartButton) { // To prevent fails in checkout.js
        cleanCartButton.addEventListener('click', cleanCart); 
    }
    
    const cartButton = document.getElementById('cart-button');
    if (cartButton) {
        cartButton.addEventListener('click', open_modal);
    }
});