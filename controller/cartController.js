
import { cart_selected, renderCartOrder } from "../view/cardRender.js";

//  ================Increase qty function==============
export function increaseQty(id){

    let item = cart_selected.find(item => item.id == id);

    if(item){

        item.qty++;

    }

    renderCartOrder(cart_selected);
}

// ================Decrease Qty function=====================
export function decreaseQty(id){

    let item = cart_selected.find(item => item.id == id);

    if(item && item.qty >0){

        item.qty--;

        
    }

    renderCartOrder(cart_selected);
}



// ================Delete Prodcut order=============

export function deleteOrder(id){

    let index = cart_selected.findIndex(item => item.id == id);

    if(index > -1){

        Swal.fire({
  title: "Are you sure you want to remove order?",
  text: "Product will be remove from cart list",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Remove"

}).then((result) => {

  if (result.isConfirmed) {
    
    cart_selected.splice(index, 1);
    
    renderCartOrder(cart_selected);

    Swal.fire({
    title: "Deleted",
    text: "Product has been deleted.",
    icon: "success"

  });

//   console.log(cart_selected);

  }
    

});
    }
}


// ==============Cancle Order===============

export function cancelOrder(cart_selected, callback){


    Swal.fire({
  title: "Are you you want to cancel the Order?",
  text: "All select item will be remove",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Delete Order"
}).then((result) => {
  if (result.isConfirmed) {

    
    cart_selected.length = 0;

    callback();

        Swal.fire({
    title: "Deleted!",
    text: "Product order have been deleted",
    icon: "success"
  });

  }
    

});


}