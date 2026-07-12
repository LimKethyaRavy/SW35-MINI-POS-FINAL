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

// import data from anther js file

import { SaveProduct } from "../models/storage.js";

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

$("#btn_add").click((e) => {
  e.preventDefault();

  const product = productData();

  SaveProduct(product);

  Swal.fire({

    title: "Saved!",
    text: "Product added successfully.",
    icon: "success",
    confirmButtonText: "OK",

  });

  rendertable();
  Clearform();

});




function Clearform(){

  form.reset();

}
