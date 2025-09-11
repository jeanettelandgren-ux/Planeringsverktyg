const planningData = JSON.parse(localStorage.getItem("planningData") || "[]");
const resources = [
  { name: "Anna", status: "1" },
  { name: "Erik", status: "S" },
  { name: "Lisa", status: "0" }
];

function renderCalendar() {
  const container = document.getElementById("calendarOverview");
  container.innerHTML = "";

  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1);

  for (let i = 0; i < 5; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    const dayStr = day.toISOString().split("T")[0];
    const label = day.toLocaleDateString("sv-SE", { weekday: "long", day: "numeric", month: "short" });

    const box = document.createElement("div");
    box.className = "calendar-day-box";
    box.innerHTML = `<strong>${label}</strong><br>`;

    planningData.forEach(entry => {
      if (entry.date === dayStr) {
        const row = document.createElement("div");
        row.className = "calendar-entry";
        row.style = `background-color: #3498db; color: white;`;
        row.textContent = `${entry.project} – ${entry.operation} – ${entry.resource} – ${entry.time}`;
        box.appendChild(row);
      }
    });

    resources.forEach(res => {
      const statusColor = res.status === "1" ? "green" : res.status === "0" ? "red" : "gold";
      const resRow = document.createElement("div");
      resRow.className = "calendar-entry";
      resRow.style = `background-color: ${statusColor}; color: white;`;
      resRow.textContent = `Resurs: ${res.name} (${res.status})`;
      box.appendChild(resRow);
    });

    container.appendChild(box);
  }
}

window.onload = renderCalendar;
