/* ===========================
   Mobile drawer (hamburger)
   =========================== */
(() => {
  const btn = document.getElementById("menuToggle");
  const drawer = document.getElementById("mobileNav");
  const backdrop = document.getElementById("drawerBackdrop");
  if (!btn || !drawer || !backdrop) return;

  let lastFocused = null;
  const FOCUSABLE =
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
  const getFocusable = () =>
    Array.from(drawer.querySelectorAll(FOCUSABLE)).filter(
      (el) => el.offsetParent !== null
    );

  function onKeydown(e) {
    if (e.key === "Escape") {
      closeDrawer();
    }
    if (e.key === "Tab") {
      const nodes = getFocusable();
      if (!nodes.length) return;
      const first = nodes[0],
        last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        last.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }
  }

  function openDrawer() {
    lastFocused = document.activeElement;

    drawer.hidden = false;
    backdrop.hidden = false;

    drawer.classList.add("is-open");
    backdrop.classList.add("is-open");
    btn.setAttribute("aria-expanded", "true");

    // a11y: treat as modal dialog
    drawer.setAttribute("role", "dialog");
    drawer.setAttribute("aria-modal", "true");

    // lock page scroll
    document.body.classList.add("no-scroll");

    document.addEventListener("keydown", onKeydown);

    // focus first interactive element inside drawer
    getFocusable()[0]?.focus();
  }

  function closeDrawer() {
    drawer.classList.remove("is-open");
    backdrop.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");

    // hide after transition ends
    setTimeout(() => {
      drawer.hidden = true;
      backdrop.hidden = true;
    }, 200);

    document.removeEventListener("keydown", onKeydown);

    // restore focus
    lastFocused?.focus();
  }

  btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") === "true";
    open ? closeDrawer() : openDrawer();
  });

  backdrop.addEventListener("click", closeDrawer);
})();

/* ========== Filters for Explore cards ========== */
(() => {
  const pills = document.querySelectorAll("#filterList .pill");
  const grid = document.getElementById("cardsGrid");
  const cards = grid ? Array.from(grid.querySelectorAll(".card")) : [];
  const empty = document.getElementById("emptyState");
  if (!pills.length || !cards.length) return;

  function setActive(filter) {
    pills.forEach((p) =>
      p.classList.toggle("is-active", p.dataset.filter === filter)
    );
  }

  function applyFilter(filter) {
    let visibleCount = 0;
    cards.forEach((card) => {
      const cats = (card.getAttribute("data-cat") || "").split(/\s+/);
      const show = filter === "all" || cats.includes(filter);
      card.style.display = show ? "" : "none";
      if (show) visibleCount++;
    });
    if (empty) empty.classList.toggle("is-hidden", visibleCount !== 0);
    // Update title to match active pill (optional)
    const activePill = document.querySelector("#filterList .pill.is-active");
    const title = document.getElementById("explore-heading");
    if (title && activePill) title.textContent = activePill.textContent.trim();
  }

  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      const filter = pill.dataset.filter;
      setActive(filter);
      applyFilter(filter);
    });
  });

  // Initial
  applyFilter("all");
})();
