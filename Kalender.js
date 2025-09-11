let resources = [];

function loadResources() {
  const saved = localStorage.getItem("savedResources");
  if (saved) {
    resources = JSON.parse(saved);
    renderCalendar(resources);
  }
}

function applyFilters() {
  const op = document.getElementById("filterOperation").value.toLowerCase();
  const type = document.getElementById("filterType").value;
  const project = document.getElementById("filterProject").value.toLowerCase();

  const filtered = resources.filter(res => {
    const matchOp = op === "" || res.operations.some(o => o.toLowerCase().includes(op));
    const matchType = type === "" || res.type === type;
    const matchProject = project === "" || (res.project || "").toLowerCase().includes(project);
    return matchOp && matchType && matchProject;
  });

  renderCalendar(filtered);
}

function renderCalendar(resList) {
  const tbody = document.getElementById("calendarBody");
  tbody.innerHTML = "";

  const days = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag"];

  resList.forEach((res, index) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.innerHTML = `<strong>${res.name}</strong><br><span style="font-size:12px;">${res.type}</span>`;
    row.appendChild(nameCell);

    days.forEach(day => {
      const cell = document.createElement("td");
      cell.textContent = res.percent + "%";
      cell.style.backgroundColor = getColor(res.percent);
      cell.style.cursor = "pointer";

      cell.addEventListener("click", (e) => {
        if (e.ctrlKey) {
          window.open(`resurs-detalj.html?resurs=${index}&dag=${day}`, "_blank");
        } else {
          openSidePanel(res, day);
        }
      });

      row.appendChild(cell);
    });

    tbody.appendChild(row);
  });
}

function getColor(percent) {
  const p = parseInt(percent);
  if (p >= 80) return "#c8f7c5"; // grön
  if (p >= 50) return "#fff3b0"; // gul
  return "#f7c5c5"; // röd
}

function openSidePanel(res, day) {
  const panel = document.getElementById("sidePanel");
  panel.innerHTML = `
    <button id="sidePanelClose">❌</button>
    <h3>${res.name}</h3>
    <p><strong>Typ:</strong> ${res.type}</p>
    <p><strong>Tillgänglighet:</strong> ${res.percent}%</p>
    <p><strong>Operationer:</strong> ${res.operations.join(", ")}</p>
    <p><strong>Projekt/Artikel:</strong> ${res.project || "–"}</p>
    <p><strong>Dag:</strong> ${day}</p>
  `;
  panel.classList.add("open");

  document.getElementById("sidePanelClose").onclick = () => {
    panel.classList.remove("open");
  };
}

window.onload = loadResources;
