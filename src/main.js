// მთავარი გვერდი

// სლაიდერი

document.querySelectorAll('.slider-container').forEach(container => {
  const cards = Array.from(container.querySelectorAll('.slider-card'));
  const prevBtn = container.querySelector('.slider-btn.prev');
  const nextBtn = container.querySelector('.slider-btn.next');

  const visible = 3;
  let startIndex = 0;
  let isAnimating = false;

  function updateArrows() {
    prevBtn.style.display = startIndex > 0 ? "block" : "none";
    nextBtn.style.display = startIndex + visible < cards.length ? "block" : "none";
  }

  function showCards(newIndex) {
    if (isAnimating) return;
    isAnimating = true;

    const currentCards = cards.slice(startIndex, startIndex + visible);
    currentCards.forEach(card => card.style.opacity = "0");

    setTimeout(() => {
      currentCards.forEach(card => card.style.display = "none");

      startIndex = newIndex;
      const nextCards = cards.slice(startIndex, startIndex + visible);
      nextCards.forEach(card => {
        card.style.display = "block";
        setTimeout(() => card.style.opacity = "1", 50);
      });

      setTimeout(() => {
        isAnimating = false;
        updateArrows();
      }, 200);
    }, 200);
  }

  nextBtn.addEventListener('click', () => {
    if (startIndex + visible < cards.length) {
      showCards(startIndex + visible);
    }
  });

  prevBtn.addEventListener('click', () => {
    if (startIndex - visible >= 0) {
      showCards(startIndex - visible);
    }
  });

  cards.slice(0, visible).forEach(c => {
    c.style.display = "block";
    c.style.opacity = "1";
  });

  updateArrows();
});

// სერჩი

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById('searchToggle');
  const dropdown = document.getElementById('searchDropdown');
  const overlay = document.getElementById('overlay');
  const input = document.getElementById('theSearchInput');
  const submit = document.getElementById('searchSubmit');

  function openSearch() {
    dropdown.classList.add('open');
    overlay.classList.add('visible');
    setTimeout(() => input.focus(), 200);
  }

  function closeSearch() {
    dropdown.classList.remove('open');
    overlay.classList.remove('visible');
  }

  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    if (dropdown.classList.contains('open')) {
      closeSearch();
    } else {
      openSearch();
    }
  });

  overlay.addEventListener('click', closeSearch);

  document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
      closeSearch();
    }
  });

  submit.addEventListener('click', () => {
    console.log("Searching:", input.value);
    closeSearch();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const chips = document.querySelectorAll(".chip");

  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");

      console.log("Selected filter:", chip.dataset.filter);
    });
  });
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

// faq

document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const content = question.nextElementSibling;
        const faqItem = question.parentElement;
        const isOpen = faqItem.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('open');
            item.querySelector('.faq-content').style.display = 'none';
        });
        
        if (!isOpen) {
            faqItem.classList.add('open');
            content.style.display = 'block';
        }
    });
});


// ჩვენს შესახებ სალაიდერი

// სლაიდერი

document.querySelectorAll('.slider-container-about').forEach(container => {
  const cards = Array.from(container.querySelectorAll('.slider-card-about'));
  const prevBtn = container.querySelector('.slider-btn.prev');
  const nextBtn = container.querySelector('.slider-btn.next');

  const visible = 3;
  let startIndex = 0;
  let isAnimating = false;

  function updateArrows() {
    prevBtn.style.display = startIndex > 0 ? "block" : "none";
    nextBtn.style.display = startIndex + visible < cards.length ? "block" : "none";
  }

  function showCards(newIndex) {
    if (isAnimating) return;
    isAnimating = true;

    const currentCards = cards.slice(startIndex, startIndex + visible);
    currentCards.forEach(card => card.style.opacity = "0");

    setTimeout(() => {
      currentCards.forEach(card => card.style.display = "none");

      startIndex = newIndex;
      const nextCards = cards.slice(startIndex, startIndex + visible);
      nextCards.forEach(card => {
        card.style.display = "block";
        setTimeout(() => card.style.opacity = "1", 50);
      });

      setTimeout(() => {
        isAnimating = false;
        updateArrows();
      }, 100);
    }, 100);
  }

  nextBtn.addEventListener('click', () => {
    if (startIndex + visible < cards.length) {
      showCards(startIndex + visible);
    }
  });

  prevBtn.addEventListener('click', () => {
    if (startIndex - visible >= 0) {
      showCards(startIndex - visible);
    }
  });

  cards.slice(0, visible).forEach(c => {
    c.style.display = "block";
    c.style.opacity = "1";
  });

  updateArrows();
});