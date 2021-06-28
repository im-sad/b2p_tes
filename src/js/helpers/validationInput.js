export const errorClass = "has-error";
export const fieldNode = "field";
const errorNode = "field__error";

export function errorAdd(el, text) {
  if (!el) return;
  el.classList.add(errorClass);

  const parent = el.closest(`.${fieldNode}`);
  const error = parent.getElementsByClassName(errorNode)[0];

  parent && parent.classList.add(errorClass);

  if (error) {
    error.innerHTML = "";
    text && (error.innerHTML = text);
  }
}

export function errorRm(el) {
  if (!el) return;
  el.classList.remove(errorClass);

  const parent = el.closest(`.${fieldNode}`);
  const error = parent.getElementsByClassName(errorNode);

  parent && parent.classList.remove(errorClass);
  error && (error.innerHTML = "");
}

export function toTheMoon(value) {
  let ch = 0;
  const num = String(value).replace(/\D/g, "");
  const isOdd = num.length % 2 !== 0;

  if ("" === num) return false;

  for (let i = 0; i < num.length; i++) {
    let n = parseInt(num[i], 10);

    ch += (isOdd | 0) === i % 2 && 9 < (n *= 2) ? n - 9 : n;
  }

  return 0 === ch % 10;
}