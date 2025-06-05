let cart = {};

function countItems() {
    let total = 0;
    for (let item in cart) {
      
        let quantity = Number(cart[item].quantity);
        if (!isNaN(quantity)) {
            total = total + quantity;
        }
    }
    return total;
}


function updateCartButton() {
    let cartButton = document.querySelector('.cart-button');
    if (cartButton) {
        let total = countItems();
        cartButton.textContent = 'Cart (' + total + ')';
    }
}


function saveCart() {
  
    let cartString = '';
    for (let itemName in cart) {
    
        let quantity = Number(cart[itemName].quantity);
        if (!isNaN(quantity)) {
            cartString += itemName + '|' + quantity + '|' + cart[itemName].price + ';';
        }
    }
    localStorage.setItem('cart', cartString);
    updateCartButton();
}


function loadCart() {
    let cartString = localStorage.getItem('cart');
    if (cartString) {
    
        let items = cartString.split(';');
        for (let i = 0; i < items.length; i++) {
            if (items[i]) {
                let parts = items[i].split('|');
                let quantity = Number(parts[1]);
                if (!isNaN(quantity)) {
                    cart[parts[0]] = {
                        quantity: quantity,
                        price: parts[2]
                    };
                }
            }
        }
    }
}


loadCart();

let allCards = document.querySelectorAll('.card');
for (let i = 0; i < allCards.length; i++) {
    let card = allCards[i];
    

    let addButton = card.querySelector('.increase');
    let removeButton = card.querySelector('.decrease');
    let quantityText = card.querySelector('.quantity');
    let itemName = card.querySelector('h3').textContent;
    let itemPrice = card.querySelector('.price').textContent;
    

    if (cart[itemName]) {
        let quantity = Number(cart[itemName].quantity);
        quantityText.textContent = isNaN(quantity) ? '0' : quantity;
    } else {
        quantityText.textContent = '0';
    }
    

    addButton.onclick = function() {
        
        let currentQuantity = Number(quantityText.textContent);
        if (isNaN(currentQuantity)) {
            currentQuantity = 0;
        }
        let newQuantity = currentQuantity + 1;
        
        
        quantityText.textContent = newQuantity;
        
       
        cart[itemName] = {
            quantity: newQuantity,
            price: itemPrice
        };
        saveCart();
    };
    
    
    removeButton.onclick = function() {
   
        let currentQuantity = Number(quantityText.textContent);
        if (isNaN(currentQuantity)) {
            currentQuantity = 0;
        }
        
       
        if (currentQuantity > 0) {
            let newQuantity = currentQuantity - 1;
            
       
            quantityText.textContent = newQuantity;
            
    
            if (newQuantity === 0) {
                delete cart[itemName];
            } else {
    
                cart[itemName] = {
                    quantity: newQuantity,
                    price: itemPrice
                };
            }
            saveCart();
        }
    };
}

updateCartButton();


