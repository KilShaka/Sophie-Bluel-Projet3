// RECUPERER LES DONNEES (WORKS)
export async function recuperationDesDonnees() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    const ERROR_MESSAGE =
      "LA REPONSE POUR LA RECUPERATION DES TRAVAUX DE SOPHIE N'EST PAS OK";
    if (!response.ok) {
      throw new Error(ERROR_MESSAGE);
    }
    // console.log("Réponse bien reçue");

    const data = await response.json();
    // console.log("Données récupérée et convertie en json");
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
export function creationDesImages(tableau) {
  // SELECTION DE LA CLASSE GALLERIE
  const gallery = document.querySelector(".gallery");

  //   UTILISATION DE FOREACH POUR ITERER SUR CHAQUE ELEMENT DU TABLEAU
  tableau.forEach((img, index) => {
    // CREATION DES ELEMENTS CONSTITUANTS CHAQUE IMAGE
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    // ATTRIBUTION DE LA VALEUR A CHAQUE VARIABLE CREEE
    image.src = img.imageUrl;
    image.alt = img.title;
    figcaption.textContent = img.title;
    // ON RATTACHE LE TOUT A LA BALISE FIGURE
    figure.appendChild(image);
    figure.appendChild(figcaption);
    // ON RATTACHE LE TOUT A LA GALLERIE
    gallery.appendChild(figure);

    // AJOUT D'UN MINUTEUR POUR AJOUTER LA CLASSE VISIBLE AUX TRAVAUX AU FUR ET A MESURE
    setTimeout(() => {
      figure.classList.add("visible");
    }, index * 100); // 100ms de délai pour chaque travail
  });
}

// LANCER LA GALLERIE
async function lancerLaGalerie() {
  const recupDonnees = await recuperationDesDonnees();
  creationDesImages(recupDonnees);
}

// APPELER LA FONCTION UNIQUEMENT QUAND LE DOCUMENT EST CHARGE
document.addEventListener("DOMContentLoaded", lancerLaGalerie);
