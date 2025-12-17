
const style = document.createElement('style');
style.innerHTML = `
@font-face {
    font-family: "regular";
    src: url("../fonts/HelveticaNeue-Roman.otf") format("opentype");
    font-weight: 400;
    font-style: normal;
}

.sun-editor-editable,
.sun-editor-editable * {
    font-family: "regular";
}
`;
document.head.appendChild(style);

const editor = SUNEDITOR.create('editor', {
    width: '100%',
    height: '1260px',

    formats: ['h1', 'p'],
    defaultTag: 'h1',

    font: [
        'thin',
        'light',
        'regular',
        'medium',
        'bold'
    ],

    buttonList: [
        ['undo', 'redo'],
        ['font', 'fontSize', 'formatBlock'],
        ['bold', 'underline', 'italic', 'strike'],
        ['fontColor', 'hiliteColor'],
        ['align', 'list', 'outdent', 'indent'],
        ['table', 'link', 'image', 'video'],
        ['fullScreen', 'showBlocks', 'codeView']
    ]
});

editor.onKeyDown = function (e) {
    if (e.key === 'Enter') {
        const currentFormat = editor.getCurrentFormat?.();

        if (currentFormat === 'h1') {
            setTimeout(() => {
                editor.execCommand('formatBlock', 'p');
            }, 0);
        }
    }
};

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
            document.querySelector(".resend-img-test").style.display = "block";
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

    document.querySelector(".resend-img-test").style.display = "none";

    disableButtons();
});