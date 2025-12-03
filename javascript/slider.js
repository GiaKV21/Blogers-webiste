// SLIDER MASTER FUNCTION

function initSlider({ containerSelector, cardSelector, dotsSelector, getVisibleCount}) {
  document.querySelectorAll(containerSelector).forEach(container => {

    const cards = Array.from(container.querySelectorAll(cardSelector));
    if (cards.length === 0) return;

    const prevBtn = container.querySelector('.slider-btn.prev');
    const nextBtn = container.querySelector('.slider-btn.next');
    const dotsContainer = container.parentElement.querySelector(dotsSelector);

    let dots = [];
    let startIndex = 0;
    let isAnimating = false;

    // ARROWS
    function updateArrows() {
      const visible = getVisibleCount();

      if (window.innerWidth >= 769) {
        prevBtn.style.opacity = startIndex > 0 ? "1" : "0";
        prevBtn.style.pointerEvents = startIndex > 0 ? "auto" : "none";

        const canNext = startIndex + visible < cards.length;
        nextBtn.style.opacity = canNext ? "1" : "0";
        nextBtn.style.pointerEvents = canNext ? "auto" : "none";
      } else {
        prevBtn.style.opacity = "0";
        prevBtn.style.pointerEvents = "none";
        nextBtn.style.opacity = "0";
        nextBtn.style.pointerEvents = "none";
      }
    }

    // SHOW CARDS
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
          setTimeout(() => card.style.opacity = "1", 100);
        });

        setTimeout(() => {
          isAnimating = false;
          updateArrows();
        }, 100);
      }, 100);
    }

    // INITIAL DISPLAY
    function initDisplay() {
      startIndex = 0;
      const visible = getVisibleCount();

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
    }

    initDisplay();

    // BUTTONS
    nextBtn?.addEventListener('click', () => {
      const visible = getVisibleCount();
      if (startIndex + visible < cards.length) showCards(startIndex + visible);
    });

    prevBtn?.addEventListener('click', () => {
      const visible = getVisibleCount();
      if (startIndex - visible >= 0) showCards(startIndex - visible);
    });

    // SWIPE (mobile)
    let isDown = false, startX, scrollLeft;

    container.addEventListener('mousedown', e => {
      if (window.innerWidth > 768) return;
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => isDown = false);
    container.addEventListener('mouseup', () => isDown = false);

    container.addEventListener('mousemove', e => {
      if (!isDown || window.innerWidth > 768) return;
      const x = e.pageX - container.offsetLeft;
      container.scrollLeft = scrollLeft - (x - startX);
    });

    // DOTS (mobile)
    function createDots() {
      dotsContainer.innerHTML = "";
      dots = cards.map((_, i) => {
        const dot = document.createElement("div");
        dot.classList.add("slider-dot");
        if (i === 0) dot.classList.add("active");

        dot.addEventListener("click", () => {
          if (window.innerWidth <= 768) {
            const targetLeft = cards[i].offsetLeft - container.offsetLeft;
            container.scrollTo({ left: targetLeft, behavior: "smooth" });
          }
        });

        dotsContainer.appendChild(dot);
        return dot;
      });
    }

    function updateDotsByScroll() {
      if (window.innerWidth > 768) return;

      const scrollLeft = container.scrollLeft;
      const cardWidth = cards[0].offsetWidth + 16;
      const maxScroll = container.scrollWidth - container.clientWidth;

      let index = scrollLeft + 10 >= maxScroll
        ? cards.length - 1
        : Math.round(scrollLeft / cardWidth);

      dots.forEach((d, i) => d.classList.toggle("active", i === index));
    }

    container.addEventListener("scroll", updateDotsByScroll);

    if (window.innerWidth <= 768) createDots();
    window.addEventListener('resize', () => {
      initDisplay();

      if (window.innerWidth <= 768) createDots();
      else dotsContainer.innerHTML = "";
    });
  });
}

// INITIALIZATIONS FOR 3 SLIDERS

// MAIN SLIDER
initSlider({
  containerSelector: ".slider-container",
  cardSelector: ".slider-card",
  dotsSelector: ".slider-dots",
  getVisibleCount: () => {
    const w = window.innerWidth;
    if (w <= 1024 && w >= 769) return 2;
    return 3;
  }
});

// ABOUT SLIDER
initSlider({
  containerSelector: ".slider-container-about",
  cardSelector: ".slider-card-about",
  dotsSelector: ".slider-dots-about",
  getVisibleCount: () => 3
});

// INNER SLIDER
initSlider({
  containerSelector: ".slider-container",
  cardSelector: ".slider-card-inner",
  dotsSelector: ".slider-dots",
  getVisibleCount: () => {
    const w = window.innerWidth;
    if (w <= 1024 && w >= 769) return 2;
    return 3;
  }
});