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

const nav = document.querySelector('.nav-user');
let isDown = false;
let startX;
let scrollLeft;

nav.addEventListener('mousedown', e => {
  isDown = true;
  nav.classList.add('dragging');
  startX = e.pageX - nav.offsetLeft;
  scrollLeft = nav.scrollLeft;
});

nav.addEventListener('mouseleave', () => {
  isDown = false;
  nav.classList.remove('dragging');
});

nav.addEventListener('mouseup', () => {
  isDown = false;
  nav.classList.remove('dragging');
});

nav.addEventListener('mousemove', e => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - nav.offsetLeft;
  const walk = (x - startX) * 1;
  nav.scrollLeft = scrollLeft - walk;
});