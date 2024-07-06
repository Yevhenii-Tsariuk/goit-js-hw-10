import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const delay = parseInt(event.target.delay.value);
  const state = event.target.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topCenter',
        close: false,
        backgroundColor: '#59A10D',
        messageColor: '#FAFAFB',
      });
    })
    .catch(delay => {
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topCenter',
        close: false,
        backgroundColor: '#EF4040',
        messageColor: '#FAFAFB',
      });
    });
});
