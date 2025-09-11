let planningData = {};
let orders = [];

function loadOrders() {
  const saved = localStorage.getItem("savedOrders");
  if (saved) {
    orders = JSON.parse(saved);
    populateOrderSelect();
  }
}

function loadPlanning() {
  const saved = localStorage.getItem("savedPlanning");
  if (saved) {
    planningData = JSON.parse(saved);
  }
}

function populateOrderSelect() {
  const select = document.getElementById("orderSelect");
  select.innerHTML = `<option value="">– Välj –</option>`;
  orders.forEach((ord) => {
    const option = document.createElement("option");
    option.value = ord.name;
    option.textContent = ord.name;
    select.appendChild(option);
  });
}

function loadSavedPlan() {
  const orderName = document.getElementById("orderSelect").value;
  const tbody = document.getElementById("savedBody");
  tbody.innerHTML = "";

  if (!orderName || !planningData[orderName]) return;

  planningData[orderName].forEach((row, index) => {
    const tr = document.createElement("tr");

    const opCell = document.createElement("td");
    opCell.textContent = row.operation;
    tr.appendChild(opCell);

    const timeCell = document.createElement("td");
    timeCell.textContent = row.time;
    tr.appendChild(timeCell);

    const resCell = document.createElement("td");
    const resInput = document.createElement("input");
    resInput.type = "text";
    resInput.value = row.resource || "";
    resInput.dataset.index = index;
    tr.appendChild(resCell);
    resCell.appendChild(resInput);

    const commentCell = document.createElement("td");
    const commentInput = document.createElement("input");
    commentInput.type = "text";
    commentInput.value = row.comment || "";
    commentInput.dataset.index = index;
    tr.appendChild(commentCell);
    commentCell.appendChild(commentInput);

    const doneCell = document.createElement("td");
    const doneCheckbox = document.createElement("input");
    doneCheckbox.type = "checkbox";
    doneCheckbox.checked = row.done || false;
    doneCheckbox.dataset.index = index;
    doneCheckbox.onchange = () => toggleDate(doneCheckbox);
    doneCell.appendChild(doneCheckbox);
    tr.appendChild(doneCell);

    const dateCell = document.createElement("td");
    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.value = row.doneDate || "";
    dateInput.dataset.index = index;
    dateInput.style.display = row.done ? "inline" : "none";
    dateCell.appendChild(dateInput);
    tr.appendChild(dateCell);

    tbody.appendChild(tr);
  });
}

function toggleDate(checkbox) {
  const index = checkbox.dataset.index;
  const dateInput = document.querySelector(`input[type="date"][data-index="${index}"]`);
  dateInput.style.display = checkbox.checked ? "inline" : "none";
}

function updatePlan() {
  const orderName = document.getElementById("orderSelect").value;
  if (!orderName || !planningData[orderName]) return;

  const rows = document.querySelectorAll("#savedBody tr");
  const updated = [];

  rows.forEach(row => {
    const op = row.cells[0].textContent;
    const time = row.cells[1].textContent;
    const res = row.cells[2].querySelector("input").value;
    const comment = row.cells[3].querySelector("input").value;
    const doneCheckbox = row.cells[4].querySelector("input");
    const dateInput = row.cells[5].querySelector("input");

    updated.push({
      operation: op,
      time: time,
      resource: res,
      comment: comment,
      done: doneCheckbox.checked,
      doneDate: dateInput.value || ""
    });
  });

  planningData[orderName] = updated;
  localStorage.setItem("savedPlanning", JSON.stringify(planningData));
  alert("Planeringen har uppdaterats!");
}

window.onload = () => {
  loadOrders();
  loadPlanning();
};
