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
