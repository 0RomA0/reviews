// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('form');
const inputState = document.querySelectorAll('input[name="state"]')
const inputDelay = document.querySelector('input[name="delay"]')

form.addEventListener('submit', formSubmit);

function formSubmit(event) {
    event.preventDefault();

    
    const numberDelay = Number(inputDelay.value);

    let selectedState = null;
    inputState.forEach(input => {
        if (input.checked) {
            selectedState = input.value; // зберігаємо значення вибраної кнопки
        }
    });

   
    console.log('Selected state:',selectedState);

    const promise = new Promise((resolve, reject) => {

     setTimeout(() => {
         if (selectedState === "fulfilled") {
             resolve(numberDelay);
         } else {
             reject(numberDelay);
         }

         }, numberDelay);
     });
        
    promise.then(delay => {
                iziToast.show(
                    {
                        message: `✅ Fulfilled promise in ${delay}ms`,
                        position: "topRight",
                        color: "green",
                    })
    }).catch(delay => {
             iziToast.show(
                {
                    message: `❌ Rejected promise in ${delay}ms`,
                    position: "topRight",
                    color: "red",
                })   
    })
    
    event.currentTarget.reset();

    }

   

