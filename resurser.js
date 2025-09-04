const defaultOperations = [
  "besiktning", "blästring", "certifiering", "elmontage",
  "kittning (plocka material)", "målning", "mekmontage",
  "packning", "produktion", "provning/testning",
  "ställtid", "tork tid"
];

let resources = [];

function populateOperationCheckboxes() {
  const container = document.getElementById("operationCheckboxes");
  container.innerHTML = "";

  const allOps = [...new Set(defaultOperations)].sort((a, b) => a.localeCompare(b));
  allOps.forEach(op => {
    const label = document.createElement("label");
    label.style.display = "block";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = op;

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(" " + op));
    container.appendChild(label);
  });
}

function addResource() {
  const name = document.getElementById("resName").value.trim();
  const type = document.getElementById("resType").value;
  const available = document.getElementById("resAvailable").value;

  const checkboxes = document.querySelectorAll("#operationCheckboxes input[type='checkbox']");
  const selectedOps = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value);

  if (type === "person" && name === "") {
    return alert("Du måste ange namn för personresurser.");
  }

  const res = {
    name: name || "(namnlös)",
    type,
    available,
    operations: selectedOps
  };

  resources.push(res);
  updateResourceList();
  clearForm();
  saveResources();
}

function updateResourceList() {
  const list = document.getElementById("resourceList");
  list.innerHTML = "";

  resources.forEach((res, index) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <strong>${res.name}</strong> (${res.type})<br>
      Tillgänglig från: ${res.available || "–"}<br>
      Operationer: ${res.operations.join(", ") || "–"}
    `;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "− Ta bort";
    removeBtn.style.marginTop = "5px";
    removeBtn.style.backgroundColor = "#cc0000";
    removeBtn.style.color = "white";
    removeBtn.style.border = "none";
    removeBtn.style.borderRadius = "4px";
    removeBtn.style.cursor = "pointer";

    removeBtn.onclick = () => {
      resources.splice(index, 1);
      updateResourceList();
      saveResources();
    };

    item.appendChild(removeBtn);
    list.appendChild(item);
  });
}

function clearForm() {
  document.getElementById("resName").value = "";
  document.getElementById("resType").value = "person";
  document.getElementById("resAvailable").value = "";
  document.querySelectorAll("#operationCheckboxes input").forEach(cb => cb.checked = false);
}

function saveResources() {
  localStorage.setItem("savedResources", JSON.stringify(resources));
}

function loadResources() {
  const saved = localStorage.getItem("savedResources");
  if (saved) {
    resources = JSON.parse(saved);
    updateResourceList();
  }
}

window.onload = () => {
  populateOperationCheckboxes();
  loadResources();
};
