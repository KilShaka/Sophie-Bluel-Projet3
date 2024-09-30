import {
  creationDesImages,
  recuperationDesDonnees,
  recupererEtAfficherTravaux,
} from "../works.js";
import { deleteWork } from "../admin/deleteWork.js";

const main = document.querySelector("main");
// AJOUT D'UN EVENTLISTENER POUR S'ASSURER QUE LE DOM EST BIEN CHARGE ET QUE LE BOUTON EXISTE
document.addEventListener("DOMContentLoaded", () => {
  const boutonModifier = document.querySelector(".boutonModifier");

  // SI LE BOUTON MODIFIER EXISTE BIEN ON LUI AJOUTE SON EVENT LISTENER
  if (boutonModifier) {
    boutonModifier.addEventListener("click", async () => {
      // ON CREE NOS BOITES
      const modale = document.createElement("aside");
      const modaleWrapper = document.createElement("div");

      //   ON LEUR RATTACHE UNE CLASSE ET DES ATTRIBUTS
      modaleWrapper.classList.add("modale-wrapper");
      modale.classList.add("modale");
      modale.setAttribute("role", "dialog");
      modale.setAttribute("aria-modal", "true");
      modale.setAttribute("aria-labelledby", "titreModale");
      // ON AJOUTE LE CONTENU DE LA MODALE
      modaleWrapper.innerHTML = `

      <i class="fa-solid fa-xmark fa-xl" style="color: #000000;" id="croix"></i>
      <div class="gallery-container">
      <h2 id="titreModale">Galerie Photo</h2>
      <div class="gallery"></div>
      <div class="line"></div>
      <button> Ajouter une photo</button>
      </div>
      `;

      // ON RATTACHE LES ENFANTS

      modale.appendChild(modaleWrapper);
      main.appendChild(modale);

      // ON CIBLE UNIQUEMENT LA GALERIE DE LA MODALE
      const modaleGallery = modaleWrapper.querySelector(".gallery");
      modaleGallery.classList.add("modale-gallery");

      // ON RECUPERE LES DONNEES
      const travaux = await recuperationDesDonnees();

      // ON RECUPERE ET ON AFFICHE LES TRAVVAUX DANS LA GALERIE DE LA MODALE
      creationDesImages(travaux, modaleGallery, {
        avecfigcaption: false,
        avecAnimation: false,
        avecIcones: true,
      });

      // FONCTIONS DE FERMETURE
      // ON CREE UNE FONCTION DE CLOTURE DE LA MODALE
      function closeModale() {
        main.removeChild(modale);
      }
      // FERMER AU CLICK SUR L'OVERLAY
      modale.addEventListener("click", (e) => {
        if (e.target === modale) {
          closeModale();
        }
      });

      // FERMER AU CLICK SUR LA CROIX (ON DECLARE MAINTENANT LA CROIX CAR AVANT ELLE N'EXISTE PAS ENCORE)
      const croix = document.getElementById("croix");
      croix.addEventListener("click", () => {
        closeModale();
      });

      // SUPPRESSION DES TRAVAUX
      modaleGallery.addEventListener("click", async (e) => {
        // CLOSEST() = CHERCHE LE PREMIER ANCETRE D'UN ELEMENT, EN COMMENCANT PAR LUI MEME
        const iconBackground = e.target.closest(".iconBackground");
        if (iconBackground) {
          const deleteIcon = iconBackground.querySelector(".delete-icon");
          const imageId = deleteIcon.getAttribute("data-id");
          console.log("Image ID to delete:", imageId);

          const suppressionReussie = await deleteWork(imageId);
          if (suppressionReussie) {
            // Mettre à jour la galerie dans la modale
            iconBackground.closest("figure").remove();

            // Mettre à jour la galerie sur la page d'accueil
            const mainGallery = document.querySelector(".gallery");
            await recupererEtAfficherTravaux(mainGallery);
          }
        }
      });
    });
  } else {
    console.log("Le bouton modifier n'existe pas encore");
  }
});
