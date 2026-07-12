import { getProducts } from "../models/storage.js";


// ========for page value ===============
const row_per_page = 5;
let currentPage = 1;


// ================Table Render========================
export function rendertable() {
    const products = getProducts();
    const table = document.getElementById("parentTable");

    table.innerHTML = ""; 
    table.classList.add("table", "table-striped", "table-hover", "table-bordered", "align-middle");

    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    const headerData = ["Product ID", "Product Icon", "Product Name", "Category", "Cost Price", "Sell Price", "Action"];

    headerData.forEach(item => {
        const th = document.createElement("th");
        th.textContent = item;
        tr.appendChild(th);
    });

    thead.appendChild(tr);
    table.append(thead);

    const tbody = document.createElement("tbody");

    if (products.length === 0) {
        $("#emptyState").show();
        $("#pagination").html("");
        table.append(tbody);
        return;
    }

    $("#emptyState").hide();

    // =================== Pagination control=========== =============
    const totalpage = Math.ceil(products.length / row_per_page);
    if (currentPage > totalpage) currentPage = totalpage;

    const start = (currentPage - 1) * row_per_page;
    const end = start + row_per_page;
    const pageItem = products.slice(start, end);

    pageItem.forEach(row => {
        const td = `
        <tr>
            <td>${row.id}</td>
            <td><img src="${row.image}"></td>
            <td>${row.name}</td>
            <td class="cate">${row.category}</td>
            <td>$ ${row.cost}</td>
            <td>$ ${row.sell_Price}</td>
            <td>
                <button class="btn btn-warning btn-sm">Edit</button>
                <button class="btn btn-danger btn-sm">Delete</button>
            </td>
        </tr>
        `;
        tbody.insertAdjacentHTML("beforeend", td);
    });

    table.append(tbody);

    renderPagination(totalpage); 
}

// =======================Pagination Page=======================

function renderPagination(totalpage) {
    const pagination = $("#pagination"); 
    pagination.html("");

    if (totalpage <= 1) return;

    pagination.append(`
        <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
            <a class="page-link" href="#" data-page="${currentPage - 1}">Previous</a>
        </li>
    `);

    for (let i = 1; i <= totalpage; i++) {
        pagination.append(`
            <li class="page-item ${i === currentPage ? "active" : ""}">
                <a class="page-link" href="#" data-page="${i}">${i}</a>
            </li>
        `);
    }

    pagination.append(`
        <li class="page-item ${currentPage === totalpage ? "disabled" : ""}">
            <a class="page-link" href="#" data-page="${currentPage + 1}">Next</a>
        </li>
    `);
}


$(document).on("click", "#pagination .page-link", function (e) {
    e.preventDefault();
    const page = Number($(this).data("page"));
    if (!page || page < 1) return;
    currentPage = page;
    rendertable();
});