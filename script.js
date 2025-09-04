function updateStepList() {
  const list = document.getElementById("stepList");
  list.innerHTML = "";

  project.steps.forEach((step, index) => {
    const item = document.createElement("li");

    // Texten för steget
    const text = document.createTextNode(`${index + 1}. ${step.name} – ${step.time}h`);

    // Skapa minus-knappen
    const removeBtn = document.createElement("button");
    removeBtn.innerText = "−";
    removeBtn.style.marginLeft = "10px";
    removeBtn.style.backgroundColor = "#cc0000";
    removeBtn.style.color = "white";
    removeBtn.style.border = "none";
    removeBtn.style.borderRadius = "4px";
    removeBtn.style.cursor = "pointer";

    // Funktion för att ta bort steget
    removeBtn.onclick = () => {
      project.steps.splice(index, 1); // Ta bort steget
      updateStepList(); // Uppdatera listan
    };

    item.appendChild(text);
    item.appendChild(removeBtn);
    list.appendChild(item);
  });
}
