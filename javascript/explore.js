// Explore Slider

const expItems = document.querySelectorAll('.exp-item');
expItems.forEach(item => {
  item.addEventListener('click', () => {
    expItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});