export function lectureInput() {
  const fileInput = document.querySelector('input[type="file"]');
  const imagePreview = document.getElementById("imagePreview");

  if (!fileInput) {
    console.error("Input file non trouvé");
    return;
  }

  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        console.error("Le fichier sélectionné n'est pas une image");
        return;
      }

      const reader = new FileReader();

      reader.onload = function (e) {
        if (imagePreview) {
          imagePreview.src = e.target.result;
          imagePreview.style.display = "block";
        } else {
          console.error(
            "L'élément de prévisualisation d'image n'a pas été trouvé"
          );
        }
      };

      reader.onerror = function (e) {
        console.error("Erreur lors de la lecture du fichier:", e.target.error);
      };

      reader.readAsDataURL(file);
    }
  });
}
