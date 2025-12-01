// სლაიდერი

document.querySelectorAll('.slider-container').forEach(container => {
  const cards = Array.from(container.querySelectorAll('.slider-card'));
  const prevBtn = container.querySelector('.slider-btn.prev');
  const nextBtn = container.querySelector('.slider-btn.next');
  const dotsContainer = container.parentElement.querySelector('.slider-dots');
  let dots = [];

  let startIndex = 0;
  let isAnimating = false;

  function getVisibleCount() {
    const width = window.innerWidth;
    if (width <= 1024 && width >= 769) return 2;
    return 3;
  }

  function updateArrows() {
    const visible = getVisibleCount();

    if (window.innerWidth >= 769) { 
      prevBtn.style.opacity = startIndex > 0 ? "1" : "0";
      prevBtn.style.pointerEvents = startIndex > 0 ? "auto" : "none";

      nextBtn.style.opacity = (startIndex + visible < cards.length) ? "1" : "0";
      nextBtn.style.pointerEvents = (startIndex + visible < cards.length) ? "auto" : "none";
    } else { 
      prevBtn.style.opacity = "0";
      prevBtn.style.pointerEvents = "none";
      nextBtn.style.opacity = "0";
      nextBtn.style.pointerEvents = "none";
    }
  }

  function showCards(newIndex) {
    const visible = getVisibleCount();
    if (window.innerWidth < 769 || isAnimating) return; 

    isAnimating = true;

    const currentCards = cards.slice(startIndex, startIndex + visible);
    currentCards.forEach(card => card.style.opacity = "0");

    setTimeout(() => {
      currentCards.forEach(card => card.style.display = "none");

      startIndex = newIndex;
      const nextCards = cards.slice(startIndex, startIndex + visible);
      nextCards.forEach(card => {
        card.style.display = "block";
        setTimeout(() => card.style.opacity = "1", 50);
      });

      setTimeout(() => {
        isAnimating = false;
        updateArrows();
      }, 100);
    }, 100);
  }

  nextBtn.addEventListener('click', () => {
    const visible = getVisibleCount();
    if (startIndex + visible < cards.length) {
      showCards(startIndex + visible);
    }
  });

  prevBtn.addEventListener('click', () => {
    const visible = getVisibleCount();
    if (startIndex - visible >= 0) {
      showCards(startIndex - visible);
    }
  });

  // საწყისი ჩვენება
  if (window.innerWidth >= 769) { 
    const initVisible = getVisibleCount();
    cards.forEach((c, i) => {
      c.style.display = i < initVisible ? "block" : "none";
      c.style.opacity = i < initVisible ? "1" : "0";
    });
  } else {
    cards.forEach(c => {
      c.style.display = "block";
      c.style.opacity = "1";
    });
  }

  updateArrows();

  window.addEventListener('resize', () => {
    startIndex = 0;

    if (window.innerWidth >= 769) { 
      const visible = getVisibleCount();
      cards.forEach(c => (c.style.display = "none"));
      cards.slice(0, visible).forEach(c => {
        c.style.display = "block";
        c.style.opacity = "1";
      });
    } else { 
      cards.forEach(c => {
        c.style.display = "block";
        c.style.opacity = "1";
      });
    }

    updateArrows();
    if (window.innerWidth <= 768) createDots();
    else dotsContainer.innerHTML = '';
  });

  // swipe მხოლოდ მობილურზე
  const sliderContainer = container;
  let isDown = false;
  let startX;
  let scrollLeft;

  sliderContainer.addEventListener('mousedown', e => {
    if (window.innerWidth > 768) return;
    isDown = true;
    startX = e.pageX - sliderContainer.offsetLeft;
    scrollLeft = sliderContainer.scrollLeft;
  });

  sliderContainer.addEventListener('mouseleave', () => isDown = false);
  sliderContainer.addEventListener('mouseup', () => isDown = false);
  sliderContainer.addEventListener('mousemove', e => {
    if (!isDown || window.innerWidth > 768) return;
    e.preventDefault();
    const x = e.pageX - sliderContainer.offsetLeft;
    const walk = (x - startX);
    sliderContainer.scrollLeft = scrollLeft - walk;
  });

  //მობილური წერტილები

  function createDots() {
    dotsContainer.innerHTML = '';
    dots = cards.map((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (i === 0) dot.classList.add('active');
      dotsContainer.appendChild(dot);

      // click event
      dot.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          const targetLeft = cards[i].offsetLeft - sliderContainer.offsetLeft;
          sliderContainer.scrollTo({
            left: targetLeft,
            behavior: 'smooth',
          });
        }
      });

      return dot;
    });
  }

  function updateDotsByScroll() {
    if (window.innerWidth > 768) return;
    const scrollLeft = sliderContainer.scrollLeft;
    const cardWidth = cards[0].offsetWidth + 16;
    const maxScroll = sliderContainer.scrollWidth - sliderContainer.clientWidth;
    
    let index;
    if (scrollLeft + 10 >= maxScroll) {
      index = cards.length - 1;
    } else {
      index = Math.round(scrollLeft / cardWidth);
    }

    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  sliderContainer.addEventListener('scroll', updateDotsByScroll);

  if (window.innerWidth <= 768) {
    createDots();
  }
});

