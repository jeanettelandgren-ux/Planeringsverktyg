let articles = [];
let orders = [];

function loadArticles() {
  const saved = localStorage.getItem("savedArticles");
  if (saved) {
    articles = JSON.parse(saved);
    populateArticleSelect();
  }
}

function populateArticleSelect() {
  const select = document.getElementById("articleSelect");
  select.innerHTML = `<option value="">– Välj –</option>`;

  articles.forEach((art, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = art.name;
    select.appendChild(option);
  });

  const urlParams = new URLSearchParams(window.location.search);
  const preselect = urlParams.get("artikel");
  if (preselect) {
    const match = articles.findIndex(a => a.name === preselect);
    if (match !== -1) {
      select.value = match;
      showOperationAdjustments(match);
    }
  }

  select.onchange = () => {
    const index = select.value;
    if (index !== "") {
      showOperationAdjustments(index);
    } else {
      document.getElementById("operationAdjustments").innerHTML = "";
    }
  };
}

function showOperationAdjustments(index) {
  const container = document.getElementById("operationAdjustments");
  container.innerHTML = "<h4>Justera tidsåtgång:</h4>";

  const ops = articles[index].operations;
  ops.forEach(op => {
    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "center";
    wrapper.style.gap = "10px";
    wrapper.style.marginBottom = "6px";

    const label = document.createElement("label");
    label.textContent = op.name;
    label.style.width = "200px";

    const input = document.createElement("input");
    input.type = "number";
    input.min = "0";
    input.step = "0.1";
    input.value = op.time;
    input.dataset.operation = op.name;

    wrapper.appendChild(label);
    wrapper.appendChild(input);
    container.appendChild(wrapper);
  });
}

function saveOrder() {
  const name = document.getElementById("orderName").value.trim();
  const delivery = document.getElementById("deliveryDate").value;
  const ship = document.getElementById("shipDate").value;
  const ready = document.getElementById("readyDate").value;
  const articleIndex = document.getElementById("articleSelect").value;

  if (name === "" || articleIndex === "") {
    return alert("Du måste ange projektnamn och välja en artikel/mall.");
  }

  const inputs = document.querySelectorAll("#operationAdjustments input");
  const operations = [];

  inputs.forEach(input => {
    const time = parseFloat(input.value);
    if (!isNaN(time) && time > 0) {
      operations.push({
        name: input.dataset.operation,
        time: time
      });
    }
  });

  const order = {
    name,
    delivery,
    ship,
    ready,
    article: articles[articleIndex].name,
    operations
  };

  orders.push(order);
  updateOrderList();
  clearForm();
  saveOrders();
}

function updateOrderList() {
  const list = document.getElementById("orderList");
  list.innerHTML = "";

  orders.forEach((ord, index) => {
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

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "− Ta bort";
    removeBtn.style.marginTop = "5px";
    removeBtn.style.backgroundColor = "#cc0000";
    removeBtn.style.color = "white";
    removeBtn.style.border = "none";
    removeBtn.style.borderRadius = "4px";
    removeBtn.style.cursor = "pointer";

    removeBtn.onclick = () => {
      orders.splice(index, 1);
      updateOrderList();
      saveOrders();
    };

    item.appendChild(removeBtn);
    list.appendChild(item);
  });
}

function clearForm() {
  document.getElementById("orderName").value = "";
  document.getElementById("deliveryDate").value = "";
  document.getElementById("shipDate").value = "";
  document.getElementById("readyDate").value = "";
  document.getElementById("articleSelect").value = "";
  document.getElementById("operationAdjustments").innerHTML = "";
}

function saveOrders() {
  localStorage.setItem("savedOrders", JSON.stringify(orders));
}

function loadOrders() {
  const saved = localStorage.getItem("savedOrders");
  if (saved) {
    orders = JSON.parse(saved);
    updateOrderList();
  }
}

window.onload = () => {
  loadArticles();
  loadOrders();
};
