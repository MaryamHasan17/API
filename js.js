//console.log("running")
let carts = document.querySelectorAll('.add-cart');
let products = [
    {
        name:'Novel',
        tag:'Novel',
        price:41,
        inCart:0
    },

    {
        name:'Book',
        tag:'Book',
        price:32,
        inCart:0
    },

    {
        name:'Book2',
        tag:'Book2',
        price:42,
        inCart:0
    },

    {
        name:'Kids',
        tag:'Kids',
        price:80,
        inCart:0
    }

];

for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totalCost(products[i])
    })
}
function cartNumbers(){
    let productNumbers = localStorage.getItem("cartNumbers");
   

    productNumbers = parseInt(productNumbers);
    localStorage.setItem('caetNumbers',1);
    //console.log(productNumbers);
}
function onloadCartNumbers(){
   let productNumbers = localStorage.getItem('cartNumbers');

   if (productNumbers) {
      document.querySelector('.cart span').textContent = productNumbers;   
}
}

function cartNumbers(product){
    //console.log("The product clicked is", product);
    let productNumbers = localStorage.getItem("cartNumbers");

    productNumbers = parseInt(productNumbers);

   if (productNumbers){
      localStorage.getItem('cartNumbers', productNumbers + 1);
      document.querySelector('.cart span'). textContent = productNumbers + 1;
    }
   else{
      localStorage.setItem('cartNumbers', 1);
      document.querySelector('.cart span'). textContent = 1;
    }

    setItem(product);

}
function setItem(product){
    let cartItems = localStorage.getItem('productsTnCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null){
    if (cartItems[product.tag] == undefined) {
          cartItems = {
              ...cartItems,
              [product.tag]: product
   }
}

    cartItems[product.tag].inCart += 1;
    } else{
    product.inCart = 1;
    cartItems = {
        [product.tag]: product
}
} 

    localStorage.setItem("productsTnCart", JSON.stringify
    (cartItems));
}

function totalCost(product){
//console.log("the product price is ", product, price);
let cartCost = localStorage.getItem('totalCost');
//console.log("cartCost is ", cartCost);
//console.log("typeof cartCost");

if (cartCost != null){
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost +
    product.price);
} else{
    localStorage.setItem("totalCost", cartCost + product.price)
}
localStorage.setItem("totalCost", product.price);
}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems= JSON.parse(cartItems);
    let productContainer = document.querySelector
    (".products");
    let cartCost = localStorage.getItem('totalCost');
//console.log(cartItems);    
    if (cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
        productContainer.innerHTML +=`
        <div class="product">
        <ion-icon name="close-circle-outline"></ion-icon>
           <img sre="./images/${item.tag}.jpg">
            <span>${item.name}</span>
       </div>
       < div class="price">$${item.price},00</div>
       < div class="quantity"><ion-icon name="arrow-back-circle-outline"></ion-icon>
       <span>${item.inCart}</span>
       <ion-icon name="arrow-forward-circle-outline"></ion-icon></div>
       <div class="total">
            $${item.inCart * item.price},00
       </div>`
        }); 

        productContainer.innerHTML +=`
        <div class="basketTotalTitle">
        <h4 class="basketTotalTitle">Basket Total</h4>
        <h4 class="basketTotal">
        $${cartCost},00
        </h4>
        `;
    }
}

onloadCartNumbers();
displayCart();