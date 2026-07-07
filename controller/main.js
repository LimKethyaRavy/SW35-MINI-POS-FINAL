

// display date 

function ShowDate(){

    const dateNow = new Date();

    const options = {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
};

    document.getElementById("date").textContent = dateNow.toLocaleString("en-US", options)
}

ShowDate();
setInterval(ShowDate, 1000);