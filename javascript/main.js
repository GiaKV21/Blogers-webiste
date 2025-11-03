// ფერის ცვლა

document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname.replace(/\/$/, "");

  const selectors = [
    ".header-ul li a",
    ".footer-ul li a"
  ];

  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(link => {
      const linkPath = new URL(link.href).pathname.replace(/\/$/, "");
      if (linkPath === currentPath) {
        link.classList.add("active-link");
      }
    });
  });
});

// სლაიდერი

document.querySelectorAll('.slider-container').forEach(container => {
  const cards = Array.from(container.querySelectorAll('.slider-card'));
  const prevBtn = container.querySelector('.slider-btn.prev');
  const nextBtn = container.querySelector('.slider-btn.next');

  const visible = 3;
  let startIndex = 0;
  let isAnimating = false;

  function updateArrows() {
    if (startIndex > 0) {
      prevBtn.style.opacity = "1";
      prevBtn.style.pointerEvents = "auto";
    } else {
      prevBtn.style.opacity = "0";
      prevBtn.style.pointerEvents = "none";
    }

    if (startIndex + visible < cards.length) {
      nextBtn.style.opacity = "1";
      nextBtn.style.pointerEvents = "auto";
    } else {
      nextBtn.style.opacity = "0";
      nextBtn.style.pointerEvents = "none";
    }
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

// ჩვენს შესახებ სალაიდერი

document.querySelectorAll('.slider-container-about').forEach(container => {
  const cards = Array.from(container.querySelectorAll('.slider-card-about'));
  const prevBtn = container.querySelector('.slider-btn.prev');
  const nextBtn = container.querySelector('.slider-btn.next');

  const visible = 3;
  let startIndex = 0;
  let isAnimating = false;

  function updateArrows() {
    if (startIndex > 0) {
      prevBtn.style.opacity = "1";
      prevBtn.style.pointerEvents = "auto";
    } else {
      prevBtn.style.opacity = "0";
      prevBtn.style.pointerEvents = "none";
    }

    if (startIndex + visible < cards.length) {
      nextBtn.style.opacity = "1";
      nextBtn.style.pointerEvents = "auto";
    } else {
      nextBtn.style.opacity = "0";
      nextBtn.style.pointerEvents = "none";
    }
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

// პარამეტრები

// გადრათვა

const tabs = document.querySelectorAll(".settings-tab");
const contents = document.querySelectorAll(".tab-content");
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    contents.forEach(c => c.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

// სიმბოლოების დათვლა

window.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(".char-count");

  inputs.forEach(input => {
    const counter = document.getElementById(input.id + "Counter");
    const maxLength = input.getAttribute("maxlength");

    const updateCharCount = () => {
      const length = input.value.length;
      counter.textContent = `${length}/${maxLength}`;
    };
    updateCharCount();
    input.addEventListener("input", updateCharCount);
  });
});

// ხილვადობა ინფუთების

function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  const icon = input.parentElement.querySelector(".toggle-password");

  if (input.type === "password") {
    input.type = "text";
    icon.src = "images/Eye.png";
  } else {
    input.type = "password";
    icon.src = "images/Eye Closed.png";
  }
}

// ელემენტები

const oldPassword = document.getElementById("oldPassword");
const newPassword = document.getElementById("newPassword");
const confirmPassword = document.getElementById("confirmPassword");

const saveBtn = document.getElementById("savePassword");
const cancelBtn = document.getElementById("cancelPassword");

const oldPasswordError = document.getElementById("oldPasswordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

let newPasswordError = document.getElementById("newPasswordError");
if (!newPasswordError) {
  newPasswordError = document.createElement("div");
  newPasswordError.id = "newPasswordError";
  newPassword.parentElement.parentElement.appendChild(newPasswordError);
}

let realOldPassword = "12345678";

const disablePasswordButtons = () => {
  saveBtn.disabled = true;
  cancelBtn.disabled = true;
};

const enablePasswordButtons = () => {
  saveBtn.disabled = false;
  cancelBtn.disabled = false;
};

const clearPasswordErrors = () => {
  oldPasswordError.textContent = "";
  newPasswordError.textContent = "";
  confirmPasswordError.textContent = "";

  oldPasswordError.style.color = "";
  newPasswordError.style.color = "";
  confirmPasswordError.style.color = "";
};

const checkPasswordChanges = () => {
  const oldVal = oldPassword.value.trim();
  const newVal = newPassword.value.trim();
  const confVal = confirmPassword.value.trim();

  const isChanged = oldVal || newVal || confVal;
  if (isChanged) {
    enablePasswordButtons();
  } else {
    disablePasswordButtons();
  }
};

[oldPassword, newPassword, confirmPassword].forEach(input => {
  input.addEventListener("input", checkPasswordChanges);
});

saveBtn.addEventListener("click", () => {
  clearPasswordErrors();

  const oldVal = oldPassword.value.trim();
  const newVal = newPassword.value.trim();
  const confVal = confirmPassword.value.trim();

  let valid = true;

  if (oldVal !== realOldPassword) {
    oldPasswordError.textContent = "ძველი პაროლი არასწორია";
    oldPasswordError.style.color = "#FF4343";
    valid = false;
  }

  if (newVal.length < 6) {
    newPasswordError.textContent = "პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს";
    newPasswordError.style.color = "#FF4343";
    valid = false;
  }

  if (newVal !== confVal) {
    confirmPasswordError.textContent = "ახალი პაროლი არ ემთხვევა";
    confirmPasswordError.style.color = "#FF4343";
    valid = false;
  }

  if (!valid) return;

  realOldPassword = newVal;
  oldPassword.value = "";
  newPassword.value = "";
  confirmPassword.value = "";
  clearPasswordErrors();
  disablePasswordButtons();
});

cancelBtn.addEventListener("click", () => {
  oldPassword.value = "";
  newPassword.value = "";
  confirmPassword.value = "";
  clearPasswordErrors();
  disablePasswordButtons();
});

window.addEventListener("DOMContentLoaded", disablePasswordButtons);

// პროფილის პარამეტრები

const fullNameInput = document.getElementById('fullName');
const shortTextInput = document.getElementById('shortText');
const linkedinInput = document.getElementById('linkedin');
const aboutTextInput = document.getElementById('aboutText');

const saveProfileBtn = document.getElementById('saveProfile');
const cancelProfileBtn = document.getElementById('cancelProfile');

const initialData = {
  fullName: "გიორგი პეტრეიშვილი",
  shortText: "მოკლე აღწერა: გამოცდილ და მოტივირებულ პროგრამისტი.",
  linkedin: "https://www.linkedin.com/in/giorgi",
  aboutText: "ჩემი სახელია გიორგი, მე ვარ გამოცდილ პროგრამისტი, რომელიც მუშაობს სხვადასხვა ტექნოლოგიებზე."
};

fullNameInput.value = initialData.fullName;
shortTextInput.value = initialData.shortText;
linkedinInput.value = initialData.linkedin;
aboutTextInput.value = initialData.aboutText;

const disableButtons = () => {
  saveProfileBtn.disabled = true;
  cancelProfileBtn.disabled = true;
};

const enableButtons = () => {
  saveProfileBtn.disabled = false;
  cancelProfileBtn.disabled = false;
};

const checkChanges = () => {
  const isAnyFieldChanged = 
    fullNameInput.value !== initialData.fullName || 
    shortTextInput.value !== initialData.shortText ||
    linkedinInput.value !== initialData.linkedin ||
    aboutTextInput.value !== initialData.aboutText;
  
  if (isAnyFieldChanged) {
    enableButtons();
  } else {
    disableButtons();
  }
};

[fullNameInput, shortTextInput, linkedinInput, aboutTextInput].forEach(input => {
  input.addEventListener('input', checkChanges);
});

window.addEventListener("DOMContentLoaded", disableButtons);

saveProfileBtn.addEventListener('click', () => {
  document.querySelectorAll('.profile-error').forEach(err => err.textContent = '');

  let valid = true;

  if (fullNameInput.value.trim() === '') {
    const errorDiv = fullNameInput.closest('.form-group').querySelector('.profile-error');
    errorDiv.textContent = 'შეიყვანე სახელი და გვარი';
    errorDiv.style.color = '#FF4343';
    valid = false;
  }

  if (shortTextInput.value.trim() === '') {
    const errorDiv = shortTextInput.closest('.form-group').querySelector('.profile-error');
    errorDiv.textContent = 'შეიყვანე მოკლე აღწერა';
    errorDiv.style.color = '#FF4343';
    valid = false;
  }
  if (!valid) return;
  initialData.fullName = fullNameInput.value;
  initialData.shortText = shortTextInput.value;
  initialData.linkedin = linkedinInput.value;
  initialData.aboutText = aboutTextInput.value;

  disableButtons();
});

cancelProfileBtn.addEventListener('click', () => {
  fullNameInput.value = initialData.fullName;
  shortTextInput.value = initialData.shortText;
  linkedinInput.value = initialData.linkedin;
  aboutTextInput.value = initialData.aboutText;
  disableButtons();
});

// ანგარიშის წაშლის მოდალი

const deleteBtn = document.querySelector(".delete-settings");
const deleteModal = document.getElementById("deleteModal");
const closeModal = document.getElementById("closeModal");
const cancelDelete = document.getElementById("cancelDelete");
const confirmDelete = document.getElementById("confirmDelete");

deleteBtn.addEventListener("click", () => {
  deleteModal.classList.add("active");
});

const closeDeleteModal = () => {
  deleteModal.classList.remove("active");
};

closeModal.addEventListener("click", closeDeleteModal);
cancelDelete.addEventListener("click", closeDeleteModal);

confirmDelete.addEventListener("click", () => {
  fullNameInput.value = "";
  shortTextInput.value = "";
  linkedinInput.value = "";
  aboutTextInput.value = "";
  newPassword.value = "";
  confirmPassword.value = "";

  disableButtons();
  closeDeleteModal();
});

// მომხარებელი

const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');

navItems.forEach(item => {
  item.addEventListener('click', () => {
    navItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    pages.forEach(page => page.classList.remove('active'));
    const target = document.getElementById(item.dataset.page);
    target.classList.add('active');
  });
});