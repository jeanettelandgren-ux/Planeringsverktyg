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
const defaultOperations = [
  "besiktning",
  "blästring",
  "certifiering",
  "elmontage",
  "kittning (plocka material)",
  "målning",
  "mekmontage",
  "packning",
  "produktion",
  "provning/testning",
  "ställtid",
  "tork tid"
];

function getSavedOperations() {
  const saved = JSON.parse(localStorage.getItem("customOperations")) || [];
  return saved;
}

function getAllOperations() {
  const all = [...defaultOperations, ...getSavedOperations()];
  return [...new Set(all)].sort((a, b) => a.localeCompare(b));
}

function populateOperationDropdown() {
  const select = document.getElementById("operationSelect");
  select.innerHTML = "";

  const operations = getAllOperations();
  operations.forEach(op => {
    const option = document.createElement("option");
    option.value = op;
    option.textContent = op;
    select.appendChild(option);
  });

  const other = document.createElement("option");
  other.value = "custom";
  other.textContent = "Annan...";
  select.appendChild(other);
}

function checkCustomOperation() {
  const selected = document.getElementById("operationSelect").value;
  const field = document.getElementById("customOperationField");
  field.style.display = selected === "custom" ? "block" : "none";
}

function addCustomOperation() {
  const newOp = document.getElementById("customOperation").value.trim();
  if (!newOp) return alert("Skriv in ett namn på operationen.");

  const saved = getSavedOperations();
  if (!saved.includes(newOp)) {
    saved.push(newOp);
    localStorage.setItem("customOperations", JSON.stringify(saved));
  }

  document.getElementById("customOperation").value = "";
  document.getElementById("customOperationField").style.display = "none";
  populateOperationDropdown();
  document.getElementById("operationSelect").value = newOp;
}

// Kör direkt när sidan laddas
window.onload = () => {
  populateOperationDropdown();
  showGreeting(); // om du har personlig hälsning
};
