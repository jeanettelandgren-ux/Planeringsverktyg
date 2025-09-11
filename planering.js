const currentUser = localStorage.getItem("currentUser") || "Jeanette";
const isAdmin = currentUser.toLowerCase() === "jeanette";

const operationColors = JSON.parse(localStorage.getItem("operationColors") || "{}");
const orders = JSON.parse(localStorage.getItem("orders") || "[]");

function calculatePlanningData() {
  const planning = [];

  orders.forEach(order => {
    order.operations.forEach(op => {
      const minutes = parseInt(op.time.replace(/\D/g, ""));
      const totalMinutes = minutes * (order.amount || 1);
      planning.push({
        date: order.readyDate,
        project: order.name || order.id,
        operation: op.operation,
        resource: op.resource || "",
        time: `${Math.round(totalMinutes / 60)}h`,
        lastUpdated: new Date().toISOString()
      });
    });
  });

  localStorage.setItem("planningData", JSON.stringify(planning));
  return planning;
}

function renderPlanning() {
  const weekContainer = document.getElementById("weekCalendar");
  const dayContainer = document.getElementById("dayCalendar");
  weekContainer.innerHTML = "";
  dayContainer.innerHTML = "";

  const planningData = calculatePlanningData();
  const today = new Date().toISOString().split("T")[0];
  const now = new Date();

  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);

  for (let i = 0; i < 5; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    const dayStr = day.toISOString().split("T")[0];

    const box = document.createElement("div");
    box.className = "calendar-day-box";
    box.innerHTML = `<strong>${day.toLocaleDateString("sv-SE", { weekday: "long", day: "numeric", month: "short" })}</strong><br>`;

    planningData.forEach(entry => {
      if (entry.date === dayStr) {
        const color = operation
