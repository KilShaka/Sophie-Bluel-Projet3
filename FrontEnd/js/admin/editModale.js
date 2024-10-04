import {
  creationDesImages,
  recuperationDesDonnees,
  recupererEtAfficherTravaux,
} from "../works.js";
import { deleteWork } from "../admin/deleteWork.js";
import { lectureInput } from "../admin/inputFile.js";
import { recuperationDesDonneesFiltres } from "../filtres.js";
import { setupAddWorkForm } from "../admin/addWork.js";

const main = document.querySelector("main");

document.addEventListener("DOMContentLoaded", () => {
  const boutonModifier = document.querySelector(".boutonModifier");

  if (boutonModifier) {
    boutonModifier.addEventListener("click", async () => {
      // ON CREE LA STRUCTURE DE LA MODALE
      const modale = document.createElement("aside");
      const modaleWrapper = document.createElement("div");

      modaleWrapper.classList.add("modale-wrapper");
      modale.classList.add("modale");
      modale.setAttribute("role", "dialog");
      modale.setAttribute("aria-modal", "true");
      modale.setAttribute("aria-labelledby", "titreModale");

      modale.appendChild(modaleWrapper);
      main.appendChild(modale);

      // GESTION DES FERMETURES
      function closeModale() {
        main.removeChild(modale);
      }

      // FERMETURE AU CLIC SUR LOVERLAY
      modale.addEventListener("click", (e) => {
        if (e.target === modale) {
          closeModale();
        }
      });

      // AFFICHER LA GALERIE
      async function afficherGallerie() {
        modaleWrapper.innerHTML = `
          <i class="fa-solid fa-xmark fa-xl" style="color: #000000;" id="croix"></i>
          <div class="gallery-container">
            <h2 id="titreModale">Galerie photo</h2>
            <div class="gallery"></div>
            <div class="line"></div>
            <button class="ajouter-photo">Ajouter une photo</button>
          </div>
        `;

        const modaleGallery = modaleWrapper.querySelector(".gallery");
        modaleGallery.classList.add("modale-gallery");

        // AFFICHAGE DES TRAVAUX
        const travaux = await recuperationDesDonnees();
        creationDesImages(travaux, modaleGallery, {
          avecfigcaption: false,
          avecAnimation: false,
          avecIcones: true,
        });

        // FERMETURE AU CLIC SUR LA CROIX
        const croix = document.getElementById("croix");
        croix.addEventListener("click", () => {
          closeModale();
        });

        // SUPPRESSION DES TRAVAUX
        modaleGallery.addEventListener("click", async (e) => {
          const iconBackground = e.target.closest(".iconBackground");
          if (iconBackground) {
            const deleteIcon = iconBackground.querySelector(".delete-icon");
            const imageId = deleteIcon.getAttribute("data-id");
            console.log("Image ID to delete:", imageId);

            const suppressionReussie = await deleteWork(imageId);
            if (suppressionReussie) {
              iconBackground.closest("figure").remove();
              const mainGallery = document.querySelector(".gallery");
              await recupererEtAfficherTravaux(mainGallery);
            }
          }
        });

        // BOUTON AJOUTER UNE PHOTO
        const ajouterBtn = modaleWrapper.querySelector(".ajouter-photo");
        ajouterBtn.addEventListener("click", () => {
          afficherAjoutPhoto();
        });
      }

      // MODALE "AJOUT PHOTO"
      async function afficherAjoutPhoto() {
        modaleWrapper.innerHTML = `
          <div class="icon-container">
            <i class="fa-solid fa-arrow-left" style="color: #000000;" id="fleche"></i>
            <i class="fa-solid fa-xmark fa-xl" style="color: #000000;" id="croix"></i>
          </div>
          <div class="gallery-container">
            <h2 id="titreModale">Ajout photo</h2>
            <button id="ajouter-photo">
              <i class="fa-regular fa-image fa-2xl" style="color: #cbd6dc;"></i>
              <input type="file">
              <img id="imagePreview" src="#" alt="Aperçu de l'image" style="display: none">
              <p id="ajouter-photo-txt">+ Ajouter photo</p>
              <p id="ajouter-photo-JpgPng">jpg, png : 4mo max</p>
            </button>
            <label>Titre</label>
            <input type="text" id="input-titre">
            <label>Catégorie</label>
            <div class="select-container">
              <select class="select-option"></select>
              <i class="fa-solid fa-chevron-down" style="color: #6c6c6c;"></i>
            </div>
            <div class="line ajoutPhoto-line"></div>
            <button id="ajoutPhoto-btn">Valider</button>
          </div>
        `;

        // FERMETURE AU CLIC SUR LA CROIX
        const croix = document.getElementById("croix");
        croix.addEventListener("click", () => {
          closeModale();
        });

        // RETOUR A LA GALERIE
        const fleche = document.querySelector(".fa-arrow-left");
        fleche.addEventListener("click", () => {
          afficherGallerie();
        });
        // LOGIQUE DE PREVISUALISATION DES IMAGES
        lectureInput();

        // CHARGEMENT DES CATEGORIES
        const selectOption = document.querySelector(".select-option");
        try {
          const categoriesData = await recuperationDesDonneesFiltres();
          creationDesCategories(categoriesData, selectOption);
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des catégories:",
            error
          );
        }
        // CONFIGURATION DU FORMULAIRE D'AJOUT
        setupAddWorkForm();
      }

      // FONCTION POUR CREER LES CATEGORIES (OPTIONS) DU MENU SELECT
      function creationDesCategories(tableau, selectElement) {
        // ON CREE DABORD UNE OPTION VIDE
        const optionVide = document.createElement("option");
        optionVide.value = "";
        optionVide.textContent = "";
        //ON REND L'OPTION DEFINIE PAR DEFAUT ET NON SELECTIONNABLE
        optionVide.selected = true;
        optionVide.disabled = true;

        selectElement.appendChild(optionVide);

        tableau.forEach((categorie) => {
          // CREATION DES ELEMENTS CONSTITUANTS CHAQUE OPTION
          const option = document.createElement("option");
          // ATTRIBUTION DE LA VALEUR A CHAQUE VARIABLE CREEE
          option.value = categorie.id;
          option.textContent = categorie.name;
          // ON RATTACHE L'OPTION AU SELECT
          selectElement.appendChild(option);
        });
      }
      // AFFICHER GALERIE
      afficherGallerie();
    });
  } else {
    console.log("Le bouton modifier n'existe pas encore");
  }
});
