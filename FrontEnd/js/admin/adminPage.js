const body = document.querySelector("body");

// FONCTION POUR VERIFIER SI NOUS SOMMES ADMIN OU NON
function adminOrNot() {
  // ON RECUPERE LE TOKEN DANS LE LOCAL STORAGE
  const monToken = sessionStorage.getItem("token");

  // SI LE TOKEN EST BIEN PRESENT EN SESSION STORAGE ON DEROULE LES FONCTIONS DEDIEES A LA PAGE ADMIN
  if (monToken) {
    afficherLaPageAdmin();
    remplacerLoginParLogout();
    afficherBoutonModifier();
    retirerLesFiltres();
    changementsVisuels();
  }
}

function afficherLaPageAdmin() {
  const div = document.createElement("div");
  const header = document.querySelector("header");
  header.classList.add("header--adminMode");
  div.classList.add("modeEdition");
  body.prepend(div);
  div.innerHTML = `
    <i class="fa-regular fa-pen-to-square" style="color: #ffffff;"></i>
    <p>Mode édition</p>`;
}

function remplacerLoginParLogout() {
  const login = document.querySelector(".login");
  if (login) {
    const listItem = document.createElement("li");
    listItem.classList.add("logout");

    const nouveauLien = document.createElement("a");
    nouveauLien.href = "#";
    nouveauLien.textContent = "logout";
    nouveauLien.addEventListener("click", logout);
    listItem.appendChild(nouveauLien);

    // REMPLACER L'ANCIEN ELEMENT PAR LE NOUVEAU
    login.parentNode.replaceChild(listItem, login);
  }
}

function retirerLesFiltres() {
  const filtres = document.querySelector(".filtres");
  const portfolioSection = document.getElementById("portfolio");
  portfolioSection.removeChild(filtres);
}

function afficherBoutonModifier() {
  const portfolioTitle = document.querySelector(".portfolio__title");
  const boutonModifier = document.createElement("button");
  boutonModifier.classList.add("boutonModifier");
  boutonModifier.innerHTML = `
  <i class="fa-regular fa-pen-to-square" style="color: #000000;"></i>
  <p>modifier</p>`;

  portfolioTitle.appendChild(boutonModifier);
}

function changementsVisuels() {
  const introduction = document.getElementById("introduction");
  introduction.style.marginBottom = "130px";
  introduction.style.marginTop = "0";
  introduction.style.marginLeft = "80px";

  const portfolioH2 = document.querySelector("#portfolio h2");
  portfolioH2.style.marginBottom = "100px";
  portfolioH2.style.marginLeft = "110px";
}

function logout(e) {
  e.preventDefault();
  sessionStorage.removeItem("token");
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", adminOrNot);
