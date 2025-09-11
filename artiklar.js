let articles = [];

function loadArticles() {
  const saved = localStorage.getItem("savedArticles");
  if (saved) {
    articles = JSON.parse(saved);
    renderArticleList(articles);
  }
}

function renderArticleList(list) {
  const container = document.getElementById("articleList");
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<li>Inga artiklar/mallar hittades.</li>";
    return;
  }

  list.forEach((art, index) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <strong>${art.name}</strong><br>
      Operationer:<br>
      ${art.operations.map(op => `– ${op.name}: ${op.time}h`).join("<br>")}
    `;

    const copyBtn = document.createElement("button");
    copyBtn.textContent = "📁 Kopiera till projekt";
    copyBtn.style.marginTop = "5px";
    copyBtn.style.backgroundColor = "#0077cc";
    copyBtn.style.color = "white";
    copyBtn.style.border = "none";
    copyBtn.style.borderRadius = "4px";
    copyBtn.style.cursor = "pointer";

    copyBtn.onclick = () => {
      window.location.href = `ny-order.html?artikel=${encodeURIComponent(art.name)}`;
    };

    item.appendChild(copyBtn);
    container.appendChild(item);
  });
}

function filterArticles() {
  const query = document.getElementById("searchArticle").value.toLowerCase();
  const filtered = articles.filter(art =>
    art.name.toLowerCase().includes(query) ||
    art.operations.some(op => op.name.toLowerCase().includes(query))
  );
  renderArticleList(filtered);
}

window.onload = loadArticles;
