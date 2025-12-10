
  tinymce.init({
    selector: 'textarea',
    plugins: [
      // Core editing features
      'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
      // Your account includes a free trial of TinyMCE premium features
      // Try the most popular premium features until Dec 20, 2025:
      'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'advtemplate', 'ai', 'uploadcare', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown','importword', 'exportword', 'exportpdf'
    ],
    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
    tinycomments_mode: 'embedded',
    tinycomments_author: 'Author name',
    mergetags_list: [
      { value: 'First.Name', title: 'First Name' },
      { value: 'Email', title: 'Email' },
    ],
    ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
    uploadcare_public_key: '8de56763523416290ffa',
  });

// MODAL
const openBtn = document.querySelector('.button-next-editor');
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
        checkAnyInputChanged();
        uploadBox.classList.remove("error-border");
    }
});

// CHECK ANY INPUT
function checkAnyInputChanged() {
    const hasCover = coverInput.files.length > 0;
    const hasTitle = titleInput.value.trim().length > 0;
    const hasCategory = categoryInput.value.trim().length > 0;

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

// CHECKBOX LOGIC
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

    categoryInput.value = checked.map(ch => ch.parentNode.textContent.trim()).join(", ");
    checkAnyInputChanged();
});

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
    categoryInput.value = "";
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