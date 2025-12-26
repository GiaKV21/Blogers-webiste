// SLIDER FUNCTION

function initSlider({ containerSelector, cardSelector, dotsSelector, getVisibleCount }) {
  document.querySelectorAll(containerSelector).forEach(container => {
    const track = container.querySelector(".slider-track");
    const cards = Array.from(track.querySelectorAll(cardSelector));
    if (!cards.length) return;

    const prevBtn = container.querySelector(".slider-btn.prev");
    const nextBtn = container.querySelector(".slider-btn.next");

    const dotsContainer = container.nextElementSibling?.matches(dotsSelector)
      ? container.nextElementSibling
      : document.querySelector(dotsSelector);

    let dots = [];
    let isDown = false, startX = 0, scrollStart = 0, isDragging = false;

    // ARROWS
    function updateArrows() {
      if (!prevBtn || !nextBtn) return;
      const cards = Array.from(track.querySelectorAll(cardSelector));

      if (cards.length === 0) {
        prevBtn.classList.remove("visible");
        nextBtn.classList.remove("visible");
        return;
      } else {
        prevBtn.classList.add("visible");
        nextBtn.classList.add("visible");
      }

      const maxScroll = track.scrollWidth - track.clientWidth;
      prevBtn.style.opacity = track.scrollLeft > 2 ? "1" : "0";
      nextBtn.style.opacity = track.scrollLeft < maxScroll - 2 ? "1" : "0";
      prevBtn.style.pointerEvents = track.scrollLeft > 2 ? "auto" : "none";
      nextBtn.style.pointerEvents = track.scrollLeft < maxScroll - 2 ? "auto" : "none";
    }

    function initDisplay() {
      track.scrollLeft = 0;
      updateArrows();
      updateDots();
    }

    // BUTTONS
    nextBtn?.addEventListener("click", () => {
      if (window.innerWidth < 769) return;
      const cardWidth = cards[0].offsetWidth + 20;
      const visible = getVisibleCount();
      track.scrollBy({ left: cardWidth * visible, behavior: "smooth" });
    });

    prevBtn?.addEventListener("click", () => {
      if (window.innerWidth < 769) return;
      const cardWidth = cards[0].offsetWidth + 20;
      const visible = getVisibleCount();
      track.scrollBy({ left: -cardWidth * visible, behavior: "smooth" });
    });

    // DRAG
    container.addEventListener("mousedown", e => {
      if (e.target.tagName === "A" || e.target.closest("a")) e.preventDefault();
      isDown = true;
      isDragging = false;
      startX = e.pageX;
      scrollStart = track.scrollLeft;
    });

    container.addEventListener("mousemove", e => {
      if (!isDown) return;
      isDragging = true;
      const walk = e.pageX - startX;
      track.scrollLeft = scrollStart - walk;
    });

    container.addEventListener("mouseup", () => isDown = false);
    container.addEventListener("mouseleave", () => isDown = false);

    cards.forEach(card => {
      card.addEventListener("click", e => {
        if (isDragging) e.preventDefault();
      });
    });

    // DOTS
    function createDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = "";
      dots = cards.map((_, i) => {
        const dot = document.createElement("div");
        dot.className = "slider-dot";
        if (i === 0) dot.classList.add("active");

        dot.addEventListener("click", () => {
          const cardWidth = cards[0].offsetWidth + (window.innerWidth <= 768 ? 16 : 20);
          track.scrollTo({
            left: i * cardWidth,
            behavior: "smooth"
          });
        });

        dotsContainer.appendChild(dot);
        return dot;
      });
      updateDots();
    }

    function updateDots() {
      if (!dots.length) return;
      const maxScroll = track.scrollWidth - track.clientWidth;
      const scrollLeft = track.scrollLeft;
      let index;
      if (scrollLeft >= maxScroll - 5) {
        index = dots.length - 1;
      } else {
        const cardWidth = cards[0].offsetWidth + 16;
        index = Math.round(scrollLeft / cardWidth);
      }
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    }

    track.addEventListener("scroll", updateDots);
    track.addEventListener("scroll", updateArrows);

    // RESIZE HANDLER
    function handleResize() {
      createDots();
      if (dotsContainer) dotsContainer.style.display = "flex";
      updateArrows();
    }

    handleResize();
    initDisplay();
    window.addEventListener("resize", handleResize);
  });
}

// INITIALIZE SLIDERS
initSlider({
  containerSelector: ".slider-container",
  cardSelector: ".slider-card",
  dotsSelector: ".slider-dots",
  getVisibleCount: () => 3
});

initSlider({
  containerSelector: ".slider-container-about",
  cardSelector: ".slider-card-about",
  dotsSelector: ".slider-dots-about",
  getVisibleCount: () => 3
});

initSlider({
  containerSelector: ".slider-container",
  cardSelector: ".slider-card-inner",
  dotsSelector: ".slider-dots",
  getVisibleCount: () => 3
});

initSlider({
  containerSelector: ".explore-slider-wrapper",
  cardSelector: ".exp-item",
  dotsSelector: ".exp-dots",
  getVisibleCount: () => 4
});