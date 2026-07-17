// ===================display date=====================

function ShowDate() {
  const dateNow = new Date();

  const options = {
    weekday: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    month: "long",
    year: "numeric",
  };

  document.getElementById("date_op").textContent = dateNow.toLocaleString(
    "en-US",
    options,
  );
}

ShowDate();
setInterval(ShowDate, 1000);
