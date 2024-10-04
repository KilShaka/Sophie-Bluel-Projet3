// ON RECUPERE LES INFOS NOTES PAR L'UTILISATEUR

const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const submitButton = document.getElementById("submit-btn");
const popupError = document.querySelector(".popup-error");
const popupErrorBtn = document.getElementById("popup-error__btn");
const body = document.querySelector("body");
const formatMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// EVENT LISTENER
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  // ON REINITIALISE LES CLASSES D'ERREUR
  emailInput.classList.remove("input-error");
  passwordInput.classList.remove("input-error");

  // LOGIQUE POUR VERIFIER LA VALIDITE DES INPUTS DU FORMULAIRE
  let enErreur = false;

  // VALIDITE DU MAIL
  if (emailInput.value.trim() === "" || !formatMail.test(emailInput.value)) {
    emailInput.classList.add("input-error");
    enErreur = true;
  }
  // VALIDITE DU MDP
  if (passwordInput.value.trim() === "") {
    passwordInput.classList.add("input-error");
    enErreur = true;
  }

  // ON ARRETE LE CODE SI UN INPUT EST EN ERREUR
  if (enErreur) {
    return;
  }

  // ON CREE UN OBJET CONTENANT LES INFOS UTILISATEUR
  const infosUtilisateur = {
    email: emailInput.value,
    password: passwordInput.value,
  };
  // NETTOYAGE DES INPUTS
  emailInput.value = "";
  passwordInput.value = "";

  //   MAINTENANT QU'ON A LES INFOS UTILISATEURS ON LES COMPARE AVEC CE QUI EST STOCKE EN DATABASE
  async function connexionUtilisateur() {
    try {
      const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(infosUtilisateur),
      });
      const data = await response.json();
      if (data.token) {
        sessionStorage.setItem("token", data.token);
        window.location.href = "index.html";
      } else {
        body.classList.add("assombrir");
        popupError.classList.add("visible");
      }
    } catch (error) {
      console.error("Error", error);
    }
  }
  connexionUtilisateur();

  //   GESTION DU BOUTON FERMER DU POP UP
  popupErrorBtn.addEventListener("click", () => {
    popupError.classList.remove("visible");
    body.classList.remove("assombrir");
  });
});
