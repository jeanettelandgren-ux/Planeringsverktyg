let project = {
  name: "",
  steps: []
};

function createProject() {
  const name = document.getElementById("projectName").value;
  if (name.trim() === "") return alert("Skriv in ett projektnamn!");
  project.name = name;
  document.getElementById("projectTitle").innerText = "Projekt: " + name;
  document.getElementById("step-form").style.display = "block";
  document.getElementById("projectDisplay").style.display = "block";
}

function addStep() {
  const stepName = document.getElementById("stepName").value;
  const stepTime = document.getElementById("stepTime").value;
  if (stepName.trim() === "" || stepTime === "") return alert("Fyll i alla fält!");
  project.steps.push({ name: stepName, time: stepTime });
  updateStepList();
  document.getElementById("stepName").value = "";
  document.getElementById("stepTime").value = "";
}

function updateStepList() {
  const list = document.getElementById("stepList");
  list.innerHTML = "";

  project.steps.forEach((step, index) => {
    const item = document.createElement("li");
    const text = document.createTextNode(`${index + 1}. ${step.name} – ${step.time}h`);

    const removeBtn = document.createElement("button");
    removeBtn.innerText = "−";
    removeBtn.style.marginLeft = "10px";
    removeBtn.style.backgroundColor = "#cc0000";
    removeBtn.style.color = "white";
    removeBtn.style.border = "none";
    removeBtn.style.borderRadius = "4px";
    removeBtn.style.cursor = "pointer";

    removeBtn.onclick = () => {
      project.steps.splice(index, 1);
      updateStepList();
    };

    item.appendChild(text);
    item.appendChild(removeBtn);
    list.appendChild(item);
  });
}

function saveProject() {
  localStorage.setItem("savedProject", JSON.stringify(project));
  alert("Projektet har sparats!");
}

function loadProject() {
  const saved = localStorage.getItem("savedProject");
  if (saved) {
    project = JSON.parse(saved);
    document.getElementById("projectTitle").innerText = "Projekt: " + project.name;
    document.getElementById("step-form").style.display = "block";
    document.getElementById("projectDisplay").style.display = "block";
    updateStepList();
  }
}

window.onload = () => {
  loadProject();
  generateCalendar();
};

async function generateCalendar() {
  const country = document.getElementById("country").value;
  const weekStart = document.getElementById("weekStart").value;
  const workdays = document.getElementById("workdays").value;
  const calendarGrid = document.getElementById("calendarGrid");
  const monthLabel = document.getElementById("monthLabel");

  calendarGrid.innerHTML = "";

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate;

  monthLabel.innerText = `${today.toLocaleString("sv-SE", { month: "long" })} ${year}`;

  const holidays = await fetchHolidays(year, country);

  let startOffset = firstDay.getDay();
  if (weekStart === "monday") {
    startOffset = (startOffset + 6) % 7;
  }

  for (let i = 0; i < startOffset; i++) {
    const empty = document.createElement("div");
    calendarGrid.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateStr = date.toISOString().split("T")[0];
    const weekday = date.getDay();

    const div = document.createElement("div");
    div.classList.add("day");
    div.innerText = `${day}`;

    if (workdays === "weekdays" && (weekday === 0 || weekday === 6)) {
      div.classList.add("inactive");
    }

    if (holidays.includes(dateStr)) {
      div.classList.add("holiday");
    }

    div.onclick = () => {
      alert(`🗓️ ${date.toLocaleDateString("sv-SE")}\nInga aktiviteter ännu.`);
    };

    calendarGrid.appendChild(div);
  }
}

async function fetchHolidays(year, countryCode) {
  try {
    const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`);
    const data = await response.json();
    return data.map(h => h.date);
  } catch (error) {
    console.error("Kunde inte hämta helgdagar:", error);
    return [];
  }
}
