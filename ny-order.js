const currentUser = localStorage.getItem("currentUser") || "Jeanette";
const isAdmin = currentUser.toLowerCase() === "jeanette";

const articles = JSON.parse(localStorage.getItem("articles") || "[]");
const articleSelect = document.getElementById("articleSelect");
articles.forEach(a => {
  const opt = document.createElement("option");
  opt.value = a.id;
  opt.textContent = `${a.id} (${a.category})`;
  articleSelect.appendChild(opt);
});

document.getElementById("sameAsDelivery").addEventListener("change", e => {
  if (e.target.checked) {
    document.getElementById("customerDate").value = document.getElementById("deliveryDate").value;
  }
});

function saveOrder() {
  if (!isAdmin) return alert("Endast admin kan spara order.");

  const orderId = document.getElementById("orderId").value.trim();
  const projectName = document.getElementById("projectName").value.trim();
  const readyDate = document.getElementById("readyDate").value;
  const shipDate = document.getElementById("shipDate").value;
  const deliveryDate = document.getElementById("deliveryDate").value;
  const customerDate = document.getElementById("customerDate").value;
  const articleId = document.getElementById("articleSelect").value;
  const amount = parseInt(document.getElementById("articleAmount").value);

  if (!orderId || !articleId || !amount) return alert("Fyll i alla obligatoriska fält.");

  const selectedArticle = articles.find(a => a.id === articleId);
  const operations = selectedArticle.operations.map(op => {
    const timeValue = parseInt(op.time.replace(/\D/g, ""));
    const totalMinutes = timeValue * amount;
    return { operation: op.operation, time: `${totalMinutes}min`, resource: "" };
  });

  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  orders.push({
    id: orderId,
    name: projectName,
    readyDate,
    shipDate,
    deliveryDate,
    customerDate,
    articleId,
    amount,
    operations
  });
  localStorage.setItem("orders", JSON.stringify(orders));

  alert("Order sparad!");
  window.location.href = "order.html";
}
