const resources = [
  { name: "Anna", typ: "Montör", status: "1" },
  { name: "Erik", typ: "Packare", status: "S" },
  { name: "Lisa", typ: "Målare", status: "0" }
];

function renderResources() {
  const container = document.getElementById("resourceList");
  container.innerHTML = "";

  resources.forEach(res => {
    const color = res.status === "1" ? "green" : res.status === "0" ? "red" : "gold";
    const box = document.createElement("div");
    box.className = "project-box";
    box.style.borderLeft = `8px solid ${color}`;
    box.innerHTML = `<h3>${res.name}</h3><p>${res.typ}</p><p>Status: ${res.status}</p>`;
    container.appendChild(box);
  });
}
window.onload = renderResources;
<div id="resourceList"></div>
const resources = [...]; // din lista
function renderResources() { ... }
window.onload = renderResources;
