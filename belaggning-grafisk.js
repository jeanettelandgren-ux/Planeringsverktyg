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

function renderBars() {
  const resName = document.getElementById("resourceSelect").value;
  const container = document.getElementById("barContainer");
  container.innerHTML = "";

  if (!resName) return;

  orders.forEach(order => {
    const plan = planningData[order.name];
    if (!plan) return;

    plan.forEach(row => {
      if (row.resource !== resName) return;

      const bar = document.createElement("div");
      bar.classList.add("bar");

      let statusClass = "status-obokad";
      let statusText = "Ej startad";

      if (row.done) {
        statusClass = "status-klar";
        statusText = `Klar ${row.doneDate}`;
      } else if (row.resource) {
        statusClass = "status-aktiv";
        statusText = "Aktiv";
      }

      bar.classList.add(statusClass);
      bar.title = `${order.name} – ${row.operation} (${row.time}h)\n${statusText}`;

      bar.style.width = `${Math.min(parseFloat(row.time) * 10, 100)}%`;

      const label = document.createElement("div");
      label.textContent = `${order.name} – ${row.operation} (${row.time}h)`;
      label.style.fontSize = "12px";
      label.style.marginBottom = "2px";

      container.appendChild(label);
      container.appendChild(bar);
    });
  });
}

window.onload = () => {
  loadResources();
  loadPlanning();
  loadOrders();
};
