let orders = [];

function loadOrders() {
  const saved = localStorage.getItem("savedOrders");
  if (saved) {
    orders = JSON.parse(saved);
    renderOrderList(orders);
  }
}

function renderOrderList(list) {
  const container = document.getElementById("orderList");
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<li>Inga projekt/order hittades.</li>";
    return;
  }

  list.forEach((ord, index) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <strong>${ord.name}</strong><br>
      Artikel/mall: ${ord.article}<br>
      Leverans: ${ord.delivery || "–"}<br>
      Skeppning: ${ord.ship || "–"}<br>
      Klart: ${ord.ready || "–"}<br>
      Operationer:<br>
      ${ord.operations.map(op => `– ${op.name}: ${op.time}h`).join("<br>")}
    `;

    const planBtn = document.createElement("button");
    planBtn.textContent = "📅 Planera";
    planBtn.style.marginTop = "5px";
    planBtn.style.backgroundColor = "#0077cc";
    planBtn.style.color = "white";
    planBtn.style.border = "none";
    planBtn.style.borderRadius = "4px";
    planBtn.style.cursor = "pointer";

    planBtn.onclick = () => {
      window.location.href = `planering.html?order=${encodeURIComponent(ord.name)}`;
    };

    item.appendChild(planBtn);
    container.appendChild(item);
  });
}

function filterOrders() {
  const query = document.getElementById("searchOrder").value.toLowerCase();
  const filtered = orders.filter(ord =>
    ord.name.toLowerCase().includes(query) ||
    ord.article.toLowerCase().includes(query) ||
    ord.operations.some(op => op.name.toLowerCase().includes(query))
  );
  renderOrderList(filtered);
}

window.onload = loadOrders;
