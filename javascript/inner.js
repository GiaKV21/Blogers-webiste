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