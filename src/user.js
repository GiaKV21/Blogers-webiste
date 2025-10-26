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