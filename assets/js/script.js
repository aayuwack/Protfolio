"use strict";

const menuBtn = document.querySelector("[data-menu-btn]");
const nav = document.querySelector("[data-nav]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const sections = document.querySelectorAll("section[id]");
const revealItems = document.querySelectorAll("[data-reveal]");
const preloader = document.querySelector("[data-preloader]");

document.body.classList.add("is-loading");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${index % 4 === 0 ? 0 : (index % 4) * 80}ms`;
  revealObserver.observe(item);
});

const setActiveNav = () => {
  let currentId = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 140;
    const bottom = top + section.offsetHeight;
    if (window.scrollY >= top && window.scrollY < bottom) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${currentId}`;
    link.classList.toggle("active", isActive);
  });
};

window.addEventListener("scroll", setActiveNav);
window.addEventListener("load", setActiveNav);

window.addEventListener("load", () => {
  if (!preloader) {
    document.body.classList.remove("is-loading");
    document.body.classList.add("page-ready");
    return;
  }

  setTimeout(() => {
    preloader.classList.add("hide");
    document.body.classList.remove("is-loading");
    document.body.classList.add("page-ready");
  }, 700);
});
