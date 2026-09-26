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

css/style.css               → toute la mise en forme (sections numérotées, sommaire en haut)
js/main.js                  → animations d'apparition, bandeaux défilants, lecture des vidéos
assets/images/              → images, nommées par page (kit-…, collection-…, photo-…)
assets/videos/              → vidéos (MP4 H.264, sans son)
assets/fonts/               → police Inter
_export-figma/              → export Figma d'origine de l'accueil (référence, peut être supprimé)
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
Pour ajuster le cadrage, deux réglages possibles dans l'attribut `style` :

- `--pos: 50% 20%` → point de cadrage (horizontal puis vertical)
- `--ratio: 4 / 3` → proportions imposées (sinon l'image garde les siennes)

**Blocs réutilisables** (copier-coller un bloc existant puis changer le contenu) :

| Bloc | Classe | Exemple dans |
|---|---|---|
| Titre + texte d'introduction centré | `page-intro` | toutes les pages |
| Texte à côté d'une image ou vidéo | `split` | design.html |
| Trois cartes image + titre + texte | `project-grid` / `project-card` | bijoux-perso.html |
| Rangée d'images de même hauteur | `media-row` | gouaches.html |
| Bandeau défilant d'images | `marquee` | collection.html |
| Colonnes de points clés | `key-points` | photos.html |
| Galerie photo sur 2 colonnes | `photo-grid` | photos.html |

Dans un bandeau défilant, chaque image n'est écrite qu'une fois : le script
la duplique automatiquement. `--duration` règle la vitesse (plus grand = plus lent).

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
fonctionne partout, y compris en ouvrant les fichiers en local. L'en-tête de
chaque page est écrit dans chaque fichier : pour ajouter un lien de menu, il
faut le reporter sur toutes les pages.
