const expences = document.querySelector(".expences");
const expences_form = document.querySelector("form");

expences_form.addEventListener("submit", function (e) {
  e.preventDefault();

  const expense_amount = document.getElementById("expense_amount").value;
  const expence_desc = document.getElementById("expence_desc").value;
  const expence_category = document.getElementById("expence_category").value;

  if (
    !expense_amount ||
    !expence_desc ||
    !expence_category ||
    expence_category === "Select Category"
  ) {
    alert("Please fill in all fields with valid values!");
    return;
  }

  const newExpence = {
    amount: expense_amount,
    description: expence_desc,
    category: expence_category,
  };

  const editKey = expences_form.getAttribute("edit-key");
  if (editKey) {
    localStorage.setItem(editKey, JSON.stringify(newExpence));
    expences_form.removeAttribute("edit-key");
  } else {
    const uniqueKey = `key_${Date.now()}`;
    localStorage.setItem(uniqueKey, JSON.stringify(newExpence));
  }

  expences_form.reset();

  loadList();
});

function loadList() {
  expences.innerHTML = "";

  if (localStorage.length === 0) {
    console.log("No data in localStorage!");
    return;
  }

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = JSON.parse(localStorage.getItem(key));

    expences.innerHTML += `
      <li class="expence ">
        <div class="desc">${value.description || "No Description"}</div>
        <div class="amount">${value.amount || 0} Rs</div>
        <div class="cat">${value.category || "Uncategorized"}</div>
        <button class="btn btn-secondary btn-sm mr-2" onclick="handleEdit('${key}')">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="handleDelete('${key}')">Delete</button>
      </li>
    `;
  }
}

function handleDelete(key) {
  localStorage.removeItem(key);
  loadList();
}

function handleEdit(key) {
  const expenceToEdit = JSON.parse(localStorage.getItem(key));
  document.getElementById("expense_amount").value = expenceToEdit.amount;
  document.getElementById("expence_desc").value = expenceToEdit.description;
  document.getElementById("expence_category").value = expenceToEdit.category;
  expences_form.setAttribute("edit-key", key);
}

document.addEventListener("DOMContentLoaded", loadList);

window.addEventListener("storage", loadList);
