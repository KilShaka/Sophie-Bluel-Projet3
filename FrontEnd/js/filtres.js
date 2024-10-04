// IMPORT DES FONCTIONS UTILES POUR LE FILTRAGE
import { creationDesImages, recuperationDesDonnees } from "./works.js";
import { filtrerTravaux } from "./filtrage.js";

// RECUPERER LES DONNEES (CATEGORIES DE FILTRES)

export async function recuperationDesDonneesFiltres() {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    const ERROR_MESSAGE =
      "LA REPONSE POUR LA RECUPERATION DES CATEGORIES/FILTRES N'EST PAS OK";
    if (!response.ok) {
      throw new Error(ERROR_MESSAGE);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(
      "IMPOSSIBLE DE SE CONNECTER AUX CATEGORIES DE FILTRES, fetching KO",
      error
    );
    return [];
  }
}

//UTILISER LES DONNEES POUR CREER LES ELEMENTS
function creationDesFiltres(tableau) {
  // SELECTION DE LA CLASSE FILTRES
  const filtres = document.querySelector(".filtres");
  if (filtres) {
    // CREATION DU BOUTON "TOUS"
    const boutonTous = document.createElement("div");
    boutonTous.textContent = "Tous";
    boutonTous.classList.add(
      "filtres__btn",
      "filtres__btn--tous",
      "clickedButton"
    );
    // ON RATTACHE LE BOUTON TOUS A FILTRES AVANT LA BOUCLE FOREACH
    filtres.appendChild(boutonTous);

    //   UTILISATION DE FOREACH POUR ITERER SUR CHAQUE ELEMENT DU TABLEAU
    tableau.forEach((filtre) => {
      // CREATION DES ELEMENTS CONSTITUANTS CHAQUE BOUTON
      const div = document.createElement("div");
      // ATTRIBUTION DE LA VALEUR A CHAQUE VARIABLE CREEE
      div.textContent = filtre.name;
      if (filtre.name === "Objets") {
        div.classList.add("filtres__btn", "filtres__btn--objets");
        filtres.appendChild(div);
      } else {
        div.classList.add("filtres__btn");
        // ON RATTACHE LE TOUT
        filtres.appendChild(div);
      }
    });
  }
}

function trier() {
  const boutonFiltre = document.querySelectorAll(".filtres__btn");
  // TABLEAU A REMPLIR PAR LES RECUPERATIONS API
  let travaux = [];
  // AJOUT D'UN EVENEMENT AU CLIC SUR TOUS LES BOUTONS
  boutonFiltre.forEach((bouton) => {
    bouton.addEventListener("click", async () => {
      const categorie = bouton.textContent;
      // SI MON TABLEAU TRAVAUX EST VIDE = LE REMPLI AVEC TOUTES LES DONNEES
      if (travaux.length === 0) {
        travaux = await recuperationDesDonnees();
      }
      // J'UTILISE MA FONCTION FILTRE IMPORTEE POUR FILTRER SELON LA CATEGORIE CLIQUEE
      const travauxFiltres = filtrerTravaux(travaux, categorie);

      // COLORER LE BOUTON CLIQUE ET DECOLORER LES AUTRES
      clickedButton(bouton);
      // VIDER LA GALERIE EXISTANTE
      const gallery = document.querySelector(".gallery");
      gallery.innerHTML = "";
      // AFFICHER LES TRAVAUX FILTRES
      creationDesImages(travauxFiltres);
    });
  });
}

// LOGIQUE POUR LA COLORATION DES BOUTONS
function clickedButton(bouton) {
  const elementAyantDejaLaClasse = document.querySelector(".clickedButton");
  if (elementAyantDejaLaClasse) {
    elementAyantDejaLaClasse.classList.remove("clickedButton");
  }
  bouton.classList.add("clickedButton");
}

// LANCER LES FILTRES
async function lancerLesFiltres() {
  const recupDonnees = await recuperationDesDonneesFiltres();
  creationDesFiltres(recupDonnees);
  trier();
}

// APPELER LA FONCTION UNIQUEMENT QUAND LE DOCUMENT EST CHARGE
document.addEventListener("DOMContentLoaded", lancerLesFiltres);
