document.getElementById("newItemForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("itemName").value.trim();
  const type = document.getElementById("itemType").value;
  const time = document.getElementById("itemTime").value;
  const notes = document.getElementById("itemNotes").value.trim();

  const preview = document.getElementById("preview");
  preview.innerHTML = `
    <h4>✅ Artikel/Projekt tillagd:</h4>
    <p><strong>Namn:</strong> ${name}</p>
    <p><strong>Typ:</strong> ${type}</p>
    <p><strong>Tidsåtgång:</strong> ${time} timmar</p>
    ${notes ? `<p><strong>Kommentar:</strong> ${notes}</p>` : ""}
  `;

  // Här kan du lägga till kod för att spara till localStorage eller skicka till backend
});
