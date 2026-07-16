import { getProducts } from "../models/storage.js";


// =============== Get Product from Storage =============
// ============= to display on the page=========
const products = getProducts();

   let output = "";

    products.forEach(pro => {

   output += `
    
   <div class="card pos-card" id="pos-card" data-id='${pro.id}'">
  <img class="product_img" src="${pro.image}" alt="Cappuccino">
  <div class="card-body">
    <div class="product-name">${pro.name}</div>
    <div class="product-price">$ ${pro.sell_Price}</div>
  </div>
    </div>

   
   `;  
    
}
);

document.getElementById("card_display").innerHTML = output;

console.log(products);

$(document).on('click', "#pos-card", function(e)
    {
    
       const card = e.target.closest(".pos-card");

       if(!card) return;

       let card_id = $(card).data("id");

    //    alert(card_id)

    console.log(card_id) 

    let product = getProducts();

    product = products.find(p => p.id == card_id)

    console.log(product);

    let productQTy = 1;

    let cart_display = "";
        
    cart_display += `

    <li>
     <div class="order-item" data-id="${product.id}">
          <img src="${product.image}" alt="">
          <div class="info">
            <div class="item-name">${product.name}</div>
            <div class="item-price">$${product.sell_Price}</div>
          </div>
          <div class="qty-control">
            <button class="qty-minus">-</button>
            <span>${productQTy}</span>
            <button class="qty-plus">+</button>
          </div>
          <button class="remove-btn"><i class="fa-solid fa-trash"></i></button>
        </div>
    
    </li>
    `;    

          document.getElementById("card_list").innerHTML += cart_display;

        
   } );
    

  





    





