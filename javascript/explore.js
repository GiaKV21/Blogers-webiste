// Explore Slider

const expItems = document.querySelectorAll('.exp-item');
const exploreSlider = document.querySelector('.explore-slider');
const btnPrev = document.querySelector('.slider-btn.prev');
const btnNext = document.querySelector('.slider-btn.next');

btnPrev.style.display = "none";

expItems.forEach(item => {
  item.addEventListener('click', () => {
    expItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});

const scrollAmount = 150;
btnPrev.addEventListener('click', () => exploreSlider.scrollLeft -= scrollAmount);
btnNext.addEventListener('click', () => exploreSlider.scrollLeft += scrollAmount);

let isDown = false;
let startX;
let scrollLeft;

function enableDrag() {
  exploreSlider.addEventListener('mousedown', dragStart);
  exploreSlider.addEventListener('mouseleave', dragEnd);
  exploreSlider.addEventListener('mouseup', dragEnd);
  exploreSlider.addEventListener('mousemove', dragMove);
}

function disableDrag() {
  exploreSlider.removeEventListener('mousedown', dragStart);
  exploreSlider.removeEventListener('mouseleave', dragEnd);
  exploreSlider.removeEventListener('mouseup', dragEnd);
  exploreSlider.removeEventListener('mousemove', dragMove);
}

function dragStart(e) {
  isDown = true;
  exploreSlider.classList.add('dragging');
  startX = e.pageX - exploreSlider.offsetLeft;
  scrollLeft = exploreSlider.scrollLeft;
}

function dragEnd() {
  isDown = false;
  exploreSlider.classList.remove('dragging');
}

function dragMove(e) {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - exploreSlider.offsetLeft;
  const walk = (x - startX);
  exploreSlider.scrollLeft = scrollLeft - walk;
}

const items = document.querySelectorAll('.exp-item');
let collapsed = false;

btnNext.addEventListener('click', () => {
  if (collapsed) return;

  items.forEach((item, index) => {
    if (index <= 7) {
      item.style.display = 'none';
    }
  });

  btnNext.style.display = 'none';
  btnPrev.style.display = 'inline-flex';

  collapsed = true;
});

btnPrev.addEventListener('click', () => {
  items.forEach(item => item.style.display = 'inline-flex');

  btnPrev.style.display = 'none';
  btnNext.style.display = 'inline-flex';

  collapsed = false;
});


function updateArrowsOnResize() {
  if (window.innerWidth <= 1172) {
    btnPrev.style.display = 'none';
    btnNext.style.display = 'none';
  } else {
    if (collapsed) {
      btnPrev.style.display = 'inline-flex';
      btnNext.style.display = 'none';
    } else {
      btnPrev.style.display = 'none';
      btnNext.style.display = 'inline-flex';
    }
  }
}

window.addEventListener('resize', updateArrowsOnResize);
window.addEventListener('load', updateArrowsOnResize);