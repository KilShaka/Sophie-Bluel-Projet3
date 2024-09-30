// RECUPERER LES DONNEES (WORKS)
export async function recuperationDesDonnees() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    const ERROR_MESSAGE =
      "LA REPONSE POUR LA RECUPERATION DES TRAVAUX DE SOPHIE N'EST PAS OK";
    if (!response.ok) {
      throw new Error(ERROR_MESSAGE);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      "IMPOSSIBLE DE SE CONNECTER AUX TRAVAUX DE SOPHIE, fetching KO",
      error
    );
    return [];
  }
}

//UTILISER LES DONNEES POUR CREER LES ELEMENTS
export function creationDesImages(
  tableau,
  container = document.querySelector(".gallery"),
  options = {}
) {
  const {
    avecfigcaption = true,
    avecAnimation = true,
    avecIcones = false,
  } = options;
  // SELECTION DE LA CLASSE GALLERIE
  // const gallery = document.querySelector(".gallery");

  container.innerHTML = "";

  //   UTILISATION DE FOREACH POUR ITERER SUR CHAQUE ELEMENT DU TABLEAU
  tableau.forEach((img, index) => {
    // CREATION DES ELEMENTS CONSTITUANTS CHAQUE IMAGE
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    // ATTRIBUTION DE LA VALEUR A CHAQUE VARIABLE CREEE
    image.src = img.imageUrl;
    image.alt = img.title;
    figure.appendChild(image);

    if (avecfigcaption) {
      const figcaption = document.createElement("figcaption");
      figcaption.textContent = img.title;
      figure.appendChild(figcaption);
    }
    if (avecIcones) {
      const iconBackground = document.createElement("div");
      iconBackground.classList.add("iconBackground");

      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add(
        "fa-solid",
        "fa-trash-can",
        "fa-sm",
        "delete-icon"
      );
      deleteIcon.setAttribute("data-id", img.id);
      deleteIcon.setAttribute("style", "color: #fcfcfc;");
      iconBackground.appendChild(deleteIcon);
      figure.appendChild(iconBackground);
    }

    container.appendChild(figure);

    if (avecAnimation) {
      // AJOUT D'UN MINUTEUR POUR AJOUTER LA CLASSE VISIBLE AUX TRAVAUX AU FUR ET A MESURE
      setTimeout(() => {
        figure.classList.add("visible");
      }, index * 100); // 100ms de délai pour chaque travail
    }
  });
}

// POUR LA PARTIE MODALE
export async function recupererEtAfficherTravaux(
  container = document.querySelector(".gallery")
) {
  const recupDonnees = await recuperationDesDonnees();
  creationDesImages(recupDonnees, container);
}

// LANCER LA GALLERIE
async function lancerLaGalerie() {
  const recupDonnees = await recuperationDesDonnees();
  creationDesImages(recupDonnees);
}

// APPELER LA FONCTION UNIQUEMENT QUAND LE DOCUMENT EST CHARGE
document.addEventListener("DOMContentLoaded", lancerLaGalerie);
