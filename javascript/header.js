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

// შეტყობინებების მოდალი

document.addEventListener('DOMContentLoaded', () => {
  const notifBtn = document.getElementById('notificationBtn');
  const notifModal = document.getElementById('notification-modal');

  if (notifBtn && notifModal) {
    notifBtn.addEventListener('click', () => {
      notifModal.classList.toggle('hidden');
    });

    document.addEventListener('click', (event) => {
      if (!notifBtn.contains(event.target) && !notifModal.contains(event.target)) {
        notifModal.classList.add('hidden');
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        notifModal.classList.add('hidden');
      }
    });
  }
});


// უზერ მოდალი

document.addEventListener('DOMContentLoaded', () => {
  const userBtn = document.querySelector('.icon-btn');
  const userModal = document.getElementById('user-modal');

  if (userBtn && userModal) {
    userBtn.addEventListener('click', () => {
      userModal.classList.toggle('hidden');
    });

    document.addEventListener('click', (event) => {
      if (!userBtn.contains(event.target) && !userModal.contains(event.target)) {
        userModal.classList.add('hidden');
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        userModal.classList.add('hidden');
      }
    });
  }
});

// ბურგერ მენიუ

function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('open');
}
document.addEventListener('click', function(event) {
  const sidebar = document.querySelector('.sidebar');
  const toggleBtn = document.querySelector('.menu-toggle');
  const innerToggle = document.querySelector('.burger-toggle');

  if (!sidebar.contains(event.target) && !toggleBtn.contains(event.target)) {
    sidebar.classList.remove('open');
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const innerToggle = document.querySelector('.burger-toggle');
  if (innerToggle) {
    innerToggle.addEventListener('click', () => {
      const sidebar = document.querySelector('.sidebar');
      sidebar.classList.remove('open');
    });
  }
});