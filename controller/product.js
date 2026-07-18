// ===================Product JS uSE for Handle add edit delete============

let pro_id = document.getElementById("pro_id");

let pro_name = document.getElementById("pro_name");

let pro_category = document.getElementById("pro_category");

let pro_cost = document.getElementById("pro_cost");

let sell_price = document.getElementById("sell_price");

let pro_img = document.getElementById("pro_img");

// let btn_add = document.getElementById("btn_add");

const emptyState = document.getElementById("emptyState");

const tableEmpty = document.getElementById("tableEmpty");

let parentTable = document.getElementById("parentTable");


let globalindex = -1;

// import data from anther js file

import { getProducts, SaveProduct, delete_Handle, edit_Product } from "../models/storage.js";

import { rendertable } from "../view/tableRender.js";

let product_information = [];

rendertable();

function productData() {

  return {

    id: $("#pro_id").val(),

    name: $("#pro_name").val(),

    category: $("#pro_category").val(),

    cost: $("#pro_cost").val(),

    sell_Price: $("#sell_price").val(),

    image: $("#pro_img").val(),
  };
}


// ==================== Event Add Delete edit Block ============================

// ==============Addbtn==============
$("#btn_add").click((e) => {

  e.preventDefault();

  const product = productData();

  const storage_data = getProducts();

  for(let i =0; i< storage_data.length; i++){

    if(pro_id.value == storage_data[i].id){

        Swal.fire({
        title: "Dublicate Product ID",
        text: "Please enter unique product id",
        icon: "warning"
      });

      return;
    }
  }

 

  SaveProduct(product);

  Swal.fire({

    title: "Saved!",
    text: "Product added successfully.",
    icon: "success",
    confirmButtonText: "OK",

  });


  // const lastest_product = [...storage_data].reverse();

  rendertable();
  Clearform();

});


// ===================Delete===================
$(document).on("click", "#delete_btn", function(delete_product) {

          const id = $(this).data("id");

          let products = getProducts();

        let index = products.findIndex(item => item.id == id);

        if(index > - 1){

        Swal.fire({
        title: "Are you sure you want to delete product from inventory?",
        text: "The data will be remove from storage",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete"

      }).then((result) => {
        if (result.isConfirmed) {

          products.splice(index, 1);

          delete_Handle(products);

            Swal.fire({

            title: "Delete",
            text: "Product delete successfully",
            icon: "success",
            confirmButtonText: "OK",

  });

          rendertable();

        }

        // console.log(index);

      });
    
    
   }
})

// console.log(JSON.parse(localStorage.getItem("getProducts")));

// ==========ClearForm================

function Clearform(){



  pro_id.value = "";
  pro_name.value = "";
  pro_category.value = "";
  pro_cost.value = "";
  sell_price.value = "";
  pro_img.value = "";

}


// ======================Edit Scope Control ===================

// ========== to show and read old data on modal when click edit btn ==========
$(document).on("click", "#edit_btn", function(edit_product) {

        const id = $(this).data("id");

        let products = getProducts();

        let index = products.findIndex(item => item.id == id);

        const edit = products[index];

        // console.log(edit);

        if(index > - 1){

          globalindex = index;

          document.getElementById("edit_pro_id").value = edit.id

            document.getElementById("edit_pro_name").value = edit.name

            document.getElementById("edit_pro_category").value = edit.category

            document.getElementById("edit_pro_cost").value = edit.cost

            document.getElementById("edit_sell_price").value = edit.sell_Price

            document.getElementById("edit_pro_img").value = edit.image  
            
        }
    
   }
)


// ================Update after edit ===============


$("#btn_update").click((e) => {

  function product_edit_object() {

    return {

      id: $("#edit_pro_id").val(),
      name: $("#edit_pro_name").val(),
      category: $("#edit_pro_category").val(),
      cost: $("#edit_pro_cost").val(),
      sell_Price: $("#edit_sell_price").val(),
      image: $("#edit_pro_img").val()
    }
  }

  const pro_edit_obj = product_edit_object();

  edit_Product(globalindex, pro_edit_obj);

    Swal.fire({

    title: "Saved!",
    text: "Product edit successfully",
    icon: "success",
    confirmButtonText: "OK",

  });


  rendertable();
  
  edit_Clearform();


  globalindex = -1;
  
  

}) 


function edit_Clearform(){

  $("#edit_pro_id").val("");
  $("#edit_pro_name").val("");
  $("#edit_pro_category").val("");
  $("#edit_pro_cost").val("");
  $("#edit_sell_price").val("");
  $("#edit_pro_img").val("");

}

