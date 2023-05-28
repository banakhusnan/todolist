const tambahButton = document.querySelector("#tambah");
const formTambah = document.querySelector("#formTambah");
const listTodo = document.querySelector(".row .col-md-12 ul");

tambahButton.addEventListener("click", () => {
  const list = handleList(formTambah.value);
  listTodo.appendChild(list);

  const span = listTodo.querySelector("span");
  if (span != null) {
    span.remove();
  }

  formTambah.value = "";
});

function handleList(val) {
  // Create li element
  const newList = document.createElement("li");
  // Add class
  newList.classList.add(
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "mb-3"
  );
  const id = Math.floor(Math.random() * 255);
  //  add atribute data-id
  newList.setAttribute("data-id", val + id);

  //   Make input and label
  const newDivLabel = document.createElement("div");
  newDivLabel.classList.add("fw-bold", "d-flex");

  const label = document.createElement("label");
  label.innerHTML = val;

  newDivLabel.appendChild(label);

  //   Make action button
  const newDivAction = document.createElement("div");
  newDivAction.classList.add("gap-2", "d-flex");

  const newDeleteButton = document.createElement("button");
  newDeleteButton.setAttribute("type", "button");
  newDeleteButton.setAttribute("name", "deleteButton");
  newDeleteButton.setAttribute(
    "onclick",
    "deleteButton('" + newList.getAttribute("data-id") + "')"
  );
  newDeleteButton.classList.add("btn", "btn-danger");
  newDeleteButton.innerHTML = "Delete";

  const newEditButton = document.createElement("button");
  newEditButton.setAttribute("type", "button");
  newEditButton.setAttribute("name", "editButton");
  newEditButton.setAttribute(
    "onclick",
    "editButton('" + newList.getAttribute("data-id") + "')"
  );
  newEditButton.classList.add("btn", "btn-warning");
  newEditButton.innerHTML = "Edit";

  newDivAction.appendChild(newEditButton);
  newDivAction.appendChild(newDeleteButton);

  newList.appendChild(newDivLabel);
  newList.appendChild(newDivAction);

  const dataId = newList.getAttribute("data-id");

  return newList;
}

function editButton(data) {
  const list = listTodo.querySelector("[data-id=" + data + "]");

  const firstDiv = list.querySelector(".fw-bold");
  const label = firstDiv.querySelector("label");

  const newInput = document.createElement("input");
  newInput.classList.add("form-control");
  newInput.setAttribute("type", "text");
  newInput.value = label.textContent;

  const newButton = document.createElement("button");
  newButton.classList.add("btn", "btn-primary", "text-warning");
  newButton.setAttribute("onclick", "editText('" + data + "')");
  newButton.innerHTML = '<i class="bi bi-check-lg"></i>';

  const secDiv = list.querySelector(".gap-2.d-flex");
  const edit = secDiv.querySelector("[name='editButton']");

  edit.remove();
  label.remove();

  firstDiv.appendChild(newInput);
  firstDiv.appendChild(newButton);
}

function deleteButton(data) {
  const list = listTodo.querySelector("[data-id=" + data + "]");
  list.remove();

  const li = listTodo.querySelector("li");
  if (!li) {
    const newSpan = document.createElement("span");
    newSpan.classList.add("text-muted", "fst-italic");
    newSpan.innerHTML = "Tambahkan Todolist Kamu!";

    listTodo.appendChild(newSpan);
  }
}

function editText(data) {
  const list = listTodo.querySelector("[data-id=" + data + "]");

  const firstDiv = list.querySelector(".fw-bold");

  const input = firstDiv.querySelector("input");
  const button = firstDiv.querySelector(".text-warning");
  const value = input.value;
  const newId = Math.floor(Math.random() * 255);

  input.remove();
  button.remove();

  const newLabel = document.createElement("label");
  newLabel.innerHTML = value;

  firstDiv.appendChild(newLabel);

  list.setAttribute("data-id", value + newId);

  const secDiv = list.querySelector(".gap-2.d-flex");

  const newEditButton = document.createElement("button");
  newEditButton.setAttribute("type", "button");
  newEditButton.setAttribute("name", "editButton");
  newEditButton.setAttribute(
    "onclick",
    "editButton('" + list.getAttribute("data-id") + "')"
  );
  newEditButton.classList.add("btn", "btn-warning");
  newEditButton.innerHTML = "Edit";

  const del = secDiv.querySelector("button.btn-danger");
  del.setAttribute(
    "onclick",
    "deleteButton('" + list.getAttribute("data-id") + "')"
  );
  secDiv.insertBefore(newEditButton, del);
}
