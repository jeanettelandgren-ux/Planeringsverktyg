let planningData = {};
let orders = [];

function loadOrders() {
  const savedOrders = localStorage.getItem("savedOrders");
  if (savedOrders) {
    orders = JSON.parse(savedOrders);
    populateOrderSelect();
  }
}

function loadPlanning() {
  const savedPlanning = localStorage.getItem("savedPlanning");
  if (savedPlanning) {
    planningData = JSON.parse(savedPlanning);
  }
}

function populateOrderSelect() {
  const select = document.getElementById("orderSelect");
  select.innerHTML = `<option value="">– Välj –</option>`;
  orders.forEach(order => {
    const option = document.createElement("option");
    option.value = order.name;
    option.textContent = order.name;
    select.appendChild(option);
  });
}

function loadFollowUp() {
  const orderName = document.getElementById("orderSelect").value;
  const tbody = document.getElementById("followUpBody");
  tbody.innerHTML = "";

  if (!orderName || !planningData[orderName]) return;

  const order = orders.find(o => o.name === orderName);
  const plan = planningData[orderName];

  plan.forEach(row => {
    if (!row.done || !row.doneDate) return;

    const tr = document.createElement("tr");

    const opCell = document.createElement("td");
    opCell.textContent = row.operation;
    tr.appendChild(opCell);

    const resCell = document.createElement("td");
    resCell.textContent = row.resource || "–";
    tr.appendChild(resCell);

    const dateCell = document.createElement("td");
    dateCell.textContent = row.doneDate;
    tr.appendChild(dateCell);

    const plannedCell = document.createElement("td");
    plannedCell.textContent = order.ready || "–";
    tr.appendChild(plannedCell);

    const statusCell = document.createElement("td");
    const actual = new Date(row.doneDate);
    const planned = new Date(order.ready);
    if (!order.ready) {
      statusCell.textContent = "Ingen plan";
      statusCell.style.color = "#666";
    } else if (actual <= planned) {
      statusCell.textContent = "✅ I fas";
      statusCell.style.color = "green";
    } else {
      statusCell.textContent = "⚠️ Försenad";
      statusCell.style.color = "red";
    }
    tr.appendChild(statusCell);

    tbody.appendChild(tr);
  });
}

window.onload = () => {
  loadOrders();
  loadPlanning();
};
