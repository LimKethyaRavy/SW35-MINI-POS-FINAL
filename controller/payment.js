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

    const khr = Math.round((total * Usd_to_Khr) / 100) * 100;
    
    document.getElementById("khr_subtotal").textContent =
        `៛ ${khr.toLocaleString()}`;

    document.getElementById("total_all").textContent =
    `$ ${total.toFixed(2)}`;

    return total;

    

    }

// =========================Final Payment Plus Recpit Print================================

export function Payment(total, cart_selected = [], onSuccess){

    let cash_recive = parseFloat(document.getElementById("cash-recive").value);
    
    if(!cash_recive){

         Swal.fire({
            title: "Enter cash amount",
            text: "Please enter customer payment.",
            icon: "warning"
        });

        return;

    }

    if(!cart_selected.length){

        Swal.fire({
            title: "Cart is empty",
            text: "Please add at least one product before payment.",
            icon: "warning"
        });

        return;
    }

    if(cash_recive >= total){

        let cash_return = 0;

        cash_return = cash_recive - total;

        document.getElementById("cash_return").value = 
         `$ ${cash_return.toFixed(2)}`;

        printReceipt(cart_selected, total, cash_recive, cash_return);

        Swal.fire({
            title: "Payment Successful",
            text: "Receipt is printing...",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
        });

        // reset inputs and cart so the next customer starts clean
        document.getElementById("cash-recive").value = "";
        document.getElementById("cash_return").value = "$0.00";

        if(typeof onSuccess === "function"){
            onSuccess();
        }

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


// ==============Print Receipt====================
// Opens a small print-friendly window formatted like a POS receipt and triggers the browser print dialog.

function printReceipt(cart_selected, total, cash_recive, cash_return){

    const receiptWindow = window.open("", "PRINT", "height=650,width=380");

    if(!receiptWindow){
        Swal.fire({
            title: "Popup blocked",
            text: "Please allow popups for this site to print the receipt.",
            icon: "warning"
        });
        return;
    }

    try {

        const now = new Date();
        const dateStr = now.toLocaleDateString();
        const timeStr = now.toLocaleTimeString();

        let itemsHtml = "";

        cart_selected.forEach(item => {

            const price = Number(item.sell_Price) || 0;
            const lineTotal = (price * item.qty).toFixed(2);

            itemsHtml += `
            <tr>
              <td>${item.name}</td>
              <td style="text-align:center;">${item.qty}</td>
              <td style="text-align:right;">$${price.toFixed(2)}</td>
              <td style="text-align:right;">$${lineTotal}</td>
            </tr>`;
        });

        const khr = (total * Usd_to_Khr).toLocaleString();

        receiptWindow.document.write(`
          <html>
            <head>
              <title>Receipt</title>
              <style>
                * { box-sizing: border-box; }
                body {
                  font-family: 'Courier New', monospace;
                  width: 300px;
                  margin: 0 auto;
                  padding: 16px;
                  color: #000;
                }
                h2 { text-align: center; margin: 0 0 4px; letter-spacing: 1px; }
                .sub { text-align: center; font-size: 12px; margin-bottom: 12px; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
                th, td { font-size: 12px; padding: 4px 2px; }
                th { border-bottom: 1px dashed #000; text-align: left; }
                .totals td { padding: 3px 2px; font-size: 13px; }
                .totals .label { text-align: left; }
                .totals .value { text-align: right; }
                .divider { border-top: 1px dashed #000; margin: 8px 0; }
                .grand td { font-weight: bold; font-size: 15px; }
                .footer { text-align: center; font-size: 11px; margin-top: 14px; }
              </style>
            </head>
            <body>
              <h2>FreshMart</h2>
              <div class="sub">Fresh Mart POS System<br>${dateStr} &nbsp;${timeStr}</div>
              <div class="divider"></div>
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th style="text-align:center;">Qty</th>
                    <th style="text-align:right;">Price</th>
                    <th style="text-align:right;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>
              <div class="divider"></div>
              <table class="totals">
                <tr><td class="label">Subtotal (USD)</td><td class="value">$${total.toFixed(2)}</td></tr>
                <tr><td class="label">Subtotal (KHR)</td><td class="value">${khr} &#6107;</td></tr>
                <tr class="grand"><td class="label">Total</td><td class="value">$${total.toFixed(2)}</td></tr>
                <tr><td class="label">Cash Received</td><td class="value">$${cash_recive.toFixed(2)}</td></tr>
                <tr><td class="label">Change</td><td class="value">$${cash_return.toFixed(2)}</td></tr>
              </table>
              <div class="divider"></div>
              <div class="footer">Thank you for shopping with us!<br>Please come again</div>
            </body>
          </html>
        `);

        receiptWindow.document.close();
        receiptWindow.focus();

     
        setTimeout(() => {
            receiptWindow.print();
            receiptWindow.close();
        }, 300);

    } catch (err) {
        console.error("Receipt print failed:", err);
        receiptWindow.close();
        Swal.fire({
            title: "Receipt failed to print",
            text: "Something went wrong generating the receipt.",
            icon: "error"
        });
    }

}