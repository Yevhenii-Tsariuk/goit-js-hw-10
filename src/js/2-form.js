const formData = {email: "", message: ""};

const form = document.querySelector(".feedback-form");

const localStorageKey = "feedback-form-state";

form.addEventListener("input", function (event) {
 if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
  formData[event.target.name] = event.target.value.trim();
  localStorage.setItem(localStorageKey, JSON.stringify(formData));
} 
});

const savedData = localStorage.getItem(localStorageKey);
if (savedData !== null) {
 
  const parsedData = JSON.parse(savedData);
  form.elements.email.value = parsedData.email;
  formData.email = parsedData.email;
  form.elements.message.value = parsedData.message;
  formData.message = parsedData.message;
}


form.addEventListener("submit", (evt) => {
  evt.preventDefault();
if (!formData.email || !formData.message) {
  alert("Fill please all fields")
} else {
  console.log(formData);
  localStorage.removeItem(localStorageKey);
  form.reset()
}
});
















// const form = document.querySelector(".feedback-form");
// const localStorageKey = 'feedback-form-state';
// const formData = {
//   email: '',
//   message: '',
// };

// form.addEventListener('input', function (event) {
//   if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
//     formData[event.target.name] = event.target.value.trim();
//     localStorage.setItem(localStorageKey, JSON.stringify(formData));
//   }
// });

// const savedData = localStorage.getItem(localStorageKey);
// if (savedData !== null) {
//   const parsedData = JSON.parse(savedData);
//   form.elements.email.value = parsedData.email;
//   formData.email = parsedData.email;
//   form.elements.message.value = parsedData.message;
//   formData.message = parsedData.message;
  
// }

// form.addEventListener('submit', evt => {
//   evt.preventDefault();
//   if (formData.email == "" || formData.message == "") {
//     alert('Fill please all fields');
//   } else {
//     console.log(formData);
//     localStorage.removeItem(localStorageKey);
//     form.reset();
//   }
// });














// const formData = {
//   email: "",
//   message: ""
// };

// // Функція для збереження даних у локальне сховище
// const saveToLocalStorage = () => {
//   localStorage.setItem("feedback-form-state", JSON.stringify(formData));
// };

// // Функція для завантаження даних з локального сховища
// const loadFromLocalStorage = () => {
//   const savedData = localStorage.getItem("feedback-form-state");
//   if (savedData) {
//     const parsedData = JSON.parse(savedData);
//     formData.email = parsedData.email || "";
//     formData.message = parsedData.message || "";
//     document.querySelector('input[name="email"]').value = formData.email;
//     document.querySelector('textarea[name="message"]').value = formData.message;
//   }
// };

// // Завантажуємо дані з локального сховища при завантаженні сторінки
// document.addEventListener("DOMContentLoaded", loadFromLocalStorage);

// Відстежуємо зміни у формі за допомогою делегування
// document.querySelector('.feedback-form').addEventListener('input', (event) => {
//   const name = event.target.name;
//   const value = event.target.value.trim(); // Видаляємо пробіли по краях
//   formData[name] = value;
//   saveToLocalStorage();
// });

// const input = document.querySelector(".feedback-form");
// input.addEventListener('input', handlerChangesForm);

// function handlerChangesForm(evt){
//   const name = evt.target.name;
//   const value = evt.target.value.trim(); 
//   formData[name] = value;
//   saveToLocalStorage();
// }

// // Обробляємо подію відправлення форми
// document.querySelector('.feedback-form').addEventListener('submit', (event) => {
//   event.preventDefault();
//   if (!formData.email || !formData.message) {
//     alert("Fill please all fields");
//   } else { console.log(formData);
//     localStorage.removeItem("feedback-form-state");
//     formData.email = "";
//     formData.message = "";
//     event.target.reset();}
 
// });

// // Очищуємо локальне сховище при новому введенні даних після сабміту
// document.querySelector('.feedback-form').addEventListener('input', () => {
//   localStorage.removeItem("feedback-form-state");
// });