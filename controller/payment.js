//================Product Payment control =============



// ===========for display subtotal total usd and Khr=====
    let Usd_to_Khr = 4100;
  
    export function calculateTotal(cart_selected){

    let total = 0;      

    cart_selected.forEach(item => {

    total += item.sell_Price * item.qty;

    });


    document.getElementById("sub_total").textContent =
        `$ ${total.toFixed(2)}`;

    document.getElementById("usd_subtotal").textContent =
        `$ ${total.toFixed(2)}`;

    const khr = total * Usd_to_Khr;

    document.getElementById("khr_subtotal").textContent =
        `៛ ${khr.toLocaleString()}`;

    document.getElementById("total_all").textContent =
    `$ ${total.toFixed(2)}`;

    return total;

    

    }

// =============Final Payment============

export function Payment(total){

    let cash_recive = parseFloat(document.getElementById("cash-recive").value);
    
    if(!cash_recive){

         Swal.fire({
            title: "Enter cash amount",
            text: "Please enter customer payment.",
            icon: "warning"
        });

        return;

    }

    if(cash_recive >= total){

        let cash_return = 0;

        cash_return = cash_recive - total;

        alert("Success");

        document.getElementById("cash_return").value = 
         `$ ${cash_return.toFixed(2)}`;;

    }else {

            Swal.fire({
            title: "Not enough money",
            text: `Customer needs $${(total -  cash_recive).toFixed(2)} more.`,
            icon: "error"
        });

       
    }
   

}

// ==============Cash return ====================
export function cashReturn(total){

    const cash_recive = parseFloat(document.getElementById("cash-recive").value || 0)

    const cash_return = cash_recive - total;

    document.getElementById("cash_return").value = cash_return >=0 ? cash_return.toFixed(2): "$0:00"

}
        




    