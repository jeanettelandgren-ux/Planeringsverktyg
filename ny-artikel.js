const currentUser = localStorage.getItem("currentUser") || "Jeanette";
const isAdmin = currentUser.toLowerCase() === "jeanette";
const createdAt = new Date().toISOString().split("T")[0];

document.getElementById("metaInfo").textContent = `Skapad: ${createdAt} | Senast ändrad: ${createdAt}`;

function addOperation() {
  const container = document.getElementById("operationsContainer");
  const div = document.createElement("div");
  div.innerHTML = `
    <input type="text" placeholder="Operation" class="op-name">
    <input type="text" placeholder="Tidsåtgång (t.ex. 30min)" class="op-time">
  `;
  container.appendChild(div);
}

function saveArticle() {
  if (!isAdmin) return alert("Endast admin kan spara artiklar.");

  const id = document.getElementById("articleId").value.trim();
  const category = document.getElementById("articleCategory").value;
  const content = document.getElementById("articleContent").value.trim();
  const ops = [...document.querySelectorAll("#operationsContainer div")].map(div => ({
    operation: div.querySelector(".op-name").value,
    time: div.querySelector(".op-time").value
  }));

  if (!id || !category || !content) return alert("Fyll i alla fält.");

  const articles = JSON.parse(localStorage.getItem("articles") || "[]");
  articles.push({ id, category, content, operations: ops, createdBy: currentUser, createdAt, updatedAt: createdAt });
  localStorage.setItem("articles", JSON.stringify(articles));

  alert("Artikel sparad!");
  window.location.href = "artiklar.html";
}
