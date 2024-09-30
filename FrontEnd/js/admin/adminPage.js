const body = document.querySelector("body");
// ON RECUPERE LE TOKEN DANS LE LOCAL STORAGE

function adminOrNot() {
  const monToken = sessionStorage.getItem("token");

  if (monToken) {
    afficherLaPageAdmin();
    remplacerLoginParLogout();
    afficherBoutonModifier();
  }
}

function afficherLaPageAdmin() {
  const div = document.createElement("div");
  div.classList.add("modeEdition");
  //   PREPEND = NOUVELLE FONCTION POUR INSERER L'ELEMENT AVANT TOUS LES ENFANTS DU NOEUD PARENT
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
    nouveauLien.appendChild(listItem);

    // Remplacer l'ancien élément par le nouveau
    login.parentNode.replaceChild(nouveauLien, login);
  }
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

function logout(e) {
  e.preventDefault();
  sessionStorage.removeItem("token");
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", adminOrNot);
