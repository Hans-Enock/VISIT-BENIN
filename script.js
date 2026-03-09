


const elementsApparition = document.querySelectorAll('.apparition');

const observateurDefilement = new IntersectionObserver(
  (entrees) => {
    entrees.forEach((entree) => {
      if (entree.isIntersecting) {
        entree.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12 }
);

elementsApparition.forEach((el) => observateurDefilement.observe(el));




const barreNavigation = document.getElementById('barre-navigation');
const liensNavigation = document.querySelectorAll('.nav-lien');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    barreNavigation.style.background = 'rgba(13, 79, 34, 0.99)';
    barreNavigation.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
  } else {
    barreNavigation.style.background = 'rgba(13, 79, 34, 0.96)';
    barreNavigation.style.boxShadow = 'none';
  }

  // Mise à jour du lien actif selon la section visible
  mettreAJourLienActif();
});



function mettreAJourLienActif() {
  const sections = document.querySelectorAll('section[id], div[id]');
  let sectionCourante = '';

  sections.forEach((section) => {
    const positionHaut = section.offsetTop - 100;
    if (window.scrollY >= positionHaut) {
      sectionCourante = section.getAttribute('id');
    }
  });

  liensNavigation.forEach((lien) => {
    lien.classList.remove('actif');
    const cible = lien.getAttribute('href').replace('#', '');
    if (cible === sectionCourante) {
      lien.classList.add('actif');
    }
  });
}




function animer_compteur(element, valeurFinale, duree = 1500) {
  let debut = 0;
  const estTexte = isNaN(parseInt(valeurFinale));
  if (estTexte) return;

  const valeurNumerique = parseInt(valeurFinale);
  const increment = valeurNumerique / (duree / 16);
  const suffixe = valeurFinale.replace(/[0-9]/g, '');

  const minuterie = setInterval(() => {
    debut += increment;
    if (debut >= valeurNumerique) {
      element.textContent = valeurNumerique + suffixe;
      clearInterval(minuterie);
    } else {
      element.textContent = Math.floor(debut) + suffixe;
    }
  }, 16);
}

// Observer la bande statistiques pour lancer les compteurs
const bandeStat = document.querySelector('.bande-statistiques');
let compteursLances = false;

const observateurCompteurs = new IntersectionObserver(
  (entrees) => {
    entrees.forEach((entree) => {
      if (entree.isIntersecting && !compteursLances) {
        compteursLances = true;
        animer_compteur(document.getElementById('stat-destinations'), '6');
        animer_compteur(document.getElementById('stat-unesco'), '3');
        animer_compteur(document.getElementById('stat-histoire'), '400+');
      }
    });
  },
  { threshold: 0.5 }
);

if (bandeStat) {
  observateurCompteurs.observe(bandeStat);
}




document.querySelectorAll('a[href^="#"]').forEach((lien) => {
  lien.addEventListener('click', (evenement) => {
    const cible = document.querySelector(lien.getAttribute('href'));
    if (cible) {
      evenement.preventDefault();
      const decalage = barreNavigation.offsetHeight;
      const positionCible = cible.getBoundingClientRect().top + window.scrollY - decalage;
      window.scrollTo({ top: positionCible, behavior: 'smooth' });
    }
  });
});

const champRecherche = document.getElementById('champ-recherche');
const boutonRechercher = document.getElementById('bouton-rechercher');

if (champRecherche) {
  const toutesLesCartes = document.querySelectorAll('.carte-selection');

  function filtrerDestinations(terme) {
    const termeMaj = terme.toLowerCase().trim();
    toutesLesCartes.forEach((carte) => {
      const nom       = carte.querySelector('.carte-selection-nom')?.textContent.toLowerCase() || '';
      const lieu      = carte.querySelector('.carte-selection-lieu')?.textContent.toLowerCase() || '';
      const badge     = carte.querySelector('.carte-selection-badge')?.textContent.toLowerCase() || '';
      const correspond = !termeMaj || nom.includes(termeMaj) || lieu.includes(termeMaj) || badge.includes(termeMaj);

      carte.style.transition = 'opacity 0.3s';
      carte.style.opacity = correspond ? '1' : '0.2';
    });
  }

  champRecherche.addEventListener('input', (e) => filtrerDestinations(e.target.value));
  boutonRechercher?.addEventListener('click', () => filtrerDestinations(champRecherche.value));
  champRecherche.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') filtrerDestinations(champRecherche.value);
  });
}

