import { getProducts } from "../models/storage.js";
import { calculateTotal, Payment, cashReturn } from "../controller/payment.js";
import { decreaseQty, increaseQty, deleteOrder } from "../controller/cartController.js";


// =============== Get Product from Storage =============
// ============= to display on the page=========
const products = getProducts();

   let output = "";

    products.forEach(pro => {

   output += `
    
   <div class="card pos-card" id="pos-card" data-id='${pro.id}'">
  <img class="product_img" src="${pro.image}" alt="">
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
  export let cart_selected = [];

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

  export function renderCartOrder(){

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
            <button class="qty-minus" data-id="${item.id}" id="qty-minus">-</button>
            <span id="price_qty">${item.qty}</span>
            <button class="qty-plus" data-id="${item.id}" id="qty-plus">+</button>
          </div>
          <button class="btn btn-danger btn_delete_order" data-id="${item.id}"><i class="fa-solid fa-trash"></i></button>
        </div>
    
    </li>
    `;    

    })

    cart_list.innerHTML = cart_display;

    calculateTotal(cart_selected);


  };


// =================== for Increase Decrease Delete product order click handle===========

$(document).on("click", ".qty-plus", function(){

  const id = $(this).data("id");

  increaseQty(id);
  
})

$(document).on("click", ".qty-minus", function(){

  const id = $(this).data("id");

  decreaseQty(id);
})


$(document).on("click", ".btn_delete_order", function(){

  const id = $(this).data("id");

  deleteOrder(id);
})



// ===============Final Payment=============

$(document).on("click", ".payment_btn", function(){

  const total = calculateTotal(cart_selected);

  Payment(total);

})

// cash return update ===================

$(document).on("input", "#cash-recive", function(){

  const total = calculateTotal(cart_selected);

  cashReturn(total);

  
})


// =====================Filter price ====================

$(document).on("click", "#five-dollar", function(){

  const total = calculateTotal(cart_selected);

  
})

   
    

  





    





