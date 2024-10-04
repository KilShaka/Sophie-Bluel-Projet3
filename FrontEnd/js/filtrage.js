// FONCTION FILTRER TRAVAUX

export function filtrerTravaux(travaux, categorie) {
  if (categorie === "Tous") {
    return travaux;
  }
  const travauxFiltres = travaux.filter((travail) => {
    return travail.category.name === categorie;
  });
  return travauxFiltres;
}
