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

let project = {
  number: "",
  info: "",
  type: "",
  operations: []
};

// Artikeltyp
function checkCustomType() {
  const selected = document.getElementById("articleType").value;
  document.getElementById("customTypeField").style.display = selected === "custom" ? "block" : "none";
}

function addCustomType() {
  const newType = document.getElementById("customType").value.trim();
  if (!newType) return alert("Skriv in en artikeltyp.");

  const select = document.getElementById("articleType");
  const option = document.createElement("option");
  option.value = newType;
  option.textContent = newType;
  select.insertBefore(option, select.lastChild);
  select.value = newType;

  document.getElementById("customType").value = "";
  document.getElementById("customTypeField").style.display = "none";
  updatePreview();
}

// Operationer
function getSavedOperations() {
  return JSON.parse(localStorage.getItem("customOperations")) || [];
}

function getAllOperations() {
  const all = [...defaultOperations, ...getSavedOperations()];
  return [...new Set(all)].sort((a, b) => a.localeCompare(b));
}

function populateOperationDropdown() {
  const select = document.getElementById("operationSelect");
  select.innerHTML = "";

  getAllOperations().forEach(op => {
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
  document.getElementById("customOperationField").style.display = selected === "custom" ? "block" : "none";
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

// Lägg till operation
function addOperation() {
  const name = document.getElementById("operationSelect").value;
  const time = document.getElementById("operationTime").value;
  if (!name || !time) return alert("Fyll i operation och tid.");

  project.operations.push({ name, time });
  updateOperationList();
  document.getElementById("projectDisplay").style.display = "block";
  document.getElementById("operationTime").value = "";
}

function updateOperationList() {
  const list = document.getElementById("operationList");
  list.innerHTML = "";

  project.operations.forEach((op, index) => {
    const item = document.createElement("li");
    item.textContent = `${index + 1}. ${op.name} – ${op.time}h`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "−";
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

    item.appendChild(removeBtn);
    list.appendChild(item);
  });
}

// Förhandsgranskning
function updatePreview() {
  project.number = document.getElementById("articleNumber").value.trim();
  project.info = document.getElementById("projectInfo").value.trim();
  project.type = document.getElementById("articleType").value;

  document.getElementById("previewNumber").innerText = project.number || "–";
  document.getElementById("previewType").innerText = project.type || "–";
  document.getElementById("previewInfo").innerText = project.info || "–";

  document.getElementById("previewBox").style.display = "block";
}

// Spara
function saveProject() {
  localStorage.setItem("savedProject", JSON.stringify(project));
  alert("Projektet har sparats!");
}

// Init
window.onload = () => {
  populateOperationDropdown();
  updatePreview();
  ["articleNumber", "projectInfo"].forEach(id => {
    document.getElementById(id).addEventListener("input",
