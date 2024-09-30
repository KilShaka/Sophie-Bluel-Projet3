const monToken = sessionStorage.getItem("token");

export async function deleteWork(id) {
  try {
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${monToken}`,
      },
    });

    if (response.ok) {
      console.log("Élément supprimé avec succès");
      return true;
    } else {
      console.error("Erreur lors de la suppression", response.status);
      return false;
    }
  } catch (error) {
    console.error("Erreur réseau ou serveur", error);
    return false;
  }
}
