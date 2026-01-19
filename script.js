document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const links = document.querySelectorAll(".nav-links a");

  // 1. Menu Mobile Toggle
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    // Troca ícone do menu
    const icon = menuToggle.querySelector("i");
    if (navLinks.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  // 2. Fechar menu ao clicar em link
  links.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      const icon = menuToggle.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    });
  });

  // 3. Efeito Glassmorphism/Sombra na Navbar ao rolar
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = "0 4px 6px -1px rgba(0,0,0,0.1)";
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
    } else {
      navbar.style.boxShadow = "none";
      navbar.style.background = "rgba(255, 255, 255, 0.9)";
    }
  });

  // 4. Scroll Reveal Animation (Observer API)
  const revealElements = document.querySelectorAll(".scroll-reveal");

  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const revealOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach((el) => {
    revealOnScroll.observe(el);
  });

  // 5. Active Link Highlight
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollY = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      // Ajuste de offset
      if (scrollY >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    links.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });
});

// Função Global para Copiar Email
function copyEmail() {
  const emailText = "Luizfelipep.s@outlook.com.br";
  navigator.clipboard.writeText(emailText).then(() => {
    alert("Email copiado para a área de transferência!");
  });
}
