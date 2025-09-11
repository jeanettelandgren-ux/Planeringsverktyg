const currentUser = localStorage.getItem("currentUser") || "Jeanette";
const isAdmin = currentUser.toLowerCase() === "jeanette";

function saveArticle() {
  if (!isAdmin) {
    alert("Endast admin kan skapa artiklar.");
    return;
  }

  const title = document.getElementById("articleTitle").value.trim();
  const category = document.getElementById("articleCategory").value;
  const content = document.getElementById("articleContent").value.trim();

  if (!title || !category || !content) {
    alert("Fyll i alla fält.");
    return;
  }

  let articles = JSON.parse(localStorage.getItem("articles") || "[]");
  articles.push({ title, category, content, createdBy: currentUser, createdAt: new Date().toISOString() });
  localStorage.setItem("articles", JSON.stringify(articles));

  alert("Artikeln är sparad!");
  window.location.href = "artiklar.html";
}
