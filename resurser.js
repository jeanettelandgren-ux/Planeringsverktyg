const currentUser = localStorage.getItem("currentUser") || "Jeanette";
const isAdmin = currentUser.toLowerCase() === "jeanette";

const resources = JSON.parse(localStorage.getItem("resources") || "[]");

function renderResources() {
  const container = document.getElementById("resourceContainer");
  container.innerHTML = "";

  resources.forEach(resurs => {
    const box = document.createElement("div");
    box.className = "project-box";
    box.innerHTML = `
      <h3>${resurs.name}</h3>
      <p>Typ: ${resurs.typ}</p>
      <p>Status: ${resurs.status}</p>
    `;

    if (isAdmin) {
      const tools = document.createElement("div");
      tools.className = "admin-tools";
      tools.innerHTML = `
        <button onclick="alert('Redigera ${resurs.name}')">✏️ Redigera</button>
        <button onclick="alert('Ta bort ${resurs.name}')">🗑️ Ta bort</button>
      `;
      box.appendChild(tools);
    }

    container.appendChild(box);
  });
}

window.onload = renderResources;
