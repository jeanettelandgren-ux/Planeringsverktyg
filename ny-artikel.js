let project = {
  name: "",
  operations: []
};

function createProject() {
  const name = document.getElementById("projectName").value;
  if (name.trim() === "") return alert("Skriv in ett projektnamn!");
  project.name = name;
  document.getElementById("projectTitle").innerText = "Projekt: " + name;
  document.getElementById("step-form").style.display = "block";
  document.getElementById("projectDisplay").style.display = "block";
}

function addOperation() {
  const name = document.getElementById("operationName").value;
  const time = document.getElementById("operationTime").value;
  if (name.trim() === "" || time === "") return alert("Fyll i alla fält!");
  project.operations.push({ name, time });
  updateOperationList();
  document.getElementById("operationName").value = "";
  document.getElementById("operationTime").value = "";
}

function updateOperationList() {
  const list = document.getElementById("operationList");
  list.innerHTML = "";

  project.operations.forEach((op, index) => {
    const item = document.createElement("li");
    const text = document.createTextNode(`${index + 1}. ${op.name} – ${op.time}h`);

    const removeBtn = document.createElement("button");
    removeBtn.innerText = "−";
    removeBtn.style.marginLeft = "10px";
    removeBtn.style.backgroundColor = "#cc0000";
    removeBtn.style.color = "white";
    removeBtn.style.border = "none";
    removeBtn.style.borderRadius = "4px";
    removeBtn.style.cursor = "pointer";

    removeBtn.onclick = () => {
      project.operations.splice(index, 1);
      updateOperationList();
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
