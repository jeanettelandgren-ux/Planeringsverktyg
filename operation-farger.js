const defaultOperations = [
  "besiktning", "certifiering", "kittning (plocka material)", "målning",
  "produktion", "ställtid", "blästring", "elmontage", "mekmontage",
  "packning", "provning/testning", "torktid"
];

let operationColors = {};

function loadColors() {
  const saved = localStorage.getItem("operationColors");
  if (saved) {
    operationColors = JSON.parse(saved);
  }

  const container = document.getElementById("colorSettings");
  container.innerHTML = "";

  defaultOperations.sort().forEach(op => {
    const row = document.createElement("div");
    row.className = "color-row";

    const label = document.createElement("label");
    label.textContent = op;
    label.style.width = "200px";

    const colorInput = document.createElement("input");
    colorInput.type = "color";
    colorInput.value = operationColors[op] || "#cccccc";
    colorInput.dataset.operation = op;

    const preview = document.createElement("div");
    preview.className = "color-box";
    preview.style.backgroundColor = colorInput.value;

    colorInput.oninput = () => {
      preview.style.backgroundColor = colorInput.value;
    };

    row.appendChild(label);
    row.appendChild(colorInput);
    row.appendChild(preview);
    container.appendChild(row);
  });
}

function saveColors() {
  const inputs = document.querySelectorAll("input[type='color']");
  inputs.forEach(input => {
    const op = input.dataset.operation;
    operationColors[op] = input.value;
  });

  localStorage.setItem("operationColors", JSON.stringify(operationColors));
  alert("Färgerna har sparats!");
}

window.onload = loadColors;
