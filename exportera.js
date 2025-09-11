let orders = [];
let planningData = {};

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

function exportPDF() {
  const orderName = document.getElementById("orderSelect").value;
  if (!orderName || !planningData[orderName]) return alert("Välj ett projekt först.");

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text(`Planering: ${orderName}`, 20, 20);

  let y = 30;
  planningData[orderName].forEach(row => {
    doc.setFontSize(11);
    doc.text(`• ${row.operation} – ${row.resource || "–"} – ${row.time}h – ${row.done ? "Klar" : "Ej klar"} – ${row.doneDate || "–"}`, 20, y);
    y += 8;
  });

  doc.save(`Planering_${orderName}.pdf`);
}

function exportExcel() {
  const orderName = document.getElementById("orderSelect").value;
  if (!orderName || !planningData[orderName]) return alert("Välj ett projekt först.");

  const rows = planningData[orderName].map(row => ({
    Projekt: orderName,
    Operation: row.operation,
    Resurs: row.resource || "–",
    Tidsåtgång: row.time,
    Kommentar: row.comment || "",
    Klar: row.done ? "Ja" : "Nej",
    Slutdatum: row.doneDate || "–"
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Planering");
  XLSX.writeFile(workbook, `Planering_${orderName}.xlsx`);
}

function exportCalendar() {
  const orderName = document.getElementById("orderSelect").value;
  if (!orderName || !planningData[orderName]) return alert("Välj ett projekt först.");

  let ics = "BEGIN:VCALENDAR\nVERSION:2.0\n";

  planningData[orderName].forEach(row => {
    if (!row.doneDate) return;

    const dt = row.doneDate.replace(/-/g, "");
    ics += `BEGIN:VEVENT\nSUMMARY:${orderName} – ${row.operation}\nDTSTART;VALUE=DATE:${dt}\nDESCRIPTION:Resurs: ${row.resource || "–"}\nEND:VEVENT\n`;
  });

  ics += "END:VCALENDAR";

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `Planering_${orderName}.ics`;
  link.click();
}

window.onload = () => {
  loadOrders();
  loadPlanning();
};
