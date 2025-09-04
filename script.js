function showGreeting() {
  const name = localStorage.getItem("userName");

  if (!name) {
    const enteredName = prompt("Välkommen! Vad heter du?");
    if (enteredName && enteredName.trim() !== "") {
      localStorage.setItem("userName", enteredName.trim());
      document.getElementById("greeting").innerText = "Välkommen!";
    } else {
      document.getElementById("greeting").innerText = "Välkommen!";
    }
  } else {
    document.getElementById("greeting").innerText = `Välkommen tillbaka, ${name}!`;
  }
}

window.onload = showGreeting;
