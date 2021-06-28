const nameClass = "js-tooltip";
const activeClass = "is-opened";

const initTooltip = () => {
  const tooltips = document.getElementsByClassName(nameClass);

  for (let i = 0; i < tooltips.length; i++) {
    const el = tooltips[i];

    el.addEventListener("click", (e) => {
      elementClick(e, el);
    });
  }
};

const elementClick = (event, el) => {
  event.stopPropagation();
  el.classList.toggle(activeClass);

  el.classList.contains(activeClass) && document.addEventListener("click", toogleEvent);
};

const toogleEvent = () => {
  document.querySelector(`.${nameClass}.${activeClass}`).classList.remove(activeClass);

  document.removeEventListener("click", toogleEvent);
};

export default initTooltip;
