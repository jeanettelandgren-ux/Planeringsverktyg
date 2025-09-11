let orders = [];
let planningData = {};
let operationColors = {};

function loadData() {
  const savedOrders = localStorage.getItem("savedOrders");
  const savedPlanning = localStorage.getItem("savedPlanning");
  const savedColors = localStorage.getItem("operationColors");

  if (savedOrders) orders = JSON.parse(savedOrders);
  if (savedPlanning) planningData = JSON.parse(savedPlanning);
  if (savedColors) operationColors = JSON.parse(savedColors);

  renderCalendar();
}

function renderCalendar() {
  const grid = document.getElementById("calendarGrid");
  grid.innerHTML = "";

  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
  const days = [];

  for (let i = 0; i < 14; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    days.push(date);
  }

  days.forEach(date => {
    const box = document.createElement("div");
    box.className = "calendar-day";
    const label = document.createElement("h4");
    label.textContent = date.toLocaleDateString("sv-SE", { weekday: "short", day: "numeric", month: "short" });
    box.appendChild(label);

    orders.forEach(order => {
      const plan = planningData[order.name];
      if (!plan) return;

      plan.forEach(row => {
        if (row.doneDate === date.toISOString().split("T")[0]) {
          const op = document.createElement("div");
          op.className = "operation-item";
          op.style.backgroundColor = operationColors[row.operation] || "#999";
          op.textContent = `${row.operation} – ${order.name}`;
          op.onclick = () => showDetails(op, row, order.name);
          box.appendChild(op);
        }
      });
    });

    grid.appendChild(box);
  });
}

function showDetails(element, row, projectName) {
  closePopups();

  const popup = document.createElement("div");
  popup.className = "popup";
  popup.innerHTML = `
    <strong>${row.operation}</strong><br>
    Projekt: ${projectName}<br>
    Tidsåtgång: ${row.time}h<br>
    Resurs: ${row.resource || "–"}<br>
    Kommentar: ${row.comment || "–"}
  `;
  element.parentElement.appendChild(popup);
}

function closePopups() {
  document.querySelectorAll(".popup").forEach(p => p.remove());
}

window.onload = loadData;
