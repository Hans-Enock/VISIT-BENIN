
const donneesGuides = {
  'adjovi-kossi': {
    nom: 'Adjovi Kossi',
    specialite: 'Histoire & Culture',
    experience: '10 ans',
    langues: 'FR, EN, Fon',
    destinations: ['musee-kaba', 'palais-abomey', 'temple-pythons'],
  },
  'fatoumata-dossou': {
    nom: 'Fatoumata Dossou',
    specialite: 'Nature & Safari',
    experience: '6 ans',
    langues: 'FR, Fon, Bariba',
    destinations: ['parc-pendjari', 'chutes-tanougou'],
  },
  'togbui-messan': {
    nom: 'Togbui Messan',
    specialite: 'Artisanat & Vaudou',
    experience: '15 ans',
    langues: 'FR, EN, Fon, Yoruba',
    destinations: ['temple-pythons', 'palais-abomey', 'musee-kaba'],
  },
  'abibou-zannou': {
    nom: 'Abibou Zannou',
    specialite: 'Écotourisme & Randonnée',
    experience: '8 ans',
    langues: 'FR, EN, Ditammari',
    destinations: ['tata-somba', 'chutes-tanougou', 'parc-pendjari'],
  },
};


let guideSelectionne = null;




const cartesGuides = document.querySelectorAll('.guide-carte');
const champDestination = document.getElementById('champ-destination');
const champMessage = document.getElementById('champ-message');

cartesGuides.forEach((carte) => {
  carte.addEventListener('click', () => {
    const identifiant = carte.dataset.id;
    const guide = donneesGuides[identifiant];
    if (!guide) return;

    // Désélectionner toutes les cartes
    cartesGuides.forEach((c) => c.classList.remove('selectionne'));

    // Sélectionner celle cliquée
    carte.classList.add('selectionne');
    guideSelectionne = identifiant;

    // Pré-remplir le message avec le nom du guide
    if (champMessage && !champMessage.value) {
      champMessage.value =
        `Bonjour ${guide.nom},\n\nJe souhaite réserver vos services de guide pour mon voyage au Bénin.\n\nMerci de me recontacter.`;
    }

    // Faire défiler vers le formulaire sur mobile
    if (window.innerWidth <= 820) {
      document.getElementById('formulaire-contact').scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});




function preselectDepuisUrl() {
  const params = new URLSearchParams(window.location.search);
  const destinationParam = params.get('destination');
  const guideParam = params.get('guide');

  // Pré-remplir la destination si passée en paramètre
  if (destinationParam && champDestination) {
    champDestination.value = destinationParam;
  }

  // Pré-sélectionner le guide si passé en paramètre
  if (guideParam) {
    const carteCorrespondante = document.querySelector(
      `.guide-carte[data-id="${guideParam}"]`
    );
    if (carteCorrespondante) {
      carteCorrespondante.click();
    }
  }
}

preselectDepuisUrl();



const boutonEnvoyer = document.getElementById('bouton-envoyer-demande');
const messageConfirmation = document.getElementById('guide-confirmation');

function validerFormulaire() {
  const nom         = document.getElementById('champ-nom').value.trim();
  const email       = document.getElementById('champ-email').value.trim();
  const destination = document.getElementById('champ-destination').value;
  const message     = document.getElementById('champ-message').value.trim();

  const erreurs = [];

  if (!nom) erreurs.push('Veuillez entrer votre nom complet.');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    erreurs.push('Veuillez entrer un email valide.');
  }
  if (!destination) erreurs.push('Veuillez choisir une destination.');
  if (!message) erreurs.push('Veuillez écrire un message.');

  return erreurs;
}

function afficherErreurChamp(champId, message) {
  const champ = document.getElementById(champId);
  champ.style.borderColor = '#e74c3c';

  // Remettre la couleur normale au focus
  champ.addEventListener('focus', () => {
    champ.style.borderColor = '';
  }, { once: true });
}

boutonEnvoyer.addEventListener('click', () => {
  const erreurs = validerFormulaire();

  if (erreurs.length > 0) {
    // Mettre en rouge les champs vides
    if (!document.getElementById('champ-nom').value.trim()) {
      afficherErreurChamp('champ-nom');
    }
    if (!document.getElementById('champ-email').value.trim()) {
      afficherErreurChamp('champ-email');
    }
    if (!document.getElementById('champ-destination').value) {
      afficherErreurChamp('champ-destination');
    }
    if (!document.getElementById('champ-message').value.trim()) {
      afficherErreurChamp('champ-message');
    }
    return;
  }

  // Simuler l'envoi
  boutonEnvoyer.textContent = 'Envoi en cours...';
  boutonEnvoyer.disabled = true;
  boutonEnvoyer.style.opacity = '0.7';

  setTimeout(() => {
    // Afficher la confirmation
    messageConfirmation.classList.add('visible');
    boutonEnvoyer.textContent = 'Demande envoyée ✔';
    boutonEnvoyer.style.background = 'var(--vert-fonce)';

    // Faire défiler vers la confirmation
    messageConfirmation.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 1200);
});


const boutonCta = document.querySelector('.detail-cta-bouton');
if (boutonCta) {
  const params = new URLSearchParams(window.location.search);
  const idDestination = params.get('id');
  if (idDestination) {
    boutonCta.href = `guide.html?destination=${idDestination}`;
  }
}
