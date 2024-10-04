import { recupererEtAfficherTravaux } from "../works.js";

const monToken = sessionStorage.getItem("token");

// FONCTION D'AJOUT DES TRAVAUX
export async function addWork(formData) {
  try {
    const response = await fetch("http://localhost:5678/api/works/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${monToken}`,
      },
      body: formData,
    });

    if (response.ok) {
      console.log("Élément ajouté avec succès");
      // MISE A JOUR DE LA GALERIE
      const mainGallery = document.querySelector(".gallery");
      await recupererEtAfficherTravaux(mainGallery);
      return true;
    } else {
      console.error("Erreur lors de l'ajout", response.status);
      return false;
    }
  } catch (error) {
    console.error("Erreur réseau ou serveur", error);
    return false;
  }
}

// LOGIQUE DU FORMULAIRE COMPLET
export function setupAddWorkForm() {
  const inputTitre = document.getElementById("input-titre");
  const inputFile = document.querySelector('input[type="file"]');
  const ajouterBtn = document.getElementById("ajoutPhoto-btn");
  const selectCategorie = document.querySelector(".select-option");

  function activerBouton() {
    if (
      inputTitre.value.trim() !== "" &&
      inputFile.files.length > 0 &&
      selectCategorie.value !== ""
    ) {
      ajouterBtn.style.backgroundColor = "#1D6154";
      ajouterBtn.style.cursor = "pointer";
      ajouterBtn.disabled = false;
    } else {
      ajouterBtn.style.backgroundColor = "#A7A7A7";
      ajouterBtn.disabled = true;
    }
  }

  inputTitre.addEventListener("input", activerBouton);
  inputFile.addEventListener("change", activerBouton);
  selectCategorie.addEventListener("change", activerBouton);

  ajouterBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    // LOGIQUE SI LE BOUTON AJOUTER EST ACTIF
    if (!ajouterBtn.disabled) {
      // CREATION DU FORMDATA
      const formData = new FormData();
      formData.append("title", inputTitre.value);
      formData.append("image", inputFile.files[0]);
      formData.append("category", selectCategorie.value);

      try {
        await addWork(formData);
        // ON NETTOIE LE FORMULAIRE APRES L'AJOUT
        inputTitre.value = "";
        inputFile.value = "";
        selectCategorie.value = "";
        document.getElementById("imagePreview").style.display = "none";
        activerBouton();

        // REDIRIGER SUR LA PAGE ADMIN
        const main = document.querySelector("main");
        const modale = document.querySelector(".modale");
        main.removeChild(modale);
      } catch (error) {
        console.error("Erreur lors de l'ajout du travail", error);
      }
    }
  });

  // INITIALISER L'ETAT DU BOUTON
  activerBouton();
}
