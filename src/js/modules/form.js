import IMask from "imask";
import { fieldNode, errorClass, errorAdd, errorRm, toTheMoon } from "../helpers/validationInput.js";

const date = new Date();
const form = document.getElementById("js-card-form");
const submitBtn = form.querySelector("button[type='submit']");
const saveCardCheckbox = document.getElementById("save-card");
let isFormValid = false;

const initForm = () => {
  const elCard = document.getElementById("input-card");
  const elDate = document.getElementById("card-date");
  const elCvv = document.getElementById("card-cvv");

  const maskType = {
    card: {
      mask: "0000{ }0000{ }0000{ }0000000",
    },
    date: {
      mask: "00{/}00",
    },
    cvv: {
      mask: "000",
    },
  };

  const maskCard = IMask(elCard, maskType.card);
  const maskDate = IMask(elDate, maskType.date);
  const maskCvv = IMask(elCvv, maskType.cvv);

  // Валидация карты
  elCard.addEventListener("blur", (e) => {
    const that = e.currentTarget;
    const cardNumber = maskCard.value.split(" ").join("");
    const cardLength = cardNumber.length;

    if (!cardLength) {
      errorAdd(that, "Обязательное поле");
    } else if (cardLength < 16) {
      errorAdd(that, "Минимум 16 символов");
    } else if (cardLength > 16 && cardLength !== 19) {
      errorAdd(that, "Номер состоит из 16 или 19 символов");
    } else if (!toTheMoon(cardNumber)) {
      errorAdd(that, "Некорректный номер карты");
    } else {
      errorRm(that);
    }

    validateForm();
  });

  // Валидация даты
  elDate.addEventListener("blur", (e) => {
    const that = e.currentTarget;
    const dateValues = maskDate.value.split("/");
    const dateMonth = parseInt(dateValues[0], 10);
    const dateYear = parseInt(dateValues[1], 10);
    const yearNow = parseInt(date.getFullYear().toString().substr(2, 2), 10);
    const monthNow = date.getMonth() + 1;

    if (!maskDate.value) {
      errorAdd(that, "Обязательное поле");
    } else if (maskDate.value.length <= 4) {
      errorAdd(that, "Неверный&nbsp;формат <nobr>ММ/ГГ</nobr>");
    } else if (dateMonth < 0 || dateMonth > 12) {
      errorAdd(that, "Неверный месяц");
    } else if (dateYear < yearNow || (dateYear >= yearNow && dateMonth < monthNow)) {
      errorAdd(that, "Карта недействительна");
    } else {
      errorRm(that);
    }

    validateForm();
  });

  // перемещяем фокус при заполнении даты
  maskDate.on("complete", () => elCvv.focus());

  // Валидация cvv
  elCvv.addEventListener("blur", (e) => {
    const that = e.currentTarget;
    const cvvLength = maskCvv.value.length;

    if (!cvvLength) {
      errorAdd(that, "Обязательное поле");
    } else if (cvvLength < 3) {
      errorAdd(that, "Мин. 3 цифры");
    } else {
      errorRm(that);
    }

    validateForm();
  });

  // перемещяем фокус при заполнении cvv
  maskCvv.on("complete", () => saveCardCheckbox.focus());


  // Отправляем форму
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateForm();

    if (!isFormValid) {
      return;
    }

    submitBtn.classList.add("has-load");
    formSend();
  });



  //////////// Functions /////////////
  function validateForm() {
    if (!form) {
      return false;
    }

    isFormValid = false;

    const fields = form.getElementsByClassName(fieldNode);

    for (let i = 0, length = fields.length; i < length; i++) {
      const field = fields[i];
      const input = fields[i].getElementsByTagName("input")[0];

      if (input.value === "" || field.classList.contains(errorClass)) {
        isFormValid = false;
        break;
      }

      i + 1 == length && (isFormValid = true);
    }

    submitBtn.disabled = !isFormValid;
  }

  function formSend() {
    const msg = `
      Ваш номер карты: ${elCard.value}\n
      Дата: ${elDate.value}\n
      CVV: ${elCvv.value}
    `;
    const agree = confirm(msg);

    if (agree) {
      setTimeout(()=> {
        form.classList.add("is-sended");
        formReset();
      }, 1000);
    } else {
      formReset();
    }
  }

  function formReset() {
    submitBtn.classList.remove("has-load");
    submitBtn.disabled = true;
    form.reset();
  }
}

export default initForm;
