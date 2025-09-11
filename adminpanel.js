function renderAdminPanel() {
  const container = document.getElementById("adminTools");
  container.innerHTML = `
    <button onclick="localStorage.clear(); location.reload();">🧹 Rensa all data</button>
    <button onclick="alert('Exportfunktion kommer snart!')">📤 Exportera</button>
  `;
}
window.onload = renderAdminPanel;
