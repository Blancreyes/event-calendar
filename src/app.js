let nav = 0;
let clicked = null;
let events = localStorage.getItem("events") ?
    JSON.parse(localStorage.getItem(events)) :
    [];

const calendar = document.getElementById("calendar");

const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    " Thursday",
    "Friday",
    "Saturday",
];

function load() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const firstDayInMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayInMonth.toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });

    const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement("div");
        daySquare.classList.add("day");

        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays;
            daySquare.addEventListener("click", () => console.log("click"));
        } else {
            daySquare.classList.add("padding");
        }

        calendar.appendChild(daySquare);
    }

    console.log(paddingDays);
}

load();