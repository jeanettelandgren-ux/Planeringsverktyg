const currentUser = localStorage.getItem("currentUser") || "Jeanette";
const isAdmin = currentUser.toLowerCase() === "jeanette";
const articles = JSON.parse(localStorage.getItem("articles") || "[]");

function renderArticles() {
  const container = document.getElementById("articleList");
  container.innerHTML = "";

  articles.forEach(article => {
    const box = document.createElement("div");
    box.className = "project-box";
    box.innerHTML = `
      <h3>${article.id} (${article.category})</h3>
      <p>${article.content}</p>
      <p><strong>Operationer:</strong> ${article.operations.map(op => `${op.operation} (${op.time})`).join(", ")}</p>
      <p>Skapad: ${article.createdAt} | Ändrad: ${article.updatedAt}</p>
    `;

    if (isAdmin) {
      const tools = document.createElement("div");
      tools.className = "admin-tools";
      tools.innerHTML = `
        <button onclick="alert('Redigera ${article.id}')">✏️ Redigera</button>
        <button onclick="alert('Ta bort ${article.id}')">🗑️ Ta bort</button>
      `;
      box.appendChild(tools);
    }

    container.appendChild(box);
  });
}

window.onload = renderArticles;