// ── BOUTON CHARGER PLUS ───
const boutonChargerPlus = document.getElementById('bouton-charger-plus');

if (boutonChargerPlus) {
  let dejaCharge = false;

  boutonChargerPlus.addEventListener('click', () => {
    if (dejaCharge) return;
    dejaCharge = true;
    boutonChargerPlus.textContent = 'TOUTES LES DESTINATIONS SONT AFFICHÉES';
    boutonChargerPlus.style.opacity = '0.5';
    boutonChargerPlus.style.cursor = 'default';
  });
}


// LES DESTINATIONS

const donneesDestinations = {
  'musee-kaba': {
    identifiant: 'musee-kaba',
    nom: 'Le Musée de Kaba',
    region: 'Atacora',
    localisation: '📍 Natitingou, Région Atacora',
    image: 'images/télécharger.jfif',
    periode: 'Octobre – Avril',
    coordonnees: '10.3° N, 1.3° E',
    apropos: 'Plongez au cœur de l\'histoire héroïque de Natitingou et découvrez le récit fascinant du chef Kabe, figure de proue de la résistance contre la colonisation française. Ce musée unique retrace avec émotion les grandes batailles et la vie quotidienne des peuples Bétammaribé.',
    histoire: 'Le Musée de Kaba a été fondé pour perpétuer la mémoire des résistants de l\'Atacora. Ses collections comprennent des armes traditionnelles, des objets rituels et des documents historiques témoignant de la lutte pour la liberté. Chaque salle raconte un chapitre différent de cette épopée, offrant aux visiteurs une immersion totale dans l\'histoire du nord-ouest du Bénin.',
    pointsForts: ['Collections historiques uniques', 'Reconstitutions de batailles', 'Objets rituels Bétammaribé', 'Guides locaux passionnés', 'Vue panoramique sur Natitingou'],
   video: 'vidéos/MUSÉE KABA 🇧🇯-.mp4',
  videoPoster: 'images/télécharger.jfif'
  },
  'chutes-tanougou': {
    identifiant: 'chutes-tanougou',
    nom: 'Les Chutes de Tanougou',
    region: 'Atacora',
    localisation: '📍 Tanougou, Région Atacora',
    image: 'images/KOTA FALLS _ Natitingou, Benin _ Places To Visit _.jfif',
    periode: 'Toute l\'année',
    coordonnees: '11.1° N, 1.5° E',
    apropos: 'Cascades spectaculaires nichées au cœur de l\'Atacora, les Chutes de Tanougou offrent des piscines naturelles cristallines dans un cadre de forêt tropicale paradisiaque. Un lieu de sérénité absolue où la nature règne en maître.',
    histoire: 'Les Chutes de Tanougou sont connues et vénérées par les communautés locales depuis des générations. Ces chutes à plusieurs niveaux plongent dans des bassins naturels entourés de rochers couverts de mousse et d\'une végétation luxuriante. Elles constituent un lieu de ressourcement spirituel autant que touristique, attirant chaque année des milliers de visiteurs émerveillés.',
    pointsForts: ['Piscines naturelles accessibles', 'Cadre forestier préservé', 'Faune et flore tropicales', 'Accessible toute l\'année', 'Idéal pour la randonnée'],
    video: 'vidéos/Chutes Tanougou.mp4',
    videoPoster:"images/KOTA FALLS _ Natitingou, Benin _ Places To Visit _.jfif"
  },
  'tata-somba': {
    identifiant: 'tata-somba',
    nom: 'Tata Somba',
    region: 'Atacora',
    localisation: '📍 Boukoumbà, Région Atacora',
    image: 'images/télécharger (1).jfif',
    periode: 'Novembre – Février',
    coordonnees: '10.2° N, 1.1° E',
    apropos: 'Maisons-châteaux traditionnelles du peuple Bétammaribé, les Tata Somba sont des chefs-d\'œuvre d\'architecture vernaculaire unique au monde, érigés dans les paysages accidentés du nord-ouest du Bénin. Ces habitations fortifiées à deux étages sont construites entièrement à la main.',
    histoire: 'Les Tata Somba, inscrites au patrimoine mondial de l\'UNESCO, sont bien plus que des habitations. Ces maisons-châteaux en terre crue à tourelles intègrent espaces de vie, greniers et étables sous un même toit. Elles témoignent du génie architectural du peuple Bétammaribé et de son harmonie avec l\'environnement montagneux de l\'Atacora.',
    pointsForts: ['Patrimoine mondial UNESCO', 'Architecture unique en terre', 'Maisons à deux étages vivantes', 'Culture Bétammaribé vivante', 'Paysages montagneux de l\'Atacora'],
    video:'vidéos/MUSÉE KABA 🇧🇯-.mp4' ,
    videoPoster:"images/télécharger (1).jfif"
  },
  'parc-pendjari': {
    identifiant: 'parc-pendjari',
    nom: 'Parc National de la Pendjari',
    region: 'Atacora',
    localisation: '📍 Natitingou, Région Atacora',
    image: 'images/Pendjari National Park_ UNESCO Biosphere Reserve in Africa.jfif',
    periode: 'Janvier – Avril',
    coordonnees: '11.5° N, 1.7° E',
    apropos: 'Le Parc National de la Pendjari est l\'une des dernières zones sauvages d\'Afrique de l\'Ouest encore intactes. Ce sanctuaire naturel abrite une faune exceptionnelle : lions, éléphants, buffles, hippopotames et des centaines d\'espèces d\'oiseaux.',
    histoire: 'Classé réserve de biosphère par l\'UNESCO, le Parc de la Pendjari couvre plus de 4 800 km² de savane, galeries forestières et zones humides. Créé en 1954, il est aujourd\'hui l\'un des parcs les mieux préservés d\'Afrique de l\'Ouest, géré en partenariat avec les communautés locales.',
    pointsForts: ['Réserve de biosphère UNESCO', 'Lions, éléphants et buffles', 'Safari photo exceptionnel', 'Plus de 300 espèces d\'oiseaux', 'Paysages de savane préservés'],
    video:'vidéos/À la découverte du Parc Pendjari - Un trésor naturel abritant une biodiversité exceptionnelle !.mp4' ,
    videoPoster:"images/Pendjari National Park_ UNESCO Biosphere Reserve in Africa.jfif"
  },
  'temple-pythons': {
    identifiant: 'temple-pythons',
    nom: 'Temple des Pythons',
    region: 'Atlantique',
    localisation: '📍 Ouidah, Région Atlantique',
    image: 'images/The Temple of Python in Ouidah.jfif',
    periode: 'Toute l\'année',
    coordonnees: '6.3° N, 2.1° E',
    apropos: 'Le Temple des Pythons à Ouidah n\'est pas seulement un site touristique, mais un véritable lieu de prières et de rituels sacrés où les dignitaires Vodoun viennent honorer les divinités. Des dizaines de pythons royaux y cohabitent librement avec les gardiens du temple.',
    histoire: 'Fondé au XVIIe siècle, le Temple des Pythons est au cœur de la spiritualité Vodoun de Ouidah. Le python Dangbé y est considéré comme une divinité protectrice de la ville. Les visiteurs peuvent tenir les serpents sacrés dans leurs mains, sous la supervision des prêtres.',
    pointsForts: ['Site sacré Vodoun authentique', 'Pythons royaux en liberté', 'Rituels et cérémonies traditionnels', 'Centre spirituel de Ouidah', 'Patrimoine culturel immatériel'],
    video:'' ,
    videoPoster:"images/The Temple of Python in Ouidah.jfif"
  },
  'palais-abomey': {
    identifiant: 'palais-abomey',
    nom: 'Palais Royaux d\'Abomey',
    region: 'Zou',
    localisation: '📍 Abomey, Région Zou',
    image: 'images/Benin, West Africa, Abomey, bas-reliefs at agoli-agbo former palace.jfif',
    periode: 'Novembre – Mai',
    coordonnees: '7.2° N, 1.9° E',
    apropos: 'Le site des Palais Royaux d\'Abomey s\'étend sur 47 hectares et regroupe les palais de dix souverains du Royaume du Dahomey qui se sont succédé entre 1625 et 1900. Inscrits au patrimoine mondial de l\'UNESCO, ces palais témoignent de la grandeur d\'un empire africain.',
    histoire: 'Le Royaume du Dahomey fut l\'un des plus puissants d\'Afrique de l\'Ouest. Ses souverains ont construit ces palais en terre crue ornés de bas-reliefs polychromes narrant les exploits de chaque règne. Classés au patrimoine mondial de l\'UNESCO en 1985, ils abritent aujourd\'hui un musée exceptionnel avec trônes, tuniques guerrières et objets royaux uniques.',
    pointsForts: ['Patrimoine mondial UNESCO depuis 1985', 'Bas-reliefs polychromes uniques', 'Musée historique royal', 'Trônes et regalia des rois', 'Architecture en terre crue préservée'],
    video: 'vidéos/MUSÉE KABA 🇧🇯-.mp4',
    videoPoster:"images/Benin, West Africa, Abomey, bas-reliefs at agoli-agbo former palace.jfif"
  },
};

