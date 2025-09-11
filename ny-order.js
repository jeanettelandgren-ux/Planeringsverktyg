const currentUser = localStorage.getItem("currentUser") || "Jeanette";
const isAdmin = currentUser.toLowerCase() === "jeanette";

function saveOrder() {
  if (!isAdmin) {
    alert("Endast admin kan skapa nya projekt.");
    return;
  }

  const name = document.getElementById("projectName").value.trim();
  const operation = document.getElementById("operationSelect").value;
  const color = document.getElementById("operationColor").value;
  const resource = document.getElementById("resourceName").value.trim();
  const date = document.getElementById("startDate").value;
  const time = document.getElementById("timeEstimate").value.trim();

  if (!name || !operation || !date || !time) {
    alert("Fyll i alla obligatoriska fält.");
    return;
  }

  // Spara färgval för operation
  let operationColors = JSON.parse(localStorage.getItem("operationColors") || "{}");
  operationColors[operation] = color;
  localStorage.setItem("operationColors", JSON.stringify(operationColors));

  // Spara order
  let orders = JSON.parse(localStorage.getItem("orders") || "[]");
  orders.push({
    name,
    startDate: date,
    operations: [{ operation, resource, time }]
  });
  localStorage.setItem("orders", JSON.stringify(orders));

  alert("Order sparad!");
  window.location.href = "order.html";
}
