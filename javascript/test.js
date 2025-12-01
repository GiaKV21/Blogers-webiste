  const splide = new Splide('#card-slider', {
    type: 'slide',
    perPage: 3,
    gap: '20px',
    arrows: false,
    pagination: false,
  }).mount();

  // Custom controls
  document.getElementById('myPrevBtn').addEventListener('click', () => {
    splide.go('<');
  });

  document.getElementById('myNextBtn').addEventListener('click', () => {
    splide.go('>');
  });