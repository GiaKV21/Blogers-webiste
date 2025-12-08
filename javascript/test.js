tinymce.init({
  selector: 'textarea',
  plugins: [
  'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount'
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

// Modal
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

// Elements
const coverInput = document.getElementById("coverInput");
const uploadBox = document.getElementById("uploadBox");

const titleInput = document.getElementById("title");
const categoryInput = document.getElementById("categoryInput");
const checkboxList = document.getElementById("checkboxList");

const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");

function disableButtons() {
    submitBtn.disabled = true;
    resetBtn.disabled = true;
}

function enableButtons() {
    submitBtn.disabled = false;
    resetBtn.disabled = false;
}

// Upload
uploadBox.addEventListener("click", () => coverInput.click());

coverInput.addEventListener("change", () => {
    if (coverInput.files.length > 0) {
        uploadBox.classList.add("active");
        checkAnyInputChanged();
    }
});

titleInput.addEventListener("input", checkAnyInputChanged);
categoryInput.addEventListener("click", () =>
    checkboxList.classList.toggle("active")
);

document.addEventListener("click", (e) => {
    if (!e.target.closest(".select-box")) checkboxList.classList.remove("active");
});

checkboxList.addEventListener("change", () => {
    const checked = [...checkboxList.querySelectorAll("input:checked")];

    if (checked.length > 2) {
        checked[2].checked = false;
        return;
    }

    categoryInput.value = checked.map(ch => ch.parentNode.textContent.trim()).join(", ");
    checkAnyInputChanged();
});
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

// Reset Button
resetBtn.addEventListener("click", () => {
    coverInput.value = "";
    uploadBox.classList.remove("active");

    titleInput.value = "";

    categoryInput.value = "";
    checkboxList.querySelectorAll("input").forEach(ch => (ch.checked = false));

    disableButtons();
});
