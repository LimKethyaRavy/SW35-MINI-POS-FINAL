
import { cart_selected, renderCartOrder } from "../view/cardRender.js";

export function increaseQty(id){

    let item = cart_selected.find(item => item.id == id);

    if(item){

        item.qty++;

    }

    renderCartOrder(cart_selected);
}

export function decreaseQty(id){

    let item = cart_selected.find(item => item.id == id);

    if(item && item.qty >0){

        item.qty--;

        
    }

    renderCartOrder(cart_selected);
}

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