// ჩვენს შესახებ სალაიდერი

document.querySelectorAll('.slider-container-about').forEach(container => {
  const cards = Array.from(container.querySelectorAll('.slider-card-about'));
  const prevBtn = container.querySelector('.slider-btn.prev');
  const nextBtn = container.querySelector('.slider-btn.next');
  const dotsContainer = container.parentElement.querySelector('.slider-dots-about');
  let dots = [];
  let startIndex = 0;
  let isAnimating = false;

  const visible = 3;

  function updateArrows() {
    if (window.innerWidth >= 769) {
      prevBtn.style.opacity = startIndex > 0 ? "1" : "0";
      prevBtn.style.pointerEvents = startIndex > 0 ? "auto" : "none";
      nextBtn.style.opacity = (startIndex + visible < cards.length) ? "1" : "0";
      nextBtn.style.pointerEvents = (startIndex + visible < cards.length) ? "auto" : "none";
    } else {
      prevBtn.style.opacity = "0";
      prevBtn.style.pointerEvents = "none";
      nextBtn.style.opacity = "0";
      nextBtn.style.pointerEvents = "none";
    }
  }

  function showCards(newIndex) {
    if (window.innerWidth < 769 || isAnimating) return;
    isAnimating = true;

    const currentCards = cards.slice(startIndex, startIndex + visible);
    currentCards.forEach(card => card.style.opacity = "0");

    setTimeout(() => {
      currentCards.forEach(card => card.style.display = "none");

      startIndex = newIndex;
      const nextCards = cards.slice(startIndex, startIndex + visible);
      nextCards.forEach(card => {
        card.style.display = "block";
        setTimeout(() => card.style.opacity = "1", 50);
      });

      setTimeout(() => {
        isAnimating = false;
        updateArrows();
      }, 100);
    }, 100);
  }

  nextBtn.addEventListener('click', () => {
    if (startIndex + visible < cards.length) showCards(startIndex + visible);
  });

  prevBtn.addEventListener('click', () => {
    if (startIndex - visible >= 0) showCards(startIndex - visible);
  });

  // საწყისი ჩვენება
  if (window.innerWidth >= 769) {
    cards.forEach((c, i) => {
      c.style.display = i < visible ? "block" : "none";
      c.style.opacity = i < visible ? "1" : "0";
    });
  } else {
    cards.forEach(c => {
      c.style.display = "block";
      c.style.opacity = "1";
    });
  }

  updateArrows();

  window.addEventListener('resize', () => {
    startIndex = 0;
    if (window.innerWidth >= 769) {
      cards.forEach(c => c.style.display = "none");
      cards.slice(0, visible).forEach(c => {
        c.style.display = "block";
        c.style.opacity = "1";
      });
    } else {
      cards.forEach(c => {
        c.style.display = "block";
        c.style.opacity = "1";
      });
    }
    updateArrows();
    if (window.innerWidth <= 768) createDots();
    else dotsContainer.innerHTML = '';
  });

  // Swipe მობილურზე
  let isDown = false, startX, scrollLeft;
  const sliderContainer = container;

  sliderContainer.addEventListener('mousedown', e => {
    if (window.innerWidth > 768) return;
    isDown = true;
    startX = e.pageX - sliderContainer.offsetLeft;
    scrollLeft = sliderContainer.scrollLeft;
  });

  sliderContainer.addEventListener('mouseleave', () => isDown = false);
  sliderContainer.addEventListener('mouseup', () => isDown = false);
  sliderContainer.addEventListener('mousemove', e => {
    if (!isDown || window.innerWidth > 768) return;
    e.preventDefault();
    const x = e.pageX - sliderContainer.offsetLeft;
    sliderContainer.scrollLeft = scrollLeft - (x - startX);
  });

  // მობილური წერტილები
  function createDots() {
    dotsContainer.innerHTML = '';
    dots = cards.map((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (i === 0) dot.classList.add('active');
      dotsContainer.appendChild(dot);

      dot.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          const targetLeft = cards[i].offsetLeft - sliderContainer.offsetLeft;
          sliderContainer.scrollTo({ left: targetLeft, behavior: 'smooth' });
        }
      });

      return dot;
    });
  }

  function updateDotsByScroll() {
    if (window.innerWidth > 768) return;
    const scrollLeft = sliderContainer.scrollLeft;
    const cardWidth = cards[0].offsetWidth + 16;
    const maxScroll = sliderContainer.scrollWidth - sliderContainer.clientWidth;

    let index = scrollLeft + 10 >= maxScroll ? cards.length - 1 : Math.round(scrollLeft / cardWidth);
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  sliderContainer.addEventListener('scroll', updateDotsByScroll);

  if (window.innerWidth <= 768) createDots();
});

// wellcome-modal

const deleteModal = document.getElementById("wellcomeModal");
const closeModal = document.getElementById("wellcomecloseModal");

const closeDeleteModal = () => {
  deleteModal.classList.remove("active");
};