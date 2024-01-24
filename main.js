let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let cerateBtn = document.getElementById("create");
let deleteAllDiv = document.getElementById("delete-products");

let mood = "create";
let temp;
let searchMood = "title";

// Get Total Price
function getTotal() {
  if (price.value !== "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "green";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#a00";
  }
}

// Create Product And Save It In Local Storage
let productsArr = [];
if (localStorage.getItem("products") !== null) {
  productsArr = JSON.parse(localStorage.getItem("products"));
} else {
  productsArr = [];
}
cerateBtn.onclick = function cerateProduct() {
  let newProduct = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  if (
    title.value !== "" &&
    price.value !== "" &&
    category.value !== "" &&
    newProduct.count < 100
  ) {
    if (mood === "create") {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          productsArr.push(newProduct);
        }
      } else {
        productsArr.push(newProduct);
      }
    } else {
      productsArr[temp] = newProduct;
      mood = "create";
      cerateBtn.innerHTML = "Create";
      count.style.display = "block";
    }
    clearInputs();
  }
  localStorage.setItem("products", JSON.stringify(productsArr));
  showProducts();
  getTotal();
  scroller();
};

// Show Products In Table
let tbody = document.getElementById("tbody");
function showProducts() {
  let table = "";
  for (let i = 0; i < productsArr.length; i++) {
    table += `
      <tr>
        <td>${i + 1}</td>
        <td>${productsArr[i].title}</td>
        <td>${productsArr[i].price}</td>
        <td>${productsArr[i].taxes}</td>
        <td>${productsArr[i].ads}</td>
        <td>${productsArr[i].discount}</td>
        <td>${productsArr[i].category}</td>
        <td>${productsArr[i].total}</td>
        <td><button id="update" onclick = "update(${i})">Update</button></td>
        <td><button id="delete" onclick ="deleteProduct(${
          this.i
        })">Delete</button></td>
      </tr>  
    `;
  }
  if (productsArr.length > 1) {
    deleteAllDiv.innerHTML = `<button onclick="deleteAllProducts()" id="delete-all">Delete All</button>`;
  } else {
    deleteAllDiv.innerHTML = "";
  }
  tbody.innerHTML = table;
  getTotal();
}
showProducts();

// Delete Product
function deleteProduct(i) {
  productsArr.splice(i, 1);
  localStorage.products = JSON.stringify(productsArr);
  showProducts();
  scroller();
}

// Delete All Products
function deleteAllProducts() {
  productsArr.splice(0);
  showProducts();
  scroller();
}

// Clear Inputs
function clearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// Ubdate
function update(i) {
  title.value = productsArr[i].title;
  price.value = productsArr[i].price;
  taxes.value = productsArr[i].taxes;
  ads.value = productsArr[i].ads;
  discount.value = productsArr[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = productsArr[i].category;
  cerateBtn.innerHTML = "Ubdate";
  mood = "update";
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Search
let searchInput = document.getElementById("search");
function getSearchMood(id) {
  if (id === "search-title") {
    searchMood = "title";
    searchInput.placeholder = "Search By Title";
  } else {
    searchInput.placeholder = "Search By Category";
  }
  searchInput.focus();
  searchInput.value = "";
  showProducts();
  scroller();
}

// Search On Data
function searchData(value) {
  let table = "";
  if (searchMood === "title") {
    for (let i = 0; i < productsArr.length; i++) {
      if (productsArr[i].title.toLowerCase().includes(value.toLowerCase())) {
        table += `
      <tr>
        <td>${i + 1}</td>
        <td>${productsArr[i].title}</td>
        <td>${productsArr[i].price}</td>
        <td>${productsArr[i].taxes}</td>
        <td>${productsArr[i].ads}</td>
        <td>${productsArr[i].discount}</td>
        <td>${productsArr[i].category}</td>
        <td>${productsArr[i].total}</td>
        <td><button id="update" onclick = "update(${i})">Update</button></td>
        <td><button id="delete" onclick ="deleteProduct(${
          this.i
        })">Delete</button></td>
      </tr>  
    `;
      } else {
        if (productsArr[i].category.toLowerCase().includes(value.toLowerCase())) {
          table += `
      <tr>
        <td>${i + 1}</td>
        <td>${productsArr[i].title}</td>
        <td>${productsArr[i].price}</td>
        <td>${productsArr[i].taxes}</td>
        <td>${productsArr[i].ads}</td>
        <td>${productsArr[i].discount}</td>
        <td>${productsArr[i].category}</td>
        <td>${productsArr[i].total}</td>
        <td><button id="update" onclick = "update(${i})">Update</button></td>
        <td><button id="delete" onclick ="deleteProduct(${
          this.i
        })">Delete</button></td>
      </tr>  
    `;
        }
      }
    }
  }
  tbody.innerHTML = table;
}

// Scroller
function scroller() {
  let scroller = document.querySelector(".scroller");
  let height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  window.addEventListener("scroll", () => {
    let scrollTop = document.documentElement.scrollTop;
    scroller.style.width = `${(scrollTop / height) * 100}%`;
  });
}
scroller();
// Scroller
