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

// =================Order Detail =======================

// =============== product Click event control============== 
document.getElementById("card_display").innerHTML = output;

console.log(products);

$(document).on('click', "#pos-card", function(e)
    {
    
       const card = e.target.closest(".pos-card");

       if(!card) return;

       let card_id = $(card).data("id");

    //    alert(card_id)

    // console.log(card_id)

    addToCart(card_id);

   } );



  //  ====================cart list control====================
  let cart_selected = [];

   function addToCart(productID){

    let products = getProducts();

   let product = products.find(p => p.id == productID);

    
    // console.log(product);

    let search_selected = cart_selected.find(
      item => item.id == productID
    );

    if(search_selected){

      search_selected.qty++;


    }else {

      let selected_product = {

        id: product.id,
        image: product.image,
        name: product.name,
        sell_Price: product.sell_Price,
        qty: 1,

      }

      cart_selected.push(selected_product);
    }

    renderCartOrder();


   }

  //  ================Cart Render=============

  function renderCartOrder(){

    let cart_list = document.getElementById("card_list");


    let cart_display = "";

    cart_selected.forEach(item => {
      
      cart_display += `

    <li>
     <div class="order-item" data-id="${item.id}">
          <img src="${item.image}" alt="">
          <div class="info">
            <div class="item-name">${item.name}</div>
            <div class="item-price">$${item.sell_Price}</div>
          </div>
          <div class="qty-control">
            <button class="qty-minus">-</button>
            <span id="price_qty">${item.qty}</span>
            <button class="qty-plus">+</button>
          </div>
          <button class="remove-btn"><i class="fa-solid fa-trash"></i></button>
        </div>
    
    </li>
    `;    

    let total = 0;

    cart_selected.forEach(item => {

      total += item.sell_Price * item.qty;

   

      
    });
  
       document.getElementById("price_qty").textContent = total;
      
    });
        
    
    cart_list.innerHTML = cart_display;

  }


    





   
    

  





    





