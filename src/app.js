let nav = 0;
let clicked = null;
let events = localStorage.getItem("events") ?
    JSON.parse(localStorage.getItem("events")) :
    [];

const calendar = document.getElementById("calendar");

const newEventModal = document.getElementById("newEventModal");
const backDrop = document.getElementById("modalBackDrop");
const eventTitle = document.getElementById("eventTitleInput");
const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

function openModal(date) {
    clicked = date;
    const eventForDay = events.find((e) => e.date === clicked);

    if (eventForDay) {
        console.log("Event already exists");
    } else {
        newEventModal.style.display = "block";
    }

    backDrop.style.display = "block";
}

function load() {
    const dt = new Date();

    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayInMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayInMonth.toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });

    const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

    document.getElementById("monthdisplay").innerText = `${dt.toLocaleDateString(
    "en-us",
    {
      month: "long",
    }
  )} ${year}`;

    calendar.innerHTML = "";

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement("div");
        daySquare.classList.add("day");

        const dayString = `${month + 1}/${i - paddingDays}/${year}`;

        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays;

            const eventForDay = events.find((e) => e.date === dayString);

            if (eventForDay) {
                const eventDiv = document.createElement("div");
                eventDiv.classList.add("event");

                daySquare.appendChild(eventDiv);
            }

            daySquare.addEventListener("click", () => openModal(dayString));
        } else {
            daySquare.classList.add("padding");
        }

        calendar.appendChild(daySquare);
    }
}

function closeModal() {
    eventTitle.classList.remove("error");
    newEventModal.style.display = "none";
    backDrop.style.display = "none";
    eventTitle.value = "";
    clicked = "null";
    load();
}

function saveEvent() {
    if (eventTitle.value) {
        eventTitle.classList.remove("error");
        events.push({
            date: clicked,
            title: eventTitle.value,
        });

        localStorage.setItem("events", JSON.stringify(events));
        closeModal();
    } else {
        eventTitle.classList.add();
    }
}

function initButtons() {
    document.getElementById("nextButton").addEventListener("click", () => {
        nav++;
        load();
    });
    document.getElementById("backButton").addEventListener("click", () => {
        nav--;
        load();
    });

    document.getElementById("saveButton").addEventListener("click", saveEvent);
    document.getElementById("cancelButton").addEventListener("click", closeModal);
}

initButtons();
load();