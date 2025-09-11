<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <title>Ny Order/Projekt</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <aside class="sidebar">
    <h2>Ny Order/Projekt</h2>
    <a href="index.html" class="menu-button">⬅ Till startsidan</a>
  </aside>

  <main class="main-content">
    <div class="form-box">
      <h3>Skapa ny order/projekt</h3>

      <label for="orderId">Ordernr/Projektnr</label>
      <input type="text" id="orderId" placeholder="Ordernr/Projektnr">

      <label for="projectName">Projektnamn</label>
      <input type="text" id="projectName" placeholder="Projektnamn">

      <label for="readyDate">Klar-datum (för planering bakåt)</label>
      <input type="date" id="readyDate">

      <label for="shipDate">Skeppningsdatum</label>
      <input type="date" id="shipDate">

      <label for="deliveryDate">Leveransdatum</label>
      <input type="date" id="deliveryDate">

      <label for="customerDate">Datum hos kund</label>
      <div style="display: flex; gap: 10px; align-items: center;">
        <input type="date" id="customerDate" style="flex: 1;">
        <label><input type="checkbox" id="sameAsDelivery"> Samma som lev.datum</label>
      </div>

      <label for="articleSelect">Välj artikel/mall</label>
      <select id="articleSelect">
        <option value="">Välj artikel/mall</option>
      </select>

      <label for="articleAmount">Antal</label>
      <input type="number" id="articleAmount" placeholder="Antal">

      <button onclick="saveOrder()">Spara order</button>
    </div>
  </main>

  <script src="ny-order.js"></script>
</body>
</html>
