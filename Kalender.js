function openSidePanel(resurs, dag) {
  const panel = document.getElementById("sidePanel");
  panel.innerHTML = `
    <button id="sidePanelClose">❌</button>
    <h3>${resurs.name}</h3>
    <p><strong>Typ:</strong> ${resurs.type}</p>
    <p><strong>Tillgänglighet:</strong> ${resurs.percent}%</p>
    <p><strong>Operationer:</strong> ${resurs.operations.join(", ")}</p>
    <p><strong>Dag:</strong> ${dag}</p>
  `;
  panel.classList.add("open");

  document.getElementById("sidePanelClose").onclick = () => {
    panel.classList.remove("open");
  };
}
