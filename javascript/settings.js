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