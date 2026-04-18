document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const links = document.querySelectorAll(".nav-links a");

  // --- Mobile menu ---
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const icon = menuToggle.querySelector("i");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-times");
  });
  links.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      const icon = menuToggle.querySelector("i");
      icon.classList.add("fa-bars");
      icon.classList.remove("fa-times");
    });
  });

  // --- Navbar shadow on scroll ---
  window.addEventListener("scroll", () => {
    navbar.style.boxShadow =
      window.scrollY > 50 ? "0 4px 6px -1px rgba(0,0,0,0.08)" : "none";
  });

  // --- Scroll reveal ---
  const revealEls = document.querySelectorAll(".scroll-reveal");
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
  );
  revealEls.forEach((el) => observer.observe(el));

  // --- Active nav link ---
  const sections = document.querySelectorAll("section");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 160) {
        current = section.getAttribute("id");
      }
    });
    links.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href")?.includes(current)) {
        link.classList.add("active");
      }
    });
  });

  // --- Bilingual toggle ---
  let currentLang = "pt";

  const TRANSLATABLE = [
    // nav links
    ...document.querySelectorAll(".nav-links a[data-pt]"),
    // sections
    ...document.querySelectorAll("[data-pt]"),
  ];

  function setLang(lang) {
    currentLang = lang;

    // Update button states
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });

    // Update html lang attribute
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";

    // Translate all tagged elements
    document.querySelectorAll("[data-pt]").forEach((el) => {
      const text = el.getAttribute(`data-${lang}`);
      if (!text) return;
      // Use innerHTML to support <strong> tags inside translations
      el.innerHTML = text;
    });

    // Persist
    localStorage.setItem("lang", lang);
  }

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });

  // Load saved language
  const saved = localStorage.getItem("lang");
  if (saved && saved !== "pt") setLang(saved);
});
