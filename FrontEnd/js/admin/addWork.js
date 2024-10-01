const monToken = sessionStorage.getItem("token");

export async function addWork(id) {
  try {
    const response = await fetch("http://localhost:5678/api/works/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${monToken}`,
      },
    });

    if (response.ok) {
      console.log("Élément ajouté avec succès");
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
