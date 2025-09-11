let resources = [];
let planningData = {};
let orders = [];

function loadResources() {
  const saved = localStorage.getItem("savedResources");
  if (saved) {
    resources = JSON.parse(saved);
    populateResourceSelect();
  }
}

function loadPlanning() {
  const saved = localStorage.getItem("savedPlanning");
  if (saved) {
    planningData = JSON.parse(saved);
  }
}

function loadOrders() {
  const saved = localStorage.getItem("savedOrders");
  if (saved) {
    orders = JSON.parse(saved);
  }
}

function populateResourceSelect() {
  const select = document.getElementById("resourceSelect");
  select.innerHTML = `<option value="">– Välj –</option>`;
  resources.forEach(res => {
    const option = document.createElement("option");
    option.value = res.name;
    option.textContent = `${res.name} (${res.type})`;
    select.appendChild(option);
  });
}

function loadBelaggning() {
  const resName = document.getElementById("resourceSelect").value;
  const tbody = document.getElementById("belaggningBody");
  tbody.innerHTML = "";

  if (!resName) return;

  orders.forEach(order => {
    const plan = planningData[order.name];
    if (!plan) return;

    plan.forEach(row => {
      if (row.resource !== resName) return;

      const tr = document.createElement("tr");

      const projCell = document.createElement("td");
      projCell.textContent = order.name;
      tr.appendChild(projCell);

      const opCell = document.createElement("td");
      opCell.textContent = row.operation;
      tr.appendChild(opCell);

      const timeCell = document.createElement("td");
      timeCell.textContent = row.time;
      tr.appendChild(timeCell);

      const dateCell = document.createElement("td");
      dateCell.textContent = row.doneDate || "–";
      tr.appendChild(dateCell);

      const statusCell = document.createElement("td");
      if (row.done) {
        statusCell.textContent = "✅ Klar";
        statusCell.style.color = "green";
      } else {
        statusCell.textContent = "🟡 Aktiv";
        statusCell.style.color = "orange";
      }
      tr.appendChild(statusCell);

      tbody.appendChild(tr);
    });
  });
}

window.onload = () => {
  loadResources();
  loadPlanning();
  loadOrders();
};
