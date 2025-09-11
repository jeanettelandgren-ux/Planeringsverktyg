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

  renderLegend();
  renderWeek();
}

function renderLegend() {
  const container = document.getElementById("legendContainer");
  container.innerHTML = "";

  Object.entries(operationColors).forEach(([op, color]) => {
    const item = document.createElement("div");
    item.innerHTML = `<span class="legend-box" style="background-color:${color}"></span>${op}`;
    item.style.marginBottom = "4px";
    container.appendChild(item);
  });
}

function renderWeek() {
  const grid = document.getElementById("weekGrid");
  const columns = grid.querySelectorAll(".day-column");

  columns.forEach(col => col.innerHTML = `<h4>${col.dataset.day}</h4>`);

  orders.forEach(order => {
    const plan = planningData[order.name];
    if (!plan) return;

    plan.forEach((row, index) => {
      const block = document.createElement("div");
      block.className = "operation-block";
      block.draggable = true;
      block.dataset.order = order.name;
      block.dataset.index = index;
      block.textContent = `${row.operation} (${row.time}h) – ${order.name}`;
      block.style.backgroundColor = operationColors[row.operation] || "#999";

      block.ondragstart = drag;

      const day = row.day || "Måndag";
      const targetCol = [...columns].find(c => c.dataset.day === day);
      targetCol.appendChild(block);
    });
  });
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text/plain", ev.target.dataset.order + "|" + ev.target.dataset.index);
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text/plain");
  const [orderName, index] = data.split("|");
  const day = ev.currentTarget.dataset.day;

  if (planningData[orderName] && planningData[orderName][index]) {
    planningData[orderName][index].day = day;
    localStorage.setItem("savedPlanning", JSON.stringify(planningData));
    renderWeek();
  }
}

window.onload = loadData;
