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
  orders.forEach((ord, index) => {
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
    resInput.value = row.resource;
    resInput.dataset.index = index;
    resCell.appendChild(resInput);
    tr.appendChild(resCell);

    const commentCell = document.createElement("td");
    const commentInput = document.createElement("input");
    commentInput.type = "text";
    commentInput.value = row.comment;
    commentInput.dataset.index = index;
    commentCell.appendChild(commentInput);
    tr.appendChild(commentCell);

    tbody.appendChild(tr);
  });
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

    updated.push({
      operation: op,
      time: time,
      resource: res,
      comment: comment
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
