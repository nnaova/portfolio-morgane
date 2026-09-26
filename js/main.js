// Animation d'apparition : les éléments marqués [data-reveal] dans le HTML
// deviennent visibles (classe .is-visible) quand ils entrent à l'écran,
// et se cachent à nouveau quand ils en sortent. Le style est dans css/style.css.

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    entry.target.classList.toggle('is-visible', entry.isIntersecting);
  }
});

document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));


// Bandeaux défilants : l'animation CSS décale la bande de la moitié de sa
// largeur. Pour que la boucle soit continue, on répète d'abord le contenu
// jusqu'à ce qu'il soit plus large que l'écran, puis on double le tout.
// Dans le HTML, chaque image n'est donc écrite qu'une seule fois.

function cloneInto(track, items) {
  for (const item of items) {
    const copy = item.cloneNode(true);
    copy.setAttribute('aria-hidden', 'true');
    track.append(copy);
  }
}

document.querySelectorAll('.marquee__track').forEach((track) => {
  const originals = [...track.children];
  const visibleWidth = track.parentElement.clientWidth;
  while (track.scrollWidth < visibleWidth) {
    cloneInto(track, originals);
  }
  cloneInto(track, [...track.children]);
});


// Vidéos : elles ne se lancent que lorsqu'elles sont à l'écran, pour éviter
// de toutes les télécharger et les lire en même temps.

const videoObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.play().catch(() => {});
    } else {
      entry.target.pause();
    }
  }
});

document.querySelectorAll('video').forEach((video) => videoObserver.observe(video));



// Menu : le bouton « Menu » (mobile) et la flèche à côté de « Galerie »
// ouvrent ou ferment leur liste (attribut aria-expanded, lu par le CSS).
// Un clic ailleurs sur la page, sur un lien du menu, ou la touche Échap
// referme tout.

const menuButtons = document.querySelectorAll('.site-nav__toggle, .submenu-toggle');

function setOpen(button, open) {
  button.setAttribute('aria-expanded', String(open));
  if (button.classList.contains('site-nav__toggle')) {
    button.textContent = open ? 'Fermer' : 'Menu';
  }
}

function closeMenus() {
  menuButtons.forEach((button) => setOpen(button, false));
}

menuButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setOpen(button, button.getAttribute('aria-expanded') !== 'true');
  });
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-nav') || event.target.closest('.site-nav a')) closeMenus();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenus();
});

// Liste de la galerie : se referme quand on la quitte au clavier
document.querySelectorAll('.has-submenu').forEach((item) => {
  item.addEventListener('focusout', (event) => {
    if (!item.contains(event.relatedTarget)) setOpen(item.querySelector('.submenu-toggle'), false);
  });
});
