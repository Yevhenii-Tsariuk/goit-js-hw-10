import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;
let timerInterval;

// Отримання елементів

const datePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

// Ініціалізація flatpickr
flatpickr(datePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: function (selectedDates) {
    // Якщо обрано дату
    if (selectedDates.length > 0) {
      userSelectedDate = selectedDates[0];
      const now = new Date();

      if (userSelectedDate <= now) {
        iziToast.error({
          position: 'topCenter',
          message: 'Please choose a date in the future',
        });
        startButton.disabled = true;
      } else {
        startButton.disabled = false;
      }
    } else {
      startButton.disabled = true;
    }
  },
});

// Додавання обробника події для кнопки "Start"
startButton.addEventListener('click', () => {
  if (!userSelectedDate) return;

  // Зробити кнопку та поле вводу неактивними
  startButton.disabled = true;
  datePicker.disabled = true;

  timerInterval = setInterval(() => {
    const now = new Date();
    const timeRemaining = userSelectedDate - now;

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      datePicker.disabled = false;
      daysSpan.textContent = '00';
      hoursSpan.textContent = '00';
      minutesSpan.textContent = '00';
      secondsSpan.textContent = '00';
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeRemaining);

    daysSpan.textContent = addLeadingZero(days);
    hoursSpan.textContent = addLeadingZero(hours);
    minutesSpan.textContent = addLeadingZero(minutes);
    secondsSpan.textContent = addLeadingZero(seconds);
  }, 1000);
});

// Функція для перетворення мілісекунд у дні, години, хвилини та секунди
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Функція для додавання ведучого нуля
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// let userSelectedDate;
// const input = document.getElementById('#datetime-picker');
// const startButton = document.getElementById('#startButton');
// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose: function (selectedDates) {
//     // Якщо обрано дату
//     if (selectedDates.length > 0) {
//       userSelectedDate = selectedDates[0];
//       const now = new Date();
//       now.setHours(0, 0, 0, 0); // Зануляємо час для коректного порівняння

//       if (userSelectedDate <= now) {
//         iziToast.show({
//           message: 'Please choose a date in the future',
//           position: 'topCenter',
//           backgroundColor: 'red',
//           messageColor: '#FFFFFF',
//           icon: 'icon-close',
//           iconColor: '#FFFFFF'
//         });
//         startButton.disabled = true;
//       } else {
//         startButton.disabled = false;
//       }
//     } else {
//       startButton.disabled = true;
//     }
//   },
// };

// flatpickr('#datetime-picker', options);

// function convertMs(ms) {
//     const second = 1000;
//     const minute = second * 60;
//     const hour = minute * 60;
//     const day = hour * 24;

//     const days = Math.floor(ms / day);
//     const hours = Math.floor((ms % day) / hour);
//     const minutes = Math.floor(((ms % day) % hour) / minute);
//     const seconds = Math.floor((((ms % day) % hour) % minute) / second);
//     return { days, hours, minutes, seconds };
//   }

//   console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//   console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//   console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
