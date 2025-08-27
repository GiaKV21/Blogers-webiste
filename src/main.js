// მთავარი გვერდი

document.querySelectorAll(".slider-section").forEach(section => {
  const sliderTrack = section.querySelector(".slider-track");
  const prevBtn = section.querySelector(".slider-btn.prev");
  const nextBtn = section.querySelector(".slider-btn.next");

  let currentIndex = 0;
  const visibleCards = 3;
  const moveBy = 2;
  const totalCards = sliderTrack.querySelectorAll(".slider-card").length;

  function updateSlider() {
    const cardWidth = sliderTrack.querySelector(".slider-card").offsetWidth;
    sliderTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  nextBtn.addEventListener("click", () => {
    if (currentIndex + visibleCards < totalCards) {
      currentIndex += moveBy;
      if (currentIndex + visibleCards > totalCards) {
        currentIndex = totalCards - visibleCards;
      }
      updateSlider();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex -= moveBy;
      if (currentIndex < 0) currentIndex = 0;
      updateSlider();
    }
  });

  window.addEventListener("resize", updateSlider);
});

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
    document.getElementById('formTitle').textContent = "შენი ამბავი იწყება აქ!";
  } else if (tab === 'reset') {
    document.getElementById('resetForm').classList.add('active');
    document.getElementById('formTitle').textContent = "პაროლის აღდგენა";
  }
}

document.querySelectorAll('.toggle-password').forEach(icon => {
  icon.addEventListener('click', () => {
    const input = document.getElementById(icon.dataset.target);
    input.type = input.type === "password" ? "text" : "password";
  });
});

// შესვლის ვალიდაცია

// function login(event) {
//   event.preventDefault();

//   let email = document.getElementById("loginEmail");
//   let password = document.getElementById("loginPassword");
//   let errorMessage = email.nextElementSibling;

//   errorMessage.style.display = "none";
//   email.classList.remove("error");
//   password.classList.remove("error");

//   let emailValid = /\S+@\S+\.\S+/.test(email.value);
//   let passwordValid = password.value.length >= 6;

//   if (!emailValid || !passwordValid) {
//     email.classList.add("error");
//     password.classList.add("error");
//     errorMessage.innerText = "არასწორია ელფოსტა ან პაროლი";
//     errorMessage.style.display = "block";
//     return false;
//   }

//   //submit (backend-ზე)
//   return true;
// }

function login(event) {
  event.preventDefault();

  let email = document.getElementById("loginEmail");
  let password = document.getElementById("loginPassword");
  let errorMessage = document.querySelector("#loginForm .error-message");

  email.classList.add("error");
  password.classList.add("error");

  errorMessage.innerHTML = '<img src="images/Danger Triangle.png" alt="!" class="error-icon"> არასწორია ელფოსტა ან პაროლი';
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
    fullNameError.innerHTML = `<img src="images/Danger Triangle.png" alt="!" class="error-icon"> ეს ველი სავალდებულოა`;
    fullNameError.style.display = "flex";
    isValid = false;
  } else {
    fullName.classList.remove("error");
    fullNameError.style.display = "none";
  }

  // ელფოსტა
  if (email.value.trim() === "") {
    email.classList.add("error");
    emailError.innerHTML = `<img src="images/Danger Triangle.png" alt="!" class="error-icon"> ეს ველი სავალდებულოა`;
    emailError.style.display = "flex";
    isValid = false;
  } else {
    email.classList.remove("error");
    emailError.style.display = "none";
  }

  // პაროლი
  if (password.value.trim().length < 6) {
    password.classList.add("error");
    passwordError.innerHTML = `<img src="images/Danger Triangle.png" alt="!" class="error-icon"> პაროლი უნდა მოიცავდეს მინიმუმ 6 სიმბოლოს`;
    passwordError.style.display = "flex";
    isValid = false;
  } else {
    password.classList.remove("error");
    passwordError.style.display = "none";
  }

  // წესები და პირობები
  if (!terms.checked) {
    termsError.innerHTML = `<img src="images/Danger Triangle.png" alt="!" class="error-icon"> გთხოვთ დაეთანხმოთ წესებს და პირობებს`;
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