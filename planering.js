const currentUser = localStorage.getItem("currentUser") || "Jeanette";
const isAdmin = currentUser.toLowerCase() === "jeanette";

const operationColors = JSON.parse(localStorage.getItem("operationColors") || "{}");

// Mockdata – ersätt med din riktiga planering
const planningData = [
  {
    project: "Projekt A",
    operations: [
      { operation: "elmontage", resource: "Resurs 1", time: "4h", date: "2025-09-11" }
    ]
  },
  {
    project: "Projekt B",
    operations: [
      { operation: "målning", resource: "Resurs 2", time: "2h", date: "2025-09-12" }
    ]
  },
  {
    project: "Projekt C",
    operations: [
      { operation: "packning", resource: "Resurs 3", time: "3h", date: "2025-09-11" }
    ]
  }
];

function renderPlanning() {
  const container = document.getElementById("planningContainer");
  container.innerHTML = "";

  planningData.forEach(project => {
    const box = document.createElement("div");
    box.className = "project-box";
    box.innerHTML = `<h3>${project.project}</h3>`;

    project.operations.forEach(op => {
      const color = operationColors[op.operation] || "#999";
      const row = document.createElement("div");
      row.className = "operation-row";
      row.style.backgroundColor = color;
      row.textContent = `${op.date} – ${op.operation} – ${op.resource} – ${op.time}`;
      box.appendChild(row);
    });

    if (isAdmin) {
      const tools = document.createElement("div");
      tools.className = "admin-tools";
      tools.innerHTML = `
        <button onclick="alert('Redigera ${project.project}')">✏️ Redigera</button>
        <button onclick="alert('Ta bort ${project.project}')">🗑️ Ta bort</button>
      `;
      box.appendChild(tools);
    }

    container.appendChild(box);
  });
}

window.onload = renderPlanning;
