// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const input = document.querySelector("#datetime-picker");
const btn = document.querySelector("button");
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

btn.addEventListener("click", clickBtn);
btn.disabled = true;

let userSelectedDate = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
     
      userSelectedDate = selectedDates[0];
      const now = new Date();
      if (userSelectedDate <= now) {
          iziToast.show({
              title: 'error',
              message: "Please choose a date in the future",
              position: "topRight",
              color: "red",
              messageColor: "white",
              backgroundColor: "#ef4040",
              close: false,
          });
          
         btn.disabled = true; 
      } else {
          btn.disabled = false; 
      }
  },
};

function clickBtn() {
    if (!userSelectedDate) {
        return;
  }
  // clearInterval(intervalId);
  btn.disabled = true; 
  input.disabled = true;
        intervalId = setInterval(() => {
        const now = new Date();
        const timeLeft = userSelectedDate - now;

          if (timeLeft <= 0) {
      input.disabled = false;
      btn.disabled = false;
      clearInterval(intervalId);  // Зупинити таймер
      intervalId = null;      
      updateTimer(0, 0, 0, 0);  // Оновити інтерфейс на 00:00:00:00
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeLeft);
      updateTimer(days, hours, minutes, seconds);
            }
        }, 1000);
    
    
}

// Функція для оновлення інтерфейсу таймера
function updateTimer(days, hours, minutes, seconds) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

// Додати  нулі для двоцифрових значень
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}



function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

flatpickr("#datetime-picker", options);
