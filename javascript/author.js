const qs = new URLSearchParams(location.search);
const variant = {
  loggedIn: qs.get("auth") === "in",
  showWork: qs.has("work") ? qs.get("work") !== "0" : false,
  showAbout: qs.has("about") ? qs.get("about") !== "0" : false,
};

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.toggle("is-auth", variant.loggedIn);
  initMobileDrawer();
  initContentTabs();
  setView(qs.get("view") === "about" ? "about" : "work");
  const loginLink = document.getElementById("loginLink");
  if (loginLink && qs.get("demo") === "1") {
    loginLink.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.classList.add("is-auth");
    });
  }
});

function initContentTabs() {
  const bar = document.getElementById("contentTabs");
  if (!bar) return;
  bar.querySelectorAll(".tab").forEach((btn) => {
    btn.type = "button";
    btn.addEventListener("click", () => setView(btn.dataset.view));
  });
}

function setView(view) {
  document
    .querySelectorAll("#contentTabs .tab")
    .forEach((t) => t.classList.toggle("is-active", t.dataset.view === view));

  const title = document.getElementById("sectionTitle");
  const workGrid = document.getElementById("workGrid");
  const aboutContent = document.getElementById("aboutContent");
  const emptyBlock = document.getElementById("emptyBlock");
  const emptyTitle = document.getElementById("emptyTitle");

  if (view === "about") {
    title.textContent = "ავტორის შესახებ";
    if (variant.showAbout) {
      aboutContent.hidden = false;
      workGrid.hidden = true;
      emptyBlock.hidden = true;
    } else {
      aboutContent.hidden = true;
      workGrid.hidden = true;
      emptyTitle.textContent = "ავტორის შესახებ ინფორმაცია ჯერ არ არის";
      emptyBlock.hidden = false;
    }
  } else {
    title.textContent = "საკითხავი";
    if (variant.showWork) {
      workGrid.hidden = false;
      aboutContent.hidden = true;
      emptyBlock.hidden = true;
    } else {
      workGrid.hidden = true;
      aboutContent.hidden = true;
      emptyTitle.textContent = "საკითხავი ჯერ არ არის დამატებული";
      emptyBlock.hidden = false;
    }
  }
}

function initMobileDrawer() {
  const toggle = document.getElementById("menuToggle");
  const drawer = document.getElementById("mobileNav");
  const backdrop = document.getElementById("drawerBackdrop");
  if (!toggle || !drawer || !backdrop) return;
  const open = () => {
    drawer.hidden = false;
    backdrop.hidden = false;
    drawer.classList.add("is-open");
    backdrop.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
  };
  const close = () => {
    drawer.classList.remove("is-open");
    backdrop.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    setTimeout(() => {
      drawer.hidden = true;
      backdrop.hidden = true;
    }, 200);
  };
  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    expanded ? close() : open();
  });
  backdrop.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}
