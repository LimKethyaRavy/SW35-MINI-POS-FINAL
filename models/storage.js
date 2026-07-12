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