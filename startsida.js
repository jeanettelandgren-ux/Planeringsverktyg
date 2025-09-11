const currentUser = localStorage.getItem("currentUser") || "Jeanette";
const isAdmin = currentUser.toLowerCase() === "jeanette";

const operationColors = JSON.parse(localStorage.getItem("operationColors") || "{}");
const planningData = JSON.parse(localStorage.getItem("planningData") || "[]");

function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function renderHeader() {
  const today = new Date();
  const monthYear = today.toLocaleDateString("sv-SE", { month: "long", year: "numeric" });
  const week = getWeekNumber(today);

  document.getElementById("monthYear").textContent = monthYear.charAt(0).toUpperCase() + monthYear.slice(1);
  document.getElementById("weekNumber").textContent = `Vecka ${week}`;
}

function renderWeek() {
  const container = document.getElementById("weekCalendar");
  container.innerHTML = "";

  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Måndag

  for (let i = 0; i < 5; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    const dayStr = day.toISOString().split("T")[0];
    const label = day.toLocaleDateString("sv-SE", { weekday: "long", day: "numeric", month: "short" });

    const box = document.createElement("div");
    box.className = "calendar-day-box";
    box.innerHTML = `<strong>${label}</strong><br>`;

    let totalMinutes = 0;

    planningData.forEach(entry => {
      if (entry.date === dayStr) {
        const color = operationColors[entry.operation] || "#999";
        const minutes = parseInt(entry.time.replace(/\D/g, ""));
        totalMinutes += minutes;

        const row = document.createElement("div");
        row.className = "calendar-entry";
        row.style = `background-color: ${color}; color: white;`;
        row.textContent = `${entry.project} – ${entry.operation} – ${entry.resource} – ${entry.time}`;
        box.appendChild(row);
      }
    });

    if (totalMinutes > 0) {
      const summary = document.createElement("div");
      summary.style = "margin-top: 6px; font-weight: bold;";
      summary.textContent = `Totalt: ${Math.round(totalMinutes / 60)}h`;
      box.appendChild(summary);
    }

    container.appendChild(box);
  }
}

function renderToday() {
  const container = document.getElementById("dayCalendar");
  container.innerHTML = "";

  const todayStr = new Date().toISOString().split("T")[0];
  const now = new Date();

  planningData.forEach(entry => {
    if (entry.date === todayStr) {
      const color = operationColors[entry.operation] || "#999";
      const updated = new Date(entry.lastUpdated);
      const isNew = (now - updated) / (1000 * 60 * 60) < 24;

      const row = document.createElement("div");
      row.className = "calendar-entry";
      row.style = `background-color: ${color}; color: white; font-weight: ${isNew ? "bold" : "normal"};`;
      row.textContent = `${entry.project} – ${entry.operation} – ${entry.resource} – ${entry.time}`;
      container.appendChild(row);
    }
  });
}

window.onload = () => {
  renderHeader();
  renderWeek();
  renderToday();
};
