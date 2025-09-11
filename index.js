const userName = "Jeanette";
const welcomeText = document.getElementById("welcomeText");
const firstLogin = localStorage.getItem("firstLogin") !== "false";

welcomeText.textContent = firstLogin
  ? `Välkommen ${userName}!`
  : `Välkommen tillbaka ${userName}!`;

localStorage.setItem("firstLogin", "false");

// Mockdata – ersätt med din riktiga planering
const planningData = [
  { operation: "elmontage", project: "Projekt A", resource: "Resurs 1", time: "4h", date: "2025-09-11", lastUpdated: "2025-09-11T12:00:00" },
  { operation: "målning", project: "Projekt B", resource: "Resurs 2", time: "2h", date: "2025-09-12", lastUpdated: "2025-09-10T09:00:00" },
  { operation: "packning", project: "Projekt C", resource: "Resurs 3", time: "3h", date: "2025-09-11", lastUpdated: "2025-09-11T08:00:00" }
];

function renderCalendars() {
  const weekContainer = document.getElementById("weekCalendar");
  const dayContainer = document.getElementById("dayCalendar");
  weekContainer.innerHTML = "";
  dayContainer.innerHTML = "";

  const today = new Date().toISOString().split("T")[0];
  const now = new Date();

  planningData.forEach(entry => {
    const updated = new Date(entry.lastUpdated);
    const hoursSinceUpdate = (now - updated) / (1000 * 60 * 60);
    const isNew = hoursSinceUpdate < 24;
    const style = isNew ? "font-weight: bold;" : "font-weight: normal;";

    const div = document.createElement("div");
    div.className = "calendar-entry";
    div.style = style;
    div.textContent = `${entry.date} – ${entry.operation} (${entry.time}) – ${entry.project} – ${entry.resource}`;

    weekContainer.appendChild(div);

    if (entry.date === today) {
      const dayDiv = div.cloneNode(true);
      dayContainer.appendChild(dayDiv);
    }
  });
}

window.onload = renderCalendars;
