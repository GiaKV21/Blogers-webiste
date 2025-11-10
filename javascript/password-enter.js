// რეგისტაცია

function switchTab(tab) {
  document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.form').forEach(form => form.classList.remove('active'));

  if (tab === 'login') {
    document.getElementById('loginForm').classList.add('active');
    document.querySelectorAll('.tab')[0].classList.add('active');
    document.getElementById('formTitle').textContent = "კეთილი იყოს შენი კალამი!";
  } else if (tab === 'register') {
    document.getElementById('registerForm').classList.add('active');
    document.querySelectorAll('.tab')[1].classList.add('active');
    document.getElementById('formTitle').textContent = "კეთილი იყოს შენი კალამი!";
  } else if (tab === 'reset') {
    document.getElementById('resetForm').classList.add('active');
    document.getElementById('formTitle').textContent = "პაროლის აღდგენა";
  }
}

// შესვლის ვალიდაციები

function login(event) {
  event.preventDefault();

  let email = document.getElementById("loginEmail");
  let password = document.getElementById("loginPassword");
  let errorMessage = document.querySelector("#loginForm .error-message");

  email.classList.add("error");
  password.classList.add("error");

  errorMessage.innerHTML = 'არასწორია ელფოსტა ან პაროლი';
  errorMessage.style.display = "flex";

  return false;
}

// რეგისტაციის ვალიდაცია

function registerUser(event) {
  event.preventDefault();

  let isValid = true;

  let fullName = document.getElementById("fullName");
  let email = document.getElementById("registerEmail");
  let password = document.getElementById("registerPassword");
  let terms = document.getElementById("termsCheckbox");
  
  let fullNameError = fullName.parentElement.querySelector(".error-message");
  let emailError = email.parentElement.querySelector(".error-message");
  let passwordError = password.closest(".field").querySelector(".error-message");
  let termsError = terms.closest("label").nextElementSibling;

  // სახელი, გვარი
  if (fullName.value.trim() === "") {
    fullName.classList.add("error");
    fullNameError.innerHTML = `ეს ველი სავალდებულოა`;
    fullNameError.style.display = "flex";
    isValid = false;
  } else {
    fullName.classList.remove("error");
    fullNameError.style.display = "none";
  }

  // ელფოსტა
  if (email.value.trim() === "") {
    email.classList.add("error");
    emailError.innerHTML = `ეს ველი სავალდებულოა`;
    emailError.style.display = "flex";
    isValid = false;
  } else {
    email.classList.remove("error");
    emailError.style.display = "none";
  }

  // პაროლი
  if (password.value.trim().length < 6) {
    password.classList.add("error");
    passwordError.innerHTML = `პაროლი უნდა მოიცავდეს მინიმუმ 6 სიმბოლოს`;
    passwordError.style.display = "flex";
    isValid = false;
  } else {
    password.classList.remove("error");
    passwordError.style.display = "none";
  }

  // წესები და პირობები
  if (!terms.checked) {
    termsError.innerHTML = `გთხოვთ დაეთანხმოთ წესებს და პირობებს`;
    termsError.style.display = "flex";
    isValid = false;
  } else {
    termsError.style.display = "none";
  }

  return isValid;
}

// დამავიწყდა პაროლი

function goToStep(step) {
  document.querySelectorAll('.password-container > div').forEach(div => div.classList.add('hidden'));
  document.getElementById('step' + step).classList.remove('hidden');

  if (step === 2) {
    const email = document.getElementById('youremail').value.trim();
    document.getElementById('showEmail').innerText = email;
  }

  const inputs = document.querySelectorAll(".code");
  inputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      if (e.target.value && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !input.value && index > 0) {
        inputs[index - 1].focus();
      }
    });
  });
}

// თვალის გახელა დახუჭვა
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (e) => {
    const icon = e.target.closest('.toggle-password');
    if (!icon) return;

    const targetId = (icon.dataset.target || '').trim();
    const input = document.getElementById(targetId);
    if (!input) return;

    const showing = input.type === 'text';
    input.type = showing ? 'password' : 'text';

    const openSrc = 'images/Eye.png';
    const closedSrc = 'images/Eye Closed.png';
    icon.src = showing ? closedSrc : openSrc;

    icon.setAttribute('aria-pressed', showing ? 'false' : 'true');
    icon.setAttribute('title', showing ? 'პაროლის ჩვენება' : 'პაროლის დამალვა');
  });
});