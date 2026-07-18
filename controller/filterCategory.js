import { getProducts } from "../models/storage.js";
import { renderProduct } from "../view/cardRender.js";

const products = getProducts();

export function product_filter(){

    document.querySelectorAll(".filter-product").forEach(btn => {
        btn.addEventListener("click", () => {

            document.querySelector(".filter-active")
                ?.classList.remove("filter-active");

            btn.classList.add("filter-active");

            const category = btn.dataset.category

            if(category === "All"){

                
            renderProduct(products);

            }else {

                const filter_product = products.filter(product => 

                    product.category === category
                );

                renderProduct(filter_product);
            }

        })
    })
}