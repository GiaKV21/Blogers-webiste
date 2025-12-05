// // SLIDER MASTER FUNCTION

// function initSlider({ containerSelector, cardSelector, dotsSelector, getVisibleCount}) {
//   document.querySelectorAll(containerSelector).forEach(container => {

//     const cards = Array.from(container.querySelectorAll(cardSelector));
//     if (cards.length === 0) return;

//     const prevBtn = container.querySelector('.slider-btn.prev');
//     const nextBtn = container.querySelector('.slider-btn.next');
//     const dotsContainer = container.parentElement.querySelector(dotsSelector);

//     let dots = [];
//     let startIndex = 0;
//     let isAnimating = false;

//     // ARROWS
//     function updateArrows() {
//       const visible = getVisibleCount();

//       if (window.innerWidth >= 769) {
//         prevBtn.style.opacity = startIndex > 0 ? "1" : "0";
//         prevBtn.style.pointerEvents = startIndex > 0 ? "auto" : "none";

//         const canNext = startIndex + visible < cards.length;
//         nextBtn.style.opacity = canNext ? "1" : "0";
//         nextBtn.style.pointerEvents = canNext ? "auto" : "none";
//       } else {
//         prevBtn.style.opacity = "0";
//         prevBtn.style.pointerEvents = "none";
//         nextBtn.style.opacity = "0";
//         nextBtn.style.pointerEvents = "none";
//       }
//     }

//     // SHOW CARDS
//     function showCards(newIndex) {
//       const visible = getVisibleCount();
//       if (window.innerWidth < 769 || isAnimating) return;

//       isAnimating = true;

//       const currentCards = cards.slice(startIndex, startIndex + visible);
//       currentCards.forEach(card => card.style.opacity = "0");

//       setTimeout(() => {
//         currentCards.forEach(card => card.style.display = "none");
//         startIndex = newIndex;

//         const nextCards = cards.slice(startIndex, startIndex + visible);
//         nextCards.forEach(card => {
//           card.style.display = "block";
//           setTimeout(() => card.style.opacity = "1", 100);
//         });

//         setTimeout(() => {
//           isAnimating = false;
//           updateArrows();
//         }, 100);
//       }, 100);
//     }

//     // INITIAL DISPLAY
//     function initDisplay() {
//       startIndex = 0;
//       const visible = getVisibleCount();

//       if (window.innerWidth >= 769) {
//         cards.forEach(c => c.style.display = "none");
//         cards.slice(0, visible).forEach(c => {
//           c.style.display = "block";
//           c.style.opacity = "1";
//         });
//       } else {
//         cards.forEach(c => {
//           c.style.display = "block";
//           c.style.opacity = "1";
//         });
//       }
//       updateArrows();
//     }

//     initDisplay();

//     // BUTTONS
//     nextBtn?.addEventListener('click', () => {
//       const visible = getVisibleCount();
//       if (startIndex + visible < cards.length) showCards(startIndex + visible);
//     });

//     prevBtn?.addEventListener('click', () => {
//       const visible = getVisibleCount();
//       if (startIndex - visible >= 0) showCards(startIndex - visible);
//     });

//     // SWIPE (mobile)
//     let isDown = false, startX, scrollLeft;

//     container.addEventListener('mousedown', e => {
//       if (window.innerWidth > 768) return;
//       isDown = true;
//       startX = e.pageX - container.offsetLeft;
//       scrollLeft = container.scrollLeft;
//     });

//     container.addEventListener('mouseleave', () => isDown = false);
//     container.addEventListener('mouseup', () => isDown = false);

//     container.addEventListener('mousemove', e => {
//       if (!isDown || window.innerWidth > 768) return;
//       const x = e.pageX - container.offsetLeft;
//       container.scrollLeft = scrollLeft - (x - startX);
//     });

//     // DOTS (mobile)
//     function createDots() {
//       dotsContainer.innerHTML = "";
//       dots = cards.map((_, i) => {
//         const dot = document.createElement("div");
//         dot.classList.add("slider-dot");
//         if (i === 0) dot.classList.add("active");

//         dot.addEventListener("click", () => {
//           if (window.innerWidth <= 768) {
//             const targetLeft = cards[i].offsetLeft - container.offsetLeft;
//             container.scrollTo({ left: targetLeft, behavior: "smooth" });
//           }
//         });

//         dotsContainer.appendChild(dot);
//         return dot;
//       });
//     }

//     function updateDotsByScroll() {
//       if (window.innerWidth > 768) return;

//       const scrollLeft = container.scrollLeft;
//       const cardWidth = cards[0].offsetWidth + 16;
//       const maxScroll = container.scrollWidth - container.clientWidth;

//       let index = scrollLeft + 10 >= maxScroll
//         ? cards.length - 1
//         : Math.round(scrollLeft / cardWidth);

//       dots.forEach((d, i) => d.classList.toggle("active", i === index));
//     }

//     container.addEventListener("scroll", updateDotsByScroll);

//     if (window.innerWidth <= 768) createDots();
//     window.addEventListener('resize', () => {
//       initDisplay();

//       if (window.innerWidth <= 768) createDots();
//       else dotsContainer.innerHTML = "";
//     });
//   });
// }

// // INITIALIZATIONS FOR 3 SLIDERS

// // MAIN SLIDER
// initSlider({
//   containerSelector: ".slider-container",
//   cardSelector: ".slider-card",
//   dotsSelector: ".slider-dots",
//   getVisibleCount: () => {
//     const w = window.innerWidth;
//     if (w <= 1024 && w >= 769) return 2;
//     return 3;
//   }
// });

// // ABOUT SLIDER
// initSlider({
//   containerSelector: ".slider-container-about",
//   cardSelector: ".slider-card-about",
//   dotsSelector: ".slider-dots-about",
//   getVisibleCount: () => 3
// });

// // INNER SLIDER
// initSlider({
//   containerSelector: ".slider-container",
//   cardSelector: ".slider-card-inner",
//   dotsSelector: ".slider-dots",
//   getVisibleCount: () => {
//     const w = window.innerWidth;
//     if (w <= 1024 && w >= 769) return 2;
//     return 3;
//   }
// });

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
    }

    function updateDots() {
      if (window.innerWidth > 768 || !dots.length) return;
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
      if (window.innerWidth <= 768) {
        createDots();
        if (dotsContainer) dotsContainer.style.display = "flex";
      } else {
        if (dotsContainer) {
          dotsContainer.innerHTML = "";
          dotsContainer.style.display = "none";
        }
      }
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
  getVisibleCount: () => (window.innerWidth <= 1024 && window.innerWidth >= 769 ? 2 : 3)
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
  getVisibleCount: () => (window.innerWidth <= 1024 && window.innerWidth >= 769 ? 2 : 3)
});