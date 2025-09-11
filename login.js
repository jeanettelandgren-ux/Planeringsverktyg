const maxUsers = 10; // Justera enligt abonnemangsnivå

function loginUser() {
  const name = document.getElementById("userName").value.trim();
  const role = document.getElementById("userRole").value;

  if (!name) return alert("Fyll i ditt namn!");

  let users = JSON.parse(localStorage.getItem("users") || "[]");

  if (!users.find(u => u.name === name)) {
    if (users.length >= maxUsers) {
      return alert("Max antal användare för abonnemanget är uppnått.");
    }
    users.push({ name, role });
    localStorage.setItem("users", JSON.stringify(users));
  }

  localStorage.setItem("currentUser", name);
  window.location.href = "index.html";
}
