// inner

document.addEventListener('click', function (e) {
  const menu = document.querySelector('.menu');
  const modal = document.querySelector('.delete-modal');
  const modalContent = document.querySelector('.modal-content-inner');

  if (e.target.closest('.dots')) {
    menu.classList.toggle('hidden');
    return;
  }

  if (e.target.closest('.delete-btn')) {
    modal.classList.remove('hidden');
    return;
  }

  if (e.target.closest('.close-modal-inner')) {
    modal.classList.add('hidden');
    return;
  }

  if (!e.target.closest('.menu') && !e.target.closest('.dots-wrapper')) {
    menu.classList.add('hidden');
  }

  if (!modalContent.contains(e.target) && !modal.classList.contains('hidden')) {
    modal.classList.add('hidden');
  }
});

const btn = document.getElementById("shareBtn");
const menu = document.getElementById("shareMenu");

btn.addEventListener("click", (e) => {
    e.stopPropagation(); 
    menu.classList.toggle("hidden");
});

menu.addEventListener("click", (e) => {
    e.stopPropagation();
});

document.addEventListener("click", (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.add("hidden");
    }
});

// დალაიქება/დასეივება

const likeBtn = document.getElementById("likeBtn");
const saveBtn = document.getElementById("saveBtn");

likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("active");
    likeBtn.classList.toggle("like");  
});

saveBtn.addEventListener("click", () => {
    saveBtn.classList.toggle("active");
    saveBtn.classList.toggle("save");
});

// დაკოპირება

document.querySelector('.copy-btn').addEventListener('click', () => {

  const notif = document.getElementById('top-notif');

  notif.classList.add('show');

  setTimeout(() => {
    notif.classList.remove('show');
  }, 2000);
});

// MODAL
const openBtn = document.querySelector('.detal-btn');
const modal = document.getElementById('uploadModal');
const closeBtn = document.querySelector('.close-modal');

openBtn.addEventListener('click', () => {
    modal.classList.add('active');
    disableButtons();
});

closeBtn.addEventListener('click', () => modal.classList.remove('active'));

modal.addEventListener('click', e => { 
    if (e.target === modal) modal.classList.remove('active'); 
});

// ELEMENTS 
const coverInput = document.getElementById("coverInput");
const uploadBox = document.getElementById("uploadBox");
const coverPreview = document.getElementById("coverPreview");
const uploadInner = uploadBox.querySelector(".upload-inner");

const titleInput = document.getElementById("title");
const titleError = document.getElementById("titleError");

const categoryInput = document.getElementById("categoryInput");
const categoryError = document.getElementById("categoryError");
const checkboxList = document.getElementById("checkboxList");

const arrowImg = document.querySelector(".arrow-img");

const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");

// BUTTONS STATE
function disableButtons() {
    submitBtn.disabled = true;
    resetBtn.disabled = true;
}

function enableButtons() {
    submitBtn.disabled = false;
    resetBtn.disabled = false;
}

// UPLOAD PREVIEW
uploadBox.addEventListener("click", () => coverInput.click());

coverInput.addEventListener("change", () => {
    if (coverInput.files.length > 0) {
        const file = coverInput.files[0];
        const reader = new FileReader();
        reader.onload = e => {
            coverPreview.src = e.target.result;
            coverPreview.style.display = "block";
            uploadInner.style.display = "none";
        };
        reader.readAsDataURL(file);

        uploadBox.classList.add("active");
        uploadBox.classList.remove("error-border");
        checkAnyInputChanged();
    }
});

// CHECK ANY INPUT INCLUDING CATEGORY
function checkAnyInputChanged() {
    const hasCover = coverInput.files.length > 0;
    const hasTitle = titleInput.value.trim().length > 0;
    const hasCategory = checkboxList.querySelectorAll("input:checked").length > 0;

    if (hasCover || hasTitle || hasCategory) {
        enableButtons();
    } else {
        disableButtons();
    }
}

// TITLE INPUT
titleInput.addEventListener("input", () => {
    titleError.style.display = "none";
    checkAnyInputChanged();
});

// ARROW
categoryInput.addEventListener("click", () => {
    checkboxList.classList.toggle("active");
    arrowImg.classList.toggle("rotate");
    categoryError.style.display = "none";
    const rect = checkboxList.getBoundingClientRect();
    const isOutOfScreen = rect.bottom > window.innerHeight;
    if (isOutOfScreen) {
        checkboxList.classList.add("up");
    } else {
        checkboxList.classList.remove("up");
    }
});

checkboxList.addEventListener("click", (e) => {
    e.stopPropagation();
});

checkboxList.addEventListener("change", () => {
    const checkboxes = [...checkboxList.querySelectorAll("input")];
    const checked = checkboxes.filter(ch => ch.checked);

    if (checked.length >= 2) {
        checkboxes.forEach(ch => {
            if (!ch.checked) {
                ch.disabled = true;
                ch.parentNode.style.opacity = "0.4";
                ch.parentNode.style.cursor = "not-allowed";
            }
        });
    } else {
        checkboxes.forEach(ch => {
            ch.disabled = false;
            ch.parentNode.style.opacity = "1";
            ch.parentNode.style.cursor = "pointer";
        });
    }

    updateCategoryTags(checked);
    checkAnyInputChanged();
});

// CREATE TAGS INSIDE DIV
function updateCategoryTags(checked) {
    categoryInput.innerHTML = "";

    if (checked.length === 0) {
        categoryInput.classList.add("placeholder");
        return;
    }

    categoryInput.classList.remove("placeholder");

    checked.forEach(ch => {
        const tag = document.createElement("span");
        tag.classList.add("selected-tag");
        tag.textContent = ch.parentNode.textContent.trim();
        categoryInput.appendChild(tag);
    });
}

// PUBLISH BUTTON
submitBtn.addEventListener("click", (e) => {
    let valid = true;

    // Cover photo
    if (coverInput.files.length === 0) {
        uploadBox.classList.add("error-border");
        valid = false;
    } else {
        uploadBox.classList.remove("error-border");
    }

    // Title
    if (titleInput.value.trim() === "") {
        titleError.style.display = "block";
        valid = false;
    } else {
        titleError.style.display = "none";
    }

    // Category
    const categoriesChecked = checkboxList.querySelectorAll("input:checked");
    if (categoriesChecked.length === 0) {
        categoryError.style.display = "block";
        valid = false;
    } else {
        categoryError.style.display = "none";
    }

    if (!valid) {
        e.preventDefault();
        return;
    }

    // აქ ფორმის გაგზავნა
});

// RESET BUTTON
resetBtn.addEventListener("click", () => {
    coverInput.value = "";
    coverPreview.style.display = "none";
    uploadInner.style.display = "flex";
    uploadBox.classList.remove("active");
    uploadBox.classList.remove("error-border");

    titleInput.value = "";
    titleError.style.display = "none";

    categoryInput.innerHTML = "";
    categoryInput.classList.add("placeholder");
    categoryError.style.display = "none";

    checkboxList.querySelectorAll("input").forEach(ch => {
        ch.checked = false;
        ch.disabled = false;
        ch.parentNode.style.opacity = "1";
        ch.parentNode.style.cursor = "pointer";
    });

    checkboxList.classList.remove("active");
    arrowImg.classList.remove("rotate");
    checkboxList.classList.remove("up");

    disableButtons();
});