const currentUser = localStorage.getItem("currentUser") || "Jeanette";
const isAdmin = currentUser.toLowerCase() === "jeanette";

const operationColors = JSON.parse(localStorage.getItem("operationColors") || "{}");

// Mockdata – ersätt med din riktiga orderlista
const orders = [
  {
    name: "Projekt A",
    startDate: "2025-09-11",
    operations: [
      { operation: "elmontage", resource: "Resurs 1", time: "4h" }
    ]
  },
  {
    name: "Projekt B",
    startDate: "2025-09-12",
    operations: [
      { operation: "målning", resource: "Resurs 2", time: "2h" }
    ]
  },
  {
    name: "Projekt C",
    startDate: "2025-09-13",
    operations: [
      { operation: "packning", resource: "Resurs 3", time: "3h" }
    ]
  }
];

function renderOrders() {
  const container = document.getElementById("orderContainer");
  container.innerHTML = "";

  orders.forEach(order => {
    const box = document.createElement("div");
    box.className = "order-box";
    box.innerHTML = `<h3>${order.name}</h3><p>Startdatum: ${order.startDate}</p>`;

    order.operations.forEach(op => {
      const color = operationColors[op.operation] || "#999";
      const tag = document.createElement("div");
      tag.className = "operation-tag";
      tag.style.backgroundColor = color;
      tag.textContent = `${op.operation} – ${op.resource} – ${op.time}`;
      box.appendChild(tag);
    });

    if (isAdmin) {
      const tools = document.createElement("div");
      tools.className = "admin-tools";
      tools.innerHTML = `
        <button onclick="alert('Redigera ${order.name}')">✏️ Redigera</button>
        <button onclick="alert('Ta bort ${order.name}')">🗑️ Ta bort</button>
      `;
      box.appendChild(tools);
    }

    container.appendChild(box);
  });
}

window.onload = renderOrders;
