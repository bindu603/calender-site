const monthYearEl = document.getElementById("monthYear");
const calendarGrid = document.getElementById("calendarGrid");

let events = [
  {
    "title": "Team Meeting",
    "date": "2025-06-10",
    "time": "10:00",
    "duration": "1h"
  },
  {
    "title": "Doctor Appointment",
    "date": "2025-06-10",
    "time": "10:30",
    "duration": "30m"
  },
  {
    "title": "Project Deadline",
    "date": "2025-06-15",
    "time": "23:59",
    "duration": "1h"
  },
  {
    "title": "Birthday Party",
    "date": "2025-06-14",
    "time": "18:00",
    "duration": "3h"
  },
  {
    "title": "Engagement Day",
    "date": "2025-07-11",
    "time": "18:00",
    "duration": "3h"
  }
];

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const updateCalendarHeader = () => {
  const month = new Date(currentYear, currentMonth).toLocaleString("default", {
    month: "long",
  });
  monthYearEl.textContent = `${month} ${currentYear}`;
};

const getEventsForDate = (dateObj) => {
  const dateStr = formatDate(dateObj);
  console.log('Checking events for date:', dateStr);
  const eventsForDate = events.filter((e) => e.date === dateStr);
  console.log('Found events:', eventsForDate);
  return eventsForDate;
};

const showLoadingState = () => {
  const loadingDiv = document.createElement('div');
  loadingDiv.id = 'loadingMessage';
  loadingDiv.style.position = 'fixed';
  loadingDiv.style.top = '10px';
  loadingDiv.style.left = '50%';
  loadingDiv.style.transform = 'translateX(-50%)';
  loadingDiv.style.padding = '10px 20px';
  loadingDiv.style.backgroundColor = '#ff7a00';
  loadingDiv.style.color = 'white';
  loadingDiv.style.borderRadius = '5px';
  loadingDiv.style.zIndex = '1000';
  loadingDiv.textContent = 'Loading events...';
  document.body.appendChild(loadingDiv);
};

const hideLoadingState = () => {
  const loadingDiv = document.getElementById('loadingMessage');
  if (loadingDiv) {
    loadingDiv.remove();
  }
};

const showError = (message) => {
  const errorDiv = document.createElement('div');
  errorDiv.id = 'errorMessage';
  errorDiv.style.position = 'fixed';
  errorDiv.style.top = '10px';
  errorDiv.style.left = '50%';
  errorDiv.style.transform = 'translateX(-50%)';
  errorDiv.style.padding = '10px 20px';
  errorDiv.style.backgroundColor = '#ff0000';
  errorDiv.style.color = 'white';
  errorDiv.style.borderRadius = '5px';
  errorDiv.style.zIndex = '1000';
  errorDiv.textContent = message;
  document.body.appendChild(errorDiv);
  setTimeout(() => errorDiv.remove(), 5000);
};

const renderCalendar = () => {
  console.log('Rendering calendar for:', currentYear, currentMonth);
  console.log('Current events:', events);
  
  calendarGrid.innerHTML = "";
  updateCalendarHeader();

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

  for (let i = firstDay; i > 0; i--) {
    const day = prevMonthDays - i + 1;
    const cell = document.createElement("div");
    cell.classList.add("date", "faded");
    cell.textContent = day;
    calendarGrid.appendChild(cell);
  }

  
  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    cell.classList.add("date");

    const cellDate = new Date(currentYear, currentMonth, day);
    const isToday =
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear();

    if (isToday) {
      cell.classList.add("today");
    }

    const dateEl = document.createElement("div");
    dateEl.textContent = day;
    dateEl.style.fontWeight = "bold";
    cell.appendChild(dateEl);

    const eventsToday = getEventsForDate(cellDate);
    if (eventsToday.length > 0) {
      const eventsList = document.createElement("ul");
      eventsList.style.padding = "0";
      eventsList.style.margin = "4px 0 0 0";
      eventsList.style.listStyle = "none";

      eventsToday.forEach((event) => {
        const li = document.createElement("li");
        li.innerHTML = `<span style="color: #ff7a00; font-weight: bold;">•</span> ${event.title}<br/><small style="color: #555;">${event.time}</small>`;
        li.style.fontSize = "0.75rem";
        li.style.marginBottom = "4px";
        eventsList.appendChild(li);
      });

      cell.appendChild(eventsList);
    }

    calendarGrid.appendChild(cell);
  }

 
  const totalCells = calendarGrid.children.length;
  for (let i = 1; i <= 42 - totalCells; i++) {
    const cell = document.createElement("div");
    cell.classList.add("date", "faded");
    cell.textContent = i;
    calendarGrid.appendChild(cell);
  }
};


document.getElementById("prevMonth").addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
});

document.getElementById("nextMonth").addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
});

document.getElementById("todayBtn").addEventListener("click", () => {
  today = new Date();
  currentMonth = today.getMonth();
  currentYear = today.getFullYear();
  renderCalendar();
});


console.log('Initializing calendar...');
renderCalendar();
