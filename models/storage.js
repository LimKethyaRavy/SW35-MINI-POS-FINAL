export function getProducts(){

    let storage = localStorage.getItem("getProduct");

    return storage ? JSON.parse(storage) : [];

  

}

export function SaveProduct(product){

    let products = getProducts();

    products.push(product);

    console.log(products);

    localStorage.setItem("getProduct", JSON.stringify(products));


}

export function delete_Handle(products){

    localStorage.setItem("getProduct", JSON.stringify(products));
   

}

// console.log(JSON.parse(localStorage.getItem("getProduct")));
// localStorage.clear(); 