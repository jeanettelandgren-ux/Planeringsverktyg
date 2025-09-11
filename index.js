const userName = localStorage.getItem("currentUser") || "Jeanette";
const firstLogin = localStorage.getItem("firstLogin") === "true";

document.getElementById("welcomeText").textContent = firstLogin
  ? `Välkommen ${userName}!`
  : `Välkommen tillbaka ${userName}!`;

localStorage.setItem("firstLogin", "false");

const operationColors = JSON.parse(localStorage.getItem("operationColors") || "{}");

// Mockdata – ersätt med din riktiga planering
const planningData = [
  { operation: "elmontage", project: "Projekt A", resource: "Resurs 1", time: "4h", date: "2025-09-11", lastUpdated: "2025-09-11T12:00:00" },
  { operation: "målning", project: "Projekt B", resource: "Resurs 2", time: "2h", date: "2025-09-12", lastUpdated: "2025-09-10T09:00:00" },
  { operation: "packning", project: "Projekt C", resource: "Resurs 3", time: "3h", date: "2025-09-11", lastUpdated: "2025-09-11T08:00:00" }
];

function renderWeekPlan() {
  const weekContainer = document.getElementById("weekCalendar");
  weekContainer.innerHTML = "";

  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Måndag

  for (let i = 0; i < 5; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    const dayStr = day.toISOString().split("T")[0];

    const box = document.createElement("div");
    box.className = "calendar-day-box";
    box.innerHTML = `<strong>${day.toLocaleDateString("sv-SE", { weekday: "long", day: "numeric", month: "short" })}</strong><br>`;

    planningData.forEach(entry => {
      if (entry.date === dayStr) {
        const color = operationColors[entry.operation] || "#999";
        const row = document.createElement("div");
        row.className = "calendar-entry";
        row.style.backgroundColor = color;
        row.textContent = `${entry.project} – ${entry.operation}`;
        box.appendChild(row);
      }
    });

    weekContainer.appendChild(box);
  }
}

function renderDayPlan() {
  const dayContainer = document.getElementById("dayCalendar");
  dayContainer.innerHTML = "";

  const todayStr = new Date().toISOString().split("T")[0];
  const now = new Date();

  planningData.forEach(entry => {
    if (entry.date === todayStr) {
      const updated = new Date(entry.lastUpdated);
      const hoursSinceUpdate = (now - updated) / (1000 * 60 * 60);
      const isNew = hoursSinceUpdate < 24;
      const color = operationColors[entry.operation] || "#999";

      const row = document.createElement("div");
      row.className = "calendar-entry";
      row.style = `
        background-color: ${color};
        font-weight: ${isNew ? "bold" : "normal"};
      `;
      row.textContent = `${entry.project} – ${entry.operation} – ${entry.resource} – ${entry.time}`;
      dayContainer.appendChild(row);
    }
  });
}

window.onload = () => {
  renderWeekPlan();
  renderDayPlan();
};
