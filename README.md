# Portfolio — Morgane Vautravers

Site statique en HTML/CSS, sans outil de build ni dépendance.
Reconstruit à partir du site Figma Sites (`tray-memory-22006462.figma.site`).

## Structure

```
index.html                  → accueil
stage.html                  → Stage (mène aux 3 pages suivantes)
  kit.html                  → Kits créatifs
  collection.html           → Création de collection
  montage-et-conception.html→ Montage
gouaches.html               → Gouachés
photos.html                 → Galerie photo + dessins sur photos
bijoux-perso.html           → Création de bijoux perso
design.html                 → Création et design digital
contact.html                → Contact (CV)
mentions-legales.html       → Mentions légales (à compléter)
confidentialite.html        → Politique de confidentialité

css/style.css               → toute la mise en forme (sections numérotées, sommaire en haut)
js/main.js                  → animations d'apparition, bandeaux défilants, lecture des vidéos,
                              menu, retour à la position de lecture après « Précédent »
assets/images/              → images, nommées par page (kit-…, collection-…, photo-…)
assets/videos/              → vidéos (MP4 H.264, sans son)
assets/fonts/               → police Inter
```

## Voir le site en local

```bash
python3 -m http.server 8000
```

Puis ouvrir http://localhost:8000. (Ouvrir directement `index.html` fonctionne aussi.)

## Modifier le site

**Un texte** : le chercher directement dans le fichier `.html` de la page.
Chaque section est précédée d'un commentaire (`<!-- ===== Galerie ===== -->`).

**Une image** : déposer le fichier dans `assets/images/` et changer le `src`.
Les dimensions reprennent celles de la maquette Figma ; elles se règlent dans
l'attribut `style` de l'image :

- `--ratio: 352 / 494` → proportions du cadre
- `--pos: 50% 20%` → point de cadrage (horizontal puis vertical)
- `--w: 243px` → largeur fixe (rangées d'images, visuels « is-fixed »)

**Espacements** : chaque bloc accepte `--pt` (espace au-dessus) et `--pb`
(espace en dessous), par exemple `style="--pt: 40px; --pb: 80px"`. Sans
réglage, le bloc prend la valeur la plus courante de la maquette.

**Blocs réutilisables** (copier-coller un bloc existant puis changer le contenu) :

| Bloc | Classe | Exemple dans |
|---|---|---|
| Titre + texte d'introduction centré | `page-intro` | toutes les pages |
| Texte à côté d'une image ou vidéo | `split` | design.html |
| Trois cartes image + titre + texte | `project-grid` / `project-card` | bijoux-perso.html |
| Rangée d'images centrées | `media-row` | gouaches.html |
| Bandeau défilant d'images | `marquee` | collection.html |
| Colonnes de points clés | `key-points` | photos.html |
| Rangée de colonnes de photos | `photo-row` / `photo-col` | photos.html |

Dans un bandeau défilant, chaque image n'est écrite qu'une fois : le script
la duplique automatiquement. `--duration` règle la vitesse (plus grand = plus lent).

Certaines images ont été recadrées directement dans le fichier pour reproduire
le zoom de la maquette (gouachés, bijoux perso, affiches de la page Design).

**Une vidéo** : `<video class="media" src="…" muted loop playsinline preload="metadata"></video>`.
Elle se lance toute seule quand elle apparaît à l'écran. Pour convertir une
vidéo de téléphone (souvent en HEVC, illisible sur Firefox) :

```bash
ffmpeg -i source.mov -an -vf "scale=-2:1280" -c:v libx264 -crf 26 -movflags +faststart sortie.mp4
```

**Couleurs, marges, largeur de page** : variables en haut de `css/style.css`.

**Animation d'apparition** : ajouter ou retirer l'attribut `data-reveal` sur un élément.

## Liens et hébergement

Les pages se lient entre elles par leur nom de fichier (`stage.html`…), ce qui
fonctionne partout, y compris en ouvrant les fichiers en local.

**Menu** : chaque page a en en-tête le même menu, qui reprend la hiérarchie
du site (Galerie → catégories → sous-pages de Stage). Sur ordinateur, la liste
de la galerie s'ouvre au survol de « Galerie » ou au clic sur la flèche ; sur
mobile, tout le menu s'ouvre avec le bouton « Menu ». Le menu est écrit dans
chaque fichier : pour ajouter ou renommer une page, il faut reporter le
changement sur toutes les pages. Sur chaque page, le lien de la page en cours
porte `aria-current="page"` et ses rubriques parentes la classe `is-active`
(affichés en gras). Style : section 22 de `css/style.css`.
