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

  renderWeekSummary();
}

function renderWeekSummary() {
  const container = document.getElementById("weekSummary");
  container.innerHTML = "";

  const days = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag"];

  days.forEach(day => {
    const box = document.createElement("div");
    box.className = "day-box";
    box.innerHTML = `<h4>${day}</h4>`;

    orders.forEach(order => {
      const plan = planningData[order.name];
      if (!plan) return;

      plan.forEach(row => {
        if (row.day === day) {
          const op = document.createElement("div");
          op.className = "operation-row";
          op.style.backgroundColor = operationColors[row.operation] || "#999";
          op.textContent = `${row.operation} (${row.time}h) – ${order.name} – ${row.resource || "–"}`;
          box.appendChild(op);
        }
      });
    });

    container.appendChild(box);
  });
}

function exportWeekPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text("Veckoplanering", 20, 20);

  let y = 30;
  const days = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag"];

  days.forEach(day => {
    doc.setFontSize(12);
    doc.text(day, 20, y);
    y += 6;

    orders.forEach(order => {
      const plan = planningData[order.name];
      if (!plan) return;

      plan.forEach(row => {
        if (row.day === day) {
          doc.setFontSize(10);
          doc.text(`• ${row.operation} (${row.time}h) – ${order.name} – ${row.resource || "–"}`, 25, y);
          y += 5;
        }
      });
    });

    y += 8;
  });

  doc.save("Veckoplanering.pdf");
}

function exportWeekExcel() {
  const rows = [];
  const days = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag"];

  days.forEach(day => {
    orders.forEach(order => {
      const plan = planningData[order.name];
      if (!plan) return;

      plan.forEach(row => {
        if (row.day === day) {
          rows.push({
            Dag: day,
            Projekt: order.name,
            Operation: row.operation,
            Tidsåtgång: row.time,
            Resurs: row.resource || "–"
          });
        }
      });
    });
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Veckoplanering");
  XLSX.writeFile(workbook, "Veckoplanering.xlsx");
}

window.onload = loadData;
