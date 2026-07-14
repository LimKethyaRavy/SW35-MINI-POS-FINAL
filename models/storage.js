//================= get data from btn_add on product js ==============

export function getProducts(){

    let storage = localStorage.getItem("getProduct");

    return storage ? JSON.parse(storage) : [];

  

}

// ===============Save produdct data and push to local storage
export function SaveProduct(product){

    let products = getProducts();

    products.push(product);

    console.log(products);

    localStorage.setItem("getProduct", JSON.stringify(products));


}

// ==============function update storage after delete ============
export function delete_Handle(products){

    localStorage.setItem("getProduct", JSON.stringify(products));
   

}

// ================function update storage after edit===========
export function edit_Product(globalindex, pro_edit_obj){

    let products = getProducts();

     if(globalindex > - 1){

         products[globalindex]  = pro_edit_obj

         localStorage.setItem("getProduct", JSON.stringify(products));
     }

   

}

// console.log(JSON.parse(localStorage.getItem("getProduct")));
// localStorage.clear(); 