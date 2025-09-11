const defaultOperations = [
  "besiktning", "certifiering", "kittning (plocka material)", "målning",
  "produktion", "ställtid", "blästring", "elmontage", "mekmontage",
  "packning", "provning/testning", "torktid"
];

let articles = [];

function populateOperationInputs() {
  const container = document.getElementById("operationInputs");
  container.innerHTML = "";

  const sortedOps = [...defaultOperations].sort((a, b) => a.localeCompare(b));
  sortedOps.forEach(op => {
    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "center";
    wrapper.style.gap = "10px";
    wrapper.style.marginBottom = "6px";

    const label = document.createElement("label");
    label.textContent = op;
    label.style.width = "200px";

    const input = document.createElement("input");
    input.type = "number";
    input.min = "0";
    input.step = "0.1";
    input.placeholder = "timmar";
    input.dataset.operation = op;

    wrapper.appendChild(label);
    wrapper.appendChild(input);
    container.appendChild(wrapper);
  });
}

function saveArticle() {
  const name = document.getElementById("articleName").value.trim();
  if (name === "") {
    return alert("Du måste ange ett namn för artikeln/mallen.");
  }

  const inputs = document.querySelectorAll("#operationInputs input");
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

  const article = {
    name,
    operations
  };

  articles.push(article);
  updateArticleList();
  clearForm();
  saveArticles();
}

function updateArticleList() {
  const list = document.getElementById("articleList");
  list.innerHTML = "";

  articles.forEach((art, index) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <strong>${art.name}</strong><br>
      Operationer:<br>
      ${art.operations.map(op => `– ${op.name}: ${op.time}h`).join("<br>")}
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
      articles.splice(index, 1);
      updateArticleList();
      saveArticles();
    };

    item.appendChild(removeBtn);
    list.appendChild(item);
  });
}

function clearForm() {
  document.getElementById("articleName").value = "";
  document.querySelectorAll("#operationInputs input").forEach(input => input.value = "");
}

function saveArticles() {
  localStorage.setItem("savedArticles", JSON.stringify(articles));
}

function loadArticles() {
  const saved = localStorage.getItem("savedArticles");
  if (saved) {
    articles = JSON.parse(saved);
    updateArticleList();
  }
}

window.onload = () => {
  populateOperationInputs();
  loadArticles();
};
