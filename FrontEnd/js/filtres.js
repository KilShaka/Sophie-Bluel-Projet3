// IMPORT DES FONCTIONS UTILES POUR LE FILTRAGE
import { creationDesImages, recuperationDesDonnees } from "./works.js";
import { filtrerTravaux } from "./filtrage.js";

// RECUPERER LES DONNEES (CATEGORIES DE FILTRES)

async function recuperationDesDonneesFiltres() {
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
  // CREATION DU BOUTON "TOUS" QUI N'EST PAS PRESENT SUR L'API
  const boutonTous = document.createElement("div");
  boutonTous.textContent = "Tous";
  boutonTous.classList.add("filtres__btn", "filtres__btn--tous");
  // ON RATTACHE LE BOUTON TOUS A FILTRES AVANT LA BOUCLE FOREACH
  filtres.appendChild(boutonTous);

  //   UTILISATION DE FOREACH POUR ITERER SUR CHAQUE ELEMENT DU TABLEAU
  tableau.forEach((filtre) => {
    // CREATION DES ELEMENTS CONSTITUANTS CHAQUE IMAGE
    const div = document.createElement("div");
    // ATTRIBUTION DE LA VALEUR A CHAQUE VARIABLE CREEE
    div.textContent = filtre.name;
    div.classList.add("filtres__btn");
    // ON RATTACHE LE TOUT A LA BALISE FIGURE

    // ----> RIEN A RATTACHER

    // ON RATTACHE LE TOUT A LA GALLERIE
    filtres.appendChild(div);
  });
}

function trier() {
  const boutonFiltre = document.querySelectorAll(".filtres__btn");
  // Tableau a remplir par les récupérations API
  let travaux = [];
  // Ajout d'un evenement au clic sur tous les boutons
  boutonFiltre.forEach((bouton) => {
    bouton.addEventListener("click", async () => {
      const categorie = bouton.textContent;
      // SI MON TABLEAU TRAVAUX EST VIDE = LE REMPLI AVEC TOUTES LES DONNEES
      if (travaux.length === 0) {
        travaux = await recuperationDesDonnees();
      }
      // J'UTILISE MA FONCTION FILTRE IMPORTEE POUR FILTRER SELON LA CATEGORIE CLIQUEE
      const travauxFiltres = filtrerTravaux(travaux, categorie);

      // VIDER LA GALLERIE EXISTANTE
      const gallery = document.querySelector(".gallery");
      gallery.innerHTML = "";
      // AFFICHER LES TRAVAUX FILTRES
      creationDesImages(travauxFiltres);
    });
  });
}

// LANCER LES FILTRES
async function lancerLesFiltres() {
  const recupDonnees = await recuperationDesDonneesFiltres();
  creationDesFiltres(recupDonnees);
  trier();
}

// APPELER LA FONCTION UNIQUEMENT QUAND LE DOCUMENT EST CHARGE
document.addEventListener("DOMContentLoaded", lancerLesFiltres);
