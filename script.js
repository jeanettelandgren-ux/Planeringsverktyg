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
}

function updateStepList() {
  const list = document.getElementById("stepList");
  list.innerHTML = "";
  project.steps.forEach((step, index) => {
    const item = document.createElement("li");
    item.innerText = `${index + 1}. ${step.name} – ${step.time}h`;
    list.appendChild(item);
  });
}