const ordreDestinations = [
  'musee-kaba',
  'chutes-tanougou',
  'tata-somba',
  'parc-pendjari',
  'temple-pythons',
  'palais-abomey',
];

// Boutons "Explorer cette destination" (page accueil)
document.querySelectorAll('.carte-lien').forEach((lien, i) => {
  if (ordreDestinations[i]) {
    lien.href = `destination-detail.html?id=${ordreDestinations[i]}`;
  }
});

// Boutons "Découvrir →" (page destinations)
document.querySelectorAll('.bouton-decouvrir-carte').forEach((lien, i) => {
  if (ordreDestinations[i]) {
    lien.href = `destination-detail.html?id=${ordreDestinations[i]}`;
  }
});


function chargerPageDetail() {
  if (!document.getElementById('detail-titre')) return;

  const parametresUrl = new URLSearchParams(window.location.search);
  const identifiant = parametresUrl.get('id');
  const destination = donneesDestinations[identifiant];

  if (!destination) {
    window.location.href = 'destinations.html';
    return;
  }

  // Titre de l'onglet
  document.getElementById('titre-onglet').textContent =
    `${destination.nom} – Grow-Up Bénin`;

  // Héros
  const imageElement = document.getElementById('detail-image');
  imageElement.src = destination.image;
  imageElement.alt = destination.nom;
  document.getElementById('detail-badge-region').textContent =
    `RÉGION ${destination.region.toUpperCase()}`;
  document.getElementById('detail-titre').textContent = destination.nom;
  document.getElementById('detail-localisation').textContent = destination.localisation;

  // Contenu texte
  document.getElementById('detail-apropos').textContent = destination.apropos;
  document.getElementById('detail-histoire').textContent = destination.histoire;
  document.getElementById('detail-periode').textContent = destination.periode;
  document.getElementById('detail-coords').textContent = destination.coordonnees;

  // Points forts
  const listePoints = document.getElementById('detail-points-forts');
  destination.pointsForts.forEach((point) => {
    const li = document.createElement('li');
    li.textContent = point;
    listePoints.appendChild(li);
  });

// ─── Remplir la vidéo ───
const video = document.getElementById('detail-video');
if (video && destination.video) {
  video.querySelector('source').src = destination.video;
  video.poster = destination.videoPoster || '';
  video.load();
} else if (video) {
  video.closest('.detail-bloc-video').style.display = 'none';
}
  // 3 autres destinations aléatoires
  const autresDestinations = Object.values(donneesDestinations)
    .filter((d) => d.identifiant !== identifiant)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const grilleAutres = document.getElementById('detail-autres-grille');
  autresDestinations.forEach((autre) => {
    const carte = document.createElement('a');
    carte.href = `destination-detail.html?id=${autre.identifiant}`;
    carte.className = 'detail-autre-carte';
    carte.innerHTML = `
      <img src="${autre.image}" alt="${autre.nom}" />
      <div class="detail-autre-superpose"></div>
      <span class="detail-autre-badge">${autre.region}</span>
      <div class="detail-autre-infos">
        <div class="detail-autre-nom">${autre.nom}</div>
        <div class="detail-autre-lieu">${autre.localisation}</div>
      </div>
    `;
    grilleAutres.appendChild(carte);
  });

  // Relancer les animations
  document.querySelectorAll('.apparition').forEach((el) => {
    observateurDefilement.observe(el);
  });
}

chargerPageDetail();
