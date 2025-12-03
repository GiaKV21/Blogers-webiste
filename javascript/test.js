// SLIDER MASTER FUNCTION

function initSlider({ containerSelector, cardSelector, dotsSelector, getVisibleCount }) {
  document.querySelectorAll(containerSelector).forEach((container) => {

    const track = container.querySelector(".slider-track");
    const cards = Array.from(track.querySelectorAll(cardSelector));
    if (cards.length === 0) return;

    const prevBtn = container.querySelector(".slider-btn.prev");
    const nextBtn = container.querySelector(".slider-btn.next");
    const dotsContainer = container.parentElement.querySelector(dotsSelector);

    let dots = [];
    let isDown = false, startX = 0, scrollStart = 0;

    // -------------------------
    // ARROWS (Desktop only)
    // -------------------------

    function updateArrows() {
      if (window.innerWidth < 769) {
        prevBtn.style.opacity = "0";
        prevBtn.style.pointerEvents = "none";
        nextBtn.style.opacity = "0";
        nextBtn.style.pointerEvents = "none";
        return;
      }

      const maxScroll = track.scrollWidth - track.clientWidth;

      prevBtn.style.opacity = track.scrollLeft > 2 ? "1" : "0";
      prevBtn.style.pointerEvents = track.scrollLeft > 2 ? "auto" : "none";

      nextBtn.style.opacity = track.scrollLeft < maxScroll - 2 ? "1" : "0";
      nextBtn.style.pointerEvents = track.scrollLeft < maxScroll - 2 ? "auto" : "none";
    }

    // -------------------------
    // INITIAL DISPLAY
    // -------------------------

    function initDisplay() {
      cards.forEach((c) => {
        c.style.display = "block";
        c.style.opacity = "1";
      });

      // desktop scroll resets track
      track.scrollLeft = 0;

      // mobile scroll resets container
      container.scrollLeft = 0;

      updateArrows();
    }

    initDisplay();

    // -------------------------
    // BUTTONS (Desktop only)
    // -------------------------

    nextBtn?.addEventListener("click", () => {
      if (window.innerWidth < 769) return;

      const cardWidth = cards[0].offsetWidth + 20;
      const visible = getVisibleCount();

      track.scrollBy({
        left: cardWidth * visible,
        behavior: "smooth",
      });
    });

    prevBtn?.addEventListener("click", () => {
      if (window.innerWidth < 769) return;

      const cardWidth = cards[0].offsetWidth + 20;
      const visible = getVisibleCount();

      track.scrollBy({
        left: -(cardWidth * visible),
        behavior: "smooth",
      });
    });

    // -------------------------
    // DESKTOP scroll
    // -------------------------

    track.addEventListener("scroll", () => {
      if (window.innerWidth >= 769) updateArrows();
    });

    // -------------------------
    // MOBILE SWIPE (Container)
    // -------------------------

    container.addEventListener("mousedown", (e) => {
      if (window.innerWidth >= 769) return;

      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollStart = container.scrollLeft;
    });

    container.addEventListener("mouseleave", () => (isDown = false));
    container.addEventListener("mouseup", () => (isDown = false));

    container.addEventListener("mousemove", (e) => {
      if (!isDown || window.innerWidth >= 769) return;
      const x = e.pageX - container.offsetLeft;
      container.scrollLeft = scrollStart - (x - startX);
    });

    // -------------------------
    // DOTS (mobile only)
    // -------------------------

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

      let index =
        scrollLeft + 10 >= maxScroll
          ? cards.length - 1
          : Math.round(scrollLeft / cardWidth);

      dots.forEach((d, i) => d.classList.toggle("active", i === index));
    }

    container.addEventListener("scroll", updateDotsByScroll);

    // -------------------------
    // MOBILE/RESIZE LOGIC
    // -------------------------

    if (window.innerWidth <= 768) createDots();

    window.addEventListener("resize", () => {
      initDisplay();

      if (window.innerWidth <= 768) createDots();
      else dotsContainer.innerHTML = "";
    });
  });
}

// =========================
// INIT
// =========================

initSlider({
  containerSelector: ".slider-container",
  cardSelector: ".slider-card",
  dotsSelector: ".slider-dots",
  getVisibleCount: () => (window.innerWidth <= 1024 && window.innerWidth >= 769 ? 2 : 3),
});

initSlider({
  containerSelector: ".slider-container-about",
  cardSelector: ".slider-card-about",
  dotsSelector: ".slider-dots-about",
  getVisibleCount: () => 3,
});

initSlider({
  containerSelector: ".slider-container",
  cardSelector: ".slider-card-inner",
  dotsSelector: ".slider-dots",
  getVisibleCount: () => (window.innerWidth <= 1024 && window.innerWidth >= 769 ? 2 : 3),
});