const currentUser = localStorage.getItem("currentUser") || "Jeanette";
const isAdmin = currentUser.toLowerCase() === "jeanette";

const operationColors = JSON.parse(localStorage.getItem("operationColors") || "{}");
const planningData = JSON.parse(localStorage.getItem("planningData") || "[]");

function renderCalendar() {
  const container = document.getElementById("calendarContainer");
  container.innerHTML = "";

  // Sortera planering efter datum
  const sorted = [...planningData].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Gruppera per datum
  const grouped = {};
  sorted.forEach(entry => {
    if (!grouped[entry.date]) grouped[entry.date] = [];
    grouped[entry.date].push(entry);
  });

  Object.keys(grouped).forEach(date => {
    const section = document.createElement("div");
    section.className = "calendar-day-box";
    section.innerHTML = `<h3>${formatDate(date)}</h3>`;

    grouped[date].forEach(entry => {
      const color = operationColors[entry.operation] || "#999";
      const row = document.createElement("div");
      row.className = "calendar-entry";
      row.style.backgroundColor = color;
      row.textContent = `${entry.project} – ${entry.operation} – ${entry.resource} – ${entry.time}`;
      section.appendChild(row);
    });

    container.appendChild(section);
  });
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("sv-SE", { weekday: "long", day: "numeric", month: "short", year: "numeric" });
}

window.onload = renderCalendar;
