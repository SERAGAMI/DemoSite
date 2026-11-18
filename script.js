/*
  Поведение Demo Barbershop.
  Номер WhatsApp меняйте только здесь. Формат: код страны и номер,
  без «+», пробелов и скобок. Пример: 996555123456
  Тексты сообщений — в data-wa-text у кнопок в index.html и в шаблоне формы ниже.
*/

const WHATSAPP_NUMBER = "996703380217";

function whatsappUrl(text) {
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);
}

/* Все кнопки с data-wa-text ведут на один и тот же номер. */
function bindWhatsappLinks() {
  const links = document.querySelectorAll("[data-wa-text]");
  links.forEach(function (link) {
    link.href = whatsappUrl(link.getAttribute("data-wa-text"));
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

/* Форма не ходит на сервер: собирает сообщение и открывает WhatsApp. */
function bindBookingForm() {
  const form = document.querySelector("#booking-form");
  if (!form) {
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const time = String(data.get("time") || "").trim();

    if (!name || !phone || !time) {
      form.reportValidity();
      return;
    }

    const text = [
      "Здравствуйте! Хочу записаться в Demo Barbershop.",
      "Имя: " + name,
      "Телефон: " + phone,
      "Удобное время: " + time
    ].join("\n");

    /* noopener делает возвращаемое значение null, поэтому форму очищаем без проверки. */
    window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
    form.reset();
  });
}

bindWhatsappLinks();
bindBookingForm();