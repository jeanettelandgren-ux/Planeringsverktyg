const currentUser = localStorage.getItem("currentUser") || "Jeanette";
const isAdmin = currentUser.toLowerCase() === "jeanette";

function renderAdminPanel() {
  const container = document.getElementById("adminContent");
  container.innerHTML = "";

  if (!isAdmin) {
    container.innerHTML = "<p>Du har inte behörighet att visa adminpanelen.</p>";
    return;
  }

  container.innerHTML = `
    <h3>Adminverktyg</h3>
    <button onclick="clearLocalStorage()">🧹 Rensa all data</button>
    <button onclick="alert('Exportfunktion kommer snart!')">📤 Exportera data</button>
  `;
}

function clearLocalStorage() {
  if (confirm("Är du säker på att du vill rensa all data?")) {
    localStorage.clear();
    alert("All data är rensad.");
    location.reload();
  }
}

window.onload = renderAdminPanel;
