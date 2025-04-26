document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section");

  // Adiciona rolagem suave ao clicar em qualquer link de navegação
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      // Obtém o id do alvo removendo o '#' do atributo href
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      // Se o menu estiver ativo (ex: em dispositivos móveis), fecha-o após o clique
      document.querySelector(".nav-links").classList.remove("active");
    });
  });

  // Função para destacar o link ativo conforme a rolagem
  function highlightLink() {
    let index = sections.length;
    // Percorre os sections para encontrar qual está atualmente em vista
    while (--index && window.scrollY + 100 < sections[index].offsetTop) {}
    links.forEach((link) => link.classList.remove("active"));
    if (links[index]) {
      links[index].classList.add("active");
    }
  }

  highlightLink();
  window.addEventListener("scroll", highlightLink);

  // Adiciona ou remove a classe 'scrolled' conforme o scroll para, por exemplo, alterar o estilo da navbar
  window.addEventListener("scroll", function () {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Menu toggle para dispositivos móveis
  document.querySelector(".menu-toggle").addEventListener("click", function () {
    document.querySelector(".nav-links").classList.toggle("active");
  });

  // Ajusta o espaçamento entre os itens de navegação
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach((link) => {
    link.style.margin = "0 0.75rem"; // ajuste esse valor conforme sua necessidade
  });
});
