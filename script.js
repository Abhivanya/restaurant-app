const expences_form = document.querySelector("#expences_form");
const table1 = document.querySelector(".table1");
const table2 = document.querySelector(".table2");
const table3 = document.querySelector(".table3");

expences_form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const orderPrice = document.getElementById("price").value;
  const orderTable = document.getElementById("selectedTable").value;
  const orderDish = document.getElementById("dish").value;

  if (!orderPrice || !orderTable || !orderDish) {
    alert("Please fill in all fields with valid values!");
    return;
  }

  const newOrder = {
    price: orderPrice,
    item: orderDish,
    tableNo: orderTable,
  };

  axios
    .post(
      "https://crudcrud.com/api/6ebf4939f525482a823a02102848c7d4/order",
      newOrder
    )
    .then((res) => {
      console.log(res.data);
      getData();
    })
    .catch((err) => console.log(err.message));

  expences_form.reset();
});

function getData() {
  axios
    .get("https://crudcrud.com/api/6ebf4939f525482a823a02102848c7d4/order")
    .then((res) => {
      const data = res.data;
      console.log(res.data);
      displayData(1, data);
      displayData(2, data);
      displayData(3, data);
    })
    .catch((err) => console.log(err));
}

function displayData(tableNumber, data) {
  const filteredData = data.filter(
    (item) => parseInt(item.tableNo) === tableNumber
  );
  const tableClass = `.table${tableNumber}`;
  const listContainer = document.querySelector(tableClass);

  listContainer.innerHTML = "";
  listContainer.innerHTML;

  filteredData.forEach((order) => {
    const listItem = document.createElement("li");
    listItem.classList.add("order");

    const orderHTML = `
        <div>${order.price} Rs</div>
        <div>${order.item}</div>
        <div><button class="btn-danger btn" onclick="deleteOrder('${order._id}', ${tableNumber})">Delete</button></div>
    `;
    listItem.innerHTML = orderHTML;
    listContainer.appendChild(listItem);
  });
}

function deleteOrder(orderId, tableNumber) {
  axios
    .delete(
      `https://crudcrud.com/api/6ebf4939f525482a823a02102848c7d4/order/${orderId}`
    )
    .then((res) => {
      console.log(`Order deleted: ${orderId}`);
      getData();
    })
    .catch((err) => console.log(err));
}

document.addEventListener("DOMContentLoaded", getData);
