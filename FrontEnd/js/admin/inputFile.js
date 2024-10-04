// FONCTION POUR LIRE, VERIFIER L'INPUT + AFFICHER LA PREVISUALISATION D'IMAGE
export function lectureInput() {
  const fileInput = document.querySelector('input[type="file"]');
  const imagePreview = document.getElementById("imagePreview");

  // RETOUR D'ERREUR SI FILEINPUT N'EXISTE PAS
  if (!fileInput) {
    console.error("Input file non trouvé");
    return;
  }

  // EVENT LISTENER ACTIVÉ A LA SELECTION DE FICHIER VIA FILE INPUT
  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      // VERIFICATION DU FORMAT
      if (!file.type.startsWith("image/")) {
        console.error("Le fichier sélectionné n'est pas une image");
        return;
      }
      // UTILISATION DE FILE READER POUR LIRE LE CONTENU DU FICHIER
      const reader = new FileReader();

      // .ONLOAD POUR LANCER LA FONCTION QUAND LE FICHIER A FINI DE CHARGER
      reader.onload = function (e) {
        if (imagePreview) {
          imagePreview.src = e.target.result;
          imagePreview.style.display = "block";

          // ON RETIRE LES ELEMENT VISIBLES EN INPUT
          const txt = document.getElementById("ajouter-photo-txt");
          const jpgPng = document.getElementById("ajouter-photo-JpgPng");
          const iconePreview = document.querySelector(".fa-2xl");
          const ajoutPhoto = document.getElementById("ajouter-photo");

          ajoutPhoto.removeChild(txt);
          ajoutPhoto.removeChild(jpgPng);
          ajoutPhoto.removeChild(iconePreview);
        } else {
          console.error(
            "L'élément de prévisualisation d'image n'a pas été trouvé"
          );
        }
      };

      reader.onerror = function (e) {
        console.error("Erreur lors de la lecture du fichier:", e.target.error);
      };

      // .readAsDataURL = LI ET CONVERTI LE FICHIER EN URL ENCODÉ EN BASE64
      reader.readAsDataURL(file);
    }
  });
}
