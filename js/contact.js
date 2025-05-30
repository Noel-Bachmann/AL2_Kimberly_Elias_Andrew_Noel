const form = document.getElementById("contactForm");
const charCount = document.getElementById("charCount");
const telInput = document.getElementById("telnummer");
const messageInput = document.getElementById("message");

document.addEventListener("DOMContentLoaded", function () {
  telInput.addEventListener("input", function (e) {
    this.value = this.value.replace(/[^0-9\s]/g, "");
  });

  messageInput.addEventListener("input", function () {
    const len = messageInput.value.length;
    charCount.textContent = `${len} / 200`;
    charCount.className = ""; // Reset classes
    if (len < 150) charCount.classList.add("count-ok");
    else if (len < 180) charCount.classList.add("count-warn");
    else charCount.classList.add("count-error");
  });
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name");
  const lastname = document.getElementById("lastname");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  const nameError = document.getElementById("nameError");
  const lastnameError = document.getElementById("lastnameError");
  const emailError = document.getElementById("emailError");
  const telnummerError = document.getElementById("telnummerError");
  const messageError = document.getElementById("messageError");

  nameError.textContent =
    lastnameError.textContent =
    emailError.textContent =
    telnummerError.textContent =
    messageError.textContent =
      "";

  let isValid = true;

  if (name.value.trim() === "") {
    nameError.textContent = "Bitte gib deinen Namen ein.";
    nameError.classList.remove("d-none");
    isValid = false;
  } else nameError.classList.add("d-none");

  if (lastname.value.trim() === "") {
    lastnameError.textContent = "Bitte gib deinen Nachnamen ein.";
    lastnameError.classList.remove("d-none");
    isValid = false;
  } else lastnameError.classList.add("d-none");

  if (email.value.trim() === "" || !email.value.includes("@")) {
    emailError.textContent = "Bitte gib eine gültige E-Mail-Adresse ein.";
    emailError.classList.remove("d-none");
    isValid = false;
  } else emailError.classList.add("d-none");

  if (telInput.value.trim() === "") {
    telnummerError.textContent = "Bitte gib deine Telefonnummer ein.";
    telnummerError.classList.remove("d-none");
    isValid = false;
  } else telnummerError.classList.add("d-none");

  if (message.value.trim() === "") {
    messageError.textContent = "Bitte gib eine Nachricht ein.";
    messageError.classList.remove("d-none");
    isValid = false;
  } else messageError.classList.add("d-none");

  if (isValid) {
    const formData = {
      name: name.value,
      lastname: lastname.value,
      email: email.value,
      telnummer: telInput.value,
      message: message.value,
    };

    document.getElementById("submitLabel").classList.add("d-none");
    document.getElementById("submitSave").classList.remove("d-none");
    document.getElementById("submitButton").disabled = true;

    databaseClient
      .insertInto("requests", formData)
      .then(() => {})
      .finally(() => {
        setTimeout(() => {
          document.getElementById("submitSave").classList.add("d-none");
          document.getElementById("submitLabel").classList.remove("d-none");
          document.getElementById("submitButton").disabled = false;
          form.reset();
          charCount.textContent = "0 / 200";
          charCount.className = "";
          showToast();
        }, 3000);
      });
  }
});

function showToast(message = "Formular wurde erfolgreich gesendet!") {
  const toastEl = document.getElementById("myToast");
  const toastText = document.getElementById("toastText");
  toastText.textContent = message;
  new bootstrap.Toast(toastEl).show();
}

// Scrollbar-Progress
const bar = document.getElementById("progressBar");
const docHeight = () =>
  document.documentElement.scrollHeight - window.innerHeight;
window.addEventListener("scroll", () => {
  const pct = (window.scrollY / docHeight()) * 100;
  bar.style.width = `${Math.min(Math.max(pct, 0), 100)}%`;
});
