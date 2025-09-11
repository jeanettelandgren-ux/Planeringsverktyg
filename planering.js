let orders = [];
let resources = [];
let planningData = {};

function loadOrders() {
  const saved = localStorage.getItem("savedOrders");
  if (saved) {
    orders = JSON.parse(saved);
    populateOrderSelect();
  }
}

function loadResources() {
  const saved = localStorage.getItem("savedResources");
  if (saved) {
    resources = JSON.parse(saved);
  }
}

function populateOrderSelect() {
  const select = document.getElementById("orderSelect");
  select.innerHTML = `<option value="">– Välj –</option>`;
  orders.forEach((ord, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = ord.name;
    select.appendChild(option);
  });

  const urlParams = new URLSearchParams(window.location.search);
  const preselect = urlParams.get("order");
  if (preselect) {
    const match = orders.findIndex(o => o.name === preselect);
    if (match !== -1) {
      select.value = match;
      loadOperations();
    }
  }
}

function loadOperations() {
  const index = document.getElementById("orderSelect").value;
  const tbody = document.getElementById("planningBody");
  tbody.innerHTML = "";

  if (index === "") return;

  const order = orders[index];
  planningData[order.name] = [];

  order.operations.forEach(op => {
    const row = document.createElement("tr");

    const opCell = document.createElement("td");
    opCell.textContent = op.name;
    row.appendChild(opCell);

    const timeCell = document.createElement("td");
    timeCell.textContent = op.time + " h";
    row.appendChild(timeCell);

    const resCell = document.createElement("td");
    const resSelect = document.createElement("select");
    resSelect.innerHTML = `<option value="">– Välj –</option>`;
    resources
      .filter(r => r.operations.includes(op.name))
      .forEach(r => {
        const opt = document.createElement("option");
        opt.value = r.name;
        opt.textContent = `${r.name} (${r.percent}%)`;
        resSelect.appendChild(opt);
      });
    row.appendChild(resCell);
    resCell.appendChild(resSelect);

    const commentCell = document.createElement("td");
    const commentInput = document.createElement("input");
    commentInput.type = "text";
    commentInput.placeholder = "Kommentar…";
    commentCell.appendChild(commentInput);
    row.appendChild(commentCell);

    tbody.appendChild(row);
  });
}

function savePlanning() {
  const index = document.getElementById("orderSelect").value;
  if (index === "") return alert("Välj ett projekt först.");

  const order = orders[index];
  const rows = document.querySelectorAll("#planningBody tr");

  const savedPlan = [];

  rows.forEach(row => {
    const op = row.cells[0].textContent;
    const time = row.cells[1].textContent;
    const resSelect = row.cells[2].querySelector("select");
    const commentInput = row.cells[3].querySelector("input");

    savedPlan.push({
      operation: op,
      time: time,
      resource: resSelect.value || "–",
      comment: commentInput.value || ""
    });
  });

  planningData[order.name] = savedPlan;
  localStorage.setItem("savedPlanning", JSON.stringify(planningData));
  alert("Planeringen har sparats!");
}

function loadSavedPlanning() {
  const saved = localStorage.getItem("savedPlanning");
  if (saved) {
    planningData = JSON.parse(saved);
  }
}

window.onload = () => {
  loadOrders();
  loadResources();
  loadSavedPlanning();
};